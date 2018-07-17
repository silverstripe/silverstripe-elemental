<?php

namespace DNADesign\Elemental\Controllers;

use DNADesign\Elemental\Extensions\ElementalPageExtension;
use SilverStripe\CMS\Controllers\CMSSiteTreeFilter_Search;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Core\Config\Config;
use SilverStripe\Forms\DateField;
use SilverStripe\ORM\ArrayList;
use SilverStripe\ORM\DataList;
use SilverStripe\View\SSViewer;

class ElementSiteTreeFilterSearch extends CMSSiteTreeFilter_Search
{
    /**
     * @var array
     */
    private $extraTermFilters = [];

    /**
     * We can't use ORM filtering for PHP methods, so we'll perform our own PHP "search" and get a list of
     * matching SiteTree record IDs, then add that to the original ORM query.
     *
     * @param DataList $query Unfiltered query
     * @return DataList
     */
    protected function applyDefaultFilters($query)
    {
        // If not filtering by a Term then skip this altogether
        if (empty($this->params['Term'])) {
            return parent::applyDefaultFilters($query);
        }

        // Enable frontend themes in order to correctly render the elements as they would be for the frontend
        Config::nest();
        SSViewer::set_themes(SSViewer::config()->get('themes'));

        // Get an array of SiteTree record IDs that match the search term in nested element data
        /** @var ArrayList $siteTrees */
        $siteTrees = $query->filterByCallback(function (SiteTree $siteTree) {
            // Filter by elemental PHP
            if (!$siteTree->hasExtension(ElementalPageExtension::class)) {
                return false;
            }

            // Check whether the search term exists in the nested page content
            $pageContent = $siteTree->getElementsForSearch();
            return (bool) stripos($pageContent, $this->params['Term']) !== false;
        });

        // Return themes back for the CMS
        Config::unnest();

        if ($siteTrees->count()) {
            // Apply the list of IDs as an extra filter
            $this->extraTermFilters['ID:ExactMatch'] = $siteTrees->column('ID');
        }

        return $this->applyWithExtraTermFilters($query);
    }

    /**
     * Method is a copy of {@link CMSSiteTreeFilter::applyDefaultFilters} with one line added to the Term
     * filter array to merge in a custom array of "extra term filters", since we cannot modify the list
     * after the filters have been applied by the parent class.
     *
     * PLEASE NOTE: This method is likely to be removed in a future minor version of the module. Do not rely
     * on it.
     *
     * @internal
     *
     * @param DataList $query
     * @return DataList
     */
    private function applyWithExtraTermFilters($query)
    {
        $sng = SiteTree::singleton();
        foreach ($this->params as $name => $val) {
            if (empty($val)) {
                continue;
            }

            switch ($name) {
                case 'Term':
                    $query = $query->filterAny([
                        'URLSegment:PartialMatch' => $val,
                        'Title:PartialMatch' => $val,
                        'MenuTitle:PartialMatch' => $val,
                        'Content:PartialMatch' => $val
                        ] + $this->extraTermFilters); // NB: only modified line
                    break;

                case 'LastEditedFrom':
                    $fromDate = DateField::create(null, null, $val);
                    $query = $query->filter("LastEdited:GreaterThanOrEqual", $fromDate->dataValue().' 00:00:00');
                    break;

                case 'LastEditedTo':
                    $toDate = DateField::create(null, null, $val);
                    $query = $query->filter("LastEdited:LessThanOrEqual", $toDate->dataValue().' 23:59:59');
                    break;

                case 'ClassName':
                    if ($val != 'All') {
                        $query = $query->filter('ClassName', $val);
                    }
                    break;

                default:
                    $field = $sng->dbObject($name);
                    if ($field) {
                        $filter = $field->defaultSearchFilter();
                        $filter->setValue($val);
                        $query = $query->alterDataQuery([$filter, 'apply']);
                    }
            }
        }
        return $query;
    }
}
