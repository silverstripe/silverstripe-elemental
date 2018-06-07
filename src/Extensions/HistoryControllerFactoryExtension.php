<?php

namespace DNADesign\Elemental\Extensions;

use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Core\Extension;

/**
 * Instructs the history viewer controller to be enabled for pages that have elemental
 */
class HistoryControllerFactoryExtension extends Extension
{
    public function updateIsEnabled(SiteTree $page = null)
    {
        return $page && $page->hasExtension(ElementalPageExtension::class);
    }
}
