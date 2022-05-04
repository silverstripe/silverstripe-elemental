<?php

namespace DNADesign\Elemental\Tests;

use DNADesign\Elemental\Controllers\ElementController;
use DNADesign\Elemental\Extensions\ElementalPageExtension;
use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Models\ElementContent;
use DNADesign\Elemental\Tests\Src\TestContentForSearchIndexExtension;
use DNADesign\Elemental\Tests\Src\TestDataObject;
use DNADesign\Elemental\Tests\Src\TestElement;
use DNADesign\Elemental\Tests\Src\TestElementDataObject;
use DNADesign\Elemental\Tests\Src\TestDataObjectWithCMSEditLink;
use DNADesign\Elemental\Tests\Src\TestPage;
use Page;
use ReflectionClass;
use SilverStripe\Control\Director;
use SilverStripe\Core\Config\Config;
use SilverStripe\Dev\FunctionalTest;
use SilverStripe\Forms\FieldList;
use SilverStripe\VersionedAdmin\Forms\HistoryViewerField;

class BaseElementTest extends FunctionalTest
{
    protected static $fixture_file = [
        'ElementalPageExtensionTest.yml',
        'ElementalAreaDataObjectTest.yml'
    ];

    protected static $required_extensions = [
        Page::class => [
            ElementalPageExtension::class,
        ],
        TestDataObject::class => [
            ElementalPageExtension::class,
        ],
        TestDataObjectWithCMSEditLink::class => [
            ElementalPageExtension::class,
        ],
    ];

    protected static $extra_dataobjects = [
        TestPage::class,
        TestElement::class,
        TestDataObject::class,
        TestDataObjectWithCMSEditLink::class,
        TestElementDataObject::class,
    ];

    public function testSimpleClassName()
    {
        $element = $this->objFromFixture(ElementContent::class, 'content1');

        $this->assertEquals('dnadesign__elemental__models__elementcontent', $element->getSimpleClassName());
    }

    /**
     * Test to ensure backwards compatibility with old Anchor IDs.
     */
    public function testDisablePrettyAnchor()
    {
        Config::modify()->set(BaseElement::class, 'disable_pretty_anchor_name', true);

        $area = ElementalArea::create();
        $area->Elements()->add(BaseElement::create(array('Title' => 'Element 1', 'Sort' => 1)));
        $area->Elements()->add(BaseElement::create(array('Title' => 'Element 1', 'Sort' => 2)));
        $area->Elements()->add(BaseElement::create(array('Title' => 'Element 1', 'Sort' => 3)));
        $area->Elements()->add(BaseElement::create(array('Title' => 'Element 1', 'Sort' => 4)));
        $area->write();

        $recordSet = $area->Elements()->toArray();
        $this->assertEquals('e'.$recordSet[0]->ID, $recordSet[0]->getAnchor());
        $this->assertEquals('e'.$recordSet[1]->ID, $recordSet[1]->getAnchor());
        $this->assertEquals('e'.$recordSet[2]->ID, $recordSet[2]->getAnchor());
        $this->assertEquals('e'.$recordSet[3]->ID, $recordSet[3]->getAnchor());
    }

    /**
     * Test the stop-clashing logic if two BaseElement classes have the same $Title.
     */
    public function testSameTitle()
    {
        Config::modify()->set(BaseElement::class, 'enable_title_in_template', true);

        $area = ElementalArea::create();
        $area->Elements()->add(BaseElement::create(array('Title' => 'Element 1', 'Sort' => 1)));
        $area->Elements()->add(BaseElement::create(array('Title' => 'Element 1', 'Sort' => 2)));
        $area->Elements()->add(BaseElement::create(array('Title' => 'Element 1', 'Sort' => 3)));
        $area->Elements()->add(BaseElement::create(array('Title' => 'Element 1', 'Sort' => 4)));
        $area->write();

        $recordSet = $area->Elements()->toArray();
        foreach ($recordSet as $record) {
            // NOTE: This puts it into the $_anchor protected variable
            //       and caches it.
            $record->getAnchor();
        }
        $this->assertEquals('element-1', $recordSet[0]->getAnchor());
        $this->assertEquals('element-1-2', $recordSet[1]->getAnchor());
        $this->assertEquals('element-1-3', $recordSet[2]->getAnchor());
        $this->assertEquals('element-1-4', $recordSet[3]->getAnchor());
    }

    public function testGetCmsFields()
    {
        $element = $this->objFromFixture(ElementContent::class, 'content1');

        $this->assertInstanceOf(FieldList::class, $element->getCMSFields());
    }

    public function testGetController()
    {
        $element = $this->objFromFixture(ElementContent::class, 'content1');
        $controller = $element->getController();

        $this->assertInstanceOf(ElementController::class, $controller);

        $this->assertEquals($element, $controller->getElement(), 'Controller has element');
        $this->assertEquals('Test Content', $controller->Title, 'Controller fallbacks to element');
    }

    public function testLink()
    {
        $element = $this->objFromFixture(ElementContent::class, 'content1');

        $this->assertStringContainsString($element->getPage()->Link(), $element->Link());
    }

    public function testGetEditLink()
    {
        Director::config()->set('alternate_base_url', 'http://example.com');

        /** @var ElementContent $element */
        $element = $this->objFromFixture(ElementContent::class, 'content1');
        $editLink = $element->getEditLink();

        $this->assertStringContainsString('http://example.com', $editLink, 'Link should be absolute');
        $this->assertStringContainsString('pages/edit', $editLink, 'Link should contain reference to the page');
    }

    public function testGetIcon()
    {
        $element = new ElementContent();
        $this->assertStringContainsString('class="font-icon-block-content"', $element->getIcon());

        Config::modify()->set(ElementContent::class, 'icon', '');
        $this->assertEmpty($element->getIcon());
    }

    public function testNoHistoryForUnsavedElements()
    {
        $newElement = new ElementContent();
        $newElementHistory = $newElement->getCMSFields()->dataFieldByName('ElementHistory');
        $this->assertNull($newElementHistory, 'Unsaved elements should not have history yet');
    }

    public function testGetHistoryViewerField()
    {
        $this->logInWithPermission();

        /** @var ElementContent $element */
        $element = $this->objFromFixture(ElementContent::class, 'content1');

        $history = $element->getCMSFields()->dataFieldByName('ElementHistory');
        $this->assertInstanceOf(HistoryViewerField::class, $history, 'History should be added');
    }

    public function testStyleVariants()
    {
        $styles = [
            'option1' => 'Option 1',
            'option2' => 'Option 2'
        ];

        Config::modify()->set(ElementContent::class, 'styles', $styles);
        $element = $this->objFromFixture(ElementContent::class, 'content1');

        $this->assertEquals($styles, $element->getCMSFields()->dataFieldByName('Style')->getSource());

        $element->Style = 'option1';
        $this->assertEquals('option1', $element->getStyleVariant());

        // set a outdated style, should not add.
        $element->Style = 'old';
        $this->assertEquals('', $element->getStyleVariant());
    }

    public function testFirst()
    {
        $element = $this->objFromFixture(ElementContent::class, 'content1');
        $element2 = $this->objFromFixture(ElementContent::class, 'content2');

        $this->assertTrue($element->First());
        $this->assertFalse($element2->First());
    }

    public function testLast()
    {
        $element = $this->objFromFixture(ElementContent::class, 'content1');
        $element2 = $this->objFromFixture(ElementContent::class, 'content2');

        $this->assertFalse($element->Last());
        $this->assertTrue($element2->Last());
    }

    public function testTotalItems()
    {
        $element = $this->objFromFixture(ElementContent::class, 'content1');
        $element3 = $this->objFromFixture(ElementContent::class, 'content3');

        $this->assertEquals(2, $element->TotalItems());
        $this->assertEquals(1, $element3->TotalItems());
    }

    public function testEvenOdd()
    {
        $element = $this->objFromFixture(ElementContent::class, 'content1');
        $element2 = $this->objFromFixture(ElementContent::class, 'content2');
        $element3 = $this->objFromFixture(ElementContent::class, 'content3');

        $this->assertEquals('odd', $element->EvenOdd());
        $this->assertEquals('even', $element2->EvenOdd());
        $this->assertEquals('odd', $element3->EvenOdd());
    }

    public function testOnBeforeWrite()
    {
        /** @var ElementalArea $area */
        $area = $this->objFromFixture(ElementalArea::class, 'area51');

        $element1 = new ElementContent();
        $element1->ParentID = $area->ID;
        $element1->write();
        $baselineSort = $element1->Sort;

        $element2 = new ElementContent();
        $element2->ParentID = $area->ID;
        $element2->write();
        $this->assertEquals($baselineSort + 1, $element2->Sort, 'Sort order should be higher than the max');

        // Use a different element type, ensuring that sort orders are relative to the BaseElement
        $element3 = new TestElement();
        $element3->ParentID = $area->ID;
        $element3->write();
        $this->assertEquals($baselineSort + 2, $element3->Sort, 'Sort order should be higher than the max');
    }

    public function testOnBeforeWriteNoParent()
    {
        $element1 = new ElementContent();
        $element1->write();

        $this->assertEquals(0, (int) $element1->Sort);
    }

    public function testGetContentForSearchIndex()
    {
        $element = $this->objFromFixture(ElementContent::class, 'content4');
        // Content should have tags stripped with a space before what were the < characters
        // One closing tag plus one opening tag means there should be two spaced between paragraphs
        $this->assertEquals('One paragraph  And another one', $element->getContentForSearchIndex());
    }

    public function testUpdateContentForSearchIndex()
    {
        ElementContent::add_extension(TestContentForSearchIndexExtension::class);
        $element = $this->objFromFixture(ElementContent::class, 'content4');
        // Content should be updated by the extension
        $this->assertEquals('This is the updated content.', $element->getContentForSearchIndex());
        ElementContent::remove_extension(TestContentForSearchIndexExtension::class);
    }

    public function getElementCMSLinkDataProvider()
    {
        return [
            // Element in DataObject with $directLink === true
            'element1' => [
                TestElement::class,
                'elementDataObject1',
                'http://localhost/admin/1/ItemEditForm/field/ElementalArea/item/',
                true
            ],
            // Element in DataObject with $inline_editable = false
            'element2' => [
                TestElementDataObject::class,
                'testElementDataObject1',
                'http://localhost/admin/1/ItemEditForm/field/ElementalArea/item/',
            ],
            // Element in DataObject with $inline_editable = true
            'element3' => [
                ElementContent::class,
                'contentDataObject1',
                'http://localhost/admin/1/ItemEditForm',
            ],
            // Element in Page with $inline_editable = true
            'element4' => [
                ElementContent::class,
                'content1',
                'http://localhost/admin/pages/edit/show/1',
            ],
            // Element in DataObject with $directLink === true
            'element5' => [
                ElementContent::class,
                'content1',
                'admin/pages/edit/EditForm/1/field/ElementalArea/item/1/edit',
                true
            ],
            // DataObject without CMSEditLink method
            'element6' => [
                TestElement::class,
                'elementDataObject2',
                null
            ],
        ];
    }

    /**
     * @dataProvider getElementCMSLinkDataProvider
     */
    public function testCMSEditLink(string $class, string $element, ?string $link, bool $directLink = false)
    {
        $object = $this->objFromFixture($class, $element);
        $editLink = $object->CMSEditLink($directLink);

        if ($link) {
            $this->assertStringContainsString($link, $editLink);
        } else {
            $this->assertNull($link);
        }
    }

    public function canDeleteProvider()
    {
        return [
            // Element on Page
            'element1' => [
                ElementContent::class,
                'content1',
                'ADMIN',
            ],
            // Element in DataObject
            'element2' => [
                TestElement::class,
                'elementDataObject1',
                'CMS_ACCESS_CMSMain',
            ],
        ];
    }

    /**
     * @dataProvider canDeleteProvider
     */
    public function testCanDelete(
        string $class,
        string $element,
        string $permission
    ) {
        $this->logOut();
        $this->logInWithPermission($permission);
        $object = $this->objFromFixture($class, $element);
        $canDelete = $object->canDelete();
        $this->assertNotNull($canDelete);
        $this->assertTrue($canDelete);
    }

    public function linksProvider()
    {
        return [
            // Element on Page
            'element1' => [
                ElementContent::class,
                'content1',
                '/test-elemental/#e1',
            ],
            // Element in DataObject
            'element2' => [
                TestElement::class,
                'elementDataObject1',
                null,
            ],
        ];
    }

    /**
     * @dataProvider linksProvider
     */
    public function testLinkWithDataObject(string $class, string $element, ?string $link)
    {
        $object = $this->objFromFixture($class, $element);
        $this->assertEquals($link, $object->Link());
    }

    /**
     * @dataProvider linksProvider
     */
    public function testAbsoluteLink(string $class, string $element, ?string $link)
    {
        $link = $link ? Director::absoluteURL($link) : $link;
        $object = $this->objFromFixture($class, $element);
        $absoluteLink = $object->AbsoluteLink();
        $this->assertEquals($link, $absoluteLink);
    }

    public function previewLinksProvider()
    {
        return [
            // Element on Page
            [
                ElementContent::class,
                'content1',
                '/test-elemental/',
            ],
            // Element in DataObject WITHOUT PreviewLink or Link
            [
                TestElement::class,
                'elementDataObject2',
                null,
            ],
            // Element in DataObject WITH PreviewLink WITHOUT Link
            [
                TestElement::class,
                'elementDataObject3',
                'preview-link',
            ],
            // Element in DataObject WITH PreviewLink AND Link (different paths)
            [
                TestElement::class,
                'elementDataObject4',
                'base-link',
            ],
        ];
    }

    /**
     * @dataProvider previewLinksProvider
     */
    public function testPreviewLink(string $class, string $elementIdentifier, ?string $link)
    {
        /** @var BaseElement $element */
        $element = $this->objFromFixture($class, $elementIdentifier);

        if ($link) {
            $regex = '/^' . preg_quote($link . '?ElementalPreview=', '/') .'\d*#' . $element->getAnchor() . '$/';
            $this->assertTrue((bool)preg_match($regex, $element->PreviewLink()));
        } else {
            $this->assertSame($link, $element->PreviewLink());
        }
    }
}
