<?php

namespace DNADesign\Elemental\Tests;

use SilverStripe\Dev\FunctionalTest;
use SilverStripe\Core\Config\Config;

use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementalArea;

/**
 * @package elemental
 * @subpackage tests
 */
class ElementAnchorTests extends FunctionalTest {
    public function setUp() {
        parent::setUp();
    }

    /**
     * Test to ensure backwards compatibility with old Anchor IDs.
     */
    public function testDisablePrettyAnchor() {
        Config::inst()->update(BaseElement::class, 'disable_pretty_anchor_name', true);

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
    public function testSameTitle() {
        Config::inst()->update(BaseElement::class, 'enable_title_in_template', true);

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

    /**
     * Test virtual element Anchor ID.
     */
    public function testVirtualElementAnchor() {
        Config::inst()->update('BaseElement', 'enable_title_in_template', true);

        $baseElement1 = BaseElement::create(array('Title' => 'Element 2', 'Sort' => 1));
        $baseElement1->write();
        $baseElement2 = BaseElement::create(array('Title' => 'Element 2', 'Sort' => 2));
        $baseElement2->write();
        $baseElement3 = BaseElement::create(array('Title' => 'Element 2', 'Sort' => 3));
        $baseElement3->write();
        $virtElement1 = ElementVirtualLinked::create(array('LinkedElementID' => $baseElement2->ID));
        $virtElement1->write();
        $virtElement2 = ElementVirtualLinked::create(array('LinkedElementID' => $baseElement3->ID));
        $virtElement2->write();

        $area = ElementalArea::create();
        $area->Widgets()->add($baseElement1);
        $area->Widgets()->add($virtElement1);
        $area->Widgets()->add($virtElement2);
        $area->write();

        $recordSet = $area->Elements()->toArray();
        foreach ($recordSet as $record) {
            // NOTE: This puts it into the $_anchor protected variable
            //       and caches it.
            $record->getAnchor();
        }

        $this->assertEquals('element-2', $recordSet[0]->getAnchor());
        $this->assertEquals('element-2-2', $recordSet[1]->getAnchor());
        $this->assertEquals('element-2-3', $recordSet[2]->getAnchor());
    }

}
