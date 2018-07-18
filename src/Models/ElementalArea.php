<?php

namespace DNADesign\Elemental\Models;

use DNADesign\Elemental\Extensions\ElementalAreasExtension;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Core\ClassInfo;
use SilverStripe\Core\Extensible;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\ORM\ArrayList;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\FieldType\DBField;
use SilverStripe\ORM\FieldType\DBHTMLText;
use SilverStripe\ORM\HasManyList;
use SilverStripe\ORM\UnsavedRelationList;
use SilverStripe\Versioned\Versioned;

/**
 * Class ElementalArea
 * @package DNADesign\Elemental\Models
 *
 * @property string $OwnerClassName
 *
 * @method HasManyList|BaseElement[] Elements()
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
     * @return array
     */
    public function supportedPageTypes()
    {
        $elementalClasses = [];

        foreach (ClassInfo::getValidSubClasses(SiteTree::class) as $class) {
            if (Extensible::has_extension($class, ElementalAreasExtension::class)) {
                $elementalClasses[] = $class;
            }
        }

        return $elementalClasses;
    }

    /**
     * @return DBHTMLText
     */
    public function forTemplate()
    {
        return $this->renderWith(static::class);
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
                $owner->CMSEditLink(),
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
     * @return ArrayList
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

        return $controllers;
    }

    /**
     * @return null|DataObject
     * @throws \Psr\Container\NotFoundExceptionInterface
     * @throws \SilverStripe\ORM\ValidationException
     */
    public function getOwnerPage()
    {
        if ($this->OwnerClassName) {
            $class = $this->OwnerClassName;
            $instance = Injector::inst()->get($class);
            if (!ClassInfo::hasMethod($instance, 'getElementalRelations')) {
                return null;
            }
            $elementalAreaRelations = $instance->getElementalRelations();

            foreach ($elementalAreaRelations as $eaRelationship) {
                $areaID = $eaRelationship . 'ID';

                $currentStage = Versioned::get_stage() ?: Versioned::DRAFT;
                $page = Versioned::get_by_stage($class, $currentStage)->filter($areaID, $this->ID);


                if ($page && $page->exists()) {
                    return $page->first();
                }
            }
        }

        foreach ($this->supportedPageTypes() as $class) {
            $instance = Injector::inst()->get($class);
            if (!ClassInfo::hasMethod($instance, 'getElementalRelations')) {
                return null;
            }
            $elementalAreaRelations = $instance->getElementalRelations();

            foreach ($elementalAreaRelations as $eaRelationship) {
                $areaID = $eaRelationship . 'ID';
                $page = Versioned::get_by_stage($class, Versioned::DRAFT)->filter($areaID, $this->ID);

                if ($page && $page->exists()) {
                    if ($this->OwnerClassName !== $class) {
                        $this->OwnerClassName = $class;
                        $this->write();
                    }

                    return $page->first();
                }
            }
        }

        return null;
    }

    /**
     * @param null $member
     * @return bool
     * @throws \Psr\Container\NotFoundExceptionInterface
     * @throws \SilverStripe\ORM\ValidationException
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
     * @throws \SilverStripe\ORM\ValidationException
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
