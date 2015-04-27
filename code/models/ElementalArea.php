<?php

/**
 * @package elemental
 */
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
		$pages = Page::get();
		$owner = $pages->find('ElementAreaID', $this->ID);
		
		return $owner;
	}
}