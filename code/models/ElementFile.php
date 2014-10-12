<?php

/**
 * @package elemental
 */
class ElementFile extends BaseElement {

	private static $db = array(
		'FileDescription' => 'Text'
	);

	private static $has_one = array(
		'File' => 'File'
	);

	private static $title = "File Element";

	public function getCMSFields() {
		$this->beforeUpdateCMSFields(function($fields) {
			$desc = TextareaField::create('FileDescription', 'Description');
			$desc->setRightTitle('Optional');
			$fields->addFieldToTab('Root.Content', $desc);

			$uploadField = UploadField::create('FileID', 'File')
				->setAllowedMaxFileNumber(1)
				->setFolderName('Uploads/files');
			$fields->addFieldToTab('Root.Content', $uploadField);
		});

		return $fields;
	}
}