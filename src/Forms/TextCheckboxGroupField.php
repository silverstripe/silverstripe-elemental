<?php

namespace DNADesign\Elemental\Forms;

use SilverStripe\Forms\CompositeField;

class TextCheckboxGroupField extends CompositeField
{
    /**
     * Set the composite's title to that of the first child
     *
     * {@inheritDoc}
     */
    public function __construct(...$children)
    {
        parent::__construct($children);

        $this->setTitle($this->getChildren()->first()->Title());
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
        $field->setTitle(null);

        return $field;
    }
}
