<?php

namespace DNADesign\Elemental\Extensions;

use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Extensions\ElementalAreasExtension;

use SilverStripe\Core\Extension;

/**
 * Add this to ContentController to enable elements
 *
 * @package widgets
 */
class ElementalContentControllerExtension extends Extension
{
    /**
     *
     * @var array
     */
    private static $allowed_actions = array(
        'handleElement'
    );

    /**
     * Handles widgets attached to a page through one or more {@link WidgetArea}
     * elements.
     *
     * Iterated through each $has_one relation with a {@link WidgetArea} and
     * looks for connected widgets by their database identifier.
     *
     * Assumes URLs in the following format: <URLSegment>/element/<Element-ID>.
     *
     * @return RequestHandler
     */
    public function handleElement()
    {
        $id = $this->owner->getRequest()->param('ID');
        if (!$id) {
            user_error('No element ID supplied', E_USER_ERROR);
            return false;
        }
        /** @var SiteTree $elementOwner */
        $elementOwner = $this->owner->data();

        $elementalAreaRelations = ElementalAreasExtension::get_elemental_area_relations($elementOwner);

        if (!$elementalAreaRelations) {
            user_error(get_class($this->owner) . ' has no ElementalArea relationships', E_USER_ERROR);
            return false;
        }

        foreach ($elementalAreaRelations as $elementalAreaRelation) {
            $element = $elementOwner->$elementalAreaRelation()->Elements()
                ->filter('ID', $id)
                ->First();

            if ($element) {
                return $element->getController();
            }
        }

        user_error('Element $id not found for this page', E_USER_ERROR);
        return false;
    }
}
