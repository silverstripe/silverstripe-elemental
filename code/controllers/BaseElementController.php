<?php

/**
 * @package elemental
 */
class BaseElement_Controller extends WidgetController
{
    /**
     * @return string HTML
     */
    public function WidgetHolder()
    {
        return $this->renderWith("ElementHolder");
    }
}
