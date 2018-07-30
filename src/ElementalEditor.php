<?php

namespace DNADesign\Elemental;

use DNADesign\Elemental\Models\ElementalArea;
use SilverStripe\Forms\FormField;

class ElementalEditor extends FormField
{
    /**
     * @var ElementalArea $area
     */
    protected $area;

    /**
     * @var array $type
     */
    protected $types = [];

    /**
     * @param string $name
     * @param ElementalArea $area
     */
    public function __construct($name, ElementalArea $area)
    {
        // By default, no need for a title on the editor. If there is more than one area then use `setTitle` to describe
        parent::__construct($name, '');
        $this->area = $area;

        $this->addExtraClass('element-editor__container');
    }

    /**
     * @param array $types
     *
     * @return $this
     */
    public function setTypes($types)
    {
        $this->types = $types;

        return $this;
    }

    /**
     * @return array
     */
    public function getTypes()
    {
        $types = $this->types;

        $this->extend('updateGetTypes', $types);

        return $types;
    }

    /**
     * @return ElementalArea
     */
    public function getArea()
    {
        return $this->area;
    }
}
