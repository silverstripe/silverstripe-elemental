<?php
class ElementImage extends BaseElement {

	private static $db = array(
		'Caption' => 'Varchar(255)'
	);

	private static $has_one = array(
		'Image' => 'Image'
	);

	/**
	 * @var string
	*/
	private static $type = "Image";

 	/**
	 * @var string
	*/
	private static $title = "Image Element";

	/**
	* @var string
	*/
	private static $cmsTitle = "Image Element";

	/**
	* @var string
	*/
	private static $description = "Image";

	/**
	* Defines the fields shown to the CMS users
	*/
	public function getCMSFields(){
		$fields = parent::getCMSFields();

		$uploadField = UploadField::create('Image', 'Image')
			->setAllowedFileCategories('image')
			->setAllowedMaxFileNumber(1)
			->setFolderName('Uploads/images')
			->setRightTitle('Image size should be at least 1000px');
		$fields->addFieldToTab('Root.Content',$uploadField);

		$caption = TextField::create('Caption', 'Caption');
		$caption->setRightTitle('Optional');
		$fields->addFieldToTab('Root.Content',$caption);

		$this->extend('updateCMSFields', $fields);

		return $fields;
	}

}

class ElementImage_Controller extends BaseElement_Controller {

}