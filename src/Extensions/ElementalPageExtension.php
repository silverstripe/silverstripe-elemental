<?php

namespace DNADesign\Elemental\Extensions;

use DNADesign\Elemental\Models\ElementalArea;

class ElementalPageExtension extends ElementalAreasExtension
{
    /**
     * @var array
     */
    private static $has_one = [
        'ElementalArea' => ElementalArea::class
    ];

    /**
     * @var array
     */
    private static $owns = [
        'ElementalArea'
    ];
}
