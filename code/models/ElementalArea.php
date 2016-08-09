<?php

/**
 * @package elemental
 */
class ElementalArea extends WidgetArea
{
    /**
     * Returns all the {@link BaseElement} instances in this area, regardless if
     * they are enabled or not.
     *
     * @return HasManyList
     */
    public function AllElements()
    {
        $result = $this->getComponents('Widgets');

        if ($result instanceof UnsavedRelationList) {
            // Setup a proper UnsavedRelationList so that a page using this extension can be created
            // programmatically and have unsaved/saved BaseElement records attached to it.

            // NOTE(SilbinaryWolf): Able to set protected var 'dataClass' due to ViewableData using magic get/set for properties
            $result->dataClass = 'BaseElement'; // Change from 'Widget' to 'BaseElement'
            return $result;
        }

        $list = new HasManyList('BaseElement', $result->getForeignKey());
        $list->setDataModel($this->model);
        $list->sort('Sort ASC');

        $list = $list->forForeignID($this->ID);

        return $list;
    }

    /**
     * Returns the {@link BaseElement} instances that should be displayed to the
     * user.
     *
     * @return HasManyList
     */
    public function Elements()
    {
        $list = $this->AllElements();

        if(!($list instanceof UnsavedRelationList)) {
            $list = $list->filter(array(
                'Enabled' => 1
            ));
        }

        return $list;
    }

    /**
     * Override {@link WidgetArea::ItemsToRender}
     *
     * @return HasManyList
     */
    public function ItemsToRender()
    {
        return $this->Elements();
    }

    /**
    * Return an ArrayList of pages with the Element Page Extension
    *
    * @return ArrayList
    */
    public function getOwnerPage()
    {
        $originalMode = Versioned::current_stage();
        Versioned::reading_stage('Stage');

        foreach (get_declared_classes() as $class) {
            if (is_subclass_of($class, 'SiteTree')) {
                $object = singleton($class);
                $classes = ClassInfo::subclassesFor('ElementPageExtension');
                $isElemental = false;

                foreach ($classes as $extension) {
                    if ($object->hasExtension($extension)) {
                        $isElemental = true;
                    }
                }

                if ($isElemental) {
                    $page = $class::get()->filter('ElementAreaID', $this->ID);
                    if ($page && $page->exists()) {
                        Versioned::reading_stage($originalMode);
                        return $page->first();
                    }
                }
            }
        }

        Versioned::reading_stage($originalMode);
        return false;
    }
}
