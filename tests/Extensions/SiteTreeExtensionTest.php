<?php

namespace DNADesign\Elemental\Tests\Extensions;

use DNADesign\Elemental\Extensions\SiteTreeExtension;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Dev\SapphireTest;

class SiteTreeExtensionTest extends SapphireTest
{
    protected static $required_extensions = [
        SiteTree::class => [
            SiteTreeExtension::class,
        ],
    ];

    public function testSiteTreeAlwaysHasElementalAreaAccessor()
    {
        $this->assertTrue(SiteTree::singleton()->hasMethod('ElementalAreaIfExists'));
    }
}
