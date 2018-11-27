<?php

namespace DNADesign\Elemental\Forms;

use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\CompositeField;
use SilverStripe\Forms\LiteralField;
use SilverStripe\Forms\TextField;

class TextCheckboxGroupField extends CompositeField
{
    protected $schemaComponent = 'TextCheckboxGroupField';

    /**
     * Set the composite's title to that of the first child
     *
     * @param string|null $title
     */
    public function __construct($title = null)
    {
        if (!$title) {
            $title = _t(__CLASS__ . '.TitleLabel', 'Title (displayed if checked)');
        }

        $fields = [
            TextField::create('Title', $title),
            CheckboxField::create('ShowTitle', _t(__CLASS__ . '.ShowTitleLabel', 'Displayed'))
        ];

        parent::__construct($fields);

        $this->setTitle($title);
    }

    /**
     * Don't use the custom template for readonly states
     *
     * {@inheritDoc}
     */
    public function performReadonlyTransformation()
    {
        $field = parent::performReadonlyTransformation();

        $field->setTemplate(CompositeField::class);
        $field->setTitle('Title');

        $field->replaceField('Title', LiteralField::create(
            'Title',
            $field->fieldByName('Title')->Value()
        ));

        $displayedText = _t(__CLASS__ . '.DISPLAYED', 'Displayed');
        $notDisplayedText = _t(__CLASS__ . '.NOT_DISPLAYED', 'Not displayed');

        $field->replaceField('ShowTitle', LiteralField::create(
            'ShowTitle',
            $field->fieldByName('ShowTitle')->Value() === 'Yes' ? $displayedText : $notDisplayedText
        )->addExtraClass('show-title'));

        return $field;
    }
}
