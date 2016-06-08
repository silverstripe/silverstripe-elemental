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

        $main->push(
            new LiteralField('Existing', $message)
        );

        $this->extend('updateCMSFields', $fields);

        return $fields;
    }
}
