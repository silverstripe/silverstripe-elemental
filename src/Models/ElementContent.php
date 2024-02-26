<?php

namespace DNADesign\Elemental\Models;

use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;
use SilverStripe\ORM\FieldType\DBField;

/**
 * @property string $HTML
 */
class ElementContent extends BaseElement
{

    public function validate()
    {
        $result = parent::validate();
        if ($this->MyField == 'x') {
            $result->addFieldError('MyField', 'MyField cannot be x');
        }
        return $result;
    }

    private static $icon = 'font-icon-block-content';

    private static $db = [
        'HTML' => 'HTMLText',
        'MyField' => 'Varchar(255)',
    ];

    private static $table_name = 'ElementContent';

    private static $singular_name = 'content block';

    private static $plural_name = 'content blocks';

    private static $description = 'HTML text block';

    /**
     * Re-title the HTML field to Content
     *
     * {@inheritDoc}
     */
    public function getCMSFields()
    {
        $this->beforeUpdateCMSFields(function (FieldList $fields) {
            /** @var HTMLEditorField $editorField */
            $editorField = $fields->fieldByName('Root.Main.HTML');
            $editorField->setTitle(_t(__CLASS__ . '.ContentLabel', 'Content'));
        });

        return parent::getCMSFields();
    }

    public function getSummary()
    {
        return DBField::create_field('HTMLText', $this->HTML)->Summary(20);
    }

    public function getType()
    {
        return _t(__CLASS__ . '.BlockType', 'Content');
    }
}
