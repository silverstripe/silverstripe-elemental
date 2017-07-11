<?php

namespace DNADesign\Elemental\Tests\ElementControllerTest;

use Page;
use SilverStripe\Dev\TestOnly;
use SilverStripe\View\SSViewer;
use DNADesign\Elemental\Models\ElementalArea;

/**
 * @package cms
 * @subpackage tests
 */
class TestPage extends Page implements TestOnly {

    private static $table_name = 'TestPage';

    private static $has_one = array(
        'ElementControllerTestSidebar' => ElementalArea::class
    );
}
