<?php

namespace DNADesign\Elemental\Tests\TopPage;

use Page;
use SilverStripe\Dev\TestOnly;

/**
 * Class TestChildPage
 *
 * @method TestContent TestContent()
 * @package DNADesign\Elemental\Tests\TopPage
 */
class TestChildPage extends Page implements TestOnly
{
    /**
     * @var string
     */
    private static $table_name = 'TestChildPage';

    /**
     * @var array
     */
    private static $belongs_to = [
        'TestContent' => TestContent::class . '.ChildPage',
    ];
}
