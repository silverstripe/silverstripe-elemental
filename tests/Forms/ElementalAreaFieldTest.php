<?php

namespace DNADesign\Elemental\Tests\Forms;

use DNADesign\Elemental\Forms\ElementalAreaField;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Tests\Src\TestElement;
use DNADesign\Elemental\Tests\Src\TestPage;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\Forms\CompositeField;

class ElementalAreaFieldTest extends SapphireTest
{
    protected static $fixture_file = '../ElementalAreaTest.yml';

    protected static $extra_dataobjects = [
        TestElement::class,
        TestPage::class,
    ];

    /**
     * @var ElementalAreaField
     */
    protected $field;

    protected function setUp(): void
    {
        parent::setUp();

        $this->field = new ElementalAreaField(
            'ElementalAreaField',
            new ElementalArea([
                TestElement::create(),
            ]),
            [TestElement::class => TestElement::create()->getType()]
        );
    }

    public function testFieldReturnsCompositeFieldOnReadonlyTransformation()
    {
        $readonly = $this->field->performReadonlyTransformation();

        $this->assertInstanceOf(
            CompositeField::class,
            $readonly,
            'Uses CompositeField for read-only instances'
        );
    }
}
