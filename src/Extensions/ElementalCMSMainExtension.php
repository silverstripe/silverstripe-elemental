<?php

namespace DNADesign\Elemental\Extensions;

use SilverStripe\Core\Extension;
use SilverStripe\Forms\DropdownField;
use SilverStripe\Forms\Form;

class ElementalCMSMainExtension extends Extension
{
    /**
     * Remove the empty default string on the class filter, which adds "All pages" again. This is already
     * added by ElementSiteTreeFilterSearch.
     *
     * @param Form $form
     */
    public function updateSearchForm(Form $form)
    {
        /** @var DropdownField $filterField */
        $filterField = $form->Fields()->fieldByName('Search__FilterClass');
        if ($filterField) {
            $filterField->setEmptyString('')->setHasEmptyDefault(false);
        }
    }
}
