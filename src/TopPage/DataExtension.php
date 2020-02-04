<?php

namespace DNADesign\Elemental\TopPage;

use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementalArea;
use Page;
use SilverStripe\ORM\DataExtension as BaseDataExtension;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\ValidationException;
use SilverStripe\Versioned\Versioned;

/**
 * Class DataExtension
 *
 * Provides a db-cached reference to the top-level page for improved read performance on projects
 * with deeply nested block structures. Apply to @see BaseElement and @see ElementalArea.
 *
 * @property int $TopPageID
 * @method Page TopPage()
 * @property BaseElement|ElementalArea|$this $owner
 * @package DNADesign\Elemental\TopPage
 */
class DataExtension extends BaseDataExtension
{
    /**
     * @config
     * @var array
     */
    private static $has_one = [
        'TopPage' => Page::class,
    ];

    /**
     * @config
     * @var array
     */
    private static $indexes = [
        'TopPageID' => true,
    ];

    /**
     * @var bool
     */
    private $topPageUpdate = true;

    /**
     * Extension point in @see DataObject::onAfterWrite()
     */
    public function onAfterWrite(): void
    {
        $this->setTopPage();
    }

    /**
     * Extension point in @see DataObject::duplicate()
     */
    public function onBeforeDuplicate(): void
    {
        $this->clearTopPage();
    }

    /**
     * Extension point in @see DataObject::duplicate()
     */
    public function onAfterDuplicate(): void
    {
        $this->updateTopPage();
    }

    /**
     * Finds the top-level Page object for a Block / ElementalArea, using the cached TopPageID
     * reference when possible.
     *
     * @return Page|null
     * @throws ValidationException
     */
    public function getTopPage(): ?Page
    {
        $list = [$this->owner];

        while (count($list) > 0) {
            /** @var DataObject|DataExtension $item */
            $item = array_shift($list);

            if ($item instanceof Page) {
                // trivial case
                return $item;
            }

            if ($item->hasExtension(DataExtension::class) && $item->TopPageID > 0) {
                // top page is stored inside data object - just fetch it via cached call
                $page = Page::get_by_id($item->TopPageID);

                if ($page !== null && $page->exists()) {
                    return $page;
                }
            }

            if ($item instanceof BaseElement) {
                // parent lookup via block
                $parent = $item->Parent();

                if ($parent !== null && $parent->exists()) {
                    array_push($list, $parent);
                }

                continue;
            }

            if ($item instanceof ElementalArea) {
                // parent lookup via elemental area
                $parent = $item->getOwnerPage();

                if ($parent !== null && $parent->exists()) {
                    array_push($list, $parent);
                }

                continue;
            }
        }

        return null;
    }

    /**
     * @param Page|null $page
     * @throws ValidationException
     */
    public function setTopPage(?Page $page = null): void
    {
        if (!$this->topPageUpdate) {
            return;
        }

        /** @var BaseElement|ElementalArea|Versioned|DataExtension $owner */
        $owner = $this->owner;

        if (!$owner->hasExtension(DataExtension::class)) {
            return;
        }

        if ($owner->TopPageID > 0) {
            return;
        }

        $page = $page ?? $owner->getTopPage();

        if ($page === null) {
            return;
        }

        // set the page to properties in case this object is re-used later
        $this->assignTopPage($page);

        if ($owner->hasExtension(Versioned::class)) {
            $owner->writeWithoutVersion();

            return;
        }

        $owner->write();
    }

    public function getTopPageUpdate(): bool
    {
        return $this->topPageUpdate;
    }

    /**
     * Enable top page update
     * useful for unit tests
     */
    public function enableTopPageUpdate(): void
    {
        $this->topPageUpdate = true;
    }

    /**
     * Disable top page update
     * useful for unit tests
     */
    public function disableTopPageUpdate(): void
    {
        $this->topPageUpdate = false;
    }

    /**
     * Use this to wrap any code which is supposed to run with desired top page update setting
     * useful for unit tests
     *
     * @param bool $update
     * @param callable $callback
     * @return mixed
     */
    public function withTopPageUpdate(bool $update, callable $callback)
    {
        $original = $this->topPageUpdate;
        $this->topPageUpdate = $update;

        try {
            return $callback();
        } finally {
            $this->topPageUpdate = $original;
        }
    }

    /**
     * Registers the object for a TopPage update. Ensures that this operation is deferred to a point
     * when all required relations have been written.
     */
    protected function updateTopPage(): void
    {
        if (!$this->topPageUpdate) {
            return;
        }

        /** @var SiteTreeExtension $extension */
        $extension = singleton(SiteTreeExtension::class);
        $extension->addDuplicatedObject($this->owner);
    }

    /**
     * Assigns top page relation
     *
     * @param Page $page
     */
    protected function assignTopPage(Page $page): void
    {
        $this->owner->TopPageID = (int) $page->ID;
    }

    /**
     * Clears top page relation, this is useful when duplicating object as the new object doesn't necessarily
     * belong to the original page
     */
    protected function clearTopPage(): void
    {
        $this->owner->TopPageID = 0;
    }
}
