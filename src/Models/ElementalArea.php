<?php

namespace DNADesign\Elemental\Models;

use DNADesign\Elemental\Controllers\ElementController;
use DNADesign\Elemental\Extensions\ElementalAreasExtension;
use DNADesign\Elemental\Extensions\TopPageElementExtension;
use SilverStripe\Core\ClassInfo;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Dev\TestOnly;
use SilverStripe\Model\List\ArrayList;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\FieldType\DBField;
use SilverStripe\ORM\FieldType\DBHTMLText;
use SilverStripe\ORM\HasManyList;
use SilverStripe\ORM\UnsavedRelationList;
use SilverStripe\Versioned\Versioned;
use SilverStripe\Model\ModelData;

/**
 * Class ElementalArea
 * @package DNADesign\Elemental\Models
 *
 * @property string $OwnerClassName
 *
 * @mixin Versioned
 */
class ElementalArea extends DataObject
{
    private static $db = [
        'OwnerClassName' => 'Varchar(255)',
    ];

    private static $has_many = [
        'Elements' => BaseElement::class,
    ];

    private static $extensions = [
        Versioned::class,
        TopPageElementExtension::class,
    ];

    private static $owns = [
        'Elements',
    ];

    private static $cascade_deletes = [
        'Elements',
    ];

    private static $cascade_duplicates = [
        'Elements',
    ];

    private static $summary_fields = [
        'Title' => 'Title',
    ];

    private static $table_name = 'ElementalArea';

    /**
     * Cache various data to improve CMS load time
     *
     * @internal
     * @var array
     */
    protected $cacheData = [];

    /**
     * @return array
     */
    public function supportedPageTypes()
    {
        $elementalClasses = [];

        foreach (ClassInfo::getValidSubClasses(DataObject::class) as $class) {
            if (ModelData::has_extension($class, ElementalAreasExtension::class)) {
                $elementalClasses[] = $class;
            }
        }

        return $elementalClasses;
    }

    public function forTemplate(): string
    {
        return $this->renderWith(static::class);
    }

    /**
     * @param ArrayList $elements
     * @return $this
     */
    public function setElementsCached(ArrayList $elements)
    {
        $this->cacheData['elements'] = $elements;

        return $this;
    }

    /**
     * @param DataObject $page
     * @return $this
     */
    public function setOwnerPageCached(DataObject $page)
    {
        $cacheKey = 'owner_page_'. Versioned::get_reading_mode();

        $this->cacheData[$cacheKey] = $page;

        return $this;
    }

    /**
     * A cache-aware accessor for the elements
     * @return HasManyList<BaseElement>
     */
    public function Elements()
    {
        if (isset($this->cacheData['elements'])) {
            return $this->cacheData['elements'];
        }

        return parent::Elements();
    }

    /**
     * Necessary to display results in CMS site search.
     *
     * @return DBField
     */
    public function Breadcrumbs()
    {
        $ownerClassName = $this->OwnerClassName;

        if ($owner = $ownerClassName::get()->filter('ElementalAreaID', $this->ID)->first()) {
            return DBField::create_field('HTMLText', sprintf(
                '<a href="%s">%s</a>',
                $owner->getCMSEditLink(),
                $owner->Title
            ));
        }

        return null;
    }

    /**
     * Used in template instead of {@link Elements()} to wrap each element in
     * its' controller, making it easier to access and process form logic and
     * actions stored in {@link ElementController}.
     *
     * @return ArrayList<ElementController>
     * @throws \Exception
     */
    public function ElementControllers()
    {
        // Don't try and process unsaved lists
        if ($this->Elements() instanceof UnsavedRelationList) {
            return ArrayList::create();
        }

        $controllers = ArrayList::create();
        $items = $this->Elements()->filterByCallback(function (BaseElement $item) {
            return $item->canView();
        });

        if (!is_null($items)) {
            foreach ($items as $element) {
                $controller = $element->getController();
                $controllers->push($controller);
            }
        }

        $this->extend('updateElementControllers', $controllers);

        return $controllers;
    }

    /**
     * @return null|DataObject
     * @throws \Psr\Container\NotFoundExceptionInterface
     * @throws \SilverStripe\Core\Validation\ValidationException
     */
    public function getOwnerPage()
    {
        // You can't find the owner page of a area that hasn't been save yet
        if (!$this->isInDB()) {
            return null;
        }

        // Allow for repeated calls to read from cache
        $cacheKey = 'owner_page_'. Versioned::get_reading_mode();

        if (isset($this->cacheData[$cacheKey])) {
            return $this->cacheData[$cacheKey];
        }

        if ($this->OwnerClassName && ClassInfo::exists($this->OwnerClassName)) {
            $class = $this->OwnerClassName;
            $instance = Injector::inst()->get($class);
            if (!ClassInfo::hasMethod($instance, 'getElementalRelations')) {
                return null;
            }
            $elementalAreaRelations = $instance->getElementalRelations();

            foreach ($elementalAreaRelations as $eaRelationship) {
                $page = DataObject::get($class)->setUseCache(true)->filter([
                    $eaRelationship . 'ID' => $this->ID,
                    'ClassName' => $class,
                ])->first();

                if ($page) {
                    $this->setOwnerPageCached($page);

                    return $page;
                }
            }
        }

        foreach ($this->supportedPageTypes() as $class) {
            $instance = Injector::inst()->get($class);
            if (!ClassInfo::hasMethod($instance, 'getElementalRelations')) {
                return null;
            }

            $areaIDFilters = [];
            foreach ($instance->getElementalRelations() as $eaRelationship) {
                $areaIDFilters[$eaRelationship . 'ID'] = $this->ID;
            }

            try {
                $page = DataObject::get($class)->filterAny($areaIDFilters)->first();
            } catch (\Exception $ex) {
                // Usually this is catching cases where test stubs from other modules are trying to be loaded
                // and failing in unit tests.
                if (in_array(TestOnly::class, class_implements($class))) {
                    continue;
                }
                // Continue as normal...
                throw $ex;
            }

            if ($page) {
                if ($this->OwnerClassName !== $class) {
                    $this->OwnerClassName = $class;

                    // Avoid recursion: only write if it's already in the database
                    if ($this->isInDB()) {
                        $this->write();
                    }
                }

                $this->setOwnerPageCached($page);

                return $page;
            }
        }

        return null;
    }

    /**
     * @param null $member
     * @return bool
     * @throws \Psr\Container\NotFoundExceptionInterface
     * @throws \SilverStripe\Core\Validation\ValidationException
     */
    public function canEdit($member = null)
    {
        if (parent::canEdit($member)) {
            return true;
        }

        $ownerPage = $this->getOwnerPage();
        if ($ownerPage !== null) {
            return $this->getOwnerPage()->canEdit($member);
        }

        return false;
    }

    /**
     * @param null $member
     * @return bool
     * @throws \Psr\Container\NotFoundExceptionInterface
     * @throws \SilverStripe\Core\Validation\ValidationException
     */
    public function canView($member = null)
    {
        if (parent::canEdit($member)) {
            return true;
        }

        $ownerPage = $this->getOwnerPage();
        if ($ownerPage !== null) {
            return $this->getOwnerPage()->canView($member);
        }

        return false;
    }
}
