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

        $this->assertSame(['A test element', 'Content', 'Unused Element'], array_values($types));
    }

    public function testGetElementalTypesAreNotSortedAlphabetically()
    {
        SiteTree::config()->set('sort_types_alphabetically', false);

        /** @var SiteTree|ElementalAreasExtension $page */
        $page = new SiteTree();
        $types = $page->getElementalTypes();

        $this->assertSame(['Content', 'A test element', 'Unused Element'], array_values($types));
    }
}
