<?php

namespace DNADesign\Elemental\Services;

use DNADesign\Elemental\Models\BaseElement;
use InvalidArgumentException;
use SilverStripe\Core\Convert;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\Queries\SQLUpdate;
use SilverStripe\Versioned\Versioned;

class ReorderElements
{
    /**
     * @var BaseElement
     */
    protected $element;

    /**
     * Create reordering service for specified Element
     *
     * @param BaseElement $element
     */
    public function __construct(BaseElement $element)
    {
        if (!($element instanceof BaseElement)) {
            throw new InvalidArgumentException(sprintf(
                'Invalid %s passed to %s, got class %s instead',
                BaseElement::class,
                __CLASS__,
                get_class($element)
            ));
        }

        $this->setElement($element);
    }

    /**
     * Get the Element reordering will be performed on
     *
     * @return BaseElement
     */
    public function getElement()
    {
        return $this->element;
    }

    /**
     * Set the Element instance to perform reordering on
     *
     * @param BaseElement $element
     * @return $this
     */
    public function setElement(BaseElement $element)
    {
        $this->element = $element;
        return $this;
    }

    /**
     * Set the ordering of Elements in relation to sibling Elements in the parent {@see ElementalArea}
     *
     * @param int $elementToBeAfterID ID of the Element to be ordered after
     */
    public function reorder($elementToBeAfterID = 0)
    {
        $element = $this->element;
        $parentId = $element->ParentID;
        $currentPosition = (int) $element->Sort;
        $sortAfterPosition = 0;

        if ($elementToBeAfterID) {
            /** @var BaseElement $afterBlock */
            $afterElement = BaseElement::get()->byID($elementToBeAfterID);

            if (!$afterElement) {
                throw new InvalidArgumentException(sprintf(
                    '%s#%s not found',
                    BaseElement::class,
                    $elementToBeAfterID
                ));
            }

            // Must be weak comparison as sometimes integers are returned from the DB as strings
            if ($afterElement->ParentID != $parentId) {
                throw new InvalidArgumentException(
                    'Trying to sort element to be placed after an element from a different elemental area'
                );
            }

            $sortAfterPosition = (int) $afterElement->Sort;
        }

        // We are updating records with SQL queries to avoid the ORM triggering the creation of new versions
        // for each element that is affected by this reordering.
        $baseTableName = Convert::raw2sql(DataObject::getSchema()->tableName(BaseElement::class));

        // Update both the draft and live versions of the records
        $tableNames = [$baseTableName];
        if (BaseElement::has_extension(Versioned::class)) {
            /** @var BaseElement&Versioned $element */
            $tableNames[] = $element->stageTable($baseTableName, Versioned::LIVE);
        }

        foreach ($tableNames as $tableName) {
            $tableName = sprintf('"%s"', $tableName);

            if ($sortAfterPosition < $currentPosition) {
                $operator = '+';
                $filter = "$tableName.\"Sort\" > $sortAfterPosition AND $tableName.\"Sort\" < $currentPosition";
                $newBlockPosition = $sortAfterPosition + 1;
            } else {
                $operator = '-';
                $filter = "$tableName.\"Sort\" <= $sortAfterPosition AND $tableName.\"Sort\" > $currentPosition";
                $newBlockPosition = $sortAfterPosition;
            }

            $query = SQLUpdate::create()
                ->setTable("$tableName")
                ->assignSQL('"Sort"', "$tableName.\"Sort\" $operator 1")
                ->addWhere([$filter, "$tableName.\"ParentID\"" => $parentId]);

            $query->execute();
        }

        // Now use the ORM to write a new version of the record that we are directly reordering
        $element->Sort = $newBlockPosition;
        $element->write();

        return $element;
    }
}
