<?php

namespace DNADesign\Elemental\Forms;

use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\CompositeField;
use SilverStripe\Forms\FieldGroup;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TabSet;
use SilverStripe\Forms\ReadonlyTransformation;

class ElementalAreaField extends GridField
{
    public function performReadonlyTransformation()
    {
        $readOnlyField = $this->castedCopy(CompositeField::class);
        
        $blockReducer = function ($element) {
            $parentName = 'Element' . $element->ID;
            $elementFields = $element->getCMSFields();
            // Obtain highest impact fields for a summary (e.g. Title & Content)
            foreach ($elementFields as $field) {
                if (is_object($field) && $field instanceof TabSet) {
                    // Assign the fields of the first Tab in the TabSet - most regularly 'Root.Main'
                    $elementFields = $field->FieldList()->first()->FieldList();
                    break;
                }
            }
            // Set values (before names don't match anymore)
            $elementFields->setValues($element->getQueriedDatabaseFields());
            // Ensure field names are unique between elements on parent form
            $elementFields->recursiveWalk(function ($field) use ($parentName) {
                $field->setName($parentName . '_' . $field->getName());
            });
            // Combine into an appropriately named group
            $elementGroup = FieldGroup::create($elementFields);
            $elementGroup->setName($parentName);
            $elementGroup->addExtraClass('elementalarea-element');
            // Also set the important data for the rendering Component
            // $elementGroup->setSchemaComponent('HistoricElementView');
            $elementGroup->setSchemaData([
                'data' => [
                    'ElementID' => $element->ID,
                    'ElementType' => $element->getType(),
					'ElementIcon' => $element->config()->icon,
                    'ElementTitle' => $element->Title,
					'ElementEditLink' => 'admin/',
					'extraContext' => 'HistoricElementView'
                ]
            ]);
            
            return $elementGroup;
        };
        
        $readOnlyField->setChildren(
            FieldList::create(
                array_map($blockReducer, $this->getList()->toArray())
            )
        );
        $readOnlyField = $readOnlyField->transform(new ReadonlyTransformation());
        $readOnlyField->setReadOnly(true);
        $readOnlyField->setName($this->getName());
        $readOnlyField->addExtraClass('elementalarea--read-only');
        return $readOnlyField;
    }
}
