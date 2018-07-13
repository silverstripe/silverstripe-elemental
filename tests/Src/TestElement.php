<?php

namespace DNADesign\Elemental\Tests\Src;

use SilverStripe\Dev\TestOnly;
use DNADesign\Elemental\Models\BaseElement;

class TestElement extends BaseElement implements TestOnly
{
    private static $table_name = 'TestElement';

    private static $db = [
        'TestValue' => 'Text',
        'Viewable' => 'Boolean'
    ];

    private static $controller_class = TestElementController::class;

    public function getType()
    {
        return 'A test element';
    }

    public function canView($member = null)
    {
        return parent::canView($member) && $this->Viewable;
    }
}
