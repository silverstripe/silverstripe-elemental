<?php

namespace DNADesign\Elemental\Tests;

use DNADesign\Elemental\ElementalEditor;
use DNADesign\Elemental\Extensions\ElementalPageExtension;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Models\ElementContent;
use Page;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\Forms\FormField;
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

        $field = ElementalEditor::create('ElementalArea', $area);
        $this->assertInstanceOf(FormField::class, $field);
        $this->assertEquals('ElementalArea', $field->getName());
    }
}
