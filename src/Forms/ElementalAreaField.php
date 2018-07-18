<?php

namespace DNADesign\Elemental\Forms;

use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\Forms\CompositeField;
use SilverStripe\Forms\FieldGroup;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\TabSet;

class ElementalAreaField extends GridField
{
    /**
     * A getter method that seems redundant in that it is a function that returns a function,
     * however the returned closure is used in an array map function to return a complete FieldList
     * representing a read only view of the element passed in (to the closure).
     *
     * @return callable
     */
    protected function getReadOnlyBlockReducer()
    {
        return function (BaseElement $element) {
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
            $elementGroup->setForm($this->getForm());
            $elementGroup->setName($parentName);
            $elementGroup->addExtraClass('elemental-area__element--historic');

            // Also set the important data for the rendering Component
            $elementGroup->setSchemaData([
                'data' => [
                    'ElementID' => $element->ID,
                    'ElementType' => $element->getType(),
                    'ElementIcon' => $element->config()->icon,
                    'ElementTitle' => $element->Title,
                    // @todo: Change this to block history permalink when that functionality becomes available.
                    'ElementEditLink' => $element->CMSEditLink()
                ]
            ]);

            return $elementGroup;
        };
    }

    /**
     * Provides a readonly representation of the GridField (superclass) Uses a reducer
     * {@see ElementalAreaField::getReadOnlyBlockReducer()} to fetch a read only representation of the listed class
     * {@see GridField::getModelClass()}
     *
     * @return CompositeField
     */
    public function performReadonlyTransformation()
    {
        /** @var CompositeField $readOnlyField */
        $readOnlyField = $this->castedCopy(CompositeField::class);
        $blockReducer = $this->getReadOnlyBlockReducer();
        $readOnlyField->setChildren(
            FieldList::create(array_map($blockReducer, $this->getList()->toArray()))
        );

        $readOnlyField = $readOnlyField->performReadonlyTransformation();
        return $readOnlyField
            ->setReadOnly(true)
            ->setName($this->getName())
            ->addExtraClass('elemental-area--read-only');
    }
}
