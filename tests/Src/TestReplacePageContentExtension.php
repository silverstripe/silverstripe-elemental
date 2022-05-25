<?php

namespace DNADesign\Elemental\Tests\Src;

use SilverStripe\Core\Extension;
use SilverStripe\Dev\TestOnly;

class TestReplacePageContentExtension extends Extension implements TestOnly
{
    public function getContent()
    {
        return $this->owner->ElementalArea;
    }
}
