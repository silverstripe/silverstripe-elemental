<?php

namespace DNADesign\Elemental\Extensions;

use SilverStripe\CMS\Controllers\CMSMain;
use SilverStripe\Core\Extension;
use SilverStripe\Dev\Deprecation;
use SilverStripe\Forms\DropdownField;
use SilverStripe\Forms\Form;

/**
 * @extends Extension<CMSMain>
 * @deprecated 5.4.0 Will be removed without equivalent functionality in a future major release
 */
class ElementalCMSMainExtension extends Extension
{
    public function __construct()
    {
        Deprecation::noticeWithNoReplacment('5.4.0', scope: Deprecation::SCOPE_CLASS);
        parent::__construct();
    }

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
