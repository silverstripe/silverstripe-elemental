<?php

/**
 * @package elemental
 */
class ElementExternalLink extends BaseElement {

	private static $db = array(
		'LinkText' => 'Varchar(255)',
		'LinkDescription' => 'Text',
		'LinkURL' => 'Varchar(255)',
		'NewWindow' => 'Boolean'
	);

	private static $title = "External Link Element";

	private static $description = "Link to an external source";

	public function getCMSFields() {
		$this->beforeUpdateCMSFields(function($fields) {
			$url = TextField::create('LinkURL', 'Link URL');
			$url->setRightTitle('Including protocol e.g: '.Director::absoluteBaseURL());
			$fields->addFieldToTab('Root.Main',$url);

			$newWindow = CheckboxField::create('NewWindow', 'Open in a new window');
			$fields->addFieldToTab('Root.Main',$newWindow);

			$text = TextField::create('LinkText', 'Link Text');
			$text->setRightTitle('Optional');
			$fields->addFieldToTab('Root.Main',$text);

			$desc = TextareaField::create('LinkDescription', 'Link Description');
			$desc->setRightTitle('Optional');
			$fields->addFieldToTab('Root.Main',$desc);
		});

		return parent::getCMSFields();
	}
}