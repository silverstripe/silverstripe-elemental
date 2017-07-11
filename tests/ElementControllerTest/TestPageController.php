<?php

namespace DNADesign\Elemental\Tests\ElementControllerTest;

use PageController;
use ReflectionClass;
use SilverStripe\Dev\TestOnly;
use SilverStripe\View\SSViewer;
use DNADesign\Elemental\Tests\ElementControllerTest\TestPage;

/**
 * @package cms
 * @subpackage tests
 */
class TestPageController extends PageController implements TestOnly {

    /**
     * Template selection doesnt work in test folders, so we add a test theme a template name.
     */
    public function getViewer($action) {
        SSViewer::add_themes(["dnadesign/elements:elements/tests/ElementControllerTest"]);
        return new SSViewer(TestPage::class);
    }
}
