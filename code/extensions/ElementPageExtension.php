<?php

/**
 * @package elemental
 */
class ElementPageExtension extends DataExtension
{

    private static $elements_title = 'Elements';

    /**
     * @config
     *
     * @var array $ignored_classes Classes to ignore adding elements too.
     */
    private static $ignored_classes = array();

    private static $db = array();

    private static $has_one = array(
        'ElementArea' => 'ElementalArea'
    );

    /**
     * Setup the CMS Fields
     *
     * @return FieldList
     */
    public function updateCMSFields(FieldList $fields)
    {
        // redirector pages should not have elements
        if (is_a($this->owner, 'RedirectorPage')) {
            return;
        } elseif ($ignored = Config::inst()->get('ElementPageExtension', 'ignored_classes')) {
            foreach ($ignored as $check) {
                if (is_a($this->owner, $check)) {
                    return;
                }
            }
        }

        // add an empty holder for content as some module explicitly use insert
        // after content.
        $fields->replaceField('Content', new LiteralField('Content', ''));

        $adder = new ElementalGridFieldAddNewMultiClass();

        if (is_array($this->owner->config()->get('allowed_elements'))) {
            $list = $this->owner->config()->get('allowed_elements');
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
        }
        if (method_exists($this->owner, 'sortElementalOptions')) {
            $this->owner->sortElementalOptions($list);
        } else {
            asort($list);
        }

        $adder->setClasses($list);

        $area = $this->owner->ElementArea();

        if (!$area->exists() || !$area->isInDB()) {
            $area->write();

            $this->owner->ElementAreaID = $area->ID;
            $this->owner->write();
        }

        $gridField = GridField::create('ElementArea',
            Config::inst()->get("ElementPageExtension", 'elements_title'),
            $this->owner->ElementArea()->Elements(),
            GridFieldConfig_RelationEditor::create()
                ->removeComponentsByType('GridFieldAddNewButton')
                ->removeComponentsByType('GridFieldAddExistingAutocompleter')
                ->removeComponentsByType('GridFieldDeleteAction')
                ->addComponent(new GridFieldDeleteAction(false))
                ->addComponent($adder)
                ->addComponent(new GridFieldSortableRows('Sort'))
        );

        $config = $gridField->getConfig();
        $paginator = $config->getComponentByType('GridFieldPaginator');
        $paginator->setItemsPerPage(100);

        $config->removeComponentsByType('GridFieldDetailForm');
        $config->addComponent(new VersionedDataObjectDetailsForm());

        $fields->addFieldToTab('Root.Main', $gridField, 'Metadata');

        return $fields;
    }

    /**
     * Make sure there is always a WidgetArea sidebar for adding widgets
     *
     */
    public function onBeforeWrite()
    {
        // enable theme incase elements are being rendered with templates stored in theme folder
        $originalThemeEnabled = Config::inst()->get('SSViewer', 'theme_enabled');
        Config::inst()->update('SSViewer', 'theme_enabled', true);

        if ($ignored = Config::inst()->get('ElementPageExtension', 'ignored_classes')) {
            foreach ($ignored as $check) {
                if (is_a($this->owner, $check)) {
                    return;
                }
            }
        }

        if ($this->owner->hasMethod('ElementArea')) {
            $elements = $this->owner->ElementArea();

            if (!$elements->isInDB()) {
                $elements->write();
                $this->owner->ElementAreaID = $elements->ID;
            } else {
                // Copy widgets content to Content to enable search
                $searchableContent = array();

                foreach ($elements->Items() as $element) {
                    if ($element->config()->exclude_from_content) {
                        continue;
                    }

                    array_push($searchableContent, strip_tags($element->WidgetHolder(), '<a>'));
                }

                $this->owner->Content = trim(implode(' ', $searchableContent));
            }
        }


        // set theme_enabled back to what it was
        Config::inst()->update('SSViewer', 'theme_enabled', $originalThemeEnabled);

        parent::onBeforeWrite();
    }

    /**
     * If the page is duplicated, copy the widgets across too.
     * Gets called twice from either direction, due to bad DataObject
     * and SiteTree code, hence the weird if statement
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
