<?php

namespace DNADesign\Elemental;

use GridFieldAddNewMultiClass;
use GridField;


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
