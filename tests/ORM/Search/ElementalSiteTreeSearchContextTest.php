<?php

namespace DNADesign\Elemental\Tests\Controllers;

use DNADesign\Elemental\Extensions\ElementalPageExtension;
use DNADesign\Elemental\Tests\Src\TestPage;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\Core\Config\Config;
use DNADesign\Elemental\Models\ElementContent;
use DNADesign\Elemental\ORM\Search\ElementalSiteTreeSearchContext;
use DNADesign\Elemental\Tests\Src\TestElementContentExtension;
use PHPUnit\Framework\Attributes\DataProvider;
use SilverStripe\CMS\Model\SiteTree;

class ElementalSiteTreeSearchContextTest extends SapphireTest
{
    protected static $fixture_file = 'ElementalSiteTreeSearchContextTest.yml';

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

    #[DataProvider('searchProvider')]
    public function testElementalPageDataMatchesInCmsSearch(bool $renderElements, string $searchTerm, array $expected): void
    {
        Config::modify()->set(ElementalSiteTreeSearchContext::class, 'render_elements', $renderElements);
        $page = new SiteTree();
        $context = new ElementalSiteTreeSearchContext(
            SiteTree::class,
            $page->scaffoldSearchFields(),
            $page->defaultSearchFilters()
        );
        $result = $context->getQuery(['q' => $searchTerm]);

        $this->assertListContains($expected, $result);
    }

    public static function searchProvider(): array
    {
        return [
            'Nested block data' => [
                'renderElements' => true,
                'searchTerm' => 'specifically',
                'expected' => [['Title' => 'Content blocks page']],
            ],
            'Regular page data' => [
                'renderElements' => true,
                'searchTerm' => 'regular',
                'expected' => [['Title' => 'Regular page']],
            ],
            'Combined results' => [
                'renderElements' => true,
                'searchTerm' => 'content',
                'expected' => [
                    ['Title' => 'Content blocks page'],
                    ['Title' => 'Regular page'],
                ],
            ],
            'render_elements true - text search' => [
                'renderElements' => true,
                'searchTerm' => 'This content is rendered',
                'expected' => [['Title' => 'Content blocks page']],
            ],
            'render_elements true - unrendered search' => [
                'renderElements' => true,
                'searchTerm' => 'This field is unrendered',
                'expected' => [],
            ],
            'render_elements true - extended search' => [
                'renderElements' => true,
                'searchTerm' => 'This content is from an extension hook',
                'expected' => [],
            ],
            'render_elements true - int search' => [
                'renderElements' => true,
                'searchTerm' => '456',
                'expected' => [],
            ],
            'render_elements true - enum search' => [
                'renderElements' => true,
                'searchTerm' => 'Sunny',
                'expected' => [],
            ],
            'render_elements false - text search' => [
                'renderElements' => false,
                'searchTerm' => 'This content is rendered',
                'expected' => [['Title' => 'Content blocks page']],
            ],
            'render_elements false - unrendered search' => [
                'renderElements' => false,
                'searchTerm' => 'This field is unrendered',
                'expected' => [['Title' => 'Content blocks page']],
            ],
            'render_elements false - extended search' => [
                'renderElements' => false,
                'searchTerm' => 'This content is from an extension hook',
                'expected' => [['Title' => 'Content blocks page']],
            ],
            'render_elements false - int search' => [
                'renderElements' => false,
                'searchTerm' => '456',
                'expected' => [],
            ],
            'render_elements false - enum search' => [
                'renderElements' => false,
                'searchTerm' => 'Sunny',
                'expected' => [],
            ],
        ];
    }
}
