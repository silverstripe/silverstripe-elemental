<?php

/**
 * @package elemental
 */
class BaseElement extends Widget {

	private static $db = array(
		'ExtraClass' => 'Varchar(255)',
		'HideTitle' => 'Boolean'
	);

	private static $has_one = array(
		'List' => 'ElementList' // optional.
	);

	 /**
	 * @var string
	 */
	private static $title = "Base Element";

	/**
	 * @var array
	 */
	private static $summary_fields = array(
		'ID',
		'Title',
		'ElementType'
	);

	/**
	* @var string
	*/
	private static $description = "Base class for elements";

	/**
	* @var boolean
	*/
	protected $enable_title_in_template = false;


	public function getCMSFields() {
		$fields = $this->scaffoldFormFields(array(
			'includeRelations' => ($this->ID > 0),
			'tabbed' => true,
			'ajaxSafe' => true
		));

		$fields->insertAfter(new ReadonlyField('Type'), 'Title');
		$fields->removeByName('ListID');
		$fields->removeByName('ParentID');
		$fields->removeByName('Sort');
		$fields->removeByName('ExtraClass');

		/** Title
		* By default, the Title is used for reference only
		* Set $enable_title_in_template to true  when using title in template
		*/
		if(!$this->enable_title_in_template) {
			$fields->removeByName('HideTitle');
			$title = $fields->fieldByName('Root.Main.Title');
			if ($title) {
				$title->setRightTitle('For reference only. Does not appear in the template.');
			}
		}

		$fields->addFieldToTab('Root.Settings', new TextField('ExtraClass', 'Extra CSS Classes to add'));

		if(!is_a($this, 'ElementList')) {
			$lists = ElementList::get()->filter('ParentID', $this->ParentID);

			if($lists->exists()) {
				$fields->addFieldToTab('Root.Main',
					$move = new DropdownField('MoveToListID', 'Move this to another list', $lists->map('ID', 'CMSTitle'), '')
				);

				$move->setEmptyString('Select a list..');
				$move->setHasEmptyDefault(true);
			}
		}

		$this->extend('updateCMSFields', $fields);

		if ($this->IsInDB()) {
			if ($this->isEndofLine('BaseElement') && $this->hasExtension('VersionViewerDataObject')) {
				$fields = $this->addVersionViewer($fields, $this);
			}
		}

		return $fields;
	}

	/**
	 * Version viewer must only be added at if this is the final getCMSFields for a class.
	 * in order to avoid having to rename all fields from eg Root.Main to Root.Current.Main
	 * To do this we test if getCMSFields is from the current class
	 */
	public function isEndofLine($className) {
		$methodFromClass = ClassInfo::has_method_from($this->ClassName, 'getCMSFields', $className);
		if($methodFromClass) {
			return true;
		}
	}

	public function onBeforeWrite() {
		parent::onBeforeWrite();

		if(!$this->Sort) {
			$parentID = ($this->ParentID) ? $this->ParentID : 0;

			$this->Sort = DB::query("SELECT MAX(\"Sort\") + 1 FROM \"Widget\" WHERE \"ParentID\" = $parentID")->value();
		}

		if($this->MoveToListID) {
			$this->ListID = $this->MoveToListID;
		}
	}

	public function i18n_singular_name() {
		return _t(__CLASS__, $this->config()->title);
	}

	public function getElementType() {
		return $this->i18n_singular_name();
	}

	public function getTitle() {
		if($title = $this->getField('Title')) {
			return $title;
		} else {
			if(!$this->isInDb()) {
				return;
			}

			return $this->config()->title;
		}
	}

	public function getCMSTitle() {
		if($title = $this->getField('Title')) {
			return $this->config()->title . ': ' . $title;
		} else {
			if(!$this->isInDb()) {
				return;
			}
			return $this->config()->title;
		}
	}

	public function canView($member = null) {
		return Permission::check('CMS_ACCESS_CMSMain', 'any', $member);
	}

	public function canEdit($member = null) {
		return Permission::check('CMS_ACCESS_CMSMain', 'any', $member);
	}

	public function canDelete($member = null) {
		return Permission::check('CMS_ACCESS_CMSMain', 'any', $member);
	}

	public function canCreate($member = null) {
		return Permission::check('CMS_ACCESS_CMSMain', 'any', $member);
	}

	public function WidgetHolder() {
		return $this->renderWith("ElementHolder");
	}

	public function getWidget() {
		return $this;
	}

	public function addRequirements() {
		return false;
	}

	public function ControllerTop() {
		return Controller::curr();
	}

	public function getPage() {
		$area = $this->Parent();

		if($area instanceof ElementalArea) {
			return $area->getOwnerPage();
		}

		return null;
	}
}

/**
 * @package elemental
 */
class BaseElement_Controller extends WidgetController {

	/**
	 * Overloaded from {@link Widget->WidgetHolder()} to allow for controller/
	 * form linking.
	 *
	 * @return string HTML
	 */
	public function WidgetHolder() {
		$widget = $this->getWidget();
		$widget->addRequirements();
		return $widget->WidgetHolder();
	}
}
