<?php

namespace DNADesign\Elemental\Tests\Forms;

use DNADesign\Elemental\Forms\TextCheckboxGroupField;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\CompositeField;
use SilverStripe\Forms\TextField;

class TextCheckboxGroupFieldTest extends SapphireTest
{
    /**
     * @var TextCheckboxGroupField
     */
    protected $field;

    protected function setUp()
    {
        parent::setUp();

        $this->field = new TextCheckboxGroupField(
            new TextField('HelloWorld'),
            new CheckboxField('Display')
        );
    }

    public function testFieldIsAssignedFirstFieldsTitleInConstructor()
    {
        $this->assertSame('Hello World', $this->field->Title());
    }

    public function testFieldReturnsCompositeFieldTemplateOnReadonlyTransformation()
    {
        $this->assertSame(
            TextCheckboxGroupField::class,
            $this->field->getTemplates()[0],
            'Uses a custom template by default'
        );

        $readonly = $this->field->performReadonlyTransformation();

        $this->assertSame(
            CompositeField::class,
            $readonly->getTemplate(),
            'Uses CompositeField template for readonly'
        );
    }
}
