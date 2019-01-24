<?php

namespace DNADesign\Elemental\Tests\Extensions;

use DNADesign\Elemental\Extensions\ElementalCMSMainExtension;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\Forms\DropdownField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\Form;

class ElementalCMSMainExtensionTest extends SapphireTest
{
    public function testRemovesDefaultEmptyStringFromClassFilter()
    {
        $extension = new ElementalCMSMainExtension();

        $field = new DropdownField('Search__FilterClass');
        $field->setEmptyString('All pages');
        $fields = new FieldList($field);
        $form = new Form(null, null, $fields, new FieldList());

        $extension->updateSearchForm($form);

        $this->assertEmpty($field->getEmptyString(), 'Empty string should be empty');
        $this->assertFalse($field->getHasEmptyDefault(), 'Empty string should not have an empty default');
    }
}
