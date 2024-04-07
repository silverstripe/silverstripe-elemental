<?php

namespace DNADesign\Elemental\Tests\Src;

use DNADesign\Elemental\Models\ElementalArea;
use SilverStripe\ORM\DataObject;
use SilverStripe\Dev\TestOnly;
use SilverStripe\Versioned\Versioned;

class TestVersionedDataObject extends DataObject implements TestOnly
{
    private static $table_name = 'TestVersionedDataObject';

    private static $extensions = [
        Versioned::class,
    ];

    private static $db = [
        'Title' => 'Varchar(255)',
    ];

    private static $has_one = [
        'ElementalArea' => ElementalArea::class,
    ];

    private static $owns = [
        'ElementalArea',
    ];
}
