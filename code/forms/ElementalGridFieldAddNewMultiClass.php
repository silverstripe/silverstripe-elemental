<?php

namespace DNADesign\Elemental;

use SilverStripe\GridFieldExtensions\GridFieldAddNewMultiClass;
use SilverStripe\Forms\GridField\GridField;


/**
 * @package elemental
 */
class ElementalGridFieldAddNewMultiClass extends GridFieldAddNewMultiClass
{

    public function getClasses(GridField $grid)
    {
        $classes = parent::getClasses($grid);

        unset($classes['ElementVirtualLinked']);

        return $classes;
    }
}
