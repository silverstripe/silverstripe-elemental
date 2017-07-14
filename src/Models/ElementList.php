<?php

namespace DNADesign\Elemental\Models;

use DNADesign\Elemental\Extensions\ElementalAreasExtension;
use DNADesign\Elemental\Extensions\ElementalPublishChildren;
use DNADesign\Elemental\Forms\ElementalGridFieldAddExistingAutocompleter;
use DNADesign\Elemental\Forms\ElementalGridFieldAddNewMultiClass;
use DNADesign\Elemental\Forms\ElementalGridFieldDeleteAction;
use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementVirtualLinked;

use SilverStripe\Core\Config\Config;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\GridField\GridFieldAddExistingAutocompleter;
use SilverStripe\Forms\GridField\GridFieldAddNewButton;
use SilverStripe\Forms\GridField\GridFieldConfig_RecordEditor;
use SilverStripe\Forms\GridField\GridFieldConfig_RelationEditor;
use SilverStripe\Forms\GridField\GridFieldDeleteAction;
use SilverStripe\Forms\GridField\GridFieldPaginator;
use SilverStripe\Forms\GridField\GridFieldSortableHeader;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;
use SilverStripe\Forms\LiteralField;
use SilverStripe\ORM\ArrayList;
use Symbiote\GridFieldExtensions\GridFieldOrderableRows;
use Symbiote\GridFieldExtensions\GridFieldTitleHeader;

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

    private static $owns = array(
        'Elements'
    );

    private static $table_name = 'ElementList';

    private static $title = 'Element List';

    private static $description = 'Orderable list of elements';

    private static $enable_title_in_template = true;

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

                $list = ElementalAreasExtension::get_available_types_for_class(self::class);

                if($list) {
                    $adder->setClasses($list);
                }

                $config = GridFieldConfig_RecordEditor::create(100)
                    ->removeComponentsByType(array(
                        GridFieldAddNewButton::class,
                        GridFieldSortableHeader::class,
                        GridFieldDeleteAction::class,
                        GridFieldAddExistingAutocompleter::class
                    ))
                    ->addComponent($autocomplete = new ElementalGridFieldAddExistingAutocompleter('buttons-before-right'))
                    ->addComponent(new GridFieldTitleHeader())
                    ->addComponent($adder)
                    ->addComponent(new GridFieldOrderableRows('Sort'));

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

                $elementArea = new GridField(
                    'Elements',
                    Config::inst()->get(ElementPageExtension::class, 'elements_title'),
                    $elements,
                    $config
                );

                $fields->addFieldToTab('Root.Main', $elementArea);
            } else {
                $fields->addFieldToTab('Root.Main', LiteralField::create('warn', '<p class="message notice">Once you save this object you will be able to add items</p>'));
            }
        });

        return parent::getCMSFields();
    }

    /**
     * @return HasManyList
     */
    public function ItemsToRender()
    {
        return $this->Elements(array(
            'Enabled' => 1
        ));
    }

    /**
     * Used in template instead of {@link Elements()} to wrap each element in its
     * controller, making it easier to access and process form logic and
     * actions stored in {@link ElementController}.
     *
     * @return ArrayList - Collection of {@link ElementController} instances.
     */
    public function ElementControllers()
    {
        $controllers = new ArrayList();
        $items = $this->ItemsToRender();
        if (!is_null($items)){
            foreach ($items as $element) {
                $controller = $element->getController();
                $controllers->push($controller);
            }
        }
        return $controllers;
    }
}
