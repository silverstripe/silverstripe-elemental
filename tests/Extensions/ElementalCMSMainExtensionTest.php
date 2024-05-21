<?php

namespace DNADesign\Elemental\Tests\Extensions;

use DNADesign\Elemental\Extensions\ElementalCMSMainExtension;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\Forms\DropdownField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\Form;
use \ReflectionMethod;

class ElementalCMSMainExtensionTest extends SapphireTest
{
    public function testRemovesDefaultEmptyStringFromClassFilter()
    {
        $extension = new ElementalCMSMainExtension();

        $field = new DropdownField('Search__FilterClass');
        $field->setEmptyString('All pages');
        $fields = new FieldList($field);
        $form = new Form(null, null, $fields, new FieldList());

        // Call extension method ElementalCMSMainExtension::updateSearchForm($form) which is protected
        $method = new ReflectionMethod(ElementalCMSMainExtension::class, 'updateSearchForm');
        $method->setAccessible(true);
        $method->invoke($extension, $form);

        $this->assertEmpty($field->getEmptyString(), 'Empty string should be empty');
        $this->assertFalse($field->getHasEmptyDefault(), 'Empty string should not have an empty default');
    }
}
