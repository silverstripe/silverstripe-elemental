<?php

namespace DNADesign\Elemental\Tests\Src;

use SilverStripe\ORM\DataExtension;
use SilverStripe\Dev\TestOnly;

class TestElementContentExtension extends DataExtension implements TestOnly
{
    private static $db = [
        'UnrenderedField' => 'Varchar(255)',
        'MyInt' => 'Int',
        'MyEnum' => 'Enum("Sunny, Cloudy", "Sunny")'
    ];

    public function updateContentForCmsSearch(array &$contents)
    {
        $contents[] = 'This content is from an extension hook';
    }
}
