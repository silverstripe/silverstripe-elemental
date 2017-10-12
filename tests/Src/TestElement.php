<?php

namespace DNADesign\Elemental\Tests\Src;

use SilverStripe\Dev\TestOnly;
use DNADesign\Elemental\Models\BaseElement;

class TestElement extends BaseElement implements TestOnly
{
    private static $table_name = 'TestElement';

    private static $db = [
        'TestValue' => 'Text'
    ];

    private static $controller_class = TestElementController::class;

    public function i18n_singular_name()
    {
        return 'A test element';
    }
}
