<?php
class ElementPageExtension extends DataExtension {

	private static $description = 'Page containing multiple Elements';

	private static $db = array(
	);

	private static $has_one = array(
		'ElementArea' => 'WidgetArea'
	);

	/**
	 * Setup the CMS Fields
	 *
	 * @return FieldList
	 */
	public function updateCMSFields(FieldList $fields){

		$fields->removeByName('Content');

		$adder = new GridFieldAddNewMultiClass();

		if(is_array($this->owner->config()->get('allowed_elements'))){
			$adder->setClasses($this->owner->config()->get('allowed_elements'));
		} else {
			user_error('No widgets allowed for '.$this->owner->ClassName);
		}

		$gridField = GridField::create('ElementArea', 'Elements',
			$this->owner->ElementArea()->Widgets(),
			GridFieldConfig_RelationEditor::create()
				->removeComponentsByType('GridFieldAddNewButton')
				->addComponent($adder)
				->removeComponentsByType('GridFieldAddExistingAutoCompleter')
				->addComponent(new GridFieldOrderableRows())
		);

		$config = $gridField->getConfig();
		$paginator = $config->getComponentByType('GridFieldPaginator');
		$paginator->setItemsPerPage(100);

		$config->removeComponentsByType('GridFieldDetailForm');
        $config->addComponent(new VersionedDataObjectDetailsForm());
        
		$fields->addFieldToTab('Root.Main', $gridField, 'Metadata');

		return $fields;
	}

	/**
	 * Make sure there is always a WidgetArea sidebar for adding widgets
	 *
	 */
	public function onBeforeWrite(){
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
}