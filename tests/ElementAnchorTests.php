<?php

/**
 * @package elemental
 * @subpackage tests
 */
class ElementAnchorTests extends FunctionalTest {
    public function setUp() {
        parent::setUp();

        // Reset
        Config::inst()->update('BaseElement', 'disable_pretty_anchor_name', false);
        Config::inst()->update('BaseElement', 'enable_title_in_template', false);
        _used_anchors
    }

    public function testDisablePrettyAnchor() {
        Config::inst()->update('BaseElement', 'disable_pretty_anchor_name', true);

        $area = ElementalArea::create();
        $area->Widgets()->add(BaseElement::create(array('Title' => 'Element 1', 'Sort' => 1)));
        $area->Widgets()->add(BaseElement::create(array('Title' => 'Element 1', 'Sort' => 2)));
        $area->Widgets()->add(BaseElement::create(array('Title' => 'Element 1', 'Sort' => 3)));
        $area->Widgets()->add(BaseElement::create(array('Title' => 'Element 1', 'Sort' => 4)));
        $area->write();

        $recordSet = $area->Elements()->toArray();
        foreach ($recordSet as $record) {
            $record->getAnchor();
        }
        $this->assertEquals('element-1', $recordSet[0]->getAnchor());
        $this->assertEquals('element-1-2', $recordSet[1]->getAnchor());
        $this->assertEquals('element-1-3', $recordSet[2]->getAnchor());
        $this->assertEquals('element-1-4', $recordSet[3]->getAnchor());
    }

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
            $record->getAnchor();
        }
        $this->assertEquals('element-1', $recordSet[0]->getAnchor());
        $this->assertEquals('element-1-2', $recordSet[1]->getAnchor());
        $this->assertEquals('element-1-3', $recordSet[2]->getAnchor());
        $this->assertEquals('element-1-4', $recordSet[3]->getAnchor());
    }
}
