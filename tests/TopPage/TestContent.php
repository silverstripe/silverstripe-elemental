<?php

namespace DNADesign\Elemental\Tests\TopPage;

use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\Dev\TestOnly;

/**
 * Class TestContent
 *
 * @property int $ChildPageID
 * @method TestChildPage ChildPage()
 * @package DNADesign\Elemental\Tests\TopPage
 */
class TestContent extends BaseElement implements TestOnly
{
    /**
     * @var string
     */
    private static $table_name = 'TestContent';

    /**
     * @var array
     */
    private static $db = [
        'Content' => 'Varchar',
    ];

    private static $has_one = [
        'ChildPage' => TestChildPage::class,
    ];

    private static $cascade_duplicates = [
        'ChildPage',
    ];

    private static $cascade_deletes = [
        'ChildPage',
    ];

    public function getType(): string
    {
        return 'Test element with content';
    }
}
