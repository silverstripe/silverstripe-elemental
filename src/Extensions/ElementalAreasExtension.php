<?php

namespace DNADesign\Elemental\Extensions;

use DNADesign\Elemental\Forms\ElementalGridFieldAddExistingAutocompleter;
use DNADesign\Elemental\Forms\ElementalGridFieldAddNewMultiClass;
use DNADesign\Elemental\Forms\ElementalGridFieldDeleteAction;
use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Models\ElementVirtualLinked;

use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Core\ClassInfo;
use SilverStripe\Core\Config\Config;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\GridField\GridFieldAddExistingAutocompleter;
use SilverStripe\Forms\GridField\GridFieldAddNewButton;
use SilverStripe\Forms\GridField\GridFieldConfig_RelationEditor;
use SilverStripe\Forms\GridField\GridFieldDeleteAction;
use SilverStripe\Forms\GridField\GridFieldPaginator;
use SilverStripe\Forms\GridField\GridFieldSortableHeader;
use SilverStripe\Forms\LiteralField;
use SilverStripe\CMS\Model\RedirectorPage;
use SilverStripe\CMS\Model\VirtualPage;
use SilverStripe\ORM\DataExtension;

use Symbiote\GridFieldExtensions\GridFieldOrderableRows;
use Symbiote\GridFieldExtensions\GridFieldTitleHeader;

/**
 * This extension handles most of the relationships between pages and element area
 * It doesn't add an ElementArea to the page however.
 * Because of this, developers can add multiple ElementAreas.
 *
 * If you want multiple ElementalAreas add them as has_ones, add this extensions
 * and MAKE SURE you don't forget to add ElementAreas to $owns, otherwise they
 * will never publish
 *
 * private static $has_one = array(
 *     'ElementalArea1' => ElementalArea::class,
 *     'ElementalArea2' => ElementalArea::class
 * );
 *
 * private static $owns = array(
 *     'ElementalArea1',
 *     'ElementalArea2'
 * );
 *
 * @package elemental
 */
class ElementalAreasExtension extends DataExtension
{

    /**
     * @config
     *
     * @var array $ignored_classes Classes to ignore adding elements too.
     */
    private static $ignored_classes = array();

    /**
     * @config
     *
     * @var boolean
     */
    private static $clear_contentfield = false;

    /**
     * Get the available element types for this page type,
     * Uses allowed_elements, stop_element_inheritance, disallowed_elements in order to get to correct list
     * @return array
     */
    public static function get_available_types_for_class($class)
    {
        $config = $class::config();

        if (is_array($config->get('allowed_elements'))) {
            if ($config->get('stop_element_inheritance')) {
                $availableClasses = $config->get('allowed_elements', Config::UNINHERITED);
            } else {
                $availableClasses = $config->get('allowed_elements');
            }

        } else {
            $availableClasses = ClassInfo::subclassesFor(BaseElement::class);
            unset($availableClasses[BaseElement::class]);
        }

        $disallowedElements = (array) $config->get('disallowed_elements');

        if (!in_array(ElementVirtualLinked::class, $disallowedElements)) {
            array_push($disallowedElements, ElementVirtualLinked::class);
        }

        $list = array();
        foreach ($availableClasses as $availableClass) {
            $inst = singleton($availableClass);

            if (!in_array($availableClass, $disallowedElements) && $inst->canCreate()) {
                $list[$availableClass] = $inst->i18n_singular_name();
            }
        }

        if($config->get('sort_types_alphabetically') !== false) {
            asort($list);
        }

        return $list;
    }

    public static function get_elemental_area_relations(SiteTree $elementOwner) {
        $hasOnes = $elementOwner->hasOne();

        if(!$hasOnes) {
            return false;
        }

        // find ElementalArea relations
        $elementalAreaRelations = array();

        foreach ($hasOnes as $hasOneName => $hasOneClass) {
            if ($hasOneClass == ElementalArea::class || is_subclass_of($hasOneClass, ElementalArea::class)) {
                $elementalAreaRelations[] = $hasOneName;
            }
        }

        return $elementalAreaRelations;
    }

    /**
     * Setup the CMS Fields
     *
     * @param FieldList
     */
    public function updateCMSFields(FieldList $fields)
    {
        if(!$this->supportsElemental()) {
            return;
        }

        // add an empty holder for content as some module explicitly use insert
        // after content.
        $fields->replaceField('Content', new LiteralField('Content', ''));

        $elementalAreaRelations = self::get_elemental_area_relations($this->owner);
        foreach($elementalAreaRelations as $eaRelationship) {
            $adder = new ElementalGridFieldAddNewMultiClass('buttons-before-left');

            $list = self::get_available_types_for_class($this->owner->ClassName);
            if($list) {
                $adder->setClasses($list);
            }

            $area = $this->owner->$eaRelationship();

            $gridField = GridField::create($eaRelationship,
                Config::inst()->get(ElementPageExtension::class, $eaRelationship),
                $area->Elements(),
                $config = GridFieldConfig_RelationEditor::create()
                    ->removeComponentsByType(array(
                        GridFieldAddNewButton::class,
                        GridFieldSortableHeader::class,
                        GridFieldDeleteAction::class,
                        GridFieldAddExistingAutocompleter::class
                    ))
                    ->addComponent($autocomplete = new ElementalGridFieldAddExistingAutocompleter('buttons-before-right'))
                    ->addComponent(new GridFieldTitleHeader())
                    ->addComponent($adder)
                    ->addComponent(new GridFieldOrderableRows('Sort'))
            );

            if ($this->owner->canArchive()) {
                $config->addComponent(new ElementalGridFieldDeleteAction());
            }

            $searchList = BaseElement::get()->filter('AvailableGlobally', true);
            if($list) {
                $searchList = $searchList->filter('ClassName', array_keys($list));
            }
            $autocomplete->setSearchList($searchList);

            $autocomplete->setResultsFormat('($ID) $Title');
            $autocomplete->setSearchFields(array('ID', 'Title'));

            $config = $gridField->getConfig();
            $paginator = $config->getComponentByType(GridFieldPaginator::class);
            if ($paginator) {
                $paginator->setItemsPerPage(100);
            }

            if ($this->owner instanceof SiteTree && $fields->findOrMakeTab('Root.Main')->fieldByName('Metadata')) {
                $fields->addFieldToTab('Root.Main', $gridField, 'Metadata');
            } else {
                $fields->addFieldToTab('Root.Main', $gridField);
            }
        }

        return $fields;
    }

    /**
     * Make sure there is always an ElementalArea for adding Elements
     *
     */
    public function onBeforeWrite()
    {
        parent::onBeforeWrite();

        if(!$this->supportsElemental()) {
            return;
        }

        $elementalAreaRelations = self::get_elemental_area_relations($this->owner);
        foreach($elementalAreaRelations as $eaRelationship) {
            $areaID = $eaRelationship . 'ID';

            if (!$this->owner->$areaID) {
                $area = new ElementalArea();
                $area->OwnerClassName = $this->owner->ClassName;
                $area->write();
                $this->owner->$areaID = $area->ID;
            } else {
            	if ($area = ElementalArea::get()->filter('ID', $this->owner->$areaID)->first()) {
					$area->write();
				}
			}
        }

        if(Config::inst()->get(self::class, 'clear_contentfield')) {
            $this->owner->Content = '';
        }
    }

    /**
     * @return boolean
     */
    public function supportsElemental()
    {
        if ($this->owner->hasMethod('includeElemental')) {
            $res = $this->owner->includeElemental();
            if ($res !== null) {
                return $res;
            }
        }

        if (is_a($this->owner, RedirectorPage::class) || is_a($this->owner, VirtualPage::class)) {
            return false;
        } else if ($ignored = Config::inst()->get(ElementPageExtension::class, 'ignored_classes')) {
            foreach ($ignored as $check) {
                if (is_a($this->owner, $check)) {
                    return false;
                }
            }
        }

        return true;
    }
}
