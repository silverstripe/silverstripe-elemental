<?php

namespace DNADesign\Elemental\Models;

use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TabSet;
use SilverStripe\Forms\Tab;
use SilverStripe\Forms\LiteralField;
use SilverStripe\ORM\FieldType\DBHTMLText;
use DNADesign\Elemental\Controllers\ElementController;
use Exception;
use DNADesign\Elemental\Models\BaseElement;



/**
 * Virtual Linked Element.
 *
 * As elemental is based on a natural has_one relation to an object,
 * this allows the same element to be linked to multiple pages.
 *
 * {@see ElementalGridFieldAddExistingAutocompleter}
 *
 * @package elemental
 */
class ElementVirtualLinked extends BaseElement
{
    private static $has_one = array(
        'LinkedElement' => BaseElement::class
    );

    private static $table_name = 'ElementVirtual';

    /**
     * @var string
     */
    private static $title = 'Virtual linked Element';

    /**
     * @var string
     */
    private static $singular_name = 'Virtual linked Element';

    public function __construct($record = null, $isSingleton = false, $model = null)
    {
        parent::__construct($record, $isSingleton, $model);
        $this->LinkedElement()->setVirtualOwner($this);
    }

    public function getTitle()
    {
        return $this->LinkedElement()->getTitle();
    }

    public function i18n_singular_name()
    {
        return _t(__CLASS__, $this->LinkedElement()->config()->title);
    }

    public function getCMSFields()
    {
        $message = sprintf(
            '<p>%s</p><p><a href="%2$s">Click here to edit the original</a></p>',
            _t('ElementVirtualLinked.DESCRIBE', 'This is a virtual copy of an element.'),
            $this->LinkedElement()->getEditLink()
        );

        $fields = new FieldList(
            new TabSet('Root', $main = new Tab('Main'))
        );

        if ($this->isInvalidPublishState()) {
            $warning = 'Error: The original element is not published. This element will not work on the live site until you click the link below and publish it.';
            $main->push(new LiteralField('WarningHeader', '<p class="message error">' .$warning. '</p>'));
        }
        $main->push(new LiteralField('Existing', $message));

        $this->extend('updateCMSFields', $fields);

        return $fields;
    }

    public function getElementType() {
        return 'Virtual: ' . $this->LinkedElement()->getElementType();
    }

    /**
     * Detect when a user has published a ElementVirtualLinked
     * but has not published the LinkedElement.
     */
    public function isInvalidPublishState()
    {
        $element = $this->LinkedElement();
        return (!$element->isPublished() && $this->isPublished());
    }

    public function getCMSPublishedState()
    {
        if ($this->isInvalidPublishState()) {
            $colour = '#C00';
            $text = 'Error';
            $html = new DBHTMLText('PublishedState');
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
}

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
