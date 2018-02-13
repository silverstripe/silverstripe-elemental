<?php

namespace DNADesign\Elemental\Tests\Controllers;

use DNADesign\Elemental\Extensions\ElementalPageExtension;
use DNADesign\Elemental\Tests\Src\TestPage;
use Page;
use SilverStripe\CMS\Controllers\CMSSiteTreeFilter_Search;
use SilverStripe\Dev\SapphireTest;

class ElementSiteTreeFilterSearchTest extends SapphireTest
{
    protected static $fixture_file = 'ElementSiteTreeFilterSearchTest.yml';

    protected static $extra_dataobjects = [
        TestPage::class,
    ];

    /**
     * @param string $searchTerm
     * @param array $expected
     * @dataProvider searchProvider
     */
    public function testElementalPageDataMatchesInCmsSearch($searchTerm, $expected)
    {
        $filter = CMSSiteTreeFilter_Search::create(['Term' => $searchTerm]);
        $result = $filter->getFilteredPages();

        $this->assertListContains($expected, $result);
    }

    /**
     * @return array[]
     */
    public function searchProvider()
    {
        return [
            'Nested block data' => ['specifically', [
                ['Title' => 'Content blocks page'],
            ]],
            'Regular page data' => ['regular', [
                ['Title' => 'Regular page'],
            ]],
            'Combined results' => ['content', [
                ['Title' => 'Content blocks page'],
                ['Title' => 'Regular page'],
            ]],
        ];
    }
}
