<?php

namespace DNADesign\Elemental\TopPage;

use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementalArea;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Core\ClassInfo;
use SilverStripe\ORM\DataExtension as BaseDataExtension;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\Queries\SQLUpdate;
use SilverStripe\ORM\ValidationException;
use SilverStripe\View\ViewableData;
use SilverStripe\Forms\FieldList;

/**
 * Class DataExtension
 *
 * Provides a db-cached reference to the top-level page for improved read performance on projects
 * with deeply nested block structures. Apply to @see BaseElement and @see ElementalArea.
 *
 * @property int $TopPageID
 * @method SiteTree TopPage()
 *
 * @extends BaseDataExtension<BaseElement|ElementalArea|static>
 */
class DataExtension extends BaseDataExtension
{
    /**
     * @config
     * @var array
     */
    private static $has_one = [
        'TopPage' => SiteTree::class,
    ];

    /**
     * @config
     * @var array
     */
    private static $indexes = [
        'TopPageID' => true,
    ];

    /**
     * Global flag which indicates that automatic page determination is enabled or not
     * If this is set to a page ID it will be used instead of trying to determine the top page
     *
     * @see DataExtension::withFixedTopPage()
     * @var int
     */
    private $fixedTopPageID = 0;

    /**
     * Extension point in @see DataObject::onAfterWrite()
     *
     * @throws ValidationException
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
     * Finds the top-level SiteTree object for a Block / ElementalArea, using the cached TopPageID
     * reference when possible.
     *
     * @return SiteTree|null
     * @throws ValidationException
     */
    public function getTopPage(): ?SiteTree
    {
        $list = [$this->owner];

        while (count($list ?? []) > 0) {
            $item = array_shift($list);

            if (!$item->exists()) {
                continue;
            }

            if ($item instanceof SiteTree) {
                // trivial case
                return $item;
            }

            if ($item->hasExtension(DataExtension::class) && $item->TopPageID > 0) {
                // top page is stored inside data object - just fetch it via cached call
                $page = $this->getTopPageFromCachedData((int) $item->TopPageID);

                if ($page) {
                    return $page;
                }
            }

            if ($item instanceof BaseElement) {
                // parent lookup via block
                $parent = $item->Parent();

                if ($parent !== null) {
                    array_push($list, $parent);
                }

                continue;
            }

            if ($item instanceof ElementalArea) {
                // parent lookup via elemental area
                $parent = $item->getOwnerPage();

                if ($parent !== null) {
                    array_push($list, $parent);
                }

                continue;
            }
        }

        return null;
    }

    /**
     * Set top page to an object
     * If no page is provided as an argument nor as a fixed id via @see DataExtension::withFixedTopPage()
     * automatic page determination will be attempted
     * Note that this may not always succeed as your model may not be attached to parent object at the time of this call
     *
     * @param SiteTree|null $page
     * @throws ValidationException
     */
    public function setTopPage(?SiteTree $page = null): void
    {
        $owner = $this->owner;

        if (!$owner->hasExtension(DataExtension::class)) {
            return;
        }

        if ($owner->TopPageID > 0) {
            return;
        }

        if ($this->getFixedTopPageID() > 0) {
            $this->assignFixedTopPage();
            $this->saveChanges();

            return;
        }

        $page = $page ?? $owner->getTopPage();

        if ($page === null) {
            return;
        }

        // set the page to properties in case this object is re-used later
        $this->assignTopPage($page);
        $this->saveChanges();
    }

    /**
     * Use this to wrap any code which is supposed to run with fixed top page
     * Useful when top page is known upfront and doesn't need to be determined
     * For example: model duplication where parent is assigned and saved only after the duplication is done
     * It's not possible to determine top page in such case however it might be possible to know the top page
     * even before the operation starts from the specific context
     * Setting the page id to 0 disables this feature
     *
     * @param int $topPageID
     * @param callable $callback
     * @return mixed
     */
    public function withFixedTopPage(int $topPageID, callable $callback)
    {
        $original = $this->fixedTopPageID;
        $this->fixedTopPageID = $topPageID;

        try {
            return $callback();
        } finally {
            $this->fixedTopPageID = $original;
        }
    }

    public function updateCMSFields(FieldList $fields)
    {
        $fields->removeByName('TopPageID');
    }

    /**
     * Get the ID of a page which is currently set as the fixed top page
     *
     * @return int
     */
    protected function getFixedTopPageID(): int
    {
        return $this->fixedTopPageID;
    }

    /**
     * Registers the object for a TopPage update. Ensures that this operation is deferred to a point
     * when all required relations have been written.
     */
    protected function updateTopPage(): void
    {
        $extension = singleton(SiteTreeExtension::class);
        $extension->addDuplicatedObject($this->owner);
    }

    /**
     * Assigns top page relation
     *
     * @param SiteTree $page
     */
    protected function assignTopPage(SiteTree $page): void
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

    /**
     * Assigns top page relation based on fixed id
     *
     * @see DataExtension::withFixedTopPage()
     */
    protected function assignFixedTopPage(): void
    {
        $this->owner->TopPageID = $this->getFixedTopPageID();
    }

    /**
     * Save top page changes without using write()
     * Using raw query here because:
     * - this is already called during write() and triggering more write() related extension points is undesirable
     * - we don't want to create a new version if object is versioned
     * - using writeWithoutVersion() produces some weird edge cases were data is not written
     * because the fields are not recognised as changed (using forceChange() introduces a new set of issues)
     *
     * @param array $extraData
     */
    protected function saveChanges(array $extraData = []): void
    {
        $owner = $this->owner;
        $table = $this->getTopPageTable();

        if (!$table) {
            return;
        }

        $updates = array_merge(
            [
                '"TopPageID"' => $owner->TopPageID,
            ],
            $extraData
        );

        $query = SQLUpdate::create(
            sprintf('"%s"', $table),
            $updates,
            ['"ID"' => $owner->ID]
        );

        $query->execute();
    }

    /**
     * Perform a page lookup based on cached data
     * This function allows more extensibility as it can be fully overridden unlike an extension point
     * Various projects may decide to alter this by injecting features like tracking, feature flags
     * and even completely different data lookups
     * This is a performance driven functionality so extension points are not great as they only allow adding
     * features on top of existing ones not replacing them
     *
     * @param int $id
     * @return SiteTree|null
     */
    protected function getTopPageFromCachedData(int $id): ?SiteTree
    {
        $page = SiteTree::get_by_id($id);

        if (!$page || !$page->exists()) {
            return null;
        }

        return $page;
    }

    /**
     * Find table name which has the top page fields
     *
     * @return string
     */
    protected function getTopPageTable(): string
    {
        // Classes are ordered from generic to specific, top-down, left-right
        $classes = ClassInfo::dataClassesFor($this->owner);

        // Find the first ancestor table which has the extension applied
        // Note that this extension is expected to be subclassed
        foreach ($classes as $class) {
            if (!ViewableData::has_extension($class, static::class)) {
                continue;
            }

            return DataObject::getSchema()->tableName($class);
        }

        return '';
    }
}
