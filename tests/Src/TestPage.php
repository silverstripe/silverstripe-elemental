<?php

namespace DNADesign\Elemental\Tests\Src;

use Page;
use SilverStripe\Dev\TestOnly;

class TestPage extends Page implements TestOnly
{
    private static $table_name = 'TestElementalPage';
}
