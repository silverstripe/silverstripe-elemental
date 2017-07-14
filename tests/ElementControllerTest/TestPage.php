<?php

namespace DNADesign\Elemental\Tests;

use Page;
use SilverStripe\Dev\TestOnly;
use SilverStripe\View\SSViewer;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Extensions\ElementalPageExtension;

/**
 * @package cms
 * @subpackage tests
 */
class TestPage extends Page implements TestOnly {

    private static $table_name = 'TestPage';

    private static $extensions = array(
        ElementalPageExtension::class
    );
}