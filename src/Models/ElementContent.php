<?php

namespace DNADesign\Elemental\Models;

use SilverStripe\Forms\HTMLEditor\HtmlEditorField;
use SilverStripe\Forms\DropdownField;
use SilverStripe\ORM\FieldType\DBField;

class ElementContent extends BaseElement
{
    private static $icon = 'dnadesign/silverstripe-elemental:images/content.svg';

    private static $db = [
        'HTML' => 'HTMLText'
    ];

    private static $table_name = 'ElementContent';

    private static $singular_name = 'content block';

    private static $plural_name = 'content blocks';

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
