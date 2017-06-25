<?php

namespace SilverStripe\Elemental\Models;

use SilverStripe\ORM\UnsavedRelationList;
use SilverStripe\Versioned\Versioned;
use SilverStripe\Core\ClassInfo;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\HasManyList;
use SilverStripe\Core\Extensible;
use SilverStripe\Elemental\Models\BaseElement;
use SilverStripe\Elemental\Extensions\ElementPageExtension;

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
     * @return HasManyList
     */
    public function ItemsToRender()
    {
        return $this->Elements(array(
            'Enabled' => 1
        ));
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
        foreach (ClassInfo::getValidSubClasses('SilverStripe\CMS\Model\SiteTree') as $class) {
            $isElemental = false;

            if (Extensible::has_extension($class, 'SilverStripe\Elemental\Extensions\ElementPageExtension')) {
                $isElemental = true;
            }

            if ($isElemental) {
                $page = $class::get()->filter('ElementalAreaID', $this->ID);
                if ($page && $page->exists()) {
                    Versioned::set_stage($originalMode);
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
