<?php

namespace DNADesign\Elemental\Tests\Extensions;

use DNADesign\Elemental\Extensions\ElementalAreasExtension;
use DNADesign\Elemental\Extensions\ElementalPageExtension;
use DNADesign\Elemental\Models\ElementContent;
use DNADesign\Elemental\Tests\Src\TestElement;
use DNADesign\Elemental\Tests\Src\TestUnusedElement;
use SilverStripe\Assets\File;
use SilverStripe\Core\Config\Config;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;
use SilverStripe\Forms\LiteralField;

class ElementalAreasExtensionTest extends SapphireTest
{

    protected $usesDatabase = true;

    protected static $required_extensions = [
        SiteTree::class => [
            ElementalPageExtension::class,
        ],
    ];

    protected static $extra_dataobjects = [
        TestElement::class,
        TestUnusedElement::class,
    ];

    protected function setUp()
    {
        parent::setUp();

        $this->logInWithPermission('ADMIN');

        SiteTree::config()
            ->set('allowed_elements', [
                ElementContent::class,
                TestElement::class,
                TestUnusedElement::class,
            ])
            ->set('disallowed_elements', []);
    }

    public function testGetElementalTypesSortsAlphabetically()
    {
        SiteTree::config()->set('sort_types_alphabetically', true);

        /** @var SiteTree|ElementalAreasExtension $page */
        $page = new SiteTree();
        $types = $page->getElementalTypes();

        $this->assertContainsInOrder(['A test element', 'Content', 'Unused Element'], array_values($types));
    }

    public function testGetElementalTypesAreNotSortedAlphabetically()
    {
        SiteTree::config()->set('sort_types_alphabetically', false);

        /** @var SiteTree|ElementalAreasExtension $page */
        $page = new SiteTree();
        $types = $page->getElementalTypes();

        $this->assertContainsInOrder(['Content', 'A test element', 'Unused Element'], array_values($types));
    }

    /**
     * We need to check that the order of the elements is correct, but there might be more element types installed than
     * we're aware of, so we first extract the elements we want from the source list and check the order afterwards.
     *
     * @param array $expected
     * @param array $actual
     */
    private function assertContainsInOrder(array $expected, array $actual)
    {
        $matches = array_values(array_intersect($actual, $expected));

        $this->assertSame($expected, $matches);
    }

    /**
     * @dataProvider provideContentFieldPreservationSettings
     */
    public function testContentFieldsAreRemovedByDefault($keepGlobal, $keepClass, $expectedType)
    {
        Config::inst()->set(ElementalAreasExtension::class, 'keep_content_fields', $keepGlobal);
        Config::inst()->set(SiteTree::class, 'elemental_keep_content_field', $keepClass);
        $page = SiteTree::create();
        $fields = $page->getCMSFields();
        $this->assertInstanceOf($expectedType, $fields->fieldByName('Root.Main.Content'));
    }

    /**
     * Provide data for testing both settings and override precedence of Content field replacement
     * Settings provided as:
     * - ElementalAreasExtension.keep_content_fields (the global setting)
     * - SiteTree.elemental_keep_content_field (the class level setting - should take precedence)
     * - The expected class of the Field in the FieldList (LiteralField OR HTMLEditorField)
     *
     * @return array
     */
    public function provideContentFieldPreservationSettings()
    {
        // Test both unset (null) and explicitly declined (false) where applicable.
        return [
            [null, null, LiteralField::class],
            [false, false, LiteralField::class],
            [true, null, HTMLEditorField::class],
            [true, false, LiteralField::class],
            [null, true, HTMLEditorField::class],
            [false, true, HTMLEditorField::class],
            [true, true, HTMLEditorField::class],
        ];
    }

    private function setupBrokenData($type)
    {
        $linkedToPage = SiteTree::create();
        $linkedToPage->write();

        $linkedToFile = File::create();
        $linkedToFile->write();

        $id = $type == 'links' ? $linkedToPage->ID : $linkedToFile->ID;
        $shortcode = $type == 'links' ? 'sitetree_link' : 'file_link';
        // class="ss-broken"
        $broken = '<p>Lorem <a href="[' . $shortcode . ',id=99999]">internal broken ' . $type . '</a> ip</p>';
        $unbroken = '<p>Lorem <a href="[' . $shortcode . ',id='. $id .']">internal ' . $type . '</a> ip</p>';

        $page = SiteTree::create();
        $page->Content = $unbroken;
        $page->write();

        $elementalArea = $page->ElementalArea();
        $element = ElementContent::create();
        $element->HTML = $unbroken;
        $element->ParentID = $elementalArea->ID;
        $element->write();

        $page->write();
        $this->assertFalse($page->HasBrokenLink);
        $this->assertFalse($page->HasBrokenFile);

        return [
            'page' => $page,
            'element' => $element,
            'broken' => $broken,
            'unbroken' => $unbroken
        ];
    }

    /**
     * Saving the page updates SiteTree->HasBroken from grandchild ElementContent->HasBrokenLink|HasBrokenFile
     */
    public function testHasBrokenSavingPage()
    {
        foreach (['links' => 'HasBrokenLink', 'files' => 'HasBrokenFile'] as $type => $field) {
            list('page' => $page, 'element' => $element, 'broken' => $broken) = $this->setupBrokenData($type);
            $element->HTML = $broken;
            $element->write();
            $page->write();
            $this->assertTrue($page->$field);
        }
    }

    /**
     * Saving the element does not update grandparent SiteTree->HasBrokenLink|HasBrokenFile
     */
    public function testHasBrokenSavingElementDoesNotUpdatePage()
    {
        foreach (['links' => 'HasBrokenLink', 'files' => 'HasBrokenFile'] as $type => $field) {
            list('page' => $page, 'element' => $element, 'broken' => $broken) = $this->setupBrokenData($type);
            $element->HTML = $broken;
            $element->write();
            $this->assertFalse($page->$field);
        }
    }

    /**
     * Fixing a broken element link sets SiteTree->HasBrokenLink|HasBrokenFile to false
     */
    public function testHasBrokenFixSetsSiteTreeToFalse()
    {
        foreach (['links' => 'HasBrokenLink', 'files' => 'HasBrokenFile'] as $type => $field) {
            list('page' => $page, 'element' => $element, 'broken' => $broken, 'unbroken' => $unbroken)
                = $this->setupBrokenData($type);
            $element->HTML = $broken;
            $element->write();
            $page->write();
            $this->assertTrue($page->$field);
            $element->HTML = $unbroken;
            $element->write();
            $page->write();
            $this->assertFalse($page->$field);
        }
    }

    /**
     * Unbroken element links do not overwrite SiteTree->HasBrokenLink|HasBrokenFile
     */
    public function testHasBrokenUnbrokenDoesNotOverwriteBrokenSiteTree()
    {
        foreach (['links' => 'HasBrokenLink', 'files' => 'HasBrokenFile'] as $type => $field) {
            list('page' => $page, 'element' => $element, 'broken' => $broken, 'unbroken' => $unbroken)
                = $this->setupBrokenData($type);
            $page->Content = $broken;
            $page->write();
            $this->assertTrue($page->$field);
            $element->HTML = $unbroken;
            $element->write();
            $page->write();
            $this->assertTrue($page->$field);
        }
    }
}
