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
			$fields->addFieldToTab('Root.Main',$text);

			$desc = TextareaField::create('ListDescription', 'List Description');
			$desc->setRightTitle('Optional');
			$fields->addFieldToTab('Root.Main',$desc);

			if ($this->isInDB()) {
				$adder = new GridFieldAddNewMultiClass();

				if(is_array($this->config()->get('allowed_elements'))) {
					$list = $this->config()->get('allowed_elements');
				} else {
					$classes = ClassInfo::subclassesFor('BaseElement');
					$list = array();
					unset($classes['BaseElement']);

					foreach($classes as $class) {
						$list[$class] = singleton($class)->i18n_singular_name();
					}
				}

				asort($list);

				$adder->setClasses($list);

				$config = GridFieldConfig_RecordEditor::create(100);
				$config->addComponent(new GridFieldOrderableRows());
				$config->removeComponentsByType('GridFieldAddNewButton');
				$config->addComponent($adder);

				$config->removeComponentsByType('GridFieldDetailForm');
				$config->addComponent(new VersionedDataObjectDetailsForm());

				$widgetArea = new GridField(
					'Elements', 
					Config::inst()->get("ElementPageExtension",'elements_title'), 
					$this->Elements(), 
					$config
				);

				$fields->addFieldToTab('Root.Main', $widgetArea);
			} else {
				$fields->addFieldToTab('Root.Main', LiteralField::create('warn', '<p class="message notice">Once you save this object you will be able to add items</p>'));
			}

			$fields->removeByName('Root.Elements');
		});

		return parent::getCMSFields();
	}

	public function onAfterPublish() {
		foreach($this->Elements() as $widget) {
			$widget->publish('Stage', 'Live');
		}
	}
}