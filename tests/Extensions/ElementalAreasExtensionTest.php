<?php

namespace DNADesign\Elemental\Tests\Extensions;

use SilverStripe\Dev\SapphireTest;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Core\Config\Config;
use SilverStripe\Forms\LiteralField;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Models\ElementContent;
use DNADesign\Elemental\Tests\Src\TestElement;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;
use DNADesign\Elemental\Tests\Src\TestUnusedElement;
use DNADesign\Elemental\Tests\Src\TestVersionedDataObject;
use DNADesign\Elemental\Extensions\ElementalAreasExtension;
use SilverStripe\ORM\DB;

class ElementalAreasExtensionTest extends SapphireTest
{
    protected static $required_extensions = [
        SiteTree::class => [
            ElementalAreasExtension::class,
        ],
        TestVersionedDataObject::class => [
            ElementalAreasExtension::class,
        ],
    ];

    protected static $extra_dataobjects = [
        TestElement::class,
        TestUnusedElement::class,
        TestVersionedDataObject::class,
    ];

    protected function setUp(): void
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

        $this->assertContainsInOrder(['A test element', 'Content', 'Unused Element'], array_values($types ?? []));
    }

    public function testGetElementalTypesAreNotSortedAlphabetically()
    {
        SiteTree::config()->set('sort_types_alphabetically', false);

        /** @var SiteTree|ElementalAreasExtension $page */
        $page = new SiteTree();
        $types = $page->getElementalTypes();

        $this->assertContainsInOrder(['Content', 'A test element', 'Unused Element'], array_values($types ?? []));
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
        $matches = array_values(array_intersect($actual ?? [], $expected));

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

    public function testRequireDefaultRecords()
    {
        /** @var TestVersionedDataObject|ElementalAreasExtension|Versioned $object */
        $object = new TestVersionedDataObject();
        $object->Title = 'abc';
        $id = $object->write();
        $object->publishSingle();
        $object->Title = 'def';
        $object->write();
        $this->assertTrue($object->isModifiedOnDraft());
        $tableName = $object->getSchema()->tableName(TestVersionedDataObject::class);
        $tableNameLive = $tableName . '_Live';
        // Explicitly set ElementalAreaID to null to simulate a fresh object that
        // has the ElementalAreasExtension applied to it
        // There's an onBeforeWrite() hook that will set ElementalAreaID so update DB directly
        DB::query("UPDATE $tableName SET ElementalAreaID = NULL WHERE ID = $id");
        DB::query("UPDATE $tableNameLive SET ElementalAreaID = NULL WHERE ID = $id");
        $object->requireDefaultRecords();
        // refetch object to ensure we're not using a cached version
        $object = TestVersionedDataObject::get()->byID($id);
        // assert that an ElementalID was set on the object
        $this->assertSame(ElementalArea::get()->max('ID'), $object->ElementalAreaID);
        // assert that we didn't accidentally publish the modified object
        $this->assertTrue($object->isModifiedOnDraft());
    }
}
