<?php

namespace DNADesign\Elemental\Tests;

use DNADesign\Elemental\Extensions\ElementalPageExtension;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Tests\Src\TestElement;
use DNADesign\Elemental\Tests\Src\TestPage;
use Page;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\Versioned\Versioned;

class ElementalAreaTest extends SapphireTest
{
    protected static $fixture_file = 'ElementalAreaTest.yml';

    protected static $required_extensions = [
        Page::class => [
            ElementalPageExtension::class,
        ],
    ];

    protected static $extra_dataobjects = [
        TestElement::class,
        TestPage::class,
    ];

    public function testElementControllers()
    {
        $area = $this->objFromFixture(ElementalArea::class, 'area1');
        $controllers = $area->ElementControllers();

        $this->assertEquals(2, $controllers->count(), 'Should be a controller per element');
    }


    public function testViewPermissionsAreChecked()
    {
        $area = $this->objFromFixture(ElementalArea::class, 'area2');
        $controllers = $area->ElementControllers();
        $elements = $area->Elements();

        $this->assertEquals(1, $controllers->count(),
            'Should be one controller only, since one of the elements is not viewable');
        $this->assertEquals(2, $elements->count());
    }

    public function testGetOwnerPage()
    {
        $area1 = $this->objFromFixture(ElementalArea::class, 'area1');
        $area2 = $this->objFromFixture(ElementalArea::class, 'area2');

        // OwnerClassName not set
        $ownerpage1 = $area1->getOwnerPage();
        // OwnerClassName set
        $ownerpage2 = $area2->getOwnerPage();

        $this->assertEquals("DNADesign\Elemental\Tests\Src\TestPage", $ownerpage1);
        $this->assertEquals("DNADesign\Elemental\Tests\Src\TestPage", $ownerpage2);
    }

    public function testForTemplate()
    {
        $area = $this->objFromFixture(ElementalArea::class, 'area1');

        $this->assertContains('Hello Test', $area->forTemplate());
        $this->assertContains('Hello Test 2', $area->forTemplate());
    }

    public function testCanBePublished()
    {
        $member = $this->logInWithPermission('SITETREE_EDIT_ALL');

        /** @var Page $page */
        $page = $this->objFromFixture(TestPage::class, 'page1');
        $this->assertTrue($page->canPublish($member));

        /** @var ElementalArea|Versioned $area */
        $area = $this->objFromFixture(ElementalArea::class, 'area1');
        $this->assertTrue($area->canPublish($member));

        /** @var TestElement|Versioned $element */
        $element = $this->objFromFixture(TestElement::class, 'element1');
        $this->assertTrue($element->canPublish($member));
    }

    public function testDuplicate()
    {
        /** @var ElementalArea $area */
        $area = $this->objFromFixture(ElementalArea::class, 'area1');
        $areaIds = $area->Elements()->column('ID');
        $this->assertCount(2, $areaIds);

        $duplicatedArea = $area->duplicate(true);
        $duplicatedAreaIds = $duplicatedArea->Elements()->column('ID');
        $this->assertCount(2, $duplicatedAreaIds);
        $this->assertNotEquals($areaIds, $duplicatedAreaIds);
    }
}
