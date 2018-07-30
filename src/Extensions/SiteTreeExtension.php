<?php

namespace DNADesign\Elemental\Extensions;

use DNADesign\Elemental\Models\ElementalArea;
use SilverStripe\ORM\DataExtension;

/**
 * The SiteTreeExtension provides a consistent API surface for reading elements from pages regardless
 * of whether the specific implementation of SiteTree (subclass) has the elemental extension applied.
 */
class SiteTreeExtension extends DataExtension
{
    /**
     * Returns the owner's `ElementalArea()` contents if it has the extension, or an empty one
     *
     * @return ElementalArea
     */
    public function ElementalAreaIfExists()
    {
        if ($this->owner->hasExtension(ElementalPageExtension::class)) {
            return $this->owner->ElementalArea();
        }
        return ElementalArea::create();
    }
}
