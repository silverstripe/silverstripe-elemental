<?php

namespace DNADesign\Elemental\Models;

use SilverStripe\ORM\UnsavedRelationList;
use SilverStripe\Versioned\Versioned;
use SilverStripe\Core\ClassInfo;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\HasManyList;
use SilverStripe\ORM\ArrayList;
use SilverStripe\Core\Extensible;
use SilverStripe\CMS\Model\SiteTree;

use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Extensions\ElementalPageExtension;

/**
 * @package elemental
 */
class ElementalArea extends DataObject
{
    private static $db = array(
        'OwnerClassName' => 'Varchar'
    );

    private static $has_many = array(
        'Elements' => BaseElement::class
    );

    private static $extensions = array(
        Versioned::class
    );

    private static $owns = array(
        'Elements'
    );

    private static $table_name = 'ElementalArea';

    public static function elemental_page_types() {
        $elementalClasses = array();
        foreach (ClassInfo::getValidSubClasses(SiteTree::class) as $class) {
            if (Extensible::has_extension($class, ElementalPageExtension::class)) {
               $elementalClasses[] = $class;
            }
        }
        return $elementalClasses;
    }

    public function forTemplate() {
        return $this->renderWith('ElementalArea');
    }

    /**
     * @return HasManyList
     */
    public function ItemsToRender()
    {
        return $this->Elements(array(
            'Enabled' => 1
        ));
    }

    /**
     * Used in template instead of {@link Elements()} to wrap each element in its
     * controller, making it easier to access and process form logic and
     * actions stored in {@link ElementController}.
     *
     * @return ArrayList - Collection of {@link ElementController} instances.
     */
    public function ElementControllers()
    {
        $controllers = new ArrayList();
        $items = $this->ItemsToRender();
        if (!is_null($items)){
            foreach ($items as $element) {
                $controller = $element->getController();
                $controllers->push($controller);
            }
        }
        return $controllers;
    }

    /**
    * Return an ArrayList of pages with the Element Page Extension
    *
    * @return ArrayList
    */
    public function getOwnerPage()
    {
        if ($this->OwnerClassName) {
            $class = $this->OwnerClassName;
            $page = $class::get()->filter('ElementalAreaID', $this->ID);
            if ($page && $page->exists()) {
                return $page->first();
            }
        }

        $originalMode = Versioned::get_stage();
        Versioned::set_stage('Stage');
        $elementalPageTypes = self::elemental_page_types();
        foreach($elementalPageTypes as $elementalPageType) {
            $page = $elementalPageType::get()->filter('ElementalAreaID', $this->ID);
            if ($page && $page->exists()) {
                Versioned::set_stage($originalMode);
                $this->OwnerClassName = $elementalPageType;
                $this->write();
                return $page->first();
            }
        }

        Versioned::set_stage($originalMode);
        return false;
    }


}
