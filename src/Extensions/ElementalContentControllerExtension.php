<?php

namespace DNADesign\Elemental\Extensions;

use SilverStripe\Core\Extension;
use SilverStripe\ORM\DataObject;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Extensions\ElementalAreasExtension;
use SilverStripe\CMS\Controllers\ContentController;

/**
 * @extends Extension<ContentController>
 */
class ElementalContentControllerExtension extends Extension
{
    /**
     * @var array
     */
    private static $allowed_actions = array(
        'handleElement'
    );

    public function handleElement()
    {
        $id = $this->owner->getRequest()->param('ID');

        if (!$id) {
            user_error('No element ID supplied', E_USER_ERROR);
            return false;
        }

        $elementOwner = $this->owner->data();

        if (!$elementOwner->hasExtension(ElementalAreasExtension::class)) {
            user_error(get_class($elementOwner) . ' doesnt have the ElementalAreasExtension applied', E_USER_ERROR);
            return false;
        }

        $elementalAreaRelations = $elementOwner->getElementalRelations();
        if (!$elementalAreaRelations) {
            user_error(get_class($elementOwner) . ' has no ElementalArea relationships', E_USER_ERROR);
            return false;
        }

        $element = $this->findElement($elementalAreaRelations, $elementOwner, $id);

        if ($element) {
            return $element->getController();
        }

        user_error('Element $id not found for this page', E_USER_ERROR);
        return false;
    }

    private function findElement(iterable $elementalAreaRelations, DataObject $owner, $id): ?DataObject
    {
        foreach ($elementalAreaRelations as $elementalAreaRelation) {
            $elements = $owner->$elementalAreaRelation()->Elements();
            $found = $elements->filter('ID', $id)->First();

            if ($found) {
                return $found;
            }

            /** @var BaseElement $element */
            foreach ($elements as $element) {
                if (!$element->hasExtension(ElementalAreasExtension::class)) {
                    continue;
                }

                /** @var BaseElement&ElementalAreasExtension $element */
                $found = $this->findElement($element->getElementalRelations(), $element, $id);

                if ($found) {
                    return $found;
                }
            }
        }

        return null;
    }
}
