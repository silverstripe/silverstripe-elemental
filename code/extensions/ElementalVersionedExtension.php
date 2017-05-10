<?php

use \Heyday\VersionedDataObjects\VersionedDataObject;

/**
 * @package elemental
 *
 * implement canX operations based on page:
 * - Check if CanX is defined on the owner page, firstly checking if this item has a page relation.
 *   (Allows us to reuse this extension on non-elements)
 * - Then fallback to CMS Access
 *
 * Has to extend VersionedDataObject rather than suppliment so that we can overwrite the canXs
 * Otherwise the Versioned canXs fail when these check suceed, the fail overides
 */
class ElementalVersionedExtension extends VersionedDataObject
{

    /**
     * @param array $fields
     */
    public function updateSummaryFields(&$fields)
    {
        if(isset($fields['CMSPublishedState'])) {
            unset($fields['CMSPublishedState']);
        }
    }

    /**
     * Basic permissions, defaults to page perms where possible
     */
    public function canView($member = null)
    {
        if ($this->owner->hasMethod('getPage')) {
            if($page = $this->owner->getPage()) {
                return $page->canView($member);
            }
        }

        if(Director::is_cli()) return true;

        return (Permission::check('CMS_ACCESS', 'any', $member)) ? true : null;
    }

    /**
     * Basic permissions, defaults to page perms where possible
     */
    public function canEdit($member = null)
    {
        if ($this->owner->hasMethod('getPage')) {
            if ($page = $this->owner->getPage()) {
                return $page->canEdit($member);
            }
        }

        if(Director::is_cli()) return true;

        return (Permission::check('CMS_ACCESS', 'any', $member)) ? true : null;
    }

    /**
     * Basic permissions, defaults to page perms where possible
     * Uses archive not delete so that current stage is respected
     * i.e if a widget is not published, then it can be deleted by someone who
     * doesn't have publishing permissions
     */
    public function canDelete($member = null)
    {
        if ($this->owner->hasMethod('getPage')) {
            if ($page = $this->owner->getPage()) {
                return $page->canArchive($member);
            }
        }

        if(Director::is_cli()) return true;

        return (Permission::check('CMS_ACCESS', 'any', $member)) ? true : null;
    }

    /**
     * Basic permissions, defaults to page perms where possible
     */
    public function canCreate($member = null)
    {
        if(Director::is_cli()) return true;

        return (Permission::check('CMS_ACCESS', 'any', $member)) ? true : null;
    }

    /**
     * Handles unpublishing as VersionedDataObjects doesn't
     * Modelled on SiteTree::doUnpublish
     * Has to be applied here, rather than BaseElement so that it goes against Widget
     */
    public function doUnpublish() {
        if(!$this->owner->ID) return false;

        $this->owner->extend('onBeforeUnpublish');

        $origStage = Versioned::get_reading_mode();
        Versioned::set_reading_mode('Stage.Live');

        // This way our ID won't be unset
        $clone = clone $this->owner;
        $clone->delete();

        Versioned::set_reading_mode($origStage);

        $virtualLinkedElements = $this->owner->getPublishedVirtualLinkedElements();
        if ($virtualLinkedElements) foreach($virtualLinkedElements as $vle) $vle->doUnpublish();

        $this->owner->extend('onAfterUnpublish');

        return true;
    }

}
