<?php

namespace DNADesign\Elemental\Tests;

use SilverStripe\Dev\FunctionalTest;
use DNADesign\Elemental\Extensions\ElementalPageExtension;
use SilverStripe\CMS\Model\RedirectorPage;
use Page;

/**
 * @package elemental
 * @subpackage tests
 */
class ElementalPageExtensionTests extends FunctionalTest {

    protected static $fixture_file = 'elemental/tests/ElementalPageExtensionTests.yml';

    public function setUp() {
        parent::setUp();

        Page::add_extension(ElementalPageExtension::class);
    }

    public function testUpdateCmsFields() {
        $page = $this->objFromFixture('Page', 'elementaldemo');

        $elementalArea = $page->getCMSFields()->dataFieldByName('ElementalArea');
        $this->assertNotNull($elementalArea);

        $content = $page->getCMSFields()->dataFieldByName('Content');
        $this->assertNull($content);

        $redirect = $this->objFromFixture(RedirectorPage::class, 'elementredirectpage');
        $elementalArea = $redirect->getCMSFields()->dataFieldByName('ElementalArea');

        $this->assertNull($elementalArea);
    }

}
