<?php

namespace DNADesign\Elemental\Tests\Src;

use DNADesign\Elemental\Models\ElementalArea;
use SilverStripe\ORM\DataObject;
use SilverStripe\Dev\TestOnly;

class TestDataObjectIncludeElemental extends DataObject implements TestOnly
{
    private static $table_name = 'TestDataObjectIncludeElemental';

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

    public function includeElemental(): bool
    {
        return true;
    }
}
