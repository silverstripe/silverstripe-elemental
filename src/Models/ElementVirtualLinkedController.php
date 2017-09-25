<?php

namespace DNADesign\Elemental\Models;

use DNADesign\Elemental\Controllers\ElementController;
use Exception;

class ElementVirtualLinkedController extends ElementController
{

    /**
     * Returns the current element in scope rendered into its' holder
     *
     * @return HTML
     */
    public function ElementHolder()
    {
        return $this->renderWith('ElementHolder_VirtualLinked');
    }

    public function __call($method, $arguments)
    {
        var_dump($method);
        die();
        try {
            $retVal = parent::__call($method, $arguments);
        } catch (Exception $e) {
            $controller = $this->LinkedElement()->getController();
            $retVal = call_user_func_array(array($controller, $method), $arguments);
        }
        return $retVal;
    }

    public function hasMethod($action)
    {
        if (parent::hasMethod($action)) {
            return true;
        }

        $controller = $this->LinkedElement()->getController();
        return $controller->hasMethod($action);
    }

    public function hasAction($action)
    {
        if (parent::hasAction($action)) {
            return true;
        }

        $controller = $this->LinkedElement()->getController();
        return $controller->hasAction($action);
    }

    public function checkAccessAction($action)
    {
        if (parent::checkAccessAction($action)) {
            return true;
        }

        $controller = $this->LinkedElement()->getController();
        return $controller->checkAccessAction($action);
    }
}
