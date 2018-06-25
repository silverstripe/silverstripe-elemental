<?php

namespace DNADesign\Elemental\Extensions;

use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\ElementalEditor;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Core\ClassInfo;
use SilverStripe\Core\Config\Config;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\LiteralField;
use SilverStripe\CMS\Model\RedirectorPage;
use SilverStripe\CMS\Model\VirtualPage;
use SilverStripe\ORM\DataExtension;

/**
 * This extension handles most of the relationships between pages and element
 * area, it doesn't add an ElementArea to the page however. Because of this,
 * developers can add multiple {@link ElementArea} areas to to a page.
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
    private static $ignored_classes = [];

    /**
     * @config
     *
     * On saving the element area, should Elemental reset the main website
     * `$Content` field.
     *
     * @var boolean
     */
    private static $clear_contentfield = false;

    /**
     * Get the available element types for this page type,
     *
     * Uses allowed_elements, stop_element_inheritance, disallowed_elements in
     * order to get to correct list.
     *
     * @return array
     */
    public function getElementalTypes()
    {
        $config = $this->owner->config();

        if (is_array($config->get('allowed_elements'))) {
            if ($config->get('stop_element_inheritance')) {
                $availableClasses = $config->get('allowed_elements', Config::UNINHERITED);
            } else {
                $availableClasses = $config->get('allowed_elements');
            }
        } else {
            $availableClasses = ClassInfo::subclassesFor(BaseElement::class);
        }

        $disallowedElements = (array) $config->get('disallowed_elements');
        $list = array();

        foreach ($availableClasses as $availableClass) {
            /** @var BaseElement $inst */
            $inst = singleton($availableClass);

            if (!in_array($availableClass, $disallowedElements) && $inst->canCreate()) {
                if ($inst->hasMethod('canCreateElement') && !$inst->canCreateElement()) {
                    continue;
                }

                $list[$availableClass] = $inst->getType();
            }
        }

        if ($config->get('sort_types_alphabetically') !== false) {
            asort($list);
        }

        if (isset($list[BaseElement::class])) {
            unset($list[BaseElement::class]);
        }

        $this->owner->invokeWithExtensions('updateAvailableTypesForClass', $class, $list);

        return $list;
    }

    /**
     * Returns an array of the relation names to ElementAreas. Ignores any
     * has_one fields named `Parent` as that would indicate that this is child
     * of an existing area
     *
     * @return array
     */
    public function getElementalRelations()
    {
        $hasOnes = $this->owner->hasOne();

        if (!$hasOnes) {
            return false;
        }

        $elementalAreaRelations = [];

        foreach ($hasOnes as $hasOneName => $hasOneClass) {
            if ($hasOneName === 'Parent' || $hasOneName === 'ParentID') {
                continue;
            }

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
        if (!$this->supportsElemental()) {
            return;
        }

        // add an empty holder for content as some module explicitly use insert
        // after content.
        $fields->replaceField('Content', new LiteralField('Content', ''));
        $elementalAreaRelations = $this->owner->getElementalRelations();

        foreach ($elementalAreaRelations as $eaRelationship) {
            $key = $eaRelationship . 'ID';

            // remove the scaffold dropdown
            $fields->removeByName($key);

            // remove the field, but don't add anything.
            if (!$this->owner->isInDb()) {
                continue;
            }

            $area = $this->owner->$eaRelationship();

            // if area isn't in the database then force a write so the blocks have a parent ID.
            if (!$area->isInDb()) {
                $area->write();

                $this->owner->{$key} = $area->ID;
                $this->owner->write();
            }

            $editor = ElementalEditor::create($eaRelationship, $area);
            $editor->setTypes($this->getElementalTypes());

            if ($this->owner instanceof SiteTree && $fields->findOrMakeTab('Root.Main')->fieldByName('Metadata')) {
                $fields->addFieldToTab('Root.Main', $editor->getField(), 'Metadata');
            } else {
                $fields->addFieldToTab('Root.Main', $editor->getField());
            }
        }

        return $fields;
    }

    /**
     * Make sure there is always an ElementalArea for adding Elements
     */
    public function onBeforeWrite()
    {
        parent::onBeforeWrite();

        if (!$this->supportsElemental()) {
            return;
        }

        $elementalAreaRelations = $this->owner->getElementalRelations();

        foreach ($elementalAreaRelations as $eaRelationship) {
            $areaID = $eaRelationship . 'ID';

            if (!$this->owner->$areaID) {
                $area = ElementalArea::create();
                $area->OwnerClassName = $this->owner->ClassName;
                $area->write();
                $this->owner->$areaID = $area->ID;
            }
        }

        if (Config::inst()->get(self::class, 'clear_contentfield')) {
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
        } elseif ($ignored = Config::inst()->get(ElementalPageExtension::class, 'ignored_classes')) {
            foreach ($ignored as $check) {
                if (is_a($this->owner, $check)) {
                    return false;
                }
            }
        }

        return true;
    }
}
