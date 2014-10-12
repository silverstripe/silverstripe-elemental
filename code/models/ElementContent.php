<?php

/**
 * @package elemental
 */
class ElementContent extends BaseElement {

	private static $db = array(
		'HTML' => 'HTMLText'
	);

	private static $title = "Generic Content";

	private static $description = "Blocks of text with heading, blockquote, list and paragraph styles";

	public function getCMSFields() {
		$this->beforeUpdateCMSFields(function($fields) {
			$fields->addFieldsToTab('Root.Main', new HtmlEditorField('HTML', 'Content'));
		});

		return parent::getCMSFields();
	}
}