<?php

namespace DNADesign\Elemental\Tests\Src;

use DNADesign\Elemental\Models\ElementalArea;
use SilverStripe\Control\Controller;
use SilverStripe\Control\Director;
use SilverStripe\ORM\DataObject;
use SilverStripe\Dev\TestOnly;
use SilverStripe\Security\Permission;
use SilverStripe\Security\Security;

class TestDataObjectWithCMSEditLink extends DataObject implements TestOnly
{
    private static $table_name = 'TestDataObjectWithCMSEditLink';

    private static $db = [
        'Title' => 'Varchar(255)',
        'Content' => 'HTMLText',
    ];

    private static $has_one = [
        'ElementalArea' => ElementalArea::class,
    ];

    private static $owns = [
        'ElementalArea',
    ];

    public function CMSEditLink()
    {
        $link = Controller::join_links(
            'admin/',
            $this->ID,
        );
        return Director::absoluteURL($link);
    }

    public function canDelete($member = null)
    {
        $member = $member ? $member : Security::getCurrentUser();
        $codes = ['CMS_ACCESS_CMSMain'];
        return Permission::checkMember($member, $codes);
    }
}
