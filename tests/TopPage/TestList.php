<?php

namespace DNADesign\Elemental\Tests\TopPage;

use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementalArea;
use SilverStripe\Dev\TestOnly;

class TestList extends BaseElement implements TestOnly
{
    /**
     * @var string
     */
    private static $table_name = 'TestList';

    private static $has_one = [
        'Elements' => ElementalArea::class
    ];

    private static $owns = [
        'Elements'
    ];

    private static $cascade_deletes = [
        'Elements'
    ];

    private static $cascade_duplicates = [
        'Elements'
    ];

    public function getType(): string
    {
        return 'Test element list';
    }
}
