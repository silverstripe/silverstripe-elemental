<?php

namespace DNADesign\Elemental\Tests\Extensions;

use DNADesign\Elemental\Extensions\ElementalAreasExtension;
use DNADesign\Elemental\Extensions\TopPageElementExtension;
use PHPUnit\Framework\Attributes\DataProvider;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Dev\SapphireTest;
use DNADesign\Elemental\Models\ElementalArea;

class TopPageElementExtensionTest extends SapphireTest
{
    protected static $required_extensions = [
        SiteTree::class => [
            ElementalAreasExtension::class,
        ],
    ];

    public static function provideWithoutCallingSetTopPage(): array
    {
        return [
            'with-call' => [
                'doCall' => true,
                'expectTopPageIDSet' => true,
            ],
            'without-call' => [
                'doCall' => false,
                'expectTopPageIDSet' => false,
            ],
        ];
    }

    #[DataProvider('provideWithoutCallingSetTopPage')]
    public function testWithoutCallingSetTopPage(bool $doCall, bool $expectTopPageIDSet): void
    {
        $page = new SiteTree();
        $pageID = $page->write();
        $area = new ElementalArea();
        $func = fn() => $area->write();
        if ($doCall) {
            $areaID = call_user_func($func);
        } else {
            $areaID = $area->withoutCallingSetTopPage($func);
        }
        // Refetch element we are testing what was persisted to DB
        $area = ElementalArea::get()->byID($areaID);
        if ($expectTopPageIDSet) {
            $this->assertSame($pageID, $area->TopPageID);
        } else {
            $this->assertSame(0, $area->TopPageID);
        }
    }
}
