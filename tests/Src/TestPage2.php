<?php

namespace DNADesign\Elemental\Tests\Src;

use DNADesign\Elemental\Models\ElementalArea;
use Page;
use SilverStripe\Dev\TestOnly;

class TestPage2 extends Page implements TestOnly
{
    private static $table_name = 'TestElementalPage2';

    private static string $plural_name = 'Test Page twos';

    private static string $singular_name = 'Test Page two';

    private static array $has_one = [
        'ElementalArea2' => ElementalArea::class,
    ];

    private static array $owns = [
        'ElementalArea2',
    ];

    private static array $field_labels = [
        'ElementalArea2' => 'My second elemental area',
    ];
}
