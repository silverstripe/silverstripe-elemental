<?php
class ElementList extends BaseElement {

	private static $db = array(
		'ListName' => 'Varchar(255)',
		'ListDescription' => 'Text'
	);

	private static $has_many = array(
		'Elements' => 'BaseElement'
	);

	/**
	 * @var string
	*/
	private static $type = "Element List";

 	/**
	 * @var string
	*/
	private static $title = "Element List Element";

	/**
	* @var string
	*/
	private static $cmsTitle = "Element List Element";

	/**
	* @var string
	*/
	private static $description = "Orderable list of elements";

	/**
	* Defines the fields shown to the CMS users
	*/
	public function getCMSFields(){
		$fields = parent::getCMSFields();
		
		$text = TextField::create('ListName', 'List Name');
		$text->setRightTitle('Optional');
		$fields->addFieldToTab('Root.Content',$text);

		$desc = TextareaField::create('ListDescription', 'List Description');
		$desc->setRightTitle('Optional');
		$fields->addFieldToTab('Root.Content',$desc);

		$allowed_elements = ElementList::config()->get('allowed_elements');

		$config = GridFieldConfig_RecordEditor::create(10);
		$config->addComponent(new GridFieldSortableRows('Sort'));
		$models = new GridFieldAddNewMultiClass();
		$models->setClasses($allowed_elements);
		$config->removeComponentsByType('GridFieldAddNewButton');
		$config->addComponent($models);

		$widgetArea = new GridField('Elements', 'Elements', $this->Elements(), $config);
		$fields->addFieldToTab('Root.Content',$widgetArea);

		$this->extend('updateCMSFields', $fields);

		return $fields;
	}
}

class ElementList_Controller extends BaseElement_Controller {

}