<?php

namespace DNADesign\Elemental\Tasks;

use DNADesign\Elemental\Extensions\ElementalAreasExtension;
use DNADesign\Elemental\Extensions\ElementalPageExtension;
use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Models\ElementContent;
use Exception;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Core\Config\Config;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Dev\BuildTask;
use SilverStripe\Versioned\Versioned;

class MigrateContentToElement extends BuildTask
{
    /**
     * Configures if the existing content should be cleared once the migration task has completed.
     *
     * @config
     * @var bool
     */
    private static $clear_content = true;

    /**
     * The FQN of an element that will be the target of the content
     *
     * @config
     * @var string
     */
    private static $target_element = ElementContent::class;

    /**
     * The name of the field on the `target_element` where the content should be placed
     *
     * @config
     * @var string
     */
    private static $target_element_field = 'HTML';

    /**
     * Indicates that the updated page and elements should be immediately published (provided the Versioned extension
     * is present, and the page was previously in a published state)
     *
     * @config
     * @var bool
     */
    private static $publish_changes = true;

    protected $title = 'MigrateContentToElement';

    protected $description = 'When installing Elemental this task converts content in the $Content '
        . 'field to an ElementContent';

    public function run($request)
    {
        $pageTypes = singleton(ElementalArea::class)->supportedPageTypes();
        $count = 0;
        foreach ($pageTypes as $pageType) {
            // Only pages that have the ElementalPageExtension have a known ElementalArea relation
            if (!$this->isMigratable($pageType)) {
                continue;
            }

            $pages = $pageType::get()->filter('Content:not', ['', null]);
            $clearContent = $this->config()->get('clear_content');

            $this->extend('updatePageFilter', $pages, $pageType);
            $pageTypeCount = 0;

            /** @var SiteTree&ElementalAreasExtension $page */
            foreach ($pages as $page) {
                if ($this->shouldSkipMigration($page)) {
                    continue;
                }
                // Fetch and clear existing content (if configured)
                $content = $page->Content;
                $pageIsLive = $page->isPublished();
                if ($clearContent) {
                    $page->Content = '';
                }

                // Get the area
                $area = $this->getAreaRelationFromPage($page);

                // Write the page if we're clearing content or if the area doesn't exist - we write to trigger a
                // relationship update
                if ($clearContent || !$area->exists()) {
                    try {
                        $page->write();
                    } catch (Exception $e) {
                        echo sprintf(
                            'Could not clear content on page %s: %s',
                            $page->ID,
                            $e->getMessage()
                        );
                    }

                    if (!$area->exists()) {
                        $area = $this->getAreaRelationFromPage($page);
                    }
                }

                // Create a new element
                /** @var BaseElement $element */
                $element = Injector::inst()->create($this->config()->get('target_element'));
                $element->Title = 'Auto migrated content';

                // Set the configured field
                $element->setField($this->config()->get('target_element_field'), $content);

                // Provide an extension hook for further updates to the new element
                $this->extend('updateMigratedElement', $element, $content, $page);

                // Add and write to the area
                $area->Elements()->add($element);

                // Publish the record if configured
                if ($this->config()->get('publish_changes') && $pageIsLive) {
                    $page->publishRecursive();
                }

                $pageTypeCount++;
            }
            $count += $pageTypeCount;
            echo 'Migrated ' . $pageTypeCount . ' ' . $pageType . ' pages\' content<br>';
        }
        echo 'Finished migrating ' . $count . ' pages\' content<br>';
    }

    /**
     * Indicates if the given page type is migratable
     *
     * @param string|SiteTree $pageType
     * @return bool
     */
    protected function isMigratable($pageType)
    {
        $migratable = SiteTree::has_extension($pageType, ElementalPageExtension::class);
        if (in_array($pageType, Config::inst()->get(ElementalPageExtension::class, 'ignored_classes') ?? [])) {
            $migratable = false;
        }

        $this->extend('updateIsMigratable', $migratable, $pageType);

        return $migratable;
    }

    /**
     * Extracts the relevant ElementalArea from the given page. This can be overloaded for custom page types that might
     * prefer an alternate area to hold the migrated content
     *
     * @param SiteTree&ElementalPageExtension $page
     * @return ElementalArea
     */
    protected function getAreaRelationFromPage(SiteTree $page)
    {
        return $page->ElementalArea;
    }

    /**
     * Assert that the given page should actually have content migrated. By default this asserts that no elements
     * currently exist IFF the "clear_content" config is on
     *
     * @param SiteTree $page
     * @return bool
     */
    protected function shouldSkipMigration(SiteTree $page)
    {
        $skip = !$this->config()->get('clear_content')
            && $this->getAreaRelationFromPage($page)->Elements()->count() > 0;

        $this->extend('updatePageShouldSkip', $skip, $page);

        return $skip;
    }
}
