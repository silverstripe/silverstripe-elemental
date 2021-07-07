<?php

namespace DNADesign\Elemental\Tests\Src;

use SilverStripe\Core\Extension;
use SilverStripe\Dev\TestOnly;

class TestContentForSearchIndexExtension extends Extension implements TestOnly
{
    public function updateContentForSearchIndex(&$content)
    {
        $content = 'This is the updated content.';
    }
}
