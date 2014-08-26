<?php
class ElementInternalLink extends BaseElement {

	private static $db = array(
		'LinkText' => 'Varchar(255)',
		'LinkDescription' => 'Text',
		'NewWindow' => 'Boolean'
	);

	private static $has_one = array(
		'InternalLink' => 'SiteTree'
	);

	/**
	 * @var string
	*/
	private static $type = "Internal Link";

 	/**
	 * @var string
	*/
	private static $title = "Internal Link Element";

	/**
	* @var string
	*/
	private static $cmsTitle = "Internal Link Element";

	/**
	* @var string
	*/
	private static $description = "Link to an internal source";

	/**
	* Defines the fields shown to the CMS users
	*/
	public function getCMSFields(){
		$fields = parent::getCMSFields();

		$tree = TreeDropdownField::create('InternalLinkID', 'Link To', 'SiteTree');
		$fields->addFieldToTab('Root.Content',$tree);

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

class ElementInternalLink_Controller extends BaseElement_Controller {

}