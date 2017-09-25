<?php

namespace DNADesign\Elemental\Tests;

use DNADesign\Elemental\Extensions\ElementalPageExtension;
use Page;
use SilverStripe\CMS\Model\RedirectorPage;
use SilverStripe\Dev\FunctionalTest;

/**
 * @package elemental
 * @subpackage tests
 */
class ElementalPageExtensionTests extends FunctionalTest
{

    protected static $fixture_file = 'ElementalPageExtensionTests.yml';

    protected static $required_extensions = [
        Page::class => [
            ElementalPageExtension::class,
        ],
    ];

    public function testUpdateCmsFields()
    {
        $page = $this->objFromFixture(Page::class, 'elementaldemo');

        $elementalArea = $page->getCMSFields()->dataFieldByName('ElementalArea');
        $this->assertNotNull($elementalArea);

        $content = $page->getCMSFields()->dataFieldByName('Content');
        $this->assertNull($content);

        $redirect = $this->objFromFixture(RedirectorPage::class, 'elementredirectpage');
        $elementalArea = $redirect->getCMSFields()->dataFieldByName('ElementalArea');

        $this->assertNull($elementalArea);
    }
}
