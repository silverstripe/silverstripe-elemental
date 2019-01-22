<?php

/**
 * Virtual Linked Element.
 *
 * As elemental is based on widgets which have a natural has_one relation to an
 * object, this is a workaround for allowing the same element to be linked to
 * multiple pages.
 *
 * {@see ElementalGridFieldAddExistingAutocompleter}
 *
 * @package elemental
 */
class ElementVirtualLinked extends BaseElement
{
    /**
     * @var string
     */
    private static $title = 'Virtual linked Block';

    /**
     * @var string
     */
    private static $singular_name = 'Virtual linked Block';

    private static $has_one = array(
        'LinkedElement' => 'BaseElement'
    );

    public function getTitle()
    {
        return $this->LinkedElement()->getTitle();
    }

    public function i18n_singular_name()
    {
        return _t(__CLASS__, $this->LinkedElement()->config()->title);
    }

    public function __construct($record = null, $isSingleton = false, $model = null)
    {
        parent::__construct($record, $isSingleton, $model);
        $this->LinkedElement()->setVirtualOwner($this);
    }

    public function getCMSFields()
    {
        $message = sprintf(
            '<p>%s</p><p><a href="%2$s" target="_blank" rel="noopener noreferrer">%2$s</a></p>',
            _t('ElementVirtualLinked.DESCRIBE', 'This is a virtual copy of a block. To edit, visit'),
            $this->LinkedElement()->getEditLink()
        );

        $fields = new FieldList(
            new TabSet('Root', $main = new Tab('Main'))
        );

        if ($this->isInvalidPublishState()) {
            $warning = 'Error: The original block is not published. This block will not work on the live site until you click the link below and publish it.';
            $main->push(new LiteralField('WarningHeader', '<p class="message error">' .$warning. '</p>'));
        }
        $main->push(new LiteralField('Existing', $message));

        $this->extend('updateCMSFields', $fields);

        return $fields;
    }


    /**
     * Detect when a user has published a ElementVirtualLinked block
     * but has not published the LinkedElement block.
     */
    public function isInvalidPublishState()
    {
        $block = $this->LinkedElement();
        return (!$block->isPublished() && $this->isPublished());
    }

    public function getCMSPublishedState()
    {
        if ($this->isInvalidPublishState()) {
            $colour = '#C00';
            $text = 'Error';
            $html = new HTMLText('PublishedState');
            $html->setValue(sprintf(
                '<span style="color: %s;">%s</span>',
                $colour,
                htmlentities($text)
            ));
            return $html;
        }

        $publishedState = null;
        foreach ($this->extension_instances as $instance) {
            if (method_exists($instance, 'getCMSPublishedState')) {
                $instance->setOwner($this);
                $publishedState = $instance->getCMSPublishedState();
                $instance->clearOwner();
                break;
            }
        }
        return $publishedState;
    }


    /**
     * Get a unique anchor name
     *
     * @return string
     */
    public function getAnchor() {
        $linkedElement = $this->LinkedElement();

        if ($linkedElement && $linkedElement->exists()) {
            return $linkedElement->getAnchor();
        }

        // generic fallback
        return 'e'.$this->ID;
    }
}

class ElementVirtualLinked_Controller extends BaseElement_Controller
{

    protected $controllerClass;

    public function __construct($widget)
    {
        parent::__construct($widget);

        $controllerClass = get_class($this->LinkedElement()) . '_Controller';
        if (class_exists($controllerClass)) {
            $this->controllerClass = $controllerClass;
        } else {
            $this->controllerClass = 'BaseElement_Controller';
        }
    }

    /**
     * Returns the current widget in scope rendered into its' holder
     *
     * @return HTML
     */
    public function WidgetHolder()
    {
        return $this->renderWith("ElementHolder_VirtualLinked");
    }

    public function __call($method, $arguments)
    {
        try {
            $retVal = parent::__call($method, $arguments);
        } catch (Exception $e) {
            $controller = new $this->controllerClass($this->LinkedElement());
            $retVal = call_user_func_array(array($controller, $method), $arguments);
        }
        return $retVal;
    }

    public function hasMethod($action)
    {
        if (parent::hasMethod($action)) {
            return true;
        }

        $controller = new $this->controllerClass($this->LinkedElement());
        return $controller->hasMethod($action);
    }

    public function hasAction($action)
    {
        if (parent::hasAction($action)) {
            return true;
        }

        $controller = new $this->controllerClass($this->LinkedElement());
        return $controller->hasAction($action);
    }

    public function checkAccessAction($action)
    {
        if (parent::checkAccessAction($action)) {
            return true;
        }

        $controller = new $this->controllerClass($this->LinkedElement());
        return $controller->checkAccessAction($action);
    }
}
