<?php

namespace DNADesign\Elemental\Controllers;

use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\Control\Controller;
use SilverStripe\Control\Director;
use SilverStripe\View\Requirements;

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
     * @var BaseElement $element
     */
    protected $element;

    /**
     * A list of default (example) styles to include
     *
     * @config
     * @var string[]
     */
    private static $default_styles = [];

    /**
     * Whether to include default (example) styles
     *
     * @config
     * @var bool
     */
    private static $include_default_styles = true;

    /**
     * @param BaseElement $element
     */
    public function __construct(BaseElement $element)
    {
        $this->element = $element;

        parent::__construct();

        $this->setFailover($this->element);
    }

    /**
     * @return Element
     */
    public function getElement()
    {
        return $this->element;
    }

    /**
     * Renders the managed {@link BaseElement} wrapped with the current
     * {@link ElementController}.
     *
     * @return string HTML
     */
    public function forTemplate()
    {
        $defaultStyles = $this->config()->get('default_styles');
        if ($this->config()->get('include_default_styles') && !empty($defaultStyles)) {
            foreach ($defaultStyles as $stylePath) {
                Requirements::css($stylePath);
            }
        }

        $template = $this->element->config()->get('controller_template');

        return $this->renderWith([
            'type' => 'Layout',
            'DNADesign\\Elemental\\'.$template
        ]);
    }

    /**
     * @param string $action
     *
     * @return string
     */
    public function Link($action = null)
    {
        $page = Director::get_current_page();

        if ($page && !($page instanceof ElementController)) {
            return Controller::join_links(
                $page->Link($action),
                '#'. $this->element->getAnchor()
            );
        }

        $curr = Controller::curr();

        if ($curr && !($curr instanceof ElementController)) {
            return Controller::join_links(
                $curr->Link($action),
                '#'. $this->element->getAnchor()
            );
        }
    }
}
