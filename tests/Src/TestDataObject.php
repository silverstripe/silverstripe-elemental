<?php

namespace DNADesign\Elemental\Tests\Src;

use DNADesign\Elemental\Models\ElementalArea;
use SilverStripe\Control\Controller;
use SilverStripe\Control\Director;
use SilverStripe\ORM\DataObject;
use SilverStripe\Dev\TestOnly;

class TestDataObject extends DataObject implements TestOnly
{
    private static $table_name = 'TestDataObject';

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
}
