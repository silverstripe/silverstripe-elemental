<?php

namespace DNADesign\Elemental\Extensions;

use SilverStripe\Core\Config\Config;
use SilverStripe\ORM\DataExtension;

/**
 * @deprecated 2.1..3.0 This extension is not implemented by default, and will be removed
 *                      in 3.0.0. Please use the `$owns` API with `$cascade_duplicates` instead.
 *                      See {@link ElementalPageExtension} for an example of this.
 */
class ElementalDuplicationExtension extends DataExtension
{
    /**
     * Duplicate items
     *
     */
    public function onAfterDuplicate($original, $doWrite = true)
    {
        $thisClass = $this->owner->ClassName;

        // Duplicate has_one's and has_many's
        $duplicateRelations = Config::inst()->get($thisClass, 'duplicate_relations');
        if ($duplicateRelations && !empty($duplicateRelations)) {
            foreach ($duplicateRelations as $relation) {
                $items = $original->$relation();
                foreach ($items as $item) {
                    $duplicateItem = $item->duplicate(false);
                    $duplicateItem->{$thisClass.'ID'} = $this->owner->ID;
                    $duplicateItem->write();
                }
            }
        }

        // Duplicate many_many's
        $duplicateManyManyRelations = Config::inst()->get($thisClass, 'duplicate_many_many_relations');
        if ($duplicateManyManyRelations && !empty($duplicateManyManyRelations)) {
            foreach ($duplicateManyManyRelations as $relation) {
                $items = $original->$relation();
                foreach ($items as $item) {
                    $this->owner->$relation()->add($item);
                }
            }
        }
    }

    public function onBeforeDuplicate($original, $doWrite = true)
    {
        $thisClass = $this->owner->ClassName;
        $clearRelations = Config::inst()->get($thisClass, 'duplicate_clear_relations');

        if ($clearRelations && !empty($clearRelations)) {
            foreach ($clearRelations as $clearRelation) {
                $clearRelation = $clearRelation . 'ID';
                $this->owner->$clearRelation = 0;
            }
        }
    }
}
