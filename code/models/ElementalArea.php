<?php

class ElementalArea extends WidgetArea {

	public function Elements() {
		$result = $this->getComponents('Widgets');

		$list = new HasManyList('BaseElement', $result->getForeignKey());
		$list->setDataModel($this->model);
		$list->sort('Sort ASC');
		
		$list = $list->forForeignID($this->ID);

		return $list;
	}

	/**
	* Return the page that holds this element area
	*
	* @return DataObject
	*/
	public function getOwnerPage() {

		$pages = self::getElementalPages();
		$owner = $pages->find('ElementAreaID', $this->ID);
		
		return $owner;
	}

	/**
	* Return an ArrayList of pages with the Element Page Extension
	*
	* @return ArrayList
	*/
	public static function getElementalPages() {

	    $pages = new ArrayList();

	    foreach (get_declared_classes() as $class) {
	        if (is_subclass_of($class, 'SiteTree')) {
	        	$object = singleton($class);
	        	if ($object->hasExtension('ElementPageExtension')) {
	        		$pagesOfType = $class::get();
			    	foreach($pagesOfType as $page) {
			    		$pages->push($page);
			    	}
	        	}
	        }
	    }

	    return $pages;
	}
}