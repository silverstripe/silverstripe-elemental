<?php

namespace DNADesign\Elemental\Controllers;

use SilverStripe\Admin\LeftAndMain;
use SilverStripe\Control\Controller;
use SilverStripe\Control\Director;
use SilverStripe\Core\ClassInfo;
use SilverStripe\i18n\i18n;
use SilverStripe\Security\Member;
use DNADesign\Elemental\Models\BaseElement;

/**
 * Optional controller for every widget which has its own logic, e.g. in forms.
 *
 * It always handles a single widget, usually passed in as a database
 * identifier through the controller URL. Needs to be constructed as a nested
 * controller within a {@link ContentController}.
 *
 * ## Forms
 * You can add forms like in any other SilverStripe controller. If you need
 * access to the widget from within a form, you can use
 * `$this->controller->getWidget()` inside the form logic.
 *
 * Note: Widget controllers currently only work on {@link Page} objects,
 * because the logic is implemented in {@link ContentController->handleWidget()}.
 * Copy this logic and the URL rules to enable it for other controllers.
 *
 * @package widgets
 */
class ElementController extends Controller
{
    /**
     * @var Element
     */
    protected $element;


    /**
     * @param Widget $widget
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
     * @param string $action
     * @return string
     */
    public function Link($action = null)
    {
        $id = ($this->element) ? $this->element->ID : null;
        $segment = Controller::join_links('element', $id, $action);

        $page = Director::get_current_page();
        if ($page && !($page instanceof WidgetController)) {
            return $page->Link($segment);
        }

        if ($controller = $this->getParentController()) {
            return $controller->Link($segment);
        }

        return $segment;
    }

    /**
     * Cycles up the controller stack until it finds a non-widget controller
     * This is needed becauseController::currreturns the widget controller,
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
     * @return Element
     */
    public function getElement()
    {
        return $this->element;
    }

    /**
     * Overloaded from {@link Element->Content()} to allow for controller / form
     * linking.
     *
     * @return string HTML
     */
    public function Render()
    {
        return $this->renderWith(array_reverse(ClassInfo::ancestry($this->element->class)));
    }

    /**
     * Overloaded from {@link Widget->WidgetHolder()} to allow for controller/
     * form linking.
     *
     * @return string HTML
     */
    public function ElementHolder()
    {
        return $this->renderWith("ElementHolder");
    }
}
