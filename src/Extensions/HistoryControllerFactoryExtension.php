<?php

namespace DNADesign\Elemental\Extensions;

use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Core\Extension;

/**
 * Instructs the history viewer controller to be enabled for pages that have elemental
 *
 * @deprecated 3.0.0:4.0.0
 */
class HistoryControllerFactoryExtension extends Extension
{
    public function updateIsEnabled(SiteTree $page = null)
    {
        if ($page && $page->hasExtension(ElementalPageExtension::class)) {
            return true;
        }
    }
}
