<?php
namespace DNADesign\Elemental\Tests\Tasks;

use DNADesign\Elemental\Extensions\ElementalPageExtension;
use DNADesign\Elemental\Models\ElementContent;
use DNADesign\Elemental\Tasks\MigrateContentToElement;
use DNADesign\Elemental\Tests\Src\TestElement;
use DNADesign\Elemental\Tests\Src\TestPage;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\Core\Config\Config;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\ORM\HasManyList;
use SilverStripe\Versioned\Versioned;

class MigrateContentToElementTest extends SapphireTest
{
    protected static $fixture_file = 'MigrateContentToElementTest.yml';

    protected static $required_extensions = [
        TestPage::class => [
            ElementalPageExtension::class,
        ],
    ];

    protected static $extra_dataobjects = [
        TestElement::class,
        TestPage::class,
    ];

    protected function setUp()
    {
        TestPage::create()->flushCache();
        parent::setUp();
    }

    public function testContentIsMigratedFromPagesToNewElements()
    {
        $task = new MigrateContentToElement();

        // Ensure the page that should be edited is published to begin with
        /** @var TestPage&Versioned $page */
        $page = $this->objFromFixture(TestPage::class, 'page3');
        $page->publishSingle();

        ob_start();
        $task->run(new HTTPRequest('GET', ''));
        $output = ob_get_clean();

        $this->assertContains('Finished migrating 1 pages\' content', $output);

        // Get the page that should've been updated and the content should be removed
        $page = $this->objFromFixture(TestPage::class, 'page3');
        $this->assertEmpty($page->Content);

        // Check that there's one element and it contains the old content
        /** @var HasManyList $elements */
        $elements = $page->ElementalArea->Elements();
        $this->assertCount(1, $elements);

        /** @var ElementContent&Versioned $contentElement */
        $contentElement = $elements->first();
        $this->assertSame('This is page 3', $contentElement->HTML);

        // Assert that the element and page are "live"
        $this->assertTrue($contentElement->isLiveVersion());
        $this->assertTrue($page->isLiveVersion());
    }

    public function testContentIsNotClearedWhenConfigured()
    {
        Config::modify()->set(MigrateContentToElement::class, 'clear_content', false);

        $task = new MigrateContentToElement();

        ob_start();
        $task->run(new HTTPRequest('GET', ''));
        $output = ob_get_clean();

        $this->assertContains('Finished migrating 1 pages\' content', $output);

        $page = $this->objFromFixture(TestPage::class, 'page3');
        $this->assertContains('This is page 3', $page->Content, 'Content is not removed from the page');

        $element = $page->ElementalArea->Elements()->first();
        $this->assertContains('This is page 3', $element->HTML, 'Content is still added to a new element');

        // Run the task again and assert the page is not picked up again
        ob_start();
        $task->run(new HTTPRequest('GET', ''));
        $output = ob_get_clean();

        $this->assertContains('Finished migrating 0 pages\' content', $output);
        $page = $this->objFromFixture(TestPage::class, 'page3');
        $this->assertCount(1, $page->ElementalArea->Elements());
    }

    public function testTargetElementConfigurationIsRespected()
    {
        Config::modify()->set(MigrateContentToElement::class, 'target_element', TestElement::class);
        Config::modify()->set(MigrateContentToElement::class, 'target_element_field', 'TestValue');

        $task = new MigrateContentToElement();

        ob_start();
        $task->run(new HTTPRequest('GET', ''));
        $output = ob_get_clean();

        $this->assertContains('Finished migrating 1 pages\' content', $output);

        // Get the page that should've been updated and the content should be removed
        $element = $this->objFromFixture(TestPage::class, 'page3')->ElementalArea->Elements()->first();

        $this->assertInstanceOf(TestElement::class, $element);
        $this->assertSame('This is page 3', $element->TestValue);
    }

    public function testPublishingConfigurationIsRespected()
    {
        Config::modify()->set(MigrateContentToElement::class, 'publish_changes', false);

        // Ensure the page is published to begin with
        /** @var TestPage&Versioned $page */
        $page = $this->objFromFixture(TestPage::class, 'page3');
        $page->publishSingle();

        $task = new MigrateContentToElement();

        ob_start();
        $task->run(new HTTPRequest('GET', ''));
        $output = ob_get_clean();

        $this->assertContains('Finished migrating 1 pages\' content', $output);

        // Get the page that should've been updated and the content should be removed
        $page = $this->objFromFixture(TestPage::class, 'page3');
        /** @var ElementContent&Versioned $element */
        $element = $page->ElementalArea->Elements()->first();

        $this->assertSame('This is page 3', $element->HTML);

        $this->assertFalse($page->isLiveVersion());
        $this->assertFalse($element->isLiveVersion());

        $this->assertFalse($element->isPublished());
        $this->assertEmpty($page->Content);

        $livePage = Versioned::get_by_stage(TestPage::class, Versioned::LIVE)->byID($page->ID);
        $this->assertSame('This is page 3', $livePage->Content);
    }

    public function testPagesThatWereNotPublishedAreNotPublishedDuringThisTask()
    {
        $task = new MigrateContentToElement();

        ob_start();
        $task->run(new HTTPRequest('GET', ''));
        $output = ob_get_clean();

        $this->assertContains('Finished migrating 1 pages\' content', $output);

        // Get the page that should've been updated and the content should be removed
        /** @var TestPage&Versioned $page */
        $page = $this->objFromFixture(TestPage::class, 'page3');
        $this->assertEmpty($page->Content);

        // Check that there's one element and it contains the old content
        /** @var HasManyList $elements */
        $elements = $page->ElementalArea->Elements();
        $this->assertCount(1, $elements);

        /** @var ElementContent&Versioned $contentElement */
        $contentElement = $elements->first();
        $this->assertSame('This is page 3', $contentElement->HTML);

        // Assert that the element and page are "live"
        $this->assertFalse($contentElement->isLiveVersion());
        $this->assertFalse($page->isLiveVersion());
    }

    public function testIgnoredClassesContentIsNotCleared()
    {
        Config::modify()->set(ElementalPageExtension::class, 'ignored_classes', [TestPage::class]);
        $task = new MigrateContentToElement();

        // Ensure the page is published to begin with to meet criteria for being migrated
        /** @var TestPage&Versioned $page */
        $page = $this->objFromFixture(TestPage::class, 'page3');
        $page->publishSingle();

        ob_start();
        $task->run(new HTTPRequest('GET', ''));
        $output = ob_get_clean();

        $this->assertContains('Finished migrating 0 pages\' content', $output);

        // Get the page and confirm its content has not been altered.
        $page = $this->objFromFixture(TestPage::class, 'page3');
        $this->assertSame('This is page 3', $page->Content);

        // Check that no elements were created.
        /** @var HasManyList $elements */
        $elements = $page->ElementalArea->Elements();
        $this->assertCount(0, $elements);

        // Assert that the element is still "live"
        $this->assertTrue($page->isLiveVersion());
    }
}
