<?php

/**
 * A list contains nested {@link BaseElement} such as a list of related files.
 *
 * @package elemental
 */
class ElementList extends BaseElement {

	private static $db = array(
		'ListDescription' => 'HTMLText'
	);

	private static $has_many = array(
		'Elements' => 'BaseElement'
	);

	private static $duplicate_relations = array(
		'Elements'
	);

	private static $extensions = array(
		'ElementPublishChildren'
	);

	private static $title = "Element List Element";

	private static $description = "Orderable list of elements";

	protected $enable_title_in_template = true;

	public function getCMSFields() {
		$elements = $this->Elements();
		$isInDb = $this->isInDB();
		$allowed = $this->config()->get('allowed_elements');

		$this->beforeUpdateCMSFields(function($fields) use ($elements, $isInDb, $allowed) {
			$desc = HTMLEditorField::create('ListDescription', 'List Description');
			$desc->setRightTitle('Optional');
			$fields->addFieldToTab('Root.Main',$desc);

			if ($isInDb) {
				$adder = new GridFieldAddNewMultiClass();

				if(is_array($allowed)) {
					$list = $allowed;
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
				$config->addComponent(new GridFieldSortableRows('Sort'));
				$config->removeComponentsByType('GridFieldAddNewButton');
				$config->addComponent($adder);

				$config->removeComponentsByType('GridFieldDetailForm');
				$config->addComponent(new VersionedDataObjectDetailsForm());

				$widgetArea = new GridField(
					'Elements', 
					Config::inst()->get("ElementPageExtension",'elements_title'), 
					$elements, 
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
}