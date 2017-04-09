<?php

namespace DNADesign\Elemental\Models;

use HtmlEditorField;
use DropdownField;



/**
 * @package elemental
 */
class ElementContent extends BaseElement
{

    private static $db = array(
        'HTML' => 'HTMLText',
        'Style' => 'Varchar'
    );

    private static $styles = array();

    private static $title = "Content Element";

    private static $description = "Element with text with heading, blockquote, list and paragraph styles";

    public function getCMSFields()
    {
        $styles = $this->config()->get('styles');

        if (count($styles) > 0) {
            $this->beforeUpdateCMSFields(function ($fields) use ($styles) {
                $fields->addFieldsToTab('Root.Main', new HtmlEditorField('HTML', 'Content'));
                $fields->addFieldsToTab('Root.Main', $styles = new DropdownField('Style', 'Style', $styles));

                $styles->setEmptyString('Select a custom style..');
            });
        } else {
            $this->beforeUpdateCMSFields(function ($fields) {
                $fields->removeByName('Style');
            });
        }

        $fields = parent::getCMSFields();

        if ($this->isEndofLine(ElementContent::class) && $this->hasExtension('VersionViewerDataObject')) {
            $fields = $this->addVersionViewer($fields, $this);
        }

        return $fields;
    }

    public function getCssStyle()
    {
        $styles = $this->config()->get('styles');
        $style = $this->Style;

        if (isset($styles[$style])) {
            return strtolower($styles[$style]);
        }
    }
}
