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
use Page;

/**
 * @package elemental
 */
class ElementalArea extends DataObject
{
    private static $db = array(
        'OwnerClassName' => 'Varchar',
        'SearchContent' => 'HTMLText'
    );

    private static $has_many = array(
        'Elements' => BaseElement::class
    );

    private static $extensions = array(
        Versioned::class
    );

    private static $owns = array(
        'Elements'
    );

    private static $table_name = 'ElementalArea';

    public static function elemental_page_types()
    {
        $elementalClasses = array();
        foreach (ClassInfo::getValidSubClasses(SiteTree::class) as $class) {
            if (Extensible::has_extension($class, ElementalAreasExtension::class)) {
               $elementalClasses[] = $class;
            }
        }
        return $elementalClasses;
    }

    public function onBeforeWrite()
    {
        parent::onBeforeWrite();
         $this->owner->SearchContent = $this->renderSearchContent();
    }

    /**
     * Render the elements out and push into ElementContent so that Solr can use that field for searching
     * SS4 branch not tested, as still waiting for fulltextsearch to get an upgrade
     */
    public function renderSearchContent()
    {
        // enable theme in case elements are being rendered with templates stored in theme folder
        $viewer_config = SSViewer::config();
        $originalThemeEnabled = $viewer_config->get('theme_enabled');
        $viewer_config->update('theme_enabled', true);

        // Copy elements content to ElementContent to enable search
        $searchableContent = array();

        Requirements::clear();

        foreach ($this->Elements() as $element) {
            if ($element->config()->exclude_from_content) {
                continue;
            }

            $controller = $element->getController();

            // concert to raw so that html parts of template aren't matched in search results, e.g link hrefs
            array_push($searchableContent, Convert::html2raw($controller->ElementHolder()));
        }

        Requirements::restore();

        $renderedSearchContent = trim(implode(' ', $searchableContent));

        // set theme_enabled back to what it was
        $viewer_config->update('SSViewer', 'theme_enabled', $originalThemeEnabled);
        return $renderedSearchContent;
    }

    public function forTemplate()
    {
        return $this->renderWith('ElementalArea');
    }

	/**
	 * Necessary to display results in CMS site search
	 *
	 * @return string
	 */
	public function Breadcrumbs() {
		$ownerClassName = $this->OwnerClassName;
		if($owner = $ownerClassName::get()->filter('ElementalAreaID', $this->ID)->first()) {
			return '<a href="' . $owner->CMSEditLink() . '">' . $owner->Title . '</a>';
		}
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

    /**
    * Return an ArrayList of pages with the Element Page Extension
    *
    * @return ArrayList
    */
    public function getOwnerPage()
    {
        if ($this->OwnerClassName) {
            $class = $this->OwnerClassName;
            $elementalAreaRelations = ElementalAreasExtension::get_elemental_area_relations(singleton($class));
            foreach($elementalAreaRelations as $eaRelationship) {
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
        $elementalPageTypes = self::elemental_page_types();
        foreach($elementalPageTypes as $elementalPageType) {
            $elementalAreaRelations = ElementalAreasExtension::get_elemental_area_relations(singleton($elementalPageType));
            foreach($elementalAreaRelations as $eaRelationship) {
                $areaID = $eaRelationship . 'ID';
                $page = $elementalPageType::get()->filter($areaID, $this->ID);
                if ($page && $page->exists()) {
                    Versioned::set_stage($originalMode);
                    $this->OwnerClassName = $elementalPageType;
                    $this->write();
                    return $page->first();
                }
            }
        }
        Versioned::set_stage($originalMode);
        return false;
    }
}
