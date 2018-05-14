<?php

namespace DNADesign\Elemental;

use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Forms\ElementalAreaConfig;
use DNADesign\Elemental\Forms\ElementalAreaField;
use SilverStripe\Core\Extensible;
use SilverStripe\Core\Injector\Injectable;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Forms\GridField\GridField;
use Symbiote\GridFieldExtensions\GridFieldAddNewMultiClass;

class ElementalEditor
{
    use Extensible;
    use Injectable;

    /**
     * @var ElementalArea $area
     */
    protected $area;

    /**
     * @var string $name
     */
    protected $name;

    /**
     * By default, no need for a title on the editor. If there is more than one
     * area then use `setTitle` to describe.
     *
     * @var string $title
     */
    protected $title = '';

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
        $this->name = $name;
        $this->area = $area;
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

    /**
     * @param string $title
     *
     * @return $this
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * @return GridField
     */
    public function getField()
    {
        $gridField = ElementalAreaField::create(
            $this->name,
            $this->title,
            $this->getArea()->Elements(),
            $config = ElementalAreaConfig::create()
        );

        $gridField->addExtraClass('elemental-editor');

        if ($this->types) {
            $adder = Injector::inst()->create(GridFieldAddNewMultiClass::class, 'toolbar-header-left');
            $adder->setClasses($this->getTypes());

            $config->addComponent($adder);
        }

        $this->extend('updateField', $gridField);

        return $gridField;
    }
}
