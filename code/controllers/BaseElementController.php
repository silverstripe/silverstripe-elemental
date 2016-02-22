<?php

/**
 * Each {@link BaseElement} is wrapped inside a controller in order to provide
 * form submission handling and {@link Link()} method support.
 *
 * @package elemental
 */
class BaseElement_Controller extends WidgetController
{
    /**
     * Returns the current widget in scope rendered into its' holder
     *
     * @return HTML
     */
    public function WidgetHolder()
    {
        return $this->renderWith("ElementHolder");
    }
}
