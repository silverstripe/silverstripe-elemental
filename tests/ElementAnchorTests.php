<?php

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
        Config::inst()->update('BaseElement', 'disable_pretty_anchor_name', true);

        $area = ElementalArea::create();
        $area->Widgets()->add(BaseElement::create(array('Title' => 'Element 1', 'Sort' => 1)));
        $area->Widgets()->add(BaseElement::create(array('Title' => 'Element 1', 'Sort' => 2)));
        $area->Widgets()->add(BaseElement::create(array('Title' => 'Element 1', 'Sort' => 3)));
        $area->Widgets()->add(BaseElement::create(array('Title' => 'Element 1', 'Sort' => 4)));
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
        Config::inst()->update('BaseElement', 'enable_title_in_template', true);

        $area = ElementalArea::create();
        $area->Widgets()->add(BaseElement::create(array('Title' => 'Element 1', 'Sort' => 1)));
        $area->Widgets()->add(BaseElement::create(array('Title' => 'Element 1', 'Sort' => 2)));
        $area->Widgets()->add(BaseElement::create(array('Title' => 'Element 1', 'Sort' => 3)));
        $area->Widgets()->add(BaseElement::create(array('Title' => 'Element 1', 'Sort' => 4)));
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
}
