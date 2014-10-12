<?php

class ElementalArea extends WidgetArea {

	public function Elements() {
		$result = $this->getComponents('Widgets');

		$list = new HasManyList('BaseElement', $result->getForeignKey());
		$list->setDataModel($this->model);

		$list = $list->forForeignID($this->ID);

		return $list;
	}
}