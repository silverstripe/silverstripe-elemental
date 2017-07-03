<?php

namespace DNADesign\Elemental\Forms;

use SilverStripe\Forms\GridField\GridField;
use Symbiote\GridFieldExtensions\GridFieldAddNewMultiClass;

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
