<?php

/**
 * @package elemental
 */
class ElementalGridFieldDeleteAction extends GridFieldDeleteAction {

    public function getColumnContent($gridField, $record, $columnName) {
        if($record instanceof ElementVirtualLinked || $record->VirtualClones()->count() > 0) {
            if(!$record->canEdit()) return;

            $field = GridField_FormAction::create($gridField, 'UnlinkRelation'.$record->ID, false,
                    "unlinkrelation", array('RecordID' => $record->ID))
                ->addExtraClass('gridfield-button-unlink')
                ->setAttribute('title', _t('GridAction.UnlinkRelation', "Unlink"))
                ->setAttribute('data-icon', 'chain--minus');
        } else {
            if(!$record->canDelete()) return;

            $field = GridField_FormAction::create($gridField,  'DeleteRecord'.$record->ID, false, "deleterecord",
                    array('RecordID' => $record->ID))
                ->addExtraClass('gridfield-button-delete')
                ->setAttribute('title', _t('GridAction.Delete', "Delete"))
                ->setAttribute('data-icon', 'cross-circle')
                ->setDescription(_t('GridAction.DELETE_DESCRIPTION','Delete'));
        }

        return $field->Field();
    }
}
