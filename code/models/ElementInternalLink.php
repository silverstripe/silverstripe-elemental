<?php

/**
 * @package elemental
 */
class ElementInternalLink extends BaseElement {

	private static $db = array(
		'LinkText' => 'Varchar(255)',
		'LinkDescription' => 'Text',
		'NewWindow' => 'Boolean'
	);

	private static $has_one = array(
		'InternalLink' => 'SiteTree'
	);

	private static $title = "Internal Link Element";

	private static $description = "Link to an internal source";

	public function getCMSFields() {
		$this->beforeUpdateCMSFields(function($fields) {
			$fields->addFieldsToTab('Root.Main', array(
				TreeDropdownField::create('InternalLinkID', 'Link To', 'SiteTree'),
				CheckboxField::create('NewWindow', 'Open in a new window'),
				$text = TextField::create('LinkText', 'Link Text'),
				$desc = TextareaField::create('LinkDescription', 'Link Description')
			));
		});

		return parent::getCMSFields();
	}
}