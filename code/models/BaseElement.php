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
	* @var string
	*/
	private static $description = "Base class for elements";

	public function getCMSFields() {
		$fields = $this->scaffoldFormFields(array(
			'includeRelations' => ($this->ID > 0),
			'tabbed' => true,
			'ajaxSafe' => true
		));

		$fields->removeByName('ListID');
		$fields->removeByName('ParentID');
		$fields->removeByName('Sort');
		$fields->removeByName('ExtraClass');

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

		return $fields;
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
		return $this->getTitle();
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

	public function ControllerTop() {
		return Controller::curr();
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
		return $this->renderWith("ElementHolder");
	}
}