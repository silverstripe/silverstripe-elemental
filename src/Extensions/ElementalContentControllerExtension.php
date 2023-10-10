<?php

namespace DNADesign\Elemental\Extensions;

use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Extensions\ElementalAreasExtension;
use SilverStripe\Core\Extension;

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

        /** @var SiteTree $elementOwner */
        $elementOwner = $this->owner->data();

        $elementalAreaRelations = $this->owner->getElementalRelations();

        if (!$elementalAreaRelations) {
            user_error(get_class($this->owner) . ' has no ElementalArea relationships', E_USER_ERROR);
            return false;
        }

        foreach ($elementalAreaRelations as $elementalAreaRelation) {
            $element = $this->findElement($elementOwner->{$elementalAreaRelation}()->Elements(), $id);

            if ($element) {
                return $element->getController();
            }
        }

        user_error('Element $id not found for this page', E_USER_ERROR);
        return false;
    }

    private function findElement($elements, $id)
    {
        $element = $elements->filter('ID', $id)->First();

        if ($element) {
            return $element;
        }

        foreach ($elements as $el) {
            if (!$el->hasMethod('Elements')) {
                continue;
            }

            $subElementAreaRelations = $el->getElementalRelations();

            if (!$subElementAreaRelations) {
                continue;
            }

            foreach ($subElementAreaRelations as $subElementalAreaRelation) {
                $element = $this->findElement($el->{$subElementalAreaRelation}()->Elements(), $id);

                if ($element) {
                    return $element;
                }
            }
        }

        return null;
    }
}
