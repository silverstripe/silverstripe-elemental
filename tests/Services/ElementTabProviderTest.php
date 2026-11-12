<?php

namespace DNADesign\Elemental\Tests\Services;

use DNADesign\Elemental\Services\ElementTabProvider;
use DNADesign\Elemental\Tests\Services\ElementTabProviderTest\RequirementsElement;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\View\Requirements;

class ElementTabProviderTest extends SapphireTest
{
    protected static $extra_dataobjects = [
        RequirementsElement::class,
    ];

    public function testGettingTabsForElement()
    {
        $this->markTestIncomplete('Does not yet test anything, remains to be implemented');
    }

    public function testSettingCache()
    {
        $this->markTestIncomplete('Does not yet test anything, remains to be implemented');
    }

    public function testFlush()
    {
        $this->markTestIncomplete('Does not yet test anything, remains to be implemented');
    }

    public function testGeneratingTabsKeepsRequirementsOut()
    {
        ElementTabProvider::flush();
        $provider = Injector::inst()->get(ElementTabProvider::class);

        $tabs = $provider->getTabsForElement(RequirementsElement::class);

        $this->assertContains('Main', array_column($tabs, 'name'));
        $this->assertArrayNotHasKey(
            'https://example.com/requirements-element.js',
            Requirements::backend()->getJavascript()
        );
    }
}
