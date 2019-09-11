<?php

namespace DNADesign\Elemental\Extensions;


use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Models\ElementContent;
use SilverStripe\Core\Extension;
use SilverStripe\ORM\ArrayList;
use SilverStripe\ORM\DataObject;

/**
 * Hides elemental classes on the "Used On" tab when viewing files
 */
class UsedOnTableExtension extends Extension
{
    public function updateUsage(ArrayList &$usage, DataObject &$record) {
        $usage = $usage->exclude([
            'ClassName' => [
                ElementalArea::class,
                ElementContent::class,
            ]
        ]);
    }
}
