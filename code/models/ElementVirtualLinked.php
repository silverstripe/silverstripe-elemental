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
class ElementVirtualLinked extends BaseElement {
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

    public function getCMSFields() {
        $message = sprintf('<p>%s</p><p><a href="%2$s">%2$s</a></p>',
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

    public function getExtraClass() {
        return $this->LinkedElement()->ClassName . ' ' . $this->getField('ExtraClass');
    }

    /**
     * Detect when a user has published a ElementVirtualLinked block
     * but has not published the LinkedElement block. 
     */
    public function isInvalidPublishState() {
        $block = $this->LinkedElement();
        return (!$block->isPublished() && $this->isPublished());
    }

    public function getCMSPublishedState() {
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
        foreach($this->extension_instances as $instance) {
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
