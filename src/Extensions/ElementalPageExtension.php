<?php

namespace DNADesign\Elemental\Extensions;

use DNADesign\Elemental\Forms\ElementalGridFieldAddExistingAutocompleter;
use DNADesign\Elemental\Forms\ElementalGridFieldAddNewMultiClass;
use DNADesign\Elemental\Forms\ElementalGridFieldDeleteAction;
use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Models\ElementVirtualLinked;

use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Core\Convert;
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
use SilverStripe\ORM\DataExtension;
use SilverStripe\ORM\DB;
use SilverStripe\Versioned\Versioned;
use SilverStripe\View\Requirements;
use SilverStripe\View\SSViewer;
use Symbiote\GridFieldExtensions\GridFieldOrderableRows;
use Symbiote\GridFieldExtensions\GridFieldTitleHeader;

/**
 * @package elemental
 */
class ElementalPageExtension extends DataExtension
{

    /**
     * @config
     *
     * @var string $elements_title Title of the element in the CMS.
     */
    private static $elements_title = 'Content Elements';

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
     * @var array $db
     */
    private static $db = array(
        'ElementContent' => 'HTMLText'
    );

    /**
     * @var array $has_one
     */
    private static $has_one = array(
        'ElementalArea' => ElementalArea::class
    );

    private static $owns = array(
        'ElementalArea'
    );

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

        if (method_exists($class, 'sortElementalOptions')) {
            $this->owner->sortElementalOptions($list);
        } else if($config->get('sort_types_alphabetically') !== false) {
            asort($list);
        }

        return $list;
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

        $adder = new ElementalGridFieldAddNewMultiClass('buttons-before-left');

        $list = self::get_available_types_for_class($this->owner->ClassName);
        if($list) {
            $adder->setClasses($list);
        }

        $area = $this->owner->ElementalArea();

        $gridField = GridField::create('ElementalArea',
            Config::inst()->get(ElementPageExtension::class, 'elements_title'),
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

        $elements = $this->owner->ElementalAreaID;

        if (!$this->owner->ElementalAreaID) {
            $elements = new ElementalArea();
            $elements->OwnerClassName = $this->owner->ClassName;
            $elements->write();
            $this->owner->ElementalAreaID = $elements->ID;
        }

        $this->renderElementalSearchContent();
    }

    /**
     * Render the elements out and push into ElementContent so that Solr can use that field for searching
     * SS4 branch not tested, as still waiting for fulltextsearch to get an upgrade
     */
    public function renderElementalSearchContent()
    {
        // enable theme in case elements are being rendered with templates stored in theme folder
        $viewer_config = SSViewer::config();
        $originalThemeEnabled = $viewer_config->get('theme_enabled');
        $viewer_config->update('theme_enabled', true);

        $elements = $this->owner->ElementalArea();

        // Copy elements content to ElementContent to enable search
        $searchableContent = array();

        Requirements::clear();

        foreach ($elements->Elements() as $element) {
            if ($element->config()->exclude_from_content) {
                continue;
            }

            $controller = $element->getController();

            // concert to raw so that html parts of template aren't matched in search results, e.g link hrefs
            array_push($searchableContent, Convert::html2raw($controller->ElementHolder()));
        }

        Requirements::restore();

        $this->owner->ElementContent = trim(implode(' ', $searchableContent));

        if(Config::inst()->get(self::class, 'clear_contentfield')) {
            $this->owner->Content = '';
        }

        // set theme_enabled back to what it was
        $viewer_config->update('SSViewer', 'theme_enabled', $originalThemeEnabled);
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

        if (is_a($this->owner, 'RedirectorPage')) {
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
