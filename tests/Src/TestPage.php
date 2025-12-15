<?php

namespace DNADesign\Elemental\Tests\Src;

use Page;
use SilverStripe\Core\Resettable;
use SilverStripe\Dev\TestOnly;

class TestPage extends Page implements TestOnly, Resettable
{
    private static $table_name = 'TestElementalPage';

    private static string $plural_name = 'Test Pages';

    private static string $singular_name = 'Test Page';

    public static bool $failEditCheck = false;

    public function canEdit($member = null)
    {
        if (static::$failEditCheck) {
            return false;
        }
        return parent::canEdit($member);
    }

    public static function reset()
    {
        static::$failEditCheck = false;
        return parent::reset();
    }
}
