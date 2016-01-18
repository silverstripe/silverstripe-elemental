<?php

/**
 * @package elemental
 */
class ElementalGridFieldAddNewMultiClass extends GridFieldAddNewMultiClass
{

    public function getClasses(GridField $grid)
    {
        $classes = parent::getClasses($grid);
        return $classes;
    }
}
