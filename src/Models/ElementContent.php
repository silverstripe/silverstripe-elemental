<?php

namespace DNADesign\Elemental\Models;

use SilverStripe\Forms\HTMLEditor\HtmlEditorField;
use SilverStripe\Forms\DropdownField;
use SilverStripe\ORM\FieldType\DBField;

class ElementContent extends BaseElement
{
    /**
     * @var string
     */
    private static $icon = 'elemental/images/content.svg';

    /**
     * @var array
     */
    private static $db = [
        'HTML' => 'HTMLText',
        'Style' => 'Varchar(255)'
    ];

    /**
     * @var string
     */
    private static $table_name = 'ElementContent';

    /**
     * @var array
     */
    private static $styles = [];

    /**
     * @var string
     */
    private static $title = 'Content Element';

    /**
     * @var string
     */
    private static $description = 'HTML block';

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

        if ($this->hasExtension('VersionViewerDataObject')) {
            $fields = $this->addVersionViewer($fields, $this);
        }

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
}
