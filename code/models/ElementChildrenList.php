<?php

class ElementChildrenList extends BaseElement {

	private static $db = array();

	private static $has_one = array(
		'ParentPage' => 'SiteTree'
	);

	private static $title = "Show a list of pages in a list.";
}