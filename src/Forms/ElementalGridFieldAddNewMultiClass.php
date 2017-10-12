<?php

namespace DNADesign\Elemental\Forms;

use DNA\AdvancedDropdowns\AdvancedDropdownField;
use SilverStripe\Control\Controller;
use SilverStripe\Core\Config\Config;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\View\ArrayData;
use Symbiote\GridFieldExtensions\GridFieldAddNewMultiClass;
use Symbiote\GridFieldExtensions\GridFieldExtensions;

class ElementalGridFieldAddNewMultiClass extends GridFieldAddNewMultiClass
{
    /**
     * Overridden to swap out dropdown for advancedropdown, so we can define element icons
     *
     * {@inheritDoc}
     */
    public function getHTMLFragments($grid)
    {
        $classes = $this->getClasses($grid);

        if (!count($classes)) {
            return array();
        }

        GridFieldExtensions::include_requirements();

        $preppedClasses = [];

        foreach ($classes as $key => $value) {
            $preppedClasses[$key] = [
                'Title' => $value,
                'Attributes' => ['class'=>'el-icon ' . strtolower($key)]
            ];
        }

        $field = new AdvancedDropdownField(sprintf('%s[ClassName]', __CLASS__), '', $preppedClasses);

        if (Config::inst()->get(__CLASS__, 'showEmptyString')) {
            $field->setHasEmptyDefault(true);
        }

        $field->addExtraClass('no-change-track el-chosen');

        $data = new ArrayData(array(
            'Title'      => $this->getTitle(),
            'Link'       => Controller::join_links($grid->Link(), 'add-multi-class', '{class}'),
            'ClassField' => $field
        ));

        return array(
            $this->getFragment() => $data->renderWith(parent::class)
        );
    }
}
