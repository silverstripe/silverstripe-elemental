<?php

class ElementDuplicationExtension extends Extension {

	/**
	 * Duplicate items
	 *
	 */
	public function onAfterDuplicate($original, $doWrite=true) {
		$thisClass = $this->owner->ClassName;
		$duplicateRelations = Config::inst()->get($thisClass, 'duplicate_relations');

		if($duplicateRelations && !empty($duplicateRelations)) {
			foreach($duplicateRelations as $relation) {
				$items = $original->$relation();
				foreach($items as $item) {
					$duplicateItem = $item->duplicate(false);
					$duplicateItem->{$thisClass.'ID'} = $this->owner->ID;
					$duplicateItem->write();
				}
			}
		}
	}

	public function onBeforeDuplicate($original, $doWrite=true) {
		$thisClass = $this->owner->ClassName;
		$clearRelations = Config::inst()->get($thisClass, 'duplicate_clear_relations');

		if($clearRelations && !empty($clearRelations)) {
			foreach($clearRelations as $clearRelation) {
				$clearRelation = $clearRelation . 'ID';
				$this->owner->$clearRelation = 0;
			}
		}
	}
}