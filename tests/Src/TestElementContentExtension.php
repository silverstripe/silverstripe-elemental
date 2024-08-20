<?php

namespace DNADesign\Elemental\Tests\Src;

use SilverStripe\Dev\TestOnly;
use SilverStripe\Core\Extension;

class TestElementContentExtension extends Extension implements TestOnly
{
    private static $db = [
        'UnrenderedField' => 'Varchar(255)',
        'MyInt' => 'Int',
        'MyEnum' => 'Enum("Sunny, Cloudy", "Sunny")'
    ];

    protected function updateContentForCmsSearch(array &$contents)
    {
        $contents[] = 'This content is from an extension hook';
    }
}
