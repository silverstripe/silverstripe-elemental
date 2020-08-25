<?php

namespace DNADesign\Elemental\Extensions;

use SilverStripe\Admin\Forms\UsedOnTable;
use SilverStripe\ORM\DataExtension;
use SilverStripe\ORM\ArrayList;
use SilverStripe\ORM\DataObject;
use DNADesign\Elemental\Models\ElementalArea;

class ElementalAreaUsedOnTableExtension extends DataExtension
{

    /**
     * Hides ElementalArea's from the "Used On" tab when viewing files
     *
     * @return void
     * @var ArrayList $dataObjects
     * @var DataObject $record
     * @see UsedOnTable::updateUsage
     */
    public function updateUsage(ArrayList &$dataObjects, DataObject &$record)
    {
        $usage = $dataObjects->exclude('ClassName', ElementalArea::class);
    }
}
