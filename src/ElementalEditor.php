<?php

namespace DNADesign\Elemental;

use SilverStripe\Core\Extensible;
use SilverStripe\Core\Config\Config;
use SilverStripe\Core\Injector\Injectable;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\GridField\GridFieldAddExistingAutocompleter;
use SilverStripe\Forms\GridField\GridFieldAddNewButton;
use SilverStripe\Forms\GridField\GridFieldConfig_RelationEditor;
use SilverStripe\Forms\GridField\GridFieldDeleteAction;
use SilverStripe\Forms\GridField\GridFieldPaginator;
use SilverStripe\Forms\GridField\GridFieldSortableHeader;
use SilverStripe\Forms\GridField\GridFieldPageCount;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Forms\ElementalGridFieldAddNewMultiClass;
use Symbiote\GridFieldExtensions\GridFieldOrderableRows;

class ElementalEditor {

    use Extensible;
    use Injectable;

    /**
     * @var ElementalArea
     */
    protected $area;

    /**
     * @var string
     */
    protected $name;

    /**
     * @var array
     */
    protected $types = [];

    /**
     * @param ElementalArea
     */
    public function __construct($name, ElementalArea $area)
    {
        $this->name = $name;
        $this->area = $area;
    }

    /**
     * @param array
     *
     * @return $this
     */
    public function setTypes($types)
    {
        $this->types = $types;

        return $this;
    }

    /**
     * @return ElementalArea
     */
    public function getArea()
    {
        return $this->area;
    }

    /**
     * @return GridField
     */
    public function getField()
    {
        $gridField = GridField::create(
            $this->name,
            Config::inst()->get(ElementalPageExtension::class, $this->name),
            $this->getArea()->Elements(),
            $config = GridFieldConfig_RelationEditor::create()
                ->removeComponentsByType(array(
                    GridFieldAddNewButton::class,
                    GridFieldSortableHeader::class,
                    GridFieldDeleteAction::class,
                    GridFieldPaginator::class,
                    GridFieldPageCount::class,
                    GridFieldAddExistingAutocompleter::class
                ))
                ->addComponent(new GridFieldOrderableRows('Sort'))
                ->addComponent(new GridFieldDeleteAction(true))
        );

        if ($this->types) {
            $adder = new ElementalGridFieldAddNewMultiClass('toolbar-header-left');
            $adder->setClasses($this->types);

            $config->addComponent($adder);
        }

        $this->extend('updateField', $gridField);

        return $gridField;
    }
}
