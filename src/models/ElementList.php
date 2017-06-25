<?php

namespace DNADesign\Elemental\Models;


use \Heyday\VersionedDataObjects\VersionedDataObjectDetailsForm;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;

use SilverStripe\Forms\GridField\GridFieldConfig_RecordEditor;
use SilverStripe\GridFieldExtensions\GridFieldOrderableRows;
use SilverStripe\GridFieldExtensions\GridFieldTitleHeader;


use GridField;
use Config;
use LiteralField;
use ClassInfo;
use ArrayList;
use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Extensions\ElementPublishChildren;
use DNADesign\Elemental\ElementalGridFieldAddNewMultiClass;
use DNADesign\Elemental\ElementalGridFieldDeleteAction;
use DNADesign\Elemental\ElementalGridFieldAddExistingAutocompleter;
use DNADesign\Elemental\Extensions\ElementPageExtension;
use DNADesign\Elemental\Models\ElementVirtualLinked;



/**
 * A list contains nested {@link BaseElement} such as a list of related files.
 *
 * @package elemental
 */
class ElementList extends BaseElement
{

    private static $db = array(
        'HideTitle' => 'Boolean',
        'ListDescription' => 'HTMLText'
    );

    private static $has_many = array(
        'Elements' => BaseElement::class
    );

    private static $duplicate_relations = array(
        'Elements'
    );

    private static $extensions = array(
        ElementPublishChildren::class
    );

    private static $title = "Element List Element";

    private static $description = "Orderable list of elements";

    private static $enable_title_in_template = true;

    /**
     * @return FieldList
     */
    public function getCMSFields()
    {
        $elements = $this->Elements();
        $isInDb = $this->isInDB();

        $this->beforeUpdateCMSFields(function ($fields) use ($elements, $isInDb) {
            $fields->removeByName('Root.Elements');
            $fields->removeByName('Elements');

            $desc = HTMLEditorField::create('ListDescription', 'List Description');
            $desc->setRightTitle('Optional');
            $desc->setRows(5);
            $fields->addFieldToTab('Root.Main', $desc);


            if ($isInDb) {
                $adder = new ElementalGridFieldAddNewMultiClass('buttons-before-left');

                $list = $this->getAvailableTypes();

                if($list) {
                    $adder->setClasses($list);
                }

                $config = GridFieldConfig_RecordEditor::create(100);
                $config->addComponent(new GridFieldSortableRows('Sort'));
                $config->removeComponentsByType('GridFieldAddNewButton');
                $config->removeComponentsByType('GridFieldSortableHeader');
                $config->removeComponentsByType('GridFieldDeleteAction');
                $config->removeComponentsByType('GridFieldAddExistingAutocompleter');
                $config->addComponent(new GridFieldTitleHeader());
                $config->addComponent($adder);
                $config->addComponent($autocomplete = new ElementalGridFieldAddExistingAutocompleter('buttons-before-right'));

                if ($this->owner->canDelete()) {
                    $config->addComponent(new ElementalGridFieldDeleteAction());
                }

                $searchList = BaseElement::get()->filter('AvailableGlobally', true);
                if($list) {
                    $searchList = $searchList->filter('ClassName', array_keys($list));
                }
                $autocomplete->setSearchList($searchList);

                $autocomplete->setResultsFormat('($ID) $Title');
                $autocomplete->setSearchFields(array('ID', 'Title'));

                $widgetArea = new GridField(
                    'Elements',
                    Config::inst()->get(ElementPageExtension::class, 'elements_title'),
                    $elements,
                    $config
                );

                $fields->addFieldToTab('Root.Main', $widgetArea);
            } else {
                $fields->addFieldToTab('Root.Main', LiteralField::create('warn', '<p class="message notice">Once you save this object you will be able to add items</p>'));
            }
        });

        return parent::getCMSFields();
    }

    /**
     * @return array
     */
    public function getAvailableTypes()
    {
        if (is_array($this->config()->get('allowed_elements'))) {
            $list = $this->config()->get('allowed_elements');

            if($this->config()->get('sort_types_alphabetically') !== false) {
                $sorted = array();

                foreach ($list as $class) {
                    $inst = singleton($class);

                    if ($inst->canCreate()) {
                        $sorted[$class] = singleton($class)->i18n_singular_name();
                    }
                }

                $list = $sorted;
                asort($list);
            }
        } else {
            $classes = ClassInfo::subclassesFor(BaseElement::class);
            $list = array();
            unset($classes[BaseElement::class]);

            $disallowedElements = (array) $this->config()->get('disallowed_elements');

            if (!in_array(ElementVirtualLinked::class, $disallowedElements)) {
                array_push($disallowedElements, ElementVirtualLinked::class);
            }

            foreach ($classes as $class) {
                $inst = singleton($class);

                if (!in_array($class, $disallowedElements) && $inst->canCreate()) {
                    $list[$class] = singleton($class)->i18n_singular_name();
                }
            }

            asort($list);
        }

        if (method_exists($this, 'sortElementalOptions')) {
            $this->sortElementalOptions($list);
        }

        return $list;
    }

    /**
     * Used in template instead of {@link Widgets()} to wrap each element in its
     * controller, making it easier to access and process form logic and
     * actions stored in {@link WidgetController}.
     *
     * @return SS_List - Collection of {@link WidgetController} instances.
     */
    public function ElementControllers()
    {
        $controllers = new ArrayList();

        foreach($this->Elements()->filter('Enabled', 1) as $element) {
            $controller = $element->getController();

            $controller->init();
            $controllers->push($controller);
        }

        return $controllers;
    }

    /**
     * Ensure that we tidy up Elements if we delete this list
     */
    public function onAfterDelete()
    {
        if(Versioned::get_reading_mode() == 'Stage.Stage') {
            foreach ($this->Elements() as $element) {
                $element->delete();
            }
        }
    }
}
