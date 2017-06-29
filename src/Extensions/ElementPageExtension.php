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
use SilverStripe\GridFieldExtensions\GridFieldOrderableRows;
use SilverStripe\GridFieldExtensions\GridFieldTitleHeader;
use SilverStripe\ORM\DataExtension;
use SilverStripe\ORM\DB;
use SilverStripe\Versioned\Versioned;
use SilverStripe\View\Requirements;

/**
 * @package elemental
 */
class ElementPageExtension extends DataExtension
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

        $list = $this->getAvailableTypes();
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
     * Get the available element types for this page type,
     * Uses allowed_elements, stop_element_inheritance, disallowed_elements in order to get to correct list
     * @return array
     */
    public function getAvailableTypes() {
        if (is_array($this->owner->config()->get('allowed_elements'))) {
            if ($this->owner->config()->get('stop_element_inheritance')) {
                $list = $this->owner->config()->get('allowed_elements', Config::UNINHERITED);
            } else {
                $list = $this->owner->config()->get('allowed_elements');
            }

            if($this->owner->config()->get('sort_types_alphabetically') !== false) {
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

            $disallowedElements = (array) $this->owner->config()->get('disallowed_elements');

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

        if (method_exists($this->owner, 'sortElementalOptions')) {
            $this->owner->sortElementalOptions($list);
        }

        return $list;
    }

    /**
     * Make sure there is always a WidgetArea sidebar for adding widgets
     *
     */
    public function onBeforeWrite()
    {
        if(!$this->supportsElemental()) {
            return;
        }

        if ($this->owner->hasMethod('ElementalArea')) {
            $this->renderElementalSearchContent();
        }

        parent::onBeforeWrite();
    }

    /**
     * Render the elements out and push into ElementContent so that Solr can use that field for searching
     *
     */
    public function renderElementalSearchContent() {
        // enable theme in case elements are being rendered with templates stored in theme folder
        $originalThemeEnabled = Config::inst()->get('SSViewer', 'theme_enabled');
        Config::inst()->update('SSViewer', 'theme_enabled', true);

        $elements = $this->owner->ElementalArea();

        if (!$elements->isInDB()) {
            $elements->write();
            $this->owner->ElementalAreaID = $elements->ID;
        } else {
            // Copy widgets content to Content to enable search
            $searchableContent = array();

            Requirements::clear();

            foreach ($elements->Elements() as $element) {
                if ($element->config()->exclude_from_content) {
                    continue;
                }

                $controller = $element->getController();
                $controller->init();

                // concert to raw so that html parts of template aren't matched in search results, e.g link hrefs
                array_push($searchableContent, Convert::html2raw($controller->ElementHolder()));
            }

            Requirements::restore();

            $this->owner->ElementContent = trim(implode(' ', $searchableContent));
        }

        if(Config::inst()->get(__CLASS__, 'clear_contentfield')) {
            $this->owner->Content = '';
        }

        // set theme_enabled back to what it was
        Config::inst()->update('SSViewer', 'theme_enabled', $originalThemeEnabled);
    }

    /**
     * Ensure that if there are elements that belong to this page
     * and are virtualised (Virtual Element links to them), that we move the
     * original element to replace one of the virtual elements
     * But only if it's a delete not an unpublish
     */
    public function onBeforeDelete() {
        if(Versioned::get_reading_mode() == 'Stage.Stage') {
            $area = $this->owner->ElementalArea();
            $area->delete();
        }
    }

    /**
     * @return boolean
     */
    public function supportsElemental() {
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

    /**
     * If the page is duplicated, copy the widgets across too.
     *
     * Gets called twice from either direction, due to bad DataObject and SiteTree code, hence the weird if statement
     *
     * @return Page The duplicated page
     */
    public function onAfterDuplicate($duplicatePage)
    {
        if ($this->owner->ID != 0 && $this->owner->ID < $duplicatePage->ID) {
            $originalWidgetArea = $this->owner->getComponent('ElementalArea');
            $duplicateWidgetArea = $originalWidgetArea->duplicate(false);
            $duplicateWidgetArea->write();
            $duplicatePage->ElementalAreaID = $duplicateWidgetArea->ID;
            $duplicatePage->write();

            foreach ($originalWidgetArea->Items() as $originalWidget) {
                $duplicateWidget = $originalWidget->duplicate(true);

                // manually set the ParentID of each widget, so we don't get versioning issues
                DB::query(sprintf("UPDATE \"Widget\" SET \"ParentID\" = '%d' WHERE \"ID\" = '%d'", $duplicateWidgetArea->ID, $duplicateWidget->ID));
            }
        }
    }

    /**
     * If the page is duplicated across subsites, copy the widgets across too.
     *
     * @return Page The duplicated page
     */
    public function onAfterDuplicateToSubsite($originalPage)
    {
        $originalWidgetArea = $originalPage->getComponent('ElementalArea');
        $duplicateWidgetArea = $originalWidgetArea->duplicate(false);
        $duplicateWidgetArea->write();
        $this->owner->ElementalAreaID = $duplicateWidgetArea->ID;
        $this->owner->write();

        foreach ($originalWidgetArea->Items() as $originalWidget) {
            $duplicateWidget = $originalWidget->duplicate(true);

            // manually set the ParentID of each widget, so we don't get versioning issues
            DB::query(sprintf("UPDATE \"Widget|\" SET \"ParentID\" = '%d' WHERE \"ID\" = '%d'", $duplicateWidgetArea->ID, $duplicateWidget->ID));
        }
    }

    /**
     * Publish
     */
    public function onAfterPublish()
    {
        if ($id = $this->owner->ElementalAreaID) {
            $widgets = Versioned::get_by_stage(BaseElement::class, 'Stage', "ParentID = '$id'");
            $staged = array();

            foreach ($widgets as $widget) {
                $staged[] = $widget->ID;

                $widget->publish('Stage', 'Live');
            }

            // remove any elements that are on live but not in draft.
            $widgets = Versioned::get_by_stage(BaseElement::class, 'Live', "ParentID = '$id'");

            foreach ($widgets as $widget) {
                if (!in_array($widget->ID, $staged)) {
                    $widget->deleteFromStage('Live');
                }
            }
        }
    }

    /**
     * Roll back all changes if the parent page has a rollback event
     *
     * Only do rollback if it's the 'cancel draft changes' rollback, not a specific version
     * rollback.
     *
     * @param string $version
     * @return null
     */
    public function onBeforeRollback($version)
    {
        if ($version !== 'Live') {
            // we don't yet have a smart way of rolling back to a specific version
            return;
        }
        if ($id = $this->owner->ElementalAreaID) {
            $widgets = Versioned::get_by_stage(BaseElement::class, 'Live', "ParentID = '$id'");
            $staged = array();

            foreach ($widgets as $widget) {
                $staged[] = $widget->ID;

                $widget->invokeWithExtensions('onBeforeRollback', $widget);

                $widget->publish('Live', 'Stage', false);

                $widget->invokeWithExtensions('onAfterRollback', $widget);
            }
        }
    }
}
