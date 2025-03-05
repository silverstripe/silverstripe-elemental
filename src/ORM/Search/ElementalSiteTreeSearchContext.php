<?php

namespace DNADesign\Elemental\ORM\Search;

use DNADesign\Elemental\Extensions\ElementalPageExtension;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\CMS\Search\SiteTreeSearchContext;
use SilverStripe\Core\ClassInfo;
use SilverStripe\Core\Config\Config;
use SilverStripe\Core\Config\Configurable;
use SilverStripe\ORM\DataQuery;
use SilverStripe\ORM\Filters\ExactMatchFilter;

class ElementalSiteTreeSearchContext extends SiteTreeSearchContext
{
    use Configurable;

    /**
     * If false, the custom search against elemental block content will not be performed.
     * Set this to false for best performance.
     */
    private static bool $search_for_term_in_content = true;

    /**
     * Whether to render elements with templates when doing a CMS SiteTree search.
     * Setting this to false will give a big boost to performance with minimal impact to the user experience.
     */
    private static bool $render_elements = true;

    protected function generalSearchAcrossFields(
        string|array $searchPhrase,
        DataQuery $subGroup,
        array $searchableFields
    ): void {
        parent::generalSearchAcrossFields($searchPhrase, $subGroup, $searchableFields);

        if (static::config()->get('search_for_term_in_content') === false) {
            return;
        }

        if (!is_array($searchPhrase)) {
            $searchPhrase = [$searchPhrase];
        }

        $pageIDs = [];
        // The same extension can't be applied to the multiple classes in the same hierarchy
        // without causing a host of problems, so we can be confident that we're not getting any double ups here.
        $pageClassesWithExtension = ClassInfo::classesWithExtension(
            ElementalPageExtension::class,
            SiteTree::class,
            true
        );
        // Get a list of classes that can't have elemental blocks despite having the extension to reduce the amount of
        // records we're filtering through needlessly
        $ignoredClasses = Config::forClass(ElementalPageExtension::class)->get('ignored_classes');
        foreach ($ignoredClasses as $class) {
            $ignoredClasses = array_merge($ignoredClasses, ClassInfo::subclassesFor($class, false));
        }
        foreach ($pageClassesWithExtension as $class) {
            $list = $class::get();
            if (!empty($ignoredClasses)) {
                $list = $list->exclude(['ClassName' => $ignoredClasses]);
            }
            $idsForThisClass = $list->filterByCallback(function (SiteTree $siteTree) use ($searchPhrase) {
                // Check if any of the search phrase parts is in the content
                if (static::config()->get('render_elements') === true) {
                    $pageContent = $siteTree->getElementsForSearch();
                } else {
                    $pageContent = $siteTree->getContentFromElementsForCmsSearch();
                }
                foreach ($searchPhrase as $part) {
                    if (stripos($pageContent ?? '', $part) !== false) {
                        return true;
                    }
                }
                return false;
            })->column('ID');
            $pageIDs = array_merge($pageIDs, $idsForThisClass);
        }

        if (empty($pageIDs)) {
            return;
        }

        // Apply search filter to include these pages in the result
        $filter = ExactMatchFilter::create('ID');
        $filter->setModel($this->getModelClass());
        $filter->setValue($pageIDs);
        $this->applyFilter($filter, $subGroup, []);
    }
}
