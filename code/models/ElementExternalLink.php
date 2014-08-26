<?php
class ElementExternalLink extends BaseElement {

	private static $db = array(
		'LinkText' => 'Varchar(255)',
		'LinkDescription' => 'Text',
		'LinkURL' => 'Varchar(255)',
		'NewWindow' => 'Boolean'
	);

	/**
	 * @var string
	*/
	private static $type = "External Link";

 	/**
	 * @var string
	*/
	private static $title = "External Link Element";

	/**
	* @var string
	*/
	private static $cmsTitle = "External Link Element";

	/**
	* @var string
	*/
	private static $description = "Link to an external source";

	/**
	* Defines the fields shown to the CMS users
	*/
	public function getCMSFields(){
		$fields = parent::getCMSFields();

		$url = TextField::create('LinkURL', 'Link URL');
		$url->setRightTitle('Including protocol e.g: '.Director::absoluteBaseURL());
		$fields->addFieldToTab('Root.Content',$url);

		$newWindow = CheckboxField::create('NewWindow', 'Open in a new window');
		$fields->addFieldToTab('Root.Content',$newWindow);

		$text = TextField::create('LinkText', 'Link Text');
		$text->setRightTitle('Optional');
		$fields->addFieldToTab('Root.Content',$text);

		$desc = TextareaField::create('LinkDescription', 'Link Description');
		$desc->setRightTitle('Optional');
		$fields->addFieldToTab('Root.Content',$desc);

		$this->extend('updateCMSFields', $fields);

		return $fields;
	}
}

class ElementExternalLink_Controller extends BaseElement_Controller {

}