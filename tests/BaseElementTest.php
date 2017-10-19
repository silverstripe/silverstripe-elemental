<?php

namespace DNADesign\Elemental\Tests;

use DNADesign\Elemental\Extensions\ElementalPageExtension;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Controllers\ElementController;
use DNADesign\Elemental\Tests\Src\TestElement;
use DNADesign\Elemental\Tests\Src\TestPage;
use SilverStripe\Core\Config\Config;
use SilverStripe\Forms\GridField\GridField;
use Page;
use SilverStripe\CMS\Model\RedirectorPage;
use SilverStripe\Dev\FunctionalTest;
use DNADesign\Elemental\Models\ElementContent;

class BaseElementTest extends FunctionalTest
{
    protected static $fixture_file = 'ElementalPageExtensionTests.yml';

    protected static $required_extensions = [
        Page::class => [
            ElementalPageExtension::class,
        ]
    ];

    protected static $extra_dataobjects = [
        TestPage::class
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

    public function testGetAllowedElementClasses()
    {
        $this->markTestIncomplete();
    }

    public function testGetCmsFields()
    {
        $this->markTestIncomplete();
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
        $this->markTestIncomplete();
    }

    public function testGetIcon()
    {
        $this->markTestIncomplete();
    }

    public function testGetHistoryFields()
    {
        $this->logInWithPermission();

        $element = $this->objFromFixture(ElementContent::class, 'content1');
        $history = $element->getHistoryFields()->fieldByName('History');

        $this->assertInstanceOf(GridField::class, $history);
        $this->assertEquals(1, $history->getList()->count());

        $element->HTML = '<p>Changed</p>';
        $element->write();
        $element->publishRecursive();

        $history = $element->getHistoryFields()->fieldByName('History');

        $this->assertInstanceOf(GridField::class, $history);
        $this->assertEquals(2, $history->getList()->count(), 'Publishing a new version creates a new record');
    }
}
