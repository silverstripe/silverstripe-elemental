<?php

namespace DNADesign\Elemental\Controllers;

use DNADesign\Elemental\Models\ElementalArea;
use SilverStripe\CMS\Controllers\CMSSiteTreeFilter;
use SilverStripe\Forms\DateField;
use SilverStripe\ORM\ArrayList;

class ElementalAreaCMSSiteTreeFilter extends CMSSiteTreeFilter {


	public static function title()
	{
		return _t('DNADesign\\Elemental\\Controllers\\CMSSiteTreeFilter_Search.Title', "All Elemental content");
	}

	public function getFilteredPages()
	{
		$elements = ElementalArea::get();
		$elements = $this->applyDefaultFilters($elements);
		$pages = new ArrayList();
		foreach($elements as $element) {
			$pages->push($element->getOwnerPage());
		}
		return $pages;
	}

	protected function applyDefaultFilters($query)
	{
		$sng = ElementalArea::singleton();
		foreach ($this->params as $name => $val) {
			if (empty($val)) {
				continue;
			}
			switch ($name) {
				case 'Term':

					$query = $query->filterAny(array(
						'SearchContent:PartialMatch' => $val
					));
					break;

				case 'LastEditedFrom':
					$fromDate = new DateField(null, null, $val);
					$query = $query->filter("LastEdited:GreaterThanOrEqual", $fromDate->dataValue().' 00:00:00');
					break;

				case 'LastEditedTo':
					$toDate = new DateField(null, null, $val);
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
						$query = $query->alterDataQuery(array($filter, 'apply'));
					}
			}
		}
		return $query;
	}

}
