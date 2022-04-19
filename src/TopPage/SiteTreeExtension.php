<?php

namespace DNADesign\Elemental\TopPage;

use DNADesign\Elemental\Extensions\ElementalPageExtension;
use DNADesign\Elemental\Models\ElementalArea;
use Page;
use SilverStripe\CMS\Model\SiteTreeExtension as BaseSiteTreeExtension;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\ValidationException;

/**
 * Class SiteTreeExtension
 *
 * This extension must be present on pagetypes that need to support Elemental TopPage functionality.
 * It can be applied directly to Page, as it only takes effect in the presence of a ElementalArea.
 *
 * @property Page|$this $owner
 * @package DNADesign\Elemental\TopPage
 */
class SiteTreeExtension extends BaseSiteTreeExtension
{
    /**
     * List of pages currently undergoing duplication
     *
     * @var array
     */
    protected $duplicatedPages = [];

    /**
     * List of objects that need to udate their top page reference
     *
     * @var array
     */
    protected $duplicatedObjects = [];

    /**
     * Extension point in @see DataObject::onAfterWrite()
     *
     * @throws ValidationException
     */
    public function onAfterWrite(): void
    {
        $this->setTopPageForElementalArea();
        $this->processDuplicationFromOriginal();
    }

    /**
     * Extension point in @see DataObject::duplicate()
     *
     * @param Page $original
     */
    public function onBeforeDuplicate(Page $original): void
    {
        $this->initDuplication($original);
    }

    /**
     * Extension point in @see DataObject::duplicate()
     *
     * @param Page $original
     * @param bool $doWrite
     * @throws ValidationException
     */
    public function onAfterDuplicate(Page $original, $doWrite): void
    {
        $this->processDuplication($original, (bool) $doWrite);
    }

    /**
     * Generates a unique key for the page
     *
     * @return string|null
     */
    public function getDuplicationKey(): ?string
    {
        $owner = $this->owner;

        if (!$owner->isInDB()) {
            return null;
        }

        return sprintf('%s-%d', $owner->ClassName, $owner->ID);
    }

    /**
     * Registers the given object to receive an updated TopPage reference after the duplication
     * operation completes, ensuring the new Page is written to the database beforehand.
     *
     * The registry uses a stack-like structure to allow accurate tracking of objects during
     * duplication operations that include nested pages.
     *
     * @param DataObject $object
     */
    public function addDuplicatedObject(DataObject $object): void
    {
        if (!$object->hasExtension(DataExtension::class)) {
            return;
        }

        $key = $this->getDuplicatedPageKey();

        if ($key === null) {
            return;
        }

        if (array_key_exists($key, $this->duplicatedObjects ?? [])) {
            array_unshift($this->duplicatedObjects[$key], $object);

            return;
        }

        $this->duplicatedObjects[$key] = [$object];
    }

    /**
     * Find currently duplicated page
     * note: this doesn't change any stored data
     *
     * @return string|null
     */
    protected function getDuplicatedPageKey(): ?string
    {
        $pages = $this->duplicatedPages;

        if (count($pages ?? []) === 0) {
            return null;
        }

        return array_shift($pages);
    }

    /**
     * @param Page|SiteTreeExtension $original
     */
    protected function initDuplication(Page $original): void
    {
        /** @var DataExtension $extension */
        $extension = singleton(DataExtension::class);

        if (!$extension->getTopPageUpdate()) {
            return;
        }

        $key = $original->getDuplicationKey();

        if ($key === null) {
            return;
        }

        if (in_array($key, $this->duplicatedPages ?? [])) {
            // this should never happen as it would indicate a duplication loop
            return;
        }

        array_unshift($this->duplicatedPages, $key);
    }

    /**
     * Update top page reference during duplication process
     *
     * @param Page $original
     * @param bool $written
     * @throws ValidationException
     */
    protected function processDuplication(Page $original, bool $written): void
    {
        /** @var DataExtension $extension */
        $extension = singleton(DataExtension::class);

        if (!$extension->getTopPageUpdate()) {
            return;
        }

        if ($written) {
            $this->writeDuplication($original);

            return;
        }

        // write may not be triggered as the page maybe have come up via relation
        // in this case we have to delay the processing until the page is written
        // store the origin reference on the object (in memory only) so we can pick it up later
        $this->owner->duplicationOriginal = $original;
    }

    /**
     * Relevant only for duplicated object that were not written at the time of duplication
     *
     * @throws ValidationException
     */
    protected function processDuplicationFromOriginal(): void
    {
        /** @var DataExtension $extension */
        $extension = singleton(DataExtension::class);

        if (!$extension->getTopPageUpdate()) {
            return;
        }

        $owner = $this->owner;

        if (!isset($owner->duplicationOriginal)) {
            return;
        }

        $original = $owner->duplicationOriginal;

        if (!$original instanceof Page) {
            return;
        }

        unset($owner->duplicationOriginal);
        $this->writeDuplication($original);
    }

    /**
     * @param Page|SiteTreeExtension $original
     * @throws ValidationException
     */
    protected function writeDuplication(Page $original): void
    {
        $key = $original->getDuplicationKey();
        $currentKey = $this->getDuplicatedPageKey();

        if ($key !== $currentKey) {
            // should never happen but it indicates that the nesting hierarchy was incorrect
            return;
        }

        if (array_key_exists($key, $this->duplicatedObjects ?? [])) {
            $objects = $this->duplicatedObjects[$key];

            /** @var DataObject|DataExtension $object */
            foreach ($objects as $object) {
                // attach current page ID to the object
                $object->setTopPage($this->owner);
            }
        }

        // mark page as processed
        array_shift($this->duplicatedPages);
    }

    /**
     * Elemental area is created before related page is written so we have to set top page explicitly
     * after page is written and the relations are available
     *
     * @throws ValidationException
     */
    protected function setTopPageForElementalArea(): void
    {
        /** @var DataExtension $extension */
        $extension = singleton(DataExtension::class);

        if (!$extension->getTopPageUpdate()) {
            return;
        }

        /** @var Page|ElementalPageExtension $owner */
        $owner = $this->owner;

        if (!$owner->hasExtension(ElementalPageExtension::class)) {
            return;
        }

        if (!$owner->ElementalAreaID) {
            return;
        }

        /** @var ElementalArea|DataExtension $area */
        $area = $owner->ElementalArea();

        if (!$area->exists()) {
            return;
        }

        if (!$area->hasExtension(DataExtension::class)) {
            return;
        }

        $area->setTopPage($owner);
    }
}
