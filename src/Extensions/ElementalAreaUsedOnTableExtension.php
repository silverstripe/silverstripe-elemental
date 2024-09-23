<?php

namespace DNADesign\Elemental\Extensions;

use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\ORM\DataObject;
use SilverStripe\Core\Validation\ValidationException;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\Admin\Forms\UsedOnTable;
use SilverStripe\Core\Extension;

/**
 * @extends Extension<UsedOnTable>
 */
class ElementalAreaUsedOnTableExtension extends Extension
{
    /**
     * Hides ElementalArea's from the "Used On" tab when viewing files
     *
     * @var array $excludedClasses
     */
    protected function updateUsageExcludedClasses(array &$excludedClasses)
    {
        $excludedClasses[] = ElementalArea::class;
    }

    /**
     * Exclude content blocks that aren't linked to a page
     *
     * @param bool $excludeDataObject
     * @param DataObject $dataObject|null
     */
    protected function updateUsageDataObject(?DataObject &$dataObject)
    {
        if (!($dataObject instanceof BaseElement)) {
            return;
        }
        try {
            if (!$dataObject->getPage()) {
                $dataObject = null;
            }
        } catch (ValidationException $e) {
            $dataObject = null;
        }
    }

    /**
     * Link BaseElement's to their parent page
     *
     * @param array $ancestorDataObjects
     * @param DataObject $dataObject
     */
    protected function updateUsageAncestorDataObjects(array &$ancestorDataObjects, DataObject $dataObject)
    {
        if (!($dataObject instanceof BaseElement)) {
            return;
        }
        try {
            // BaseElement::getPage() caches results so there's no performance decrease from
            // also calling it in updateUsageExcludeDataObject()
            if ($page = $dataObject->getPage()) {
                $ancestorDataObjects[] = $page;
            }
        } catch (ValidationException $e) {
        }
    }
}
