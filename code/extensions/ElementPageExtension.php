<?php

/**
 * @package elemental
 */
class ElementPageExtension extends DataExtension {

	private static $elements_title = 'Elements';

	private static $db = array();

	private static $has_one = array(
		'ElementArea' => 'ElementalArea'
	);

	/**
	 * Setup the CMS Fields
	 *
	 * @return FieldList
	 */
	public function updateCMSFields(FieldList $fields) {
		$fields->removeByName('Content');

		$adder = new GridFieldAddNewMultiClass();

		if(is_array($this->owner->config()->get('allowed_elements'))) {
			$adder->setClasses($this->owner->config()->get('allowed_elements'));
		} else {
			$classes = ClassInfo::subclassesFor('BaseElement');
			$list = array();
			unset($classes['BaseElement']);

			foreach($classes as $class) {
				$list[$class] = singleton($class)->i18n_singular_name();
			}

			$adder->setClasses($list);
		}

		$area = $this->owner->ElementArea();

		if(!$area->exists() || !$area->isInDB()) {
			$area->write();

			$this->owner->ElementAreaID = $area->ID;
			$this->owner->write();
		}

		$gridField = GridField::create('ElementArea',
			Config::inst()->get("ElementPageExtension",'elements_title'),
			$this->owner->ElementArea()->Elements(),
			GridFieldConfig_RelationEditor::create()
				->removeComponentsByType('GridFieldAddNewButton')
				->addComponent($adder)
				->addComponent(new GridFieldOrderableRows())
		);

		$config = $gridField->getConfig();
		$paginator = $config->getComponentByType('GridFieldPaginator');
		$paginator->setItemsPerPage(100);

		$config->removeComponentsByType('GridFieldDetailForm');
		$config->addComponent(new VersionedDataObjectDetailsForm());

		$autocomplete = $config->getComponentByType("GridFieldAddExistingAutocompleter");
		$autocomplete->setSearchList(BaseElement::get());
		$autocomplete->setSearchFields(array(
			'ClassName', 'Label'
		));

		$fields->addFieldToTab('Root.Main', $gridField, 'Metadata');

		return $fields;
	}

	/**
	 * Make sure there is always a WidgetArea sidebar for adding widgets
	 *
	 */
	public function onBeforeWrite() {
		$elements = $this->owner->ElementArea();

		if(!$elements->isInDB()) {
			$elements->write();
			$this->owner->ElementAreaID = $elements->ID;
		}
		// Copy widgets content to Content to enable search
		else {
			$searchableContent = array();
			foreach ($elements->Items() as $element) {
				array_push($searchableContent, strip_tags($element->Content()));
			}
			$this->owner->Content = implode(' ', $searchableContent);
		}

		parent::onBeforeWrite();
	}

	/**
	 * If the page is duplicated, copy the widgets across too
	 *
	 * @return Page The duplicated page
	 */
	public function onBeforeDuplicate($duplicatePage) {
		if($this->owner->hasField('ElementAreaID')) {
			$wa = $this->owner->getComponent('ElementArea');
			$duplicateWidgetArea = $wa->duplicate();

			foreach($wa->Items() as $originalWidget) {
				$widget = $originalWidget->duplicate(false);
				$widget->ParentID = $duplicateWidgetArea->ID;
				$widget->write();
			}
			$duplicatePage->ElementAreaID = $duplicateWidgetArea->ID;
		}

		return $duplicatePage;
	}

	public function onAfterPublish() {
		foreach($this->owner->ElementArea()->Elements() as $widget) {
			$widget->publish('Stage', 'Live');
		}
	}
}