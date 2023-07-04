<?php

namespace DNADesign\Elemental\Tests\Controllers;

use DNADesign\Elemental\Extensions\ElementalPageExtension;
use DNADesign\Elemental\Tests\Src\TestPage;
use SilverStripe\CMS\Controllers\CMSSiteTreeFilter_Search;
use SilverStripe\Dev\SapphireTest;
use DNADesign\Elemental\Controllers\ElementSiteTreeFilterSearch;
use ReflectionMethod;
use SilverStripe\ORM\DataObject;
use SilverStripe\Core\Config\Config;
use SilverStripe\ORM\DataObjectSchema;
use DNADesign\Elemental\Models\ElementContent;
use DNADesign\Elemental\Tests\Src\TestElementContentExtension;

class ElementSiteTreeFilterSearchTest extends SapphireTest
{
    protected static $fixture_file = 'ElementSiteTreeFilterSearchTest.yml';

    protected static $required_extensions = [
        TestPage::class => [
            ElementalPageExtension::class,
        ],
        ElementContent::class => [
            TestElementContentExtension::class,
        ]
    ];

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

    /**
     * @dataProvider provideApplyDefaultFilters
     */
    public function testApplyDefaultFilters(bool $renderElements, string $term, array $expected): void
    {
        // Set protected method visibility - applyDefaultFilters() is essentially an
        // extension method that's called by silverstripe/cms, so use of reflection here
        // is pretty much required
        $method = new ReflectionMethod(ElementSiteTreeFilterSearch::class, 'applyDefaultFilters');
        Config::modify()->set(ElementSiteTreeFilterSearch::class, 'render_elements', $renderElements);
        $filterSearch = new ElementSiteTreeFilterSearch(['Term' => $term]);
        $ret = $method->invoke($filterSearch, DataObject::get(TestPage::class));
        $this->assertSame($expected, $ret->column('Title'));
    }

    public function provideApplyDefaultFilters(): array
    {

        return [
            'render_elements true - text search' => [
                'render_elements' => true,
                'term' => 'This content is rendered',
                'expected' => ['Content blocks page']
            ],
            'render_elements true - unrendered search' => [
                'render_elements' => true,
                'term' => 'This field is unrendered',
                'expected' => []
            ],
            'render_elements true - extended search' => [
                'render_elements' => true,
                'term' => 'This content is from an extension hook',
                'expected' => []
            ],
            'render_elements true - int search' => [
                'render_elements' => true,
                'term' => '456',
                'expected' => []
            ],
            'render_elements true - enum search' => [
                'render_elements' => true,
                'term' => 'Sunny',
                'expected' => []
            ],
            'render_elements false - text search' => [
                'render_elements' => false,
                'term' => 'This content is rendered',
                'expected' => ['Content blocks page']
            ],
            'render_elements false - unrendered search' => [
                'render_elements' => false,
                'term' => 'This field is unrendered',
                'expected' => ['Content blocks page']
            ],
            'render_elements false - extended search' => [
                'render_elements' => false,
                'term' => 'This content is from an extension hook',
                'expected' => ['Content blocks page']
            ],
            'render_elements false - int search' => [
                'render_elements' => false,
                'term' => '456',
                'expected' => []
            ],
            'render_elements false - enum search' => [
                'render_elements' => false,
                'term' => 'Sunny',
                'expected' => []
            ],
        ];
    }
}
