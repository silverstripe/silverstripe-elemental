<?php

/**
 * @package elemental
 */
class ElementContact extends BaseElement {

	private static $db = array(
		'ContactName' => 'Varchar(255)',
		'Phone' => 'Varchar(100)',
		'Fax' => 'Varchar(100)',
		'Email' => 'Varchar(255)',
		'Website' => 'Varchar(255)',
	);

	private static $extensions = array(
		'Addressable',
	'Geocodable'
    );

 	/**
	 * @var string
	 */
	private static $title = "Contact Element";

	public function getCMSFields() {
		$this->beforeUpdateCMSFields(function($fields) {
			$fields->addFieldsToTab('Root.Main', array(
				Textfield::create('ContactName', 'Name'),
				TextField::create('Phone', 'Phone'),
				TextField::create('Fax', 'Fax'),
				EmailField::create('Email', 'Email'),
				$website = TextField::create('Website', 'Website')
			));

			$website->setRightTitle('e.g '.Director::absoluteBaseURL());
		});

		return parent::getCMSFields();
	}
}

/**
 * @package elemental
 */
class ElementContact_Controller extends BaseElement_Controller {

	public function ObfuscatedEmail() {
		return ($this->data()->Email) ? Email::obfuscate($this->data()->Email, 'hex') : null;
	}
}