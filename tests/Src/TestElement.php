<?php

namespace DNADesign\Elemental\Tests\Src;

use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\Dev\TestOnly;
use SilverStripe\Security\Permission;

class TestElement extends BaseElement implements TestOnly
{
    private static $table_name = 'TestElement';

    private static $db = [
        'TestValue' => 'Text',
    ];

    private static $controller_class = TestElementController::class;

    public function getType()
    {
        return 'A test element';
    }

    public function canView($member = null)
    {
        $check = Permission::checkMember($member, 'ADMIN');
        if ($check !== null) {
            return $check;
        }
        return parent::canView($member);
    }
}
