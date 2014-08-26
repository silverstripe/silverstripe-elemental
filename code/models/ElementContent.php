<?php
class ElementContent extends BaseElement {

	private static $db = array(
		'HTML' => 'HTMLText'
	);

	/**
	 * @var string
	*/
	private static $type = "Content";

 	/**
	 * @var string
	*/
	private static $title = "Content Element";

	/**
	* @var string
	*/
	private static $cmsTitle = "Content Element";

	/**
	* @var string
	*/
	private static $description = "Blocks of text with heading, blockquote, list and paragraph styles";

	/**
	* Defines the fields shown to the CMS users
	*/
	public function getCMSFields(){
		$fields = parent::getCMSFields();
		$fields->addFieldToTab('Root.Content', new HtmlEditorField('HTML', 'Content'));

		$this->extend('updateCMSFields', $fields);
		
		return $fields;
	}

}

class ElementContent_Controller extends BaseElement_Controller {

}