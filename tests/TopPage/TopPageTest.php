<?php

namespace DNADesign\Elemental\Tests\TopPage;

use DNADesign\Elemental\Extensions\ElementalAreasExtension;
use DNADesign\Elemental\Extensions\ElementalPageExtension;
use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementalArea;
use Page;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\ORM\DataObject;
use DNADesign\Elemental\Extensions\TopPageElementExtension;
use DNADesign\Elemental\Extensions\TopPageSiteTreeExtension;

class TopPageTest extends SapphireTest
{
    /**
     * @var string
     */
    protected static $fixture_file = 'TopPageTest.yml';

    /**
     * @var array
     */
    protected static $required_extensions = [
        TestBlockPage::class => [
            ElementalPageExtension::class,
        ],
        TestChildPage::class => [
            ElementalPageExtension::class,
        ],
        Page::class => [
            TopPageSiteTreeExtension::class,
        ],
        ElementalArea::class => [
            TopPageElementExtension::class,
        ],
        BaseElement::class => [
            TopPageElementExtension::class,
        ],
        TestList::class => [
            ElementalAreasExtension::class,
        ],
    ];

    /**
     * @var array
     */
    protected static $extra_dataobjects = [
        TestContent::class,
        TestList::class,
        TestBlockPage::class,
        TestChildPage::class,
    ];

    /**
     * @param string $pageIdentifier
     * @param string $pageClass
     * @param string $objectIdentifier
     * @param string $objectClass
     * @dataProvider objectsProvider
     */
    public function testTestGetTopPage(
        string $pageIdentifier,
        string $pageClass,
        string $objectIdentifier,
        string $objectClass
    ): void {
        /** @var Page|TopPageSiteTreeExtension $content */
        $page = $this->objFromFixture($pageClass, $pageIdentifier);

        /** @var DataObject|TopPageElementExtension $object */
        $object = $this->objFromFixture($objectClass, $objectIdentifier);

        $topPage = $object->getTopPage();

        $this->assertNotNull($topPage);
        $this->assertEquals((int) $page->ID, (int) $topPage->ID);
    }

    /**
     * @param string $pageIdentifier
     * @param string $pageClass
     * @param string $objectIdentifier
     * @param string $objectClass
     * @dataProvider objectsProvider
     */
    public function testTestUpdateTopPageEmptyCache(
        string $pageIdentifier,
        string $pageClass,
        string $objectIdentifier,
        string $objectClass
    ): void {
        /** @var Page|TopPageSiteTreeExtension $content */
        $page = $this->objFromFixture($pageClass, $pageIdentifier);

        /** @var DataObject|TopPageElementExtension $object */
        $object = $this->objFromFixture($objectClass, $objectIdentifier);
        $initialObj = $objectClass::get()->sort('ID', 'DESC');

        $this->assertEquals(0, (int) $initialObj->TopPageID);

        $object->forceChange();
        $id = $object->write();
        $object = DataObject::get($object->ClassName)->byID($id);

        $this->assertEquals((int) $page->ID, (int) $object->TopPageID);

        // do a second write to make sure that we won't override existing top page
        $object->forceChange();
        $id = $object->write();
        $object = DataObject::get($object->ClassName)->byID($id);

        $this->assertEquals((int) $page->ID, (int) $object->TopPageID);
    }

    public function testNewPage(): void
    {
        $page = TestBlockPage::create();
        $page->Title = 'New page test';
        $page->write();

        /** @var ElementalArea|TopPageElementExtension $area */
        $area = $page->ElementalArea();
        $this->assertEquals((int) $page->ID, (int) $area->TopPageID);
    }

    /**
     * @param bool $populateTopPage
     * @dataProvider populateTopPageProvider
     */
    public function testNewBlock(bool $populateTopPage): void
    {
        if ($populateTopPage) {
            $this->populateTopPageForAllObjects();
        }

        /** @var TestBlockPage $page */
        $page = $this->objFromFixture(TestBlockPage::class, 'block-page1');

        /** @var ElementalArea $area */
        $area = $this->objFromFixture(ElementalArea::class, 'area3');

        /** @var TestContent|TopPageElementExtension $content */
        $content = TestContent::create();
        $content->Title = 'Fresh block';

        $area->Elements()->add($content);
        $content = DataObject::get($content->ClassName)->byID($content->ID);

        $this->assertEquals((int) $page->ID, (int) $content->TopPageID);
    }

    public function objectsProvider(): array
    {
        return [
            [
                'block-page1',
                TestBlockPage::class,
                'content1',
                TestContent::class,
            ],
            [
                'block-page1',
                TestBlockPage::class,
                'list1',
                TestList::class,
            ],
            [
                'block-page1',
                TestBlockPage::class,
                'area1',
                ElementalArea::class,
            ],
            [
                'block-page1',
                TestBlockPage::class,
                'area3',
                ElementalArea::class,
            ],
            [
                'child-page1',
                TestChildPage::class,
                'content2',
                TestContent::class,
            ],
            [
                'child-page1',
                TestChildPage::class,
                'list2',
                TestList::class,
            ],
            [
                'child-page1',
                TestChildPage::class,
                'area2',
                ElementalArea::class,
            ],
            [
                'child-page1',
                TestChildPage::class,
                'area4',
                ElementalArea::class,
            ],
        ];
    }

    public function populateTopPageProvider(): array
    {
        return [
            [true],
            [false],
        ];
    }

    public function fixedPagesProvider(): array
    {
        return [
            [0], // feature is disabled
            [99], // obviously non-existent page
        ];
    }

    private function populateTopPageForAllObjects(): void
    {
        $list = $this->objectsProvider();

        foreach ($list as $objects) {
            array_shift($objects);
            array_shift($objects);
            $identifier = array_shift($objects);
            $class = array_shift($objects);

            $object = $this->objFromFixture($class, $identifier);
            $object->forceChange();
            $object->write();
        }
    }
}
