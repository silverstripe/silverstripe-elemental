<?php

namespace DNADesign\Elemental\Tests;

use DNADesign\Elemental\Extensions\ElementalPageExtension;
use Page;
use SilverStripe\CMS\Model\RedirectorPage;
use SilverStripe\Dev\FunctionalTest;

class ElementalPageExtensionTests extends FunctionalTest
{
    protected static $fixture_file = 'ElementalPageExtensionTests.yml';

    protected static $required_extensions = [
        Page::class => [
            ElementalPageExtension::class,
        ],
    ];

    public function testUpdateCmsFields()
    {
        $page = $this->objFromFixture(Page::class, 'elementaldemo');

        $elementalArea = $page->getCMSFields()->dataFieldByName('ElementalArea');
        $this->assertNotNull($elementalArea);

        $content = $page->getCMSFields()->dataFieldByName('Content');
        $this->assertNull($content);

        $redirect = $this->objFromFixture(RedirectorPage::class, 'elementredirectpage');
        $elementalArea = $redirect->getCMSFields()->dataFieldByName('ElementalArea');

        $this->assertNull($elementalArea);
    }

    public function testGetElementalTypes()
    {
        $page = $this->objFromFixture(Page::class, 'elementaldemo');
        $types = $page->getElementalTypes();

        $this->assertArrayHasKey(ElementContent::class, $types);
        $this->assertArrayNotHasKey(BaseElement::class, $type, 'Base class should not appear');

        // if we disallow a type then it should remove it
        Config::modify()->set(Page::class, 'disallowed_elements', [
            ElementContent::class
        ]);

        $types = $page->getElementalTypes();
        $this->assertArrayNotHasKey(ElementContent::class, $type, 'Disallowed items should not appear');

        // conversely, if we set allowed items to a number of classes then they
        // should be the only ones to appear.
        Config::modify()->set(Page::class, 'allowed_elements', [
            TestElement::class
        ]);

        Config::modify()->remove(Page::class, 'disallowed_elements');
        $types = $page->getElementalTypes();

        $this->assertArrayNotHasKey(ElementContent::class, $type, 'Disallowed items should not appear');
        $this->assertArrayHasKey(TestElement::class, $types);

        $this->assertEquals('A test element', $types[TestElement::class], 'Types should use their i18n name');
    }
}
