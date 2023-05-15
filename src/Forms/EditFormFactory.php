<?php

namespace DNADesign\Elemental\Forms;

use SilverStripe\Control\RequestHandler;
use SilverStripe\Core\Config\Configurable;
use SilverStripe\Forms\DefaultFormFactory;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;

class EditFormFactory extends DefaultFormFactory
{
    use Configurable;

    /**
     * This will be set the number of rows in HTML field
     *
     * @config
     * @var integer
     */
    private static $html_field_rows = 7;

    /**
     * @var string
     */
    const FIELD_NAMESPACE_TEMPLATE = 'PageElements_%d_%s';

    public function getForm(RequestHandler $controller = null, $name = self::DEFAULT_NAME, $context = [])
    {
        $form = parent::getForm($controller, $name, $context);

        // Remove divider lines between form fields
        $form->addExtraClass('form--no-dividers');

        // Namespace all fields - do this after getting getFormFields so they still get populated
        $formFields = $form->Fields();
        $this->namespaceFields($formFields, $context);
        $form->setFields($formFields);

        return $form;
    }

    protected function getFormFields(RequestHandler $controller = null, $name, $context = [])
    {
        $fields = parent::getFormFields($controller, $name, $context);

        // Configure a slimmed down HTML editor for use with blocks
        /** @var HTMLEditorField|null $editorField */
        $editorField = $fields->fieldByName('Root.Main.HTML');
        if ($editorField) {
            $editorField->setRows($this->config()->get('html_field_rows'));
        }

        return $fields;
    }

    /**
     * Given a {@link FieldList}, give all fields a unique name so they can be used in the same context as
     * other elemental edit forms and the page (or other DataObject) that owns them.
     *
     * @param FieldList $fields
     * @param array $context
     */
    protected function namespaceFields(FieldList $fields, array $context)
    {
        $elementID = $context['Record']->ID;

        foreach ($fields->dataFields() as $field) {
            $namespacedName = sprintf(self::FIELD_NAMESPACE_TEMPLATE ?? '', $elementID, $field->getName());
            $field->setName($namespacedName);
        }
    }
}
