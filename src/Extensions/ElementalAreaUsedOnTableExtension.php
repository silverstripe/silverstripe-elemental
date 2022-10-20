<?php

namespace DNADesign\Elemental\Extensions;

use SilverStripe\Dev\Deprecation;
use SilverStripe\Admin\Forms\UsedOnTable;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\ORM\DataExtension;
use SilverStripe\ORM\ArrayList;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\ValidationException;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Models\BaseElement;

class ElementalAreaUsedOnTableExtension extends DataExtension
{

    /**
     * Hides ElementalArea's from the "Used On" tab when viewing files
     *
     * @var array $excludedClasses
     */
    public function updateUsageExcludedClasses(array &$excludedClasses)
    {
        $excludedClasses[] = ElementalArea::class;
    }

    /**
     * Legacy function kept for semver, replaced with updateUsageExcludedClasses above
     *
     * @return void
     * @var ArrayList $usage
     * @var DataObject $record
     * @see UsedOnTable::updateUsage
     * @deprecated 4.5.0 Use updateUsageExcludedClasses() instead
     */
    public function updateUsage(ArrayList &$usage, DataObject &$record)
    {
        Deprecation::notice('4.5.0', 'Use updateUsageExcludedClasses() instead');
        // noop
    }

    /**
     * Exclude content blocks that aren't linked to a page
     *
     * @param bool $excludeDataObject
     * @param DataObject $dataObject|null
     */
    public function updateUsageDataObject(?DataObject &$dataObject)
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
    public function updateUsageAncestorDataObjects(array &$ancestorDataObjects, DataObject $dataObject)
    {
        if (!($dataObject instanceof BaseElement)) {
            return;
        }
        try {
            // BaseElement::getPage() caches results so there's no performance decrease from
            // also calling it in updateUsageExcludeDataObject()
            /** @var SiteTree $page */
            if ($page = $dataObject->getPage()) {
                $ancestorDataObjects[] = $page;
            }
        } catch (ValidationException $e) {
        }
    }
}
