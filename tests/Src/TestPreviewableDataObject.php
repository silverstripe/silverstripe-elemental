<?php

namespace DNADesign\Elemental\Tests\Src;

use SilverStripe\Dev\TestOnly;
use SilverStripe\ORM\CMSPreviewable;

class TestPreviewableDataObject extends TestDataObject implements TestOnly, CMSPreviewable
{
    private static $table_name = 'TestPreviewableDataObject';

    public function PreviewLink($action = null)
    {
        return 'preview-link';
    }

    public function getMimeType()
    {
        return null;
    }

    public function CMSEditLink()
    {
        return null;
    }
}
