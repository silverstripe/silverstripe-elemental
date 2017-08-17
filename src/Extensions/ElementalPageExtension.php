<?php

namespace DNADesign\Elemental\Extensions;

use DNADesign\Elemental\Models\ElementalArea;

/**
 * @package elemental
 */
class ElementalPageExtension extends ElementalAreasExtension
{
    private static $has_one = array(
        'ElementalArea' => ElementalArea::class
    );

    private static $owns = array(
        'ElementalArea'
    );
}
