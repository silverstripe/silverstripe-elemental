<?php

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
                if($objects instanceof ManyManyList || $item instanceof HasManyList) {
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
            if(!Object::has_extension($item->class, 'Versioned')) {
                continue;
            }

            $staged[] = $item->ID;
            $item->publish('Stage', 'Live');
        }

        if($this->owner->ID) {

            foreach ($items as $item) {
                if(!Object::has_extension($item->class, 'Versioned')) {
                    continue;
                }

                if (!in_array($item->ID, $staged)) {
                    $item->deleteFromStage('Live');
                }
            }
        }
    }
}
