<?php

namespace DNADesign\Elemental\Tests\ElementControllerTest;

use Page;
use DNADesign\Elemental\Extensions\ElementalPageExtension;
use DNADesign\Elemental\Models\ElementalArea;
use SilverStripe\Dev\TestOnly;
use SilverStripe\View\SSViewer;

class TestPage extends Page implements TestOnly
{

    private static $table_name = 'TestElementalPage';

    private static $extensions = array(
        ElementalPageExtension::class
    );
}
