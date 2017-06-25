<?php

namespace DNADesign\Elemental\Models;

use SilverStripe\ORM\UnsavedRelationList;
use SilverStripe\Versioned\Versioned;
use SilverStripe\Core\ClassInfo;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\HasManyList;
use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Extensions\ElementPageExtension;

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

    private static $table_name = 'ElementalArea';

    /**
     * Override {@link WidgetArea::ItemsToRender}
     *
     * @return HasManyList
     */
    public function ItemsToRender()
    {
        return $this->Elements();
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
            $page = $class::get()->filter('ElementAreaID', $this->ID);
            if ($page && $page->exists()) {
                return $page->first();
            }
        }

        $originalMode = Versioned::get_stage();
        Versioned::set_stage('Stage');

        foreach (ClassInfo::getValidSubClasses('SiteTree') as $class) {
            $isElemental = false;

            if (Object::has_extension($class, 'ElementPageExtension')) {
                $isElemental = true;
            }

            if ($isElemental) {
                $page = $class::get()->filter('ElementAreaID', $this->ID);
                if ($page && $page->exists()) {
                    Versioned::reading_stage($originalMode);
                    $this->OwnerClassName = $class;
                    $this->write();
                    return $page->first();
                }
            }
        }

        Versioned::set_stage($originalMode);
        return false;
    }
}
