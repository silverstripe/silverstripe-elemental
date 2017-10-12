<?php

namespace DNADesign\Elemental\Tests;

use DNADesign\Elemental\Extensions\ElementalPageExtension;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Models\ElementContent;
use DNADesign\Elemental\ElementalEditor;
use DNADesign\Elemental\Forms\ElementalGridFieldAddNewMultiClass;
use Page;
use SilverStripe\CMS\Model\RedirectorPage;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\Forms\GridField\GridField;

class ElementalEditorTest extends SapphireTest
{
    protected static $fixture_file = 'ElementControllerTest.yml';

    protected static $required_extensions = [
        Page::class => [
            ElementalPageExtension::class,
        ],
    ];

    public function testGetField()
    {
        $area = $this->objFromFixture(ElementalArea::class, 'area1');
        $editor = ElementalEditor::create('ElementalArea', $area);

        //
        $field = $editor->getField();
        $this->assertInstanceOf(GridField::class, $field);
        $this->assertEquals('ElementalArea', $field->getName());

        // set allowed types, the user should see in the dropdown
        $editor->setTypes([
            ElementContent::class
        ]);

        $field = $editor->getField();
        $classes = $field->getConfig()->getComponentByType(ElementalGridFieldAddNewMultiClass::class)->getClasses($field);

        $this->assertEquals(1, count($classes), 'Only one type available');
        $this->assertArrayHasKey('DNADesign-Elemental-Models-ElementContent', $classes);
    }
}
