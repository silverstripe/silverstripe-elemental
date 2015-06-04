<?php

/**
 * @package elemental
 */
class ElementalGridFieldAddNewMultiClass extends GridFieldAddNewMultiClass {

	public function getClasses(GridField $grid) {
		$classes = parent::getClasses($grid);

		if($classes) {
			asort($classes);
		}

		return $classes;
	}
}