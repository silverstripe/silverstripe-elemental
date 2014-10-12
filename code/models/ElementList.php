<?php

/**
 * A list contains nested {@link BaseElement} such as a list of related files.
 *
 * @package elemental
 */
class ElementList extends BaseElement {

	private static $db = array(
		'ListName' => 'Varchar(255)',
		'ListDescription' => 'Text'
	);

	private static $has_many = array(
		'Elements' => 'BaseElement'
	);

	private static $title = "Element List Element";

	private static $description = "Orderable list of elements";


	public function getCMSFields() {
		$this->beforeUpdateCMSFields(function($fields) {
			$text = TextField::create('ListName', 'List Name');
			$text->setRightTitle('Optional');
			$fields->addFieldToTab('Root.Content',$text);

			$desc = TextareaField::create('ListDescription', 'List Description');
			$desc->setRightTitle('Optional');
			$fields->addFieldToTab('Root.Content',$desc);

			if ($this->isInDB()) {
				$allowed_elements = ElementList::config()->get('allowed_elements');

				$config = GridFieldConfig_RecordEditor::create(10);
				$config->addComponent(new GridFieldSortableRows('Sort'));
				$models = new GridFieldAddNewMultiClass();
				$models->setClasses($allowed_elements);
				$config->removeComponentsByType('GridFieldAddNewButton');
				$config->addComponent($models);

				$config->removeComponentsByType('GridFieldDetailForm');
				$config->addComponent(new VersionedDataObjectDetailsForm());

				$widgetArea = new GridField('Elements', 'Elements', $this->Elements(), $config);
				$fields->push($widgetArea);
			} else {
				$fields->push(LiteralField::create('warn', '<p class="message notice">Once you save this object you will be able to add items</p>'));
			}
		});

		return parent::getCMSFields();
	}

	public function getList() {
		return $this->Elements()->sort('Sort');
	}
}