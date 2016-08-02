<?php

/**
 * @package elemental
 */
class ElementalGridFieldDeleteAction extends GridFieldDeleteAction {

    public function getColumnContent($gridField, $record, $columnName) {
        if(!$record->canEdit()) return;

        $field = new CompositeField();

		if(!$record instanceof ElementVirtualLinked) {
          $field->push(GridField_FormAction::create($gridField, 'UnlinkRelation'.$record->ID, false,
                      "unlinkrelation", array('RecordID' => $record->ID))
              ->addExtraClass('gridfield-button-unlink')
              ->setAttribute('title', _t('GridAction.UnlinkRelation', "Unlink"))
              ->setAttribute('data-icon', 'chain--minus')
          );
		}


        if($record->canDelete() && $record->VirtualClones()->count() == 0) {
            $field->push(GridField_FormAction::create($gridField,  'DeleteRecord'.$record->ID, false, "deleterecord",
                    array('RecordID' => $record->ID))
                ->addExtraClass('gridfield-button-delete')
                ->setAttribute('title', _t('GridAction.Delete', "Delete"))
                ->setAttribute('data-icon', 'cross-circle')
                ->setDescription(_t('GridAction.DELETE_DESCRIPTION','Delete'))
            );
        }

        return $field->Field();
    }
}
