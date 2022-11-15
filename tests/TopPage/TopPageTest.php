<?php

namespace DNADesign\Elemental\Tests\TopPage;

use DNADesign\Elemental\Extensions\ElementalAreasExtension;
use DNADesign\Elemental\Extensions\ElementalPageExtension;
use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\TopPage;
use Page;
use SilverStripe\Dev\Deprecation;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\ORM\DataObject;

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
            TopPage\SiteTreeExtension::class,
        ],
        ElementalArea::class => [
            TopPage\DataExtension::class,
        ],
        BaseElement::class => [
            TopPage\DataExtension::class,
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
        /** @var Page|TopPage\SiteTreeExtension $content */
        $page = $this->objFromFixture($pageClass, $pageIdentifier);

        /** @var DataObject|TopPage\DataExtension $object */
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
        if (Deprecation::isEnabled()) {
            $this->markTestSkipped('Test calls deprecated code');
        }
        /** @var TopPage\DataExtension $extension */
        $extension = singleton(TopPage\DataExtension::class);
        $extension->withTopPageUpdate(
            true,
            function () use ($pageIdentifier, $pageClass, $objectIdentifier, $objectClass): void {
                /** @var Page|TopPage\SiteTreeExtension $content */
                $page = $this->objFromFixture($pageClass, $pageIdentifier);

                /** @var DataObject|TopPage\DataExtension $object */
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
        );
    }

    public function testNewPage(): void
    {
        if (Deprecation::isEnabled()) {
            $this->markTestSkipped('Test calls deprecated code');
        }
        /** @var TopPage\DataExtension $extension */
        $extension = singleton(TopPage\DataExtension::class);
        $extension->withTopPageUpdate(
            true,
            function (): void {
                $page = TestBlockPage::create();
                $page->Title = 'New page test';
                $page->write();

                /** @var ElementalArea|TopPage\DataExtension $area */
                $area = $page->ElementalArea();
                $this->assertEquals((int) $page->ID, (int) $area->TopPageID);
            }
        );
    }

    /**
     * @param bool $populateTopPage
     * @dataProvider populateTopPageProvider
     */
    public function testNewBlock(bool $populateTopPage): void
    {
        if (Deprecation::isEnabled()) {
            $this->markTestSkipped('Test calls deprecated code');
        }
        /** @var TopPage\DataExtension $extension */
        $extension = singleton(TopPage\DataExtension::class);
        $extension->withTopPageUpdate(
            true,
            function () use ($populateTopPage): void {
                if ($populateTopPage) {
                    $this->populateTopPageForAllObjects();
                }

                /** @var TestBlockPage $page */
                $page = $this->objFromFixture(TestBlockPage::class, 'block-page1');

                /** @var ElementalArea $area */
                $area = $this->objFromFixture(ElementalArea::class, 'area3');

                /** @var TestContent|TopPage\DataExtension $content */
                $content = TestContent::create();
                $content->Title = 'Fresh block';

                $area->Elements()->add($content);
                $content = DataObject::get($content->ClassName)->byID($content->ID);

                $this->assertEquals((int) $page->ID, (int) $content->TopPageID);
            }
        );
    }

    /**
     * This test is checking for page duplication in two cases
     * Case 1: standard duplication
     * Case 2: duplication with a fixed page setting
     * The seconds case shows that it's possible to use the withFixedTopPage to set the top page to arbitrary value
     * and completely bypass page determination logic
     * This is needed in some edge cases were automatic determination is not possible due to the object not being
     * assigned to the parent object at the time of duplication but rather later
     *
     * @param int $fixedPageID
     * @dataProvider fixedPagesProvider
     */
    public function testPageDuplication(int $fixedPageID): void
    {
        if (Deprecation::isEnabled()) {
            $this->markTestSkipped('Test calls deprecated code');
        }
        /** @var TopPage\DataExtension $extension */
        $extension = singleton(TopPage\DataExtension::class);
        $extension->withFixedTopPage($fixedPageID, function () use ($extension, $fixedPageID) {
            $extension->withTopPageUpdate(
                true,
                function () use ($fixedPageID): void {
                    $this->populateTopPageForAllObjects();

                    /** @var TestBlockPage $page */
                    $page = $this->objFromFixture(TestBlockPage::class, 'block-page1');

                    /** @var TestChildPage $childPage */
                    $childPage = $this->objFromFixture(TestChildPage::class, 'child-page1');

                    $page->duplicate();
                    $pages = TestBlockPage::get()->filter(['Title' => 'BlockPage1'])->sort('ID', 'DESC');

                    $this->assertCount(2, $pages);

                    $pageClone = $pages->first();
                    $childPages = TestChildPage::get()->filter(['Title' => 'ChildPage1'])->sort('ID', 'DESC');

                    $this->assertCount(2, $childPages);

                    $childClone = $childPages->first();

                    $this->assertNotEquals((int) $childPage->ID, (int) $childClone->ID);

                    $objects = [
                        [TestList::class, 'List1', $pageClone],
                        [TestContent::class, 'Content1', $pageClone],
                        [TestList::class, 'List2', $childClone],
                        [TestContent::class, 'Content2', $childClone],
                    ];

                    foreach ($objects as $objectData) {
                        $class = array_shift($objectData);
                        $title = array_shift($objectData);
                        $page = array_shift($objectData);

                        $items = DataObject::get($class)->filter(['Title' => $title])->sort('ID', 'DESC');

                        $this->assertCount(2, $items);

                        /** @var DataObject|TopPage\DataExtension $objectClone */
                        $objectClone = $items->first();

                        $expected = $fixedPageID ?: (int) $page->ID;
                        $this->assertEquals($expected, (int) $objectClone->TopPageID);

                        /** @var ElementalArea|TopPage\DataExtension $area */
                        $area = $objectClone->Parent();

                        $this->assertEquals($expected, (int) $area->TopPageID);
                    }
                }
            );
        });
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
