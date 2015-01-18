<?php

class ElementChildrenList extends BaseElement {

	private static $db = array(
		'SortString' => 'Varchar(100)'
	);

	private static $has_one = array(
		'ParentPage' => 'SiteTree'
	);

	private static $title = "Show a list of pages in a list.";

	public function getChildrenList() {
		if($page = $this->ParentPage()) {
			return $page->AllChildren()->sort($this->SortString);
		}

		return null;
	}
}