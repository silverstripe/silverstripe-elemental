<?php

namespace DNADesign\Elemental\Extensions;

use SilverStripe\Core\Extension;
use SilverStripe\Forms\Form;
use DNADesign\Elemental\Models\BaseElement;
use Symbiote\GridFieldExtensions\GridFieldAddNewMultiClassHandler;

/**
 * @extends Extension<GridFieldAddNewMultiClassHandler>
 */
class GridFieldAddNewMultiClassHandlerExtension extends Extension
{
    /**
     * @param Form $form
     */
    public function updateItemEditForm(Form $form)
    {
        // NOTE: this extension is applied to new item edit form only

        $record = $form->getRecord();
        if ($record instanceof BaseElement) {
            // prevent lost changes popup message when creating a new element
            $form->addExtraClass('discardchanges');
        }
    }
}
