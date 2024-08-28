<?php

namespace DNADesign\Elemental\Tests\Blocks;

use SilverStripe\Dev\TestOnly;
use DNADesign\Elemental\Models\ElementalArea;

class TestElementalArea extends ElementalArea implements TestOnly
{
    private static $table_name = 'TestElementalArea';

    public static $fail = '';

    public function canEdit($member = null, $context = [])
    {
        return self::$fail !== 'can-edit';
    }

    public function canView($member = null, $context = [])
    {
        return self::$fail !== 'can-view';
    }
}
