<?php

namespace DNADesign\Elemental\Tests\Extensions;

use DNADesign\Elemental\Extensions\ElementalAreasExtension;
use DNADesign\Elemental\Tests\Src\TestElement;
use DNADesign\Elemental\Tests\Src\TestUnusedElement;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Core\Config\Config;
use SilverStripe\Dev\SapphireTest;

class ElementalAreasExtensionTest extends SapphireTest
{
    protected static $required_extensions = [
        SiteTree::class => [
            ElementalAreasExtension::class,
        ],
    ];

    protected static $extra_dataobjects = [
        TestElement::class,
        TestUnusedElement::class,
    ];

    protected function setUp()
    {
        parent::setUp();

        $this->logInWithPermission('ADMIN');

        SiteTree::config()
            ->set('allowed_elements', null)
            ->set('disallowed_elements', []);
    }

    public function testGetElementalTypesSortsAlphabetically()
    {
        SiteTree::config()->set('sort_types_alphabetically', true);

        /** @var SiteTree|ElementalAreasExtension $page */
        $page = new SiteTree();
        $types = $page->getElementalTypes();

        $this->assertContainsInOrder(['A test element', 'Content', 'Unused Element'], array_values($types));
    }

    public function testGetElementalTypesAreNotSortedAlphabetically()
    {
        SiteTree::config()->set('sort_types_alphabetically', false);

        /** @var SiteTree|ElementalAreasExtension $page */
        $page = new SiteTree();
        $types = $page->getElementalTypes();

        $this->assertContainsInOrder(['Content', 'A test element', 'Unused Element'], array_values($types));
    }

    /**
     * We need to check that the order of the elements is correct, but there might be more element types installed than
     * we're aware of, so we first extract the elements we want from the source list and check the order afterwards.
     *
     * @param array $expected
     * @param array $actual
     */
    private function assertContainsInOrder(array $expected, array $actual)
    {
        $matches = array_values(array_intersect($actual, $expected));

        $this->assertSame($expected, $matches);
    }
}
