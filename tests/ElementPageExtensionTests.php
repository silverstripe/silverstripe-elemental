<?php

namespace DNADesign\Elemental\Tests;

use FunctionalTest;
use Page;
use DNADesign\Elemental\Extensions\ElementPageExtension;



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

        $elementarea = $page->getCMSFields()->dataFieldByName('ElementArea');
        $this->assertNotNull($elementarea);


        $content = $page->getCMSFields()->dataFieldByName('Content');
        $this->assertNull($content);

        $redirect = $this->objFromFixture('RedirectorPage', 'elementredirectpage');
        $elementarea = $redirect->getCMSFields()->dataFieldByName('ElementArea');
        $this->assertNull($elementarea);
    }

}
