<?php

namespace DNADesign\Elemental\Tests;

use DNADesign\Elemental\Extensions\ElementalPageExtension;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Models\ElementContent;
use DNADesign\Elemental\Tests\Src\TestElement;
use DNADesign\Elemental\Tests\Src\TestPage;
use Page;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\ORM\ArrayList;
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

    public function testCanViewTestElementIsFalseWhenLoggedInAsCmsEditor()
    {
        /** @var ElementalArea $area */
        $area = $this->objFromFixture(ElementalArea::class, 'area2');
        // Content editors do not have permission to view the TestElement
        $this->logInWithPermission('VIEW_DRAFT_CONTENT');

        $controllers = $area->ElementControllers();
        $this->assertCount(2, $area->Elements(), 'There are two elements in total');
        $this->assertCount(
            1,
            $controllers,
            'Should be one controller only, since TestElement is not viewable by non-admins'
        );
    }

    public function testCanViewTestElementIsTrueForAdmins()
    {
        /** @var ElementalArea $area */
        $area = $this->objFromFixture(ElementalArea::class, 'area2');
        // Admin users have permission to view the TestElement
        $this->logInWithPermission('ADMIN');

        $controllers = $area->ElementControllers();
        $this->assertCount(2, $area->Elements(), 'There are two elements in total');
        $this->assertCount(
            2,
            $controllers,
            'Should be two controllers when logged in as admin'
        );
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

        // if ownerpage1 has draft changes then getOwnerPage() should return the
        // live version of the owner page, since the draft record will be
        // unviewable by logged out users
        $ownerpage1->publishRecursive();

        $ownerpage1->Title = 'I have edited the page';
        $ownerpage1->writeToStage(Versioned::DRAFT);

        $liveOwner = Versioned::withVersionedMode(function () use ($area1) {
            Versioned::set_stage(Versioned::LIVE);
            $page = $area1->getOwnerPage();

            return $page;
        });

        $this->assertEquals($liveOwner->Title, 'Page 1', 'getOwnerPage returns live version of page, not the draft');
    }

    public function testForTemplate()
    {
        $area = $this->objFromFixture(ElementalArea::class, 'area1');

        $this->assertStringContainsString('Hello Test', $area->forTemplate());
        $this->assertStringContainsString('Hello Test 2', $area->forTemplate());
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

    public function testUnsavedRelationListOfElementsReturnsEmptyArrayList()
    {
        $area = new ElementalArea();

        $element = new ElementContent();
        $element->HTML = 'Test';

        $area->Elements()->add($element);

        $result = $area->ElementControllers();
        $this->assertInstanceOf(ArrayList::class, $result);
        $this->assertEmpty($result);
    }

    public function testElementsListIsCached()
    {
        $area = new ElementalArea();

        $element = new ElementContent();
        $element->HTML = 'Test';

        $elements = new ArrayList([$element]);

        $area->setElementsCached($elements);

        $this->assertSame($elements, $area->Elements());
    }
}
