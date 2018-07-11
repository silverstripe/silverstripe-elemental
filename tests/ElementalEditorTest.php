<?php

namespace DNADesign\Elemental\Tests;

use DNADesign\Elemental\ElementalEditor;
use DNADesign\Elemental\Extensions\ElementalPageExtension;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Models\ElementContent;
use Page;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\Forms\GridField\GridField;
use Symbiote\GridFieldExtensions\GridFieldAddNewMultiClass;

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
        $classes = $field->getConfig()->getComponentByType(GridFieldAddNewMultiClass::class)->getClasses($field);

        $this->assertEquals(1, count($classes), 'Only one type available');
        $this->assertArrayHasKey('DNADesign-Elemental-Models-ElementContent', $classes);
    }
}
