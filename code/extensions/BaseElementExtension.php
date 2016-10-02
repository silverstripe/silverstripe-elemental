<?php

use \Heyday\VersionedDataObjects\VersionedDataObject;

/**
 * @package elemental
 */
class BaseElementExtension extends VersionedDataObject
{
    /**
     * {@inheritDoc}
     */
    public function canView($member = null)
    {
        return (Permission::check('CMS_ACCESS_CMSMain', 'any', $member)) ? true : null;
    }

    /**
     * {@inheritDoc}
     */
    public function canEdit($member = null)
    {
        return (Permission::check('CMS_ACCESS_CMSMain', 'any', $member)) ? true : null;
    }

    /**
     * {@inheritDoc}
     */
    public function canDelete($member = null)
    {
        return (Permission::check('CMS_ACCESS_CMSMain', 'any', $member)) ? true : null;
    }

    /**
     * {@inheritDoc}
     */
    public function canCreate($member = null)
    {
        return (Permission::check('CMS_ACCESS_CMSMain', 'any', $member)) ? true : null;
    }

    /**
     * Handles unpublishing as VersionedDataObjects doesn't
     * Modelled on SiteTree::doUnpublish
     *
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
