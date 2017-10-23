<?php

namespace DNADesign\Elemental\Extensions;

use SilverStripe\ORM\FieldType\DBField;
use SilverStripe\Core\Extension;
use SilverStripe\Control\Controller;
use SilverStripe\ORM\CMSPreviewable;
use SilverStripe\CMS\Controllers\SilverStripeNavigator;
use SilverStripe\Forms\LiteralField;
use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\FormAction;

class GridFieldDetailFormItemRequestExtension extends Extension
{
    public function updateBreadcrumbs($crumbs)
    {
        $record = $this->owner->getRecord();

        if ($record instanceof BaseElement) {
            $last = $crumbs->Last();

            $last->Title = DBField::create_field('HTMLVarchar', sprintf(
                "%s <small>(%s)</small>",
                DBField::create_field('Varchar', $last->Title)->XML(),
                $record->getType()
            ));
        }
    }

    /**
     * Updates the edit form to inject the preview panel controls if needed
     * i.e. if the class being edited implements CMSPreviewable
     *
     * @param SilverStripe\Forms\Form $form to be modified by reference
     */
    public function updateItemEditForm(&$form)
    {
        $fields = $form->Fields();
        if ($this->owner->getRecord() instanceof CMSPreviewable &&
            !$fields->fieldByName('SilverStripeNavigator')
        ) {
            $template = Controller::curr()
                ->getTemplatesWithSuffix('_SilverStripeNavigator');
            $navigator = SilverStripeNavigator::create($this->owner->record);
            $field = LiteralField::create(
                'SilverStripeNavigator',
                $navigator->renderWith($template)
            )->setAllowHTML(true);
            $fields->push($field);
            $form->addExtraClass('cms-previewable')
                ->removeExtraClass('cms-panel-padded center');
        }
    }
}
