<?php

namespace DNADesign\Elemental\Forms;

use SilverStripe\Forms\GridField\GridFieldDeleteAction;
use SilverStripe\Forms\GridField\GridField_FormAction;

/**
 * @package elemental
 */
class ElementalGridFieldUnlinkAction extends GridFieldDeleteAction
{

    public function getColumnContent($gridField, $record, $columnName)
    {
        if (!$record->canDelete()) {
            return;
        }

        if (!$record instanceof ElementVirtualLinked) {
            $field = GridField_FormAction::create(
                $gridField,
                'UnlinkRelation'.$record->ID,
                false,
                'unlinkrelation',
                array('RecordID' => $record->ID)
            )
                ->addExtraClass('gridfield-button-unlink')
                ->setAttribute('title', _t('GridAction.UnlinkRelation', 'Unlink'))
                ->setAttribute('data-icon', 'chain--minus');

            return $field->Field();
        }
    }
}
