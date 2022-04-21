<?php

namespace DNADesign\Elemental\Tests\Src;

use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\Dev\TestOnly;

class TestElementDataObject extends BaseElement implements TestOnly
{
    private static $table_name = 'TestElementDataObject';

    private static $db = [
        'TestValue' => 'Text',
    ];

    private static bool $inline_editable = false;

    public function getType()
    {
        return 'A test element in DataObject';
    }
}
