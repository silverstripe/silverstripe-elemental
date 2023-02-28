<?php

namespace DNADesign\Elemental\Tests\Src;

use SilverStripe\Dev\TestOnly;

class TestPreviewableDataObjectWithLink extends TestPreviewableDataObject implements TestOnly
{
    private static $table_name = 'TestPreviewableDataObjectWithLink';

    private static $db = [
        'LinkData' => 'Varchar(255)',
    ];

    private static $defaults = [
        'LinkData' => 'base-link',
    ];

    public function Link($action = null)
    {
        return $this->LinkData;
    }
}
