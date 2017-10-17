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
        $classes = $this->applyBlockTypeTitles($classes);

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

    /**
     * Return a list of classes for use in the "add new" block dropdown, using the block's type rather
     * than i18n singular name as the title
     *
     * @param  array $classes
     * @return array
     */
    public function applyBlockTypeTitles(array $classes)
    {
        $output = [];

        foreach ($classes as $sanitisedClassName => $originalTitle) {
            $className = $this->unsanitiseClassName($sanitisedClassName);

            $output[$sanitisedClassName] = singleton($className)->getType();
        }

        return $output;
    }
}
