<?php

namespace DNADesign\Elemental;

use GridFieldAddExistingAutocompleter;
use GridField;
use SS_List;
use Convert;
use DataObject;
use ElementVirtualLinked;

/**
 * This class is is responsible for adding objects to another object's has_many
 * and many_many relation, as defined by the {@link RelationList} passed to the
 * {@link GridField} constructor.
 *
 * Objects can be searched through an input field (partially matching one or
 * more fields).
 *
 * Selecting from the results will add the object to the relation.
 *
 * Often used alongside {@link GridFieldDeleteAction} for detaching existing
 * records from a relationship.
 *
 * For easier setup, have a look at a sample configuration in
 * {@link GridFieldConfig_RelationEditor}.
 *
 * @package forms
 * @subpackage fields-gridfield
 */
class ElementalGridFieldAddExistingAutocompleter extends GridFieldAddExistingAutocompleter {

    /**
     * If an object ID is set, add the object to the list
     *
     * @param GridField $gridField
     * @param SS_List $dataList
     * @return SS_List
     */
    public function getManipulatedData(GridField $gridField, SS_List $dataList)
    {

        if(!$gridField->State->GridFieldAddRelation) {
            return $dataList;
        }

        $objectID = Convert::raw2sql($gridField->State->GridFieldAddRelation);

        if($objectID) {
            $object = DataObject::get_by_id($dataList->dataclass(), $objectID);

            if($object) {
                // if the object is currently not linked to either a page or another list then we want to link to
                // the original, otherwise link to a clone
                if(!$object->ParentID && !$object->ListID) {
                    $dataList->add($object);
                } else {
                    $virtual = new ElementVirtualLinked();
                    $virtual->LinkedElementID = $object->ID;
                    $virtual->write();

                    $dataList->add($virtual);
                }
            }
        }

        $gridField->State->GridFieldAddRelation = null;

        return $dataList;
    }
}
