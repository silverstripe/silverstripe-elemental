<?php
class ElementPage extends Page {

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
	public function getCMSFields(){
		$fields = parent::getCMSFields();

		$fields->removeByName('Content');

		if($this->ElementArea()->exists()){

			$adder = new GridFieldAddNewMultiClass();

			if(is_array($this->config()->get('allowed_elements'))){
				$adder->setClasses($this->config()->get('allowed_elements'));
			} else {
				user_error('No widgets allowed for '.$this->ClassName);
			}

			$gridField = GridField::create('ElementArea', 'Elements',
				$this->ElementArea()->Widgets(),
				GridFieldConfig_RelationEditor::create()
					->removeComponentsByType('GridFieldAddNewButton')
					->addComponent($adder)
					->removeComponentsByType('GridFieldAddExistingAutoCompleter')
					->addComponent(new GridFieldOrderableRows())
			);
			$gridFieldConfig = $gridField->getConfig();
			$paginator = $gridFieldConfig->getComponentByType('GridFieldPaginator');
			$paginator->setItemsPerPage(100);

			$fields->addFieldToTab('Root.Main', $gridField, 'Metadata');
		}

		return $fields;
	}

	/**
	 * Make sure there is always a WidgetArea sidebar for adding widgets
	 *
	 */
	protected function onBeforeWrite(){
		$elements = $this->ElementArea();
		if(!$elements->isInDB()) {
			$elements->write();
			$this->ElementAreaID = $elements->ID;
		}
		// Copy widgets content to Content to enable search
		else {
			$searchableContent = array();
			foreach ($elements->Items() as $element) {
				array_push($searchableContent, strip_tags($element->Content()));
			}
			$this->Content = implode(' ', $searchableContent);
		}

		parent::onBeforeWrite();
	}

	/**
	 * If the page is duplicated, copy the widgets across too
	 *
	 * @return Page The duplicated page
	 */
	public function onBeforeDuplicate($duplicatePage) {
		if($this->hasField('ElementAreaID')) {
			$wa = $this->getComponent('ElementArea');
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

	/**
	 * Renders the page with the right template
	 *
	 * @return Html
	 */
	public function forTemplate() {
		return $this->renderWith(array('ElementPage', 'Page'));
	}

}

class ElementPage_Controller extends Page_Controller {
}