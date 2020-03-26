<?php

namespace DNADesign\Elemental\Tests\TopPage;

use Page;
use SilverStripe\Dev\TestOnly;

/**
 * Class TestBlockPage
 *
 * @package DNADesign\Elemental\Tests\TopPage
 */
class TestBlockPage extends Page implements TestOnly
{
    /**
     * @var string
     */
    private static $table_name = 'TestBlockPage';
}
