<?php

namespace DNADesign\Elemental\Forms;

use SilverStripe\Control\RequestHandler;
use SilverStripe\Forms\DefaultFormFactory;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;

class EditFormFactory extends DefaultFormFactory
{
    public function getForm(RequestHandler $controller = null, $name = self::DEFAULT_NAME, $context = [])
    {
        $form = parent::getForm($controller, $name, $context);

        // Remove divider lines between form fields
        $form->addExtraClass('form--no-dividers');

        return $form;
    }

    protected function getFormFields(RequestHandler $controller = null, $name, $context = [])
    {
        $fields = parent::getFormFields($controller, $name, $context);

        /** @var HTMLEditorField $contentField */
        $contentField = $fields->fieldByName('Root.Main.HTML');
        if ($contentField) {
            $contentField->setRows(5);
        }

        return $fields;
    }
}
