<?php

class ElementContact extends BaseElement {

	private static $db = array(
		'ContactName' => 'Varchar(255)',
		'Phone' => 'Varchar(100)',
		'Fax' => 'Varchar(100)',
		'Email' => 'Varchar(255)',
		'Website' => 'Varchar(255)',
	);

	/**
	 * @var string
	*/
	private static $type = "Contact";

 	/**
	 * @var string
	*/
	private static $title = "Contact Element";

	/**
	* @var string
	*/
	private static $cmsTitle = "Contact Element";

	/**
	* @var string
	*/
	private static $description = "Contact information element";

	/**
	* Defines the fields shown to the CMS users
	*/
	public function getCMSFields(){
		$fields = parent::getCMSFields();

		$name = Textfield::create('ContactName', 'Name');
		$fields->addFieldToTab('Root.Content',$name);

		$phone = TextField::create('Phone', 'Phone');
		$fields->addFieldToTab('Root.Content',$phone);

		$fax = TextField::create('Fax', 'Fax');
		$fields->addFieldToTab('Root.Content',$fax);

		$email =  EmailField::create('Email', 'Email');
		$email->setRightTitle('e.g contact@domain.com');
		$fields->addFieldToTab('Root.Content',$email);

		$website = TextField::create('Website', 'Website');
		$website->setRightTitle('e.g '.Director::absoluteBaseURL());
		$fields->addFieldToTab('Root.Content',$website);

		// Addressable fields
		// $fields->insertBefore(new Tab('Address'), 'Options');

		// $address = TextField::create('Address', 'Address');
		// $fields->addFieldToTab('Root.Address', $address);

		// $address2 = TextField::create('Address2', 'Address extra');
		// $address2->setRightTitle('e.g PO Box 254');
		// $fields->addFieldToTab('Root.Address', $address2);

		// $city = TextField::create('Suburb', 'City');
		// $fields->addFieldToTab('Root.Address', $city);

		// $postcode = NumericField::create('Postcode', 'Postcode');
		// $fields->addFieldToTab('Root.Address', $postcode);

		// $source = Zend_Locale::getTranslationList('territory', i18n::get_locale(), 2);
		// $country = CountryDropdownField::create('Country', 'Country', $source);
		// $fields->addFieldToTab('Root.Address', $country);

		$this->extend('updateCMSFields', $fields);

		// Addressable calls to updateCMSFields needs to be ovveridden
		// $fields->fieldByName('Root.Address.Suburb')->setTitle('City');
		// $fields->removeByName('State');
		// $fields->removeByName('AddressHeader');

		return $fields;
	}

}

class ElementContact_Controller extends BaseElement_Controller {

	public function ObfuscatedEmail() {
		return ($this->data()->Email) ? Email::obfuscate($this->data()->Email, 'hex') : null;
	}

}