<?php

namespace DNADesign\Elemental\Tests\Src;

use SilverStripe\Dev\TestOnly;

class TestPreviewableDataObjectWithLink extends TestPreviewableDataObject implements TestOnly
{
    private static $table_name = 'TestPreviewableDataObjectWithLink';

    public function Link($action = null)
    {
        return 'base-link';
    }
}
