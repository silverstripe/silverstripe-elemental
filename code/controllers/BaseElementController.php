<?php

namespace DNADesign\Elemental\Controllers;

use SilverStripe\Widgets\Controllers\WidgetController;


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
        return $this->renderWith('ElementHolder');
    }


    public function Link($action = null)
    {

        if($this->data()->virtualOwner) {
          $controller = new BaseElement_Controller($this->data()->virtualOwner);
          return $controller->Link($action);
        }

        return parent::Link($action);
    }

    /**
     * if this is a virtual request, change the hash if set.
     */
    public function redirect($url, $code=302) {

      if($this->data()->virtualOwner) {
        $parts = explode('#', $url);
        if(isset($parts[1])) {
          $url = $parts[0] . '#' . $this->data()->virtualOwner->ID;
        }
      }

      return parent::redirect($url, $code);
    }
}
