<?php

namespace DNADesign\Elemental\Models;

use SilverStripe\Forms\FieldList;
use SilverStripe\ORM\FieldType\DBField;

class ElementContent extends BaseElement
{
    private static $icon = 'font-icon-block-content';

    private static $db = [
        'HTML' => 'HTMLText'
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
            $fields
                ->fieldByName('Root.Main.HTML')
                ->setTitle(_t(__CLASS__ . '.ContentLabel', 'Content'));
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
