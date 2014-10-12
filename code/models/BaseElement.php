<?php

/**
 * @package elemental
 */
class BaseElement extends Widget {

	private static $db = array(
		'Label' => 'Varchar(255)',
		'ExtraClass' => 'Varchar(255)'
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

		$this->extend('updateCMSFields', $fields);

		return $fields;
	}

	public function CMSTitle() {
		return sprintf('%s %s', $this->config()->get('title'), $this->Label);
	}

	public function getTitle() {
		return $this->Label;
	}

	public function i18n_singular_name() {
		return _t(__CLASS__, $this->config()->title);
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

	/**
	 * Note: Overloaded in {@link WidgetController}.
	 *
	 * @return string HTML
	 */
	public function WidgetHolder() {
		return $this->renderWith("ElementHolder");
	}

	/**
	 * Default way to render widget in templates.
	 *
	 * @return string HTML
	 */
	public function forTemplate($holder = true) {
		if($holder) {
			return $this->WidgetHolder();
		}

		return $this->Content();
	}

	/**
	 * Flatten style array for dropdown
	 */
	private function getStyles($array) {
		$result = call_user_func_array('array_merge', $array);

		return $result;
	}

}

/**
 * @package elemental
 */
class BaseElement_Controller extends Widget_Controller {

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