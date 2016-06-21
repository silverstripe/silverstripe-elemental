<?php

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
    private static $elements_title = 'Content Blocks';

    /**
     * @config
     *
     * @var array $ignored_classes Classes to ignore adding elements too.
     */
    private static $ignored_classes = array();

    /**
     * @var array $db
     */
    private static $db = array();

    /**
     * @var array $has_one
     */
    private static $has_one = array(
        'ElementArea' => 'ElementalArea'
    );

    /**
     * Setup the CMS Fields
     *
     * @param FieldList
     */
    public function updateCMSFields(FieldList $fields)
    {
        if(!$this->supportsElemental()) {
            return false;
        }

        // add an empty holder for content as some module explicitly use insert
        // after content.
        $fields->replaceField('Content', new LiteralField('Content', ''));

        $adder = new ElementalGridFieldAddNewMultiClass();

        $list = $this->getAvailableTypes();
        if($list) {
            $adder->setClasses($list);
        }

        $area = $this->owner->ElementArea();

        if ($this->owner->exists() && (!$area->exists() || !$area->isInDB())) {
            $area->write();

            $this->owner->ElementAreaID = $area->ID;
            $this->owner->write();
        }

        $elements = $this->owner->ElementArea()->Elements();
        if (!$elements || $elements instanceof ArrayList || $elements instanceof UnsavedRelationList) {
            // Allow gridfield to render on an unsaved DataObject
            $elements = new UnsavedRelationList('ElementalArea', 'Widgets', 'BaseElement');
        }

        $gridField = GridField::create('ElementArea',
            Config::inst()->get("ElementPageExtension", 'elements_title'),
            $elements,
            GridFieldConfig_RelationEditor::create()
                ->removeComponentsByType('GridFieldAddNewButton')
                ->removeComponentsByType('GridFieldDeleteAction')
                ->removeComponentsByType('GridFieldAddExistingAutocompleter')
                ->addComponent(new ElementalGridFieldAddExistingAutocompleter())
                ->addComponent(new ElementalGridFieldDeleteAction())
                ->addComponent($adder)
                ->addComponent(new GridFieldSortableRows('Sort'))
        );

        $config = $gridField->getConfig();
        $paginator = $config->getComponentByType('GridFieldPaginator');
        $paginator->setItemsPerPage(100);

        $config->removeComponentsByType('GridFieldDetailForm');
        $config->addComponent(new VersionedDataObjectDetailsForm());

        $fields->addFieldToTab('Root.Main', $gridField);

        return $fields;
    }

    /**
     * @return array
     */
    public function getAvailableTypes() {
        if (is_array($this->owner->config()->get('allowed_elements'))) {
            $list = $this->owner->config()->get('allowed_elements');

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
            $classes = ClassInfo::subclassesFor('BaseElement');
            $list = array();
            unset($classes['BaseElement']);

            foreach ($classes as $class) {
                $inst = singleton($class);

                if ($inst->canCreate()) {
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
        // enable theme in case elements are being rendered with templates stored in theme folder
        $originalThemeEnabled = Config::inst()->get('SSViewer', 'theme_enabled');
        Config::inst()->update('SSViewer', 'theme_enabled', true);

        if(!$this->supportsElemental()) {
            return;
        }

        if ($this->owner->hasMethod('ElementArea')) {
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

                    foreach ($elements->Items() as $element) {
                        $controller->init();

                        array_push($searchableContent, $controller->WidgetHolder());
                    }
                }
                Requirements::restore();

                $this->owner->Content = trim(implode(' ', $searchableContent));
            }
        }


        // set theme_enabled back to what it was
        Config::inst()->update('SSViewer', 'theme_enabled', $originalThemeEnabled);

        parent::onBeforeWrite();
    }

    /**
     * @return boolean
     */
    public function supportsElemental() {
        if (method_exists($this->owner, 'includeElemental')) {
            return $this->owner->includeElemental();
        }

        if (is_a($this->owner, 'RedirectorPage')) {
            return false;
        } else if ($ignored = Config::inst()->get('ElementPageExtension', 'ignored_classes')) {
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
            $widgets = Versioned::get_by_stage('BaseElement', 'Stage', "ParentID = '$id'");
            $staged = array();

            foreach ($widgets as $widget) {
                $staged[] = $widget->ID;

                $widget->publish('Stage', 'Live');
            }

            // remove any elements that are on live but not in draft.
            $widgets = Versioned::get_by_stage('BaseElement', 'Live', "ParentID = '$id'");

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
            $widgets = Versioned::get_by_stage('BaseElement', 'Live', "ParentID = '$id'");
            $staged = array();

            foreach ($widgets as $widget) {
                $staged[] = $widget->ID;

                $widget->invokeWithExtensions('onBeforeRollback', $widget);

                $widget->publish("Live", "Stage", false);

                $widget->invokeWithExtensions('onAfterRollback', $widget);
            }
        }
    }
}
