<?php

namespace DNADesign\Elemental\Forms;

use SilverStripe\Forms\GridField\GridFieldDeleteAction;
use SilverStripe\Forms\GridField\GridField_FormAction;

/**
 * @package elemental
 */
class ElementalGridFieldDeleteAction extends GridFieldDeleteAction
{

    public function getColumnContent($gridField, $record, $columnName)
    {
        if (!$record->canDelete()) {
            return;
        }

        if ($record->canDelete() && $record->VirtualClones()->count() == 0) {
            $field = GridField_FormAction::create(
                $gridField,
                'DeleteRecord'.$record->ID,
                false,
                'deleterecord',
                array('RecordID' => $record->ID)
            )
                ->addExtraClass('action gridfield-button-delete btn--icon-md font-icon-trash-bin btn--no-text grid-field__icon-action form-group--no-label')
                ->setAttribute('title', _t('GridAction.Delete', 'Delete'))
                ->setDescription(_t('GridAction.DELETE_DESCRIPTION', 'Delete'));
            return $field->Field();
        }
    }
}
