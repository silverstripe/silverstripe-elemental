<?php

/**
 * @package elemental
 */
class ElementExternalLink extends ElementLink {

	public function __construct($record = null, $isSingleton = false, $model = null) {
		parent::__construct($record, $isSingleton, $model);

		$this->ClassName = "ElementLink";
		$this->write();
	}

	public function canCreate($member = null) {
		return false;
	}
}

class ElementInternalLink extends ElementLink {

	public function __construct($record = null, $isSingleton = false, $model = null) {
		parent::__construct($record, $isSingleton, $model);

		$this->ClassName = "ElementLink";
		$this->write();
	}

	public function canCreate($member = null) {
		return false;
	}
}