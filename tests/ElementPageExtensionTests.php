<?php

namespace SilverStripe\Elemental\Tests;

use FunctionalTest;
use Page;
use SilverStripe\Elemental\Extensions\ElementPageExtension;



/**
 * @package elemental
 * @subpackage tests
 */
class ElementPageExtensionTests extends FunctionalTest {

    protected static $fixture_file = 'elemental/tests/fixtures.yml';

    public function setUp() {
        parent::setUp();

        Page::add_extension(ElementPageExtension::class);
    }

    public function testUpdateCmsFields() {
        $page = $this->objFromFixture('Page', 'elementaldemo');

        $elementalArea = $page->getCMSFields()->dataFieldByName('ElementalArea');
        $this->assertNotNull($elementalArea);


        $content = $page->getCMSFields()->dataFieldByName('Content');
        $this->assertNull($content);

        $redirect = $this->objFromFixture('RedirectorPage', 'elementredirectpage');
        $elementalArea = $redirect->getCMSFields()->dataFieldByName('ElementalArea');
        $this->assertNull($elementalArea);
    }

}
