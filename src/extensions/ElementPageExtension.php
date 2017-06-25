<?php

namespace DNADesign\Elemental\Extensions;

use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Core\ClassInfo;
use SilverStripe\Core\Config\Config;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\GridField\GridFieldConfig_RelationEditor;
use SilverStripe\GridFieldExtensions\GridFieldOrderableRows;
use SilverStripe\GridFieldExtensions\GridFieldTitleHeader;
use SilverStripe\Forms\LiteralField;
use SilverStripe\ORM\DataExtension;
use SilverStripe\ORM\DB;
use SilverStripe\Versioned\Versioned;
use SilverStripe\View\Requirements;

use DNADesign\Elemental\Forms\ElementalGridFieldAddExistingAutocompleter;
use DNADesign\Elemental\Forms\ElementalGridFieldAddNewMultiClass;
use DNADesign\Elemental\Forms\ElementalGridFieldDeleteAction;
use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Models\ElementVirtualLinked;

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
    private static $copy_element_content_to_contentfield = true;

    /**
     * @config
     *
     * @var boolean
     */
    private static $clear_contentfield = false;

    /**
     * @var array $db
     */
    private static $db = array();

    /**
     * @var array $has_one
     */
    private static $has_one = array(
        'ElementArea' => ElementalArea::class
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

        $area = $this->owner->ElementArea();
        // if ($this->owner->exists() && (!$area->exists() || !$area->isInDB())) {
        //     $area->write();

        //     $this->owner->ElementAreaID = $area->ID;
        //     $this->owner->write();
        // }

        $gridField = GridField::create('ElementArea',
            Config::inst()->get(ElementPageExtension::class, 'elements_title'),
            $area->Elements(),
            $config = GridFieldConfig_RelationEditor::create()
                ->removeComponentsByType(array(
                    'SilverStripe\Forms\GridField\GridFieldAddNewButton',
                    'SilverStripe\Forms\GridField\GridFieldSortableHeader',
                    'SilverStripe\Forms\GridField\GridFieldDeleteAction',
                    'SilverStripe\Forms\GridField\GridFieldAddExistingAutocompleter'
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
        $paginator = $config->getComponentByType('SilverStripe\Forms\GridField\GridFieldPaginator');
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

        // enable theme in case elements are being rendered with templates stored in theme folder
        $originalThemeEnabled = Config::inst()->get('SSViewer', 'theme_enabled');
        Config::inst()->update('SSViewer', 'theme_enabled', true);


        if ($this->owner->hasMethod('ElementArea') && Config::inst()->get(__CLASS__, 'copy_element_content_to_contentfield')) {
            $elements = $this->owner->ElementArea();

            if (!$elements->isInDB()) {
                $elements->write();
                $this->owner->ElementAreaID = $elements->ID;
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

                    array_push($searchableContent, $controller->WidgetHolder());
                }

                Requirements::restore();

                $this->owner->Content = trim(implode(' ', $searchableContent));
            }
        } else {
            if(Config::inst()->get(__CLASS__, 'clear_contentfield')) {
                $this->owner->Content = '';
            }
        }


        // set theme_enabled back to what it was
        Config::inst()->update('SSViewer', 'theme_enabled', $originalThemeEnabled);

        parent::onBeforeWrite();
    }

    /**
     * Ensure that if there are elements that belong to this page
     * and are virtualised (Virtual Element links to them), that we move the
     * original element to replace one of the virtual elements
     * But only if it's a delete not an unpublish
     */
    public function onBeforeDelete() {
        if(Versioned::get_reading_mode() == 'Stage.Stage') {
            $area = $this->owner->ElementArea();
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
            $originalWidgetArea = $this->owner->getComponent('ElementArea');
            $duplicateWidgetArea = $originalWidgetArea->duplicate(false);
            $duplicateWidgetArea->write();
            $duplicatePage->ElementAreaID = $duplicateWidgetArea->ID;
            $duplicatePage->write();

            foreach ($originalWidgetArea->Items() as $originalWidget) {
                $duplicateWidget = $originalWidget->duplicate(true);

                // manually set the ParentID of each widget, so we don't get versioning issues
                DB::query(sprintf("UPDATE Widget SET ParentID = %d WHERE ID = %d", $duplicateWidgetArea->ID, $duplicateWidget->ID));
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
        $originalWidgetArea = $originalPage->getComponent('ElementArea');
        $duplicateWidgetArea = $originalWidgetArea->duplicate(false);
        $duplicateWidgetArea->write();
        $this->owner->ElementAreaID = $duplicateWidgetArea->ID;
        $this->owner->write();

        foreach ($originalWidgetArea->Items() as $originalWidget) {
            $duplicateWidget = $originalWidget->duplicate(true);

            // manually set the ParentID of each widget, so we don't get versioning issues
            DB::query(sprintf("UPDATE Widget SET ParentID = %d WHERE ID = %d", $duplicateWidgetArea->ID, $duplicateWidget->ID));
        }
    }

    /**
     * Publish
     */
    public function onAfterPublish()
    {
        if ($id = $this->owner->ElementAreaID) {
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
        if ($id = $this->owner->ElementAreaID) {
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
