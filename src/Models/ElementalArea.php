<?php

namespace DNADesign\Elemental\Models;

use DNADesign\Elemental\Extensions\ElementalAreasExtension;
use DNADesign\Elemental\Models\BaseElement;

use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Core\ClassInfo;
use SilverStripe\Core\Convert;
use SilverStripe\Core\Extensible;
use SilverStripe\ORM\ArrayList;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\HasManyList;
use SilverStripe\ORM\UnsavedRelationList;
use SilverStripe\Versioned\Versioned;
use SilverStripe\View\Requirements;
use SilverStripe\View\SSViewer;
use SilverStripe\Core\Injector\Injector;
use Page;

class ElementalArea extends DataObject
{
    /**
     * @var array $db
     */
    private static $db = [
        'OwnerClassName' => 'Varchar(255)',
        'SearchContent' => 'HTMLText'
    ];

    /**
     * @var array $has_many
     */
    private static $has_many = [
        'Elements' => BaseElement::class
    ];

    /**
     * @var array
     */
    private static $extensions = [
        Versioned::class
    ];

    /**
     * @var array
     */
    private static $owns = [
        'Elements'
    ];

    /**
     * @var array
     */
    private static $summary_fields = [
        'Title' => 'Title'
    ];

    /**
     * @var string
     */
    private static $table_name = 'ElementalArea';

    /**
     * @return array
     */
    public function supportedPageTypes()
    {
        $elementalClasses = [];

        foreach (ClassInfo::getValidSubClasses(SiteTree::class) as $class) {
            if (Extensible::has_extension($class, ElementalAreasExtension::class)) {
                $elementalClasses[] = $class;
            }
        }

        return $elementalClasses;
    }

    /**
     *
     */
    public function onBeforeWrite()
    {
        parent::onBeforeWrite();

        // @todo
        // $this->SearchContent = $this->renderSearchContent();
    }

    /**
     * Render the elements out and push into ElementContent so that Solr can
     * index.
     *
    public function renderSearchContent()
    {
        // Copy elements content to ElementContent to enable search
        $searchableContent = array();

        Requirements::clear();

        foreach ($this->Elements() as $element) {
            if ($element->config()->exclude_from_content) {
                continue;
            }

            $controller = $element->getController();

            // concert to raw so that html parts of template aren't matched in
            // search results, e.g link hrefs
            array_push($searchableContent, Convert::html2raw($controller->forTemplate()));
        }

        Requirements::restore();

        $renderedSearchContent = trim(implode(' ', $searchableContent));

        return $renderedSearchContent;
    }*/

    /**
     * @return HTMLText
     */
    public function forTemplate()
    {
        return $this->renderWith(static::class);
    }

    /**
     * Necessary to display results in CMS site search.
     *
     * @return HTMLText
     */
    public function Breadcrumbs()
    {
        $ownerClassName = $this->OwnerClassName;

        if ($owner = $ownerClassName::get()->filter('ElementalAreaID', $this->ID)->first()) {
            return DBField::create_field('HTMLText', sprintf(
                '<a href="%s">%s</a>',
                $owner->CMSEditLink(),
                $owner->Title
            ));
        }
    }

    /**
     * Used in template instead of {@link Elements()} to wrap each element in
     * its' controller, making it easier to access and process form logic and
     * actions stored in {@link ElementController}.
     *
     * @return ArrayList
     */
    public function ElementControllers()
    {
        $controllers = new ArrayList();
        $items = $this->Elements();

        if (!is_null($items)) {
            foreach ($items as $element) {
                $controller = $element->getController();
                $controllers->push($controller);
            }
        }

        return $controllers;
    }

    /**
     *
     */
    public function getOwnerPage()
    {
        if ($this->OwnerClassName) {
            $class = $this->OwnerClassName;
            $elementalAreaRelations = Injector::inst()->get($class)->getElementalRelations();

            foreach ($elementalAreaRelations as $eaRelationship) {
                $areaID = $eaRelationship . 'ID';

                $page = $class::get()->filter($areaID, $this->ID);

                if ($page && $page->exists()) {
                    return $page->first();
                }
            }
        }

        $originalMode = Versioned::get_stage();

        if (!$originalMode) {
            $originalMode = Versioned::DRAFT;
        }

        Versioned::set_stage(Versioned::DRAFT);

        foreach ($this->supportedPageTypes() as $class) {
            $elementalAreaRelations = Injector::inst()->get($class)->getElementalRelations();

            foreach ($elementalAreaRelations as $eaRelationship) {
                $areaID = $eaRelationship . 'ID';
                $page = $class::get()->filter($areaID, $this->ID);

                if ($page && $page->exists()) {
                    Versioned::set_stage($originalMode);
                    $this->OwnerClassName = $class;
                    $this->write();

                    return $page->first();
                }
            }
        }

        Versioned::set_stage($originalMode);

        return false;
    }
}
