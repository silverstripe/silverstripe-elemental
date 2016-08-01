<?php
/**
 * @package elemental
 */

class BaseElementExtension extends Heyday\VersionedDataObjects\VersionedDataObject
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
}
