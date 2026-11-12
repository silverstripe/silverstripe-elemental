<?php

namespace DNADesign\Elemental\Tests\Services\ElementTabProviderTest;

use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\Dev\TestOnly;
use SilverStripe\View\Requirements;

class RequirementsElement extends BaseElement implements TestOnly
{
    private static $table_name = 'ElementTabProviderTest_RequirementsElement';

    public function getCMSFields()
    {
        Requirements::javascript('https://example.com/requirements-element.js');
        return parent::getCMSFields();
    }

    public function getType()
    {
        return 'Requirements Element';
    }
}
