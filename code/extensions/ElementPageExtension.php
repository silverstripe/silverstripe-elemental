<?php

/**
 * @package elemental
 */
class ElementPageExtension extends DataExtension {

	private static $elements_title = 'Elements';

	/**
	 * @config
	 *
	 * @var array $ignored_classes Classes to ignore adding elements too.
	 */
	private static $ignored_classes = array();

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
		// redirector pages should not have elements
		if(is_a($this->owner, 'RedirectorPage')) {
			return;
		} else if($ignored = Config::inst()->get('ElementPageExtension', 'ignored_classes')) {
			foreach($ignored as $check) {
				if(is_a($this->owner, $check)) {
					return;
				}
			}
		}

		// add an empty holder for content as some module explicitly use insert
		// after content.
		$fields->replaceField('Content', new LiteralField('Content', ''));

		$adder = new GridFieldAddNewMultiClass();

		if(is_array($this->owner->config()->get('allowed_elements'))) {
			$list = $this->owner->config()->get('allowed_elements');
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
				->removeComponentsByType('GridFieldAddExistingAutocompleter')
				->addComponent($adder)
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
	public function onBeforeWrite() {
		if($ignored = Config::inst()->get('ElementPageExtension', 'ignored_classes')) {
			foreach($ignored as $check) {
				if(is_a($this->owner, $check)) {
					return;
				}
			}
		}

		$elements = $this->owner->ElementArea();

		if(!$elements->isInDB()) {
			$elements->write();
			$this->owner->ElementAreaID = $elements->ID;
		}
		else {
			// Copy widgets content to Content to enable search
			$searchableContent = array();

			foreach ($elements->Items() as $element) {
				array_push($searchableContent, strip_tags($element->Content()));
			}

			$this->owner->Content = implode(' ', $searchableContent);
		}

		parent::onBeforeWrite();
	}

	/**
	 * If the page is duplicated, copy the widgets across too.
	 *
	 * @return Page The duplicated page
	 */
	public function onAfterDuplicate($dup) {
		// var_dump($page->ID, $this->owner->ID);
		// exit('DUMP');
		if($this->owner->ID != 0 && $this->owner->ID < $dup->ID) {
			$wa = $this->owner->getComponent('ElementArea');
			$duplicateWidgetArea = $wa->duplicate(false);
			$duplicateWidgetArea->write();
			foreach($wa->Items() as $originalWidget) {
				$widget = $originalWidget->duplicate(false);
				$widget->ParentID = $duplicateWidgetArea->ID;
				$widget->write();
			}
			$dup->ElementAreaID = $duplicateWidgetArea->ID;
		}
	}

	public function onAfterPublish() {
		if($id = $this->owner->ElementAreaID) {
			$widgets = Versioned::get_by_stage('BaseElement', 'Stage', "ParentID = '$id'");
			$staged = array();

			foreach($widgets as $widget) {
				$staged[] = $widget->ID;

				$widget->publish('Stage', 'Live');
			}

			// remove any elements that are on live but not in draft.
			$widgets = Versioned::get_by_stage('BaseElement', 'Live', "ParentID = '$id'");

			foreach($widgets as $widget) {
				if(!in_array($widget->ID, $staged)) {
					$widget->deleteFromStage('Live');
				}
			}
		}
	}
}