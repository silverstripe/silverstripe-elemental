<?php

namespace DNADesign\Elemental\Models;

use SilverStripe\Forms\HTMLEditor\HtmlEditorField;
use SilverStripe\Forms\DropdownField;
use SilverStripe\ORM\FieldType\DBField;

class ElementContent extends BaseElement
{
    private static $icon = 'dnadesign/silverstripe-elemental:images/content.svg';

    private static $db = [
        'HTML' => 'HTMLText',
        'Style' => 'Varchar(255)'
    ];

    private static $table_name = 'ElementContent';

    private static $singular_name = 'content block';

    private static $plural_name = 'content blocks';

    /**
     * @var array
     */
    private static $styles = [];

    /**
     * {@inheritDoc}
     */
    public function getCMSFields()
    {
        $styles = $this->config()->get('styles');

        if (count($styles) > 0) {
            $this->beforeUpdateCMSFields(function ($fields) use ($styles) {
                $fields->addFieldsToTab('Root.Main', new HtmlEditorField('HTML', _t(__CLASS__.'.CONTENT', 'Content')));
                $fields->addFieldsToTab('Root.Main', $styles = new DropdownField('Style', _t(__CLASS__.'.STYLE', 'Style'), $styles));
                $styles->setEmptyString(_t(__CLASS__.'.CUSTOM_STYLES', 'Select a custom style..'));
            });
        } else {
            $this->beforeUpdateCMSFields(function ($fields) {
                $fields->removeByName('Style');
            });
        }

        $fields = parent::getCMSFields();

        return $fields;
    }

    /**
     * @return string
     */
    public function getCssStyle()
    {
        $styles = $this->config()->get('styles');
        $style = $this->Style;

        if (isset($styles[$style])) {
            return strtolower($styles[$style]);
        }
    }

    /**
     * @return HTMLText
     */
    public function ElementSummary()
    {
        return DBField::create_field('HTMLText', $this->HTML)->Summary(20);
    }

    public function getType()
    {
        return _t(__CLASS__ . '.BlockType', 'Content');
    }
}
