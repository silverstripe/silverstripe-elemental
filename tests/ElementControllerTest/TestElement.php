<?php

namespace DNADesign\Elemental\Tests;

use SilverStripe\Dev\TestOnly;
use DNADesign\Elemental\Models\BaseElement;

/**
 * @package elements
 * @subpackage tests
 */
class TestElement extends BaseElement implements TestOnly {

    private static $table_name = 'TestElement';

    private static $db = array(
        'TestValue' => 'Text'
    );

    private static $controller_class = TestElementController::class;
}
