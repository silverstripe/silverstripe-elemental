<?php

namespace DNADesign\Elemental\Tests\Src;

use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\Dev\TestOnly;
use SilverStripe\Security\Permission;

class TestMultipleHtmlFieldsElement extends BaseElement implements TestOnly
{
    private static $table_name = 'TestMultipleHtmlFieldsElement';

    private static $db = [
        'Field1' => 'HTMLText',
        'Field2' => 'HTMLText',
        'Field3' => 'HTMLText',
    ];
}
