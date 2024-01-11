<?php

namespace DNADesign\Elemental\Extensions;

use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementalArea;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Control\Controller;
use SilverStripe\View\Parsers\HTMLValue;
use SilverStripe\View\SSViewer;

/**
 * @property int ElementalAreaID
 * @method ElementalArea ElementalArea()
 *
 * @extends ElementalAreasExtension<SiteTree>
 */
class ElementalPageExtension extends ElementalAreasExtension
{
    private static $has_one = [
        'ElementalArea' => ElementalArea::class,
    ];

    private static $owns = [
        'ElementalArea',
    ];

    private static $cascade_duplicates = [
        'ElementalArea',
    ];

    /**
     * The delimiter to separate distinct elements in indexed content.
     *
     * When using the getElementsForSearch() method to index all elements in a single field,
     * a custom delimiter can be used help to avoid false positive results for phrase queries.
     *
     * @config
     * @var string
     */
    private static $search_index_element_delimiter = ' ';

    /**
     * Used to cache all ElementalArea's prior to eager loading elements
     *
     * @internal
     */
    private static ?array $elementalAreas = null;

    /**
     * Returns the contents of each ElementalArea has_one's markup for use in Solr or Elastic search indexing
     *
     * @return string
     */
    public function getElementsForSearch()
    {
        $oldThemes = SSViewer::get_themes();
        SSViewer::set_themes(SSViewer::config()->get('themes'));
        try {
            $output = [];
            $elements = $this->getEagerLoadedElements();
            /** @var BaseElement $element */
            foreach ($elements as $element) {
                if (!$element->getSearchIndexable()) {
                    continue;
                }
                $content = $element->getContentForSearchIndex();
                if ($content) {
                    $output[] = $content;
                }
            }
        } finally {
            // Reset theme if an exception occurs, if you don't have a
            // try / finally around code that might throw an Exception,
            // CMS layout can break on the response. (SilverStripe 4.1.1)
            SSViewer::set_themes($oldThemes);
        }
        return implode($this->owner->config()->get('search_index_element_delimiter') ?? '', $output);
    }

    /**
     * Returns the contents of all Elements on the pages ElementalAreas for use in CMS search
     */
    public function getContentFromElementsForCmsSearch(): string
    {
        $output = [];
        $elements = $this->getEagerLoadedElements();
        /** @var BaseElement $element */
        foreach ($elements as $element) {
            if (!$element->getSearchIndexable()) {
                continue;
            }
            $content = $element->getContentForCmsSearch();
            if ($content) {
                $output[] = $content;
            }
        }
        // Use |%| to delimite different elements rather than space so that you don't
        // accidentally join results of two elements that are next to each other in a table
        return implode('|%|', $output);
    }

    /**
     * @see SiteTree::getAnchorsOnPage()
     */
    public function updateAnchorsOnPage(array &$anchors): void
    {
        if (!($this->owner instanceof SiteTree)) {
            return;
        }
        $this->loopThroughElements(function (BaseElement $element) use (&$anchors) {
            $anchors = array_merge($anchors, $element->getAnchorsInContent());
        });
    }

    public function MetaTags(&$tags)
    {
        if (!Controller::has_curr()) {
            return;
        }
        $controller = Controller::curr();
        $request = $controller->getRequest();
        if ($request->getVar('ElementalPreview') !== null) {
            $html = HTMLValue::create($tags);
            $xpath = "//meta[@name='x-page-id' or @name='x-cms-edit-link']";
            $removeTags = $html->query($xpath);
            $body = $html->getBody();
            foreach ($removeTags as $tag) {
                $body->removeChild($tag);
            }
            $tags = $html->getContent();
        }
    }

    private function getEagerLoadedElements(): array
    {
        $elements = [];
        if (is_null(self::$elementalAreas)) {
            self::$elementalAreas = [];
            foreach (ElementalArea::get()->eagerLoad('Elements') as $elementalArea) {
                self::$elementalAreas[$elementalArea->ID] = $elementalArea;
            }
        }
        foreach ($this->owner->hasOne() as $relation => $class) {
            if (!is_a($class, ElementalArea::class, true)) {
                continue;
            }
            $elementalAreaID = $this->owner->{"{$relation}ID"};
            if ($elementalAreaID && array_key_exists($elementalAreaID, self::$elementalAreas)) {
                $elementalArea = self::$elementalAreas[$elementalAreaID];
            } else {
                $elementalArea = $this->owner->$relation();
            }
            foreach ($elementalArea->Elements() as $element) {
                $elements[] = $element;
            }
        }
        return $elements;
    }

    /**
     * Call some function over all elements belonging to this page
     */
    private function loopThroughElements(callable $callback): void
    {
        foreach ($this->owner->hasOne() as $key => $class) {
            if ($class !== ElementalArea::class) {
                continue;
            }
            /** @var ElementalArea $area */
            $area = $this->owner->$key();
            if ($area) {
                foreach ($area->Elements() as $element) {
                    $callback($element);
                }
            }
        }
    }
}
