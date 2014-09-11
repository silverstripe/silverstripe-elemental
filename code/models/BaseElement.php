<?php

class BaseElement extends Widget {

	private static $db = array(
		'Label' => 'Varchar(255)',
		'ExtraClass' => 'Varchar(255)'
	);

	private static $has_one = array(
		'List' => 'ElementList'
	);

 	/**
	 * @var string
	*/
	private static $title = "Base Element";

	/**
	* @var string
	*/
	private static $cmsTitle = "Base Element";

	/**
	 * @var string
	*/
	private static $type = "Base";

	/**
	* @var string
	*/
	private static $description = "Base class for elements";

	public function CMSTitle() {
		return '[ '.$this->getType().' ] ' . $this->Label;
	}

	public function getTitle() {
		return $this->Label;;
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
	* Defines the fields shown to the CMS users
	*/
	public function getCMSFields(){
		$fields = FieldList::create(new TabSet('Root', new Tab('Content')));

		$label = TextField::create('Label', 'Label');
		$label->setRightTitle('For reference only');
		$fields->addFieldToTab('Root.Content',$label);

		$class = new ReflectionMethod(get_called_class(), 'config');
		$config = $class->invoke(NULL);
		$styles = $config->get('css_styles');

		if (is_array($styles)) {
			$class = DropdownField::create('ExtraClass', 'Extra CSS Class', $this->getStyles($styles));
			$class->setEmptyString('-- Select --');
			$fields->addFieldToTab('Root.Options',$class);
		}

		return $fields;
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
	 * @return string HTML
	 */
	public function forTemplate($holder = true){
		if($holder){
			return $this->WidgetHolder();
		}
		return $this->Content();
	}

	/**
	* Return type of Element (injected in template class)
	*
	* @return String
	*/
	public function getType() {
		$class = get_called_class();
		$type = Config::inst()->get($class, 'type');
		$type_as_class = str_replace(' ', '_', $type);

		return strtolower($type_as_class);
	}

	/**
	* Flatten style array for dropdown
	*/
	private function getStyles($array) {
		$result = call_user_func_array('array_merge', $array);
		return $result;
	}

}

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