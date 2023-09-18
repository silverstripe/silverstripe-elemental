<?php

namespace DNADesign\Elemental\Extensions;

use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Extensions\ElementalAreasExtension;
use DNADesign\ElementalVirtual\Model\ElementVirtual;
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
            $elements = $elementOwner->$elementalAreaRelation()->Elements();

            $element = $elements
                ->filter('ID', $id)
                ->First();

            if ($element) {
                return $element->getController();
            }

            if (class_exists(ElementVirtual::class)) {
                $element = $elements
                    ->innerJoin('ElementVirtual', '"ElementVirtual"."ID" = "Element"."ID"')
                    ->filter('ClassName', ElementVirtual::class)
                    ->where(['"LinkedElementID"' => $id])
                    ->First();

                if ($element) {
                    return $element->LinkedElement()->getController();
                }
            }
        }

        user_error('Element $id not found for this page', E_USER_ERROR);
        return false;
    }
}
