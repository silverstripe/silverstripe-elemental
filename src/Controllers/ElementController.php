<?php

namespace DNADesign\Elemental\Controllers;

use DNADesign\Elemental\Models\BaseElement;

use SilverStripe\Admin\LeftAndMain;
use SilverStripe\Control\Controller;
use SilverStripe\Control\Director;
use SilverStripe\Core\ClassInfo;
use SilverStripe\i18n\i18n;
use SilverStripe\Security\Member;

/**
 * Optional controller for every element which has its own logic, e.g. in forms.
 *
 * It always handles a single element, usually passed in as a database
 * identifier through the controller URL. Needs to be constructed as a nested
 * controller within a {@link ContentController}.
 *
 * ## Forms
 * You can add forms like in any other SilverStripe controller. If you need
 * access to the element from within a form, you can use
 * `$this->controller->getElement()` inside the form logic.
 *
 * @package Elemental
 */
class ElementController extends Controller
{
    /**
     * @var Element
     */
    protected $element;

    /**
     * @param BaseElement $element
     */
    public function __construct($element = null)
    {
        if ($element) {
            $this->element = $element;
            $this->failover = $element;
        }

        parent::__construct();
    }

    /**
     * Cycles up the controller stack until it finds an Element controller
     * This is needed becauseController::curr returns the element controller,
     * which means anyLinkfunction turns into endless loop.
     *
     * @return Controller
     */
    public function getParentController()
    {
        foreach (Controller::$controller_stack as $controller) {
            if (!($controller instanceof ElementController)) {
                return $controller;
            }
        }
        return false;
    }

    /**
     * @param string $action
     * @return string
     */
    public function Link($action = null)
    {
        if ($this->data()->virtualOwner) {
            $controller = new Element_Controller($this->data()->virtualOwner);
            return $controller->Link($action);
        }

        $id = ($this->element) ? $this->element->ID : null;

        $segment = Controller::join_links('element', $id, $action);

        $page = Director::get_current_page();
        if ($page && !($page instanceof ElementController)) {
            return $page->Link($segment);
        }

        if ($controller = $this->getParentController()) {
            return $controller->Link($segment);
        }

        return $segment;
    }

    /**
     * if this is a virtual request, change the hash if set.
     */
    public function redirect($url, $code = 302)
    {

        if ($this->data()->virtualOwner) {
            $parts = explode('#', $url);
            if (isset($parts[1])) {
                $url = $parts[0] . '#' . $this->data()->virtualOwner->ID;
            }
        }

        return parent::redirect($url, $code);
    }

    /**
     * @return Element
     */
    public function getElement()
    {
        return $this->element;
    }

    /**
     * @return string HTML
     */
    public function ElementHolder()
    {
        return $this->element->renderWith('ElementHolder');
    }
}
