<?php

namespace DNADesign\Elemental\Tests\Forms;

use DNADesign\Elemental\Controllers\ElementalAreaController;
use DNADesign\Elemental\Forms\EditFormFactory;
use DNADesign\Elemental\Forms\ElementalAreaField;
use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Tests\Extensions\ElementalAreaFieldExtension;
use DNADesign\Elemental\Tests\Src\TestElement;
use DNADesign\Elemental\Tests\Src\TestPage;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\Forms\CompositeField;
use SilverStripe\ORM\DataObject;

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

    protected function setUp()
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

    public function testSaveInto()
    {
        $field = ElementalAreaField::create(
            'ElementalAreaField',
            $this->objFromFixture(ElementalArea::class, 'area2'),
            [TestElement::class => TestElement::create()->getType()]
        );

        /* @var BaseElement $element */
        $element1 = $this->objFromFixture(TestElement::class, 'element3');
        $element2 = $this->objFromFixture(TestElement::class, 'element4');
        $element2Value = $element2->TestValue;
        $page = $element1->getPage();
        $this->assertInstanceOf(TestPage::class, $page);

        $formID = sprintf(ElementalAreaController::FORM_NAME_TEMPLATE, $element1->ID);
        $fieldName = sprintf(EditFormFactory::FIELD_NAMESPACE_TEMPLATE, $element1->ID, 'TestValue');
        $elementData = [
            $formID => [
                $fieldName => 'Some new value',
            ],
        ];
        $field->setValue($elementData);
        $field->saveInto($page);

        $newElement = DataObject::get_by_id(TestElement::class, $element1->ID);
        $this->assertNotNull($newElement);
        $this->assertEquals('Some new value', $newElement->TestValue);

        $newElement = DataObject::get_by_id(TestElement::class, $element2->ID);
        $this->assertNotNull($newElement);
        $this->assertEquals($element2Value, $newElement->TestValue);
    }

    public function testSaveIntoExtensible()
    {
        $element = $this->objFromFixture(TestElement::class, 'element3');
        $page = $element->getPage();
        $this->assertInstanceOf(TestPage::class, $page);
        
        $formID = sprintf(ElementalAreaController::FORM_NAME_TEMPLATE, $element->ID);
        $fieldName = sprintf(EditFormFactory::FIELD_NAMESPACE_TEMPLATE, $element->ID, 'TestValue');

        // Apply the extension
        $extensionMock = $this->getMockBuilder(ElementalAreaFieldExtension::class)
            ->setMethods(['onSaveInto'])
            ->getMock();
        $extensionMock->expects($this->once())
            ->method('onSaveInto')
            ->with(
                $this->callback(function ($elements) use ($element, $page, $formID) {
                    $this->assertCount(1, $elements);
                    $this->assertEquals($elements[0]->ID, $element->ID);

                    return true;
                }),
                $this->equalTo($page),
                $this->arrayHasKey($formID)
            );
        Injector::inst()->registerService($extensionMock, ElementalAreaFieldExtension::class);
        ElementalAreaField::add_extension(ElementalAreaFieldExtension::class);

        $field = ElementalAreaField::create(
            'ElementalAreaField',
            $this->objFromFixture(ElementalArea::class, 'area2'),
            [TestElement::class => TestElement::create()->getType()]
        );

        $elementData = [
            $formID => [
                $fieldName => 'Some new value',
            ],
        ];

        $field->setValue($elementData);
        $field->saveInto($page);
    }
}
