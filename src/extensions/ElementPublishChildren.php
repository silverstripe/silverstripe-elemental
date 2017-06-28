<?php

namespace SilverStripe\Elemental\Extensions;

use SilverStripe\ORM\DataExtension;
use SilverStripe\Versioned\Versioned;
use SilverStripe\Elemental\Models\BaseElement;


/**
 * @package elemental
 */
class ElementPublishChildren extends DataExtension
{

    public function getPublishableItems() {
        $config = $this->owner->config();

        $items = new ArrayList();
        if($config->publishable_items) {
            foreach($config->publishable_items as $item) {
                $objects = $this->owner->$item();

                if($objects instanceof ManyManyList || $objects instanceof HasManyList) {
                    foreach($objects as $object) {
                        $items->push($object);
                    }
                } else {
                    $items->push($objects);
                }
            }
        }

        // also, check for PublishableItems(), which can return a bunch of objects
        if($this->owner->hasMethod('PublishableSubItems')) {
            $items->merge($this->owner->PublishableSubItems());
        }
        $items->removeDuplicates();

        return $items;
    }

    public function onBeforeVersionedPublish()
    {
        $staged = array();
        $items = $this->getPublishableItems();
        foreach ($items as $item) {
             // check for versioning
            if(!self::is_versioned($item)) {
                continue;
            }

            $staged[] = $item->ID;
            $item->publish('Stage', 'Live');
        }

        if($this->owner->ID) {
						// remove any elements that are on live but not in draft.
            foreach ($items as $item) {
                if(!self::is_versioned($item)) {
                    continue;
                }

                if (!in_array($item->ID, $staged)) {
                    $item->deleteFromStage('Live');
                }
            }
        }
    }

    /**
     * Determin if a class has any extension that is  a sublcass of Versioned
     * @param  [type]  $class [description]
     * @return boolean        [description]
     */
    public static function is_versioned($class) {

        if(is_object($class)) {
            $class = get_class($class);
        }

        $versionClasses = ClassInfo::subclassesFor(Versioned::class);

        foreach($versionClasses as $versionClass) {
            if(Object::has_extension($class, $versionClass)) {
                return true;
            }
        }

        return false;
    }
}
