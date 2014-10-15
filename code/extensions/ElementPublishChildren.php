<?php

/**
 * @package elemental
 */
class ElementPublishChildren extends DataExtension {

	public function onBeforeVersionedPublish() {
		foreach($this->owner->Elements() as $widget) {
			$widget->publish('Stage', 'Live');
		}
	}
}