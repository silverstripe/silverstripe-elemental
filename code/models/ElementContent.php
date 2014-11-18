<?php

/**
 * @package elemental
 */
class ElementContent extends BaseElement {

	private static $db = array(
		'HTML' => 'HTMLText',
		'Style' => 'Varchar'
	);

	private static $styles = array(
		'Feature',
		'Smaller'
	);

	private static $title = "Generic Content";

	private static $description = "Blocks of text with heading, blockquote, list and paragraph styles";

	public function getCMSFields() {
		$styles = $this->config()->get('styles');
		
		$this->beforeUpdateCMSFields(function($fields) use ($styles) {
			$fields->insertAfter(new HtmlEditorField('HTML', 'Content'), 'Label');
			$fields->insertAfter($styles = new DropdownField('Style', 'Style', $styles), 'Label');

			$styles->setEmptyString('Select a custom style..');
		});


		return parent::getCMSFields();
	}

	public function getCssStyle() {
		$styles = $this->config()->get('styles');
		$style = $this->Style;

		if(isset($styles[$style])) {
			return strtolower($styles[$style]);
		}
	}
}