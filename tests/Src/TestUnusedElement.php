<?php

namespace DNADesign\Elemental\Tests\Src;

use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\Dev\TestOnly;

class TestUnusedElement extends BaseElement implements TestOnly
{
    public function getType()
    {
        return 'Unused Element';
    }
}
