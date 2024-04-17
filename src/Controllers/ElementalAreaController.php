<?php

namespace DNADesign\Elemental\Controllers;

use DNADesign\Elemental\Forms\EditFormFactory;
use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Services\ElementTypeRegistry;
use SilverStripe\CMS\Controllers\CMSMain;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\Control\HTTPResponse;
use SilverStripe\Control\HTTPResponse_Exception;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Forms\Form;
use SilverStripe\ORM\ValidationException;
use SilverStripe\Security\SecurityToken;
use SilverStripe\ORM\ValidationResult;
use SilverStripe\Forms\FormAction;
use SilverStripe\Forms\FieldList;
use SilverStripe\Control\Controller;
use SilverStripe\Dev\Deprecation;

/**
 * Controller for "ElementalArea" - handles loading and saving of in-line edit forms in an elemental area in admin
 */
class ElementalAreaController extends CMSMain
{
    const FORM_NAME_TEMPLATE = 'ElementForm_%s';

    private static $url_segment = 'elemental-area';

    private static $ignore_menuitem = true;

    private static $url_handlers = [
        'elementForm/$ItemID' => 'elementForm',
        'POST api/saveForm/$ID' => 'apiSaveForm',
        '$FormName/field/$FieldName' => 'formAction',
    ];

    private static $allowed_actions = [
        'elementForm',
        'apiSaveForm',
        'formAction',
    ];

    public function getClientConfig()
    {
        $clientConfig = parent::getClientConfig();
        $clientConfig['form']['elementForm'] = [
            'schemaUrl' => $this->Link('schema/elementForm'),
            'formNameTemplate' => sprintf(static::FORM_NAME_TEMPLATE, '{id}'),
        ];
        // Configuration that is available per element type
        $clientConfig['elementTypes'] = ElementTypeRegistry::generate()->getDefinitions();
        return $clientConfig;
    }

    /**
     * Used for both:
     * - GET requests to get the FormSchema via getElementForm() called from LeftAndMain::schema()
     * - POST Requests to save the Form. Will be handled by to FormRequestHandler::httpSubmission()
     * /admin/linkfield/elementForm/<ElementID>
     *
     * @param HTTPRequest $request - deprecated 5.3.0 Will be removed without equivalent functionality to replace it
     * @return Form
     */
    public function elementForm(HTTPRequest $request = null)
    {
        $id = $this->getRequest()->param('ItemID');

        // Respect previous behaviour
        // This should just be removed later and so that it 404's below when BaseElement::get()->byID($id) fails
        if (!$id) {
            $this->jsonError(400);
        }

        // Note that new elements are added via graphql, so only using this endpoint for editing existing
        $element = BaseElement::get()->byID($id);
        if (!$element) {
            $this->jsonError(404);
        }
        if (!$element->canView()) {
            $this->jsonError(403);
        }
        return $this->createElementForm($element);
    }

    /**
     * This method is called from LeftAndMain::schema()
     * /admin/linkfield/schema/elementForm/<ElementID>
     *
     * @param int $elementID
     * @return Form|null Returns null if no element exists for the given ID
     */
    public function getElementForm($elementID)
    {
        $element = BaseElement::get()->byID($elementID);
        // This is returning null to match legacy behaviour
        if (!$element) {
            return null;
        }
        return $this->elementForm();
    }

    /**
     * Arrive here from FormRequestHandler::httpSubmission() during a POST request to
     * /admin/linkfield/linkForm/<LinkID>
     * The 'save' method is called because it is the FormAction set on the Form
     */
    public function save(array $data, Form $form): HTTPResponse
    {
        $request = $this->getRequest();

        // Check security token for non-view operation
        if (!SecurityToken::inst()->checkRequest($request)) {
            $this->jsonError(400);
        }

        // We can assume a valid $id has been passed because it already been validated in elementForm()
        $id = (int) $request->param('ID');
        $element = BaseElement::get()->byID($id);

        // Ensure data has being POSTed
        if (empty($data)) {
            $this->jsonError(400);
        }

        // Ensure that ID is not passed in the data
        if (isset($data['ID'])) {
            $this->jsonError(400);
        }

        // Check canEdit() permissions
        // Note that canView() permissions were already checked in elementForm()
        if (!$element->canEdit()) {
            $this->jsonError(403);
        }

        // DataObject validation
        // thrown ValidationException will be caught in FormRequestHandler::httpSubmission()
        // Note: Form (as opposed to DataObject) validate() is run in FormRequestHandler::httpSubmission()
        $validationResult = $this->getElementValidationResult($form, $data, $element);
        if (!$validationResult->isValid()) {
            throw ValidationException::create($validationResult);
        }

        // Write the data object
        if ($element->isChanged()) {
            $element->write();
        }

        // Create a new Form because we remove namespaces from fields in getElementValidationResult()
        $form = $this->createElementForm($element);

        // Create and send FormSchema JSON response
        $schemaID = $form->FormAction();
        $response = $this->getSchemaResponse($schemaID, $form, $validationResult);
        return $response;
    }

    /**
     * Remove the namespace prefixes that were added to form fields by the form factory
     *
     * @param array $data
     * @param int $elementID
     * @return array
     */
    public static function removeNamespacesFromFields(array $data, $elementID)
    {
        $output = [];
        $template = sprintf(EditFormFactory::FIELD_NAMESPACE_TEMPLATE, $elementID, '');
        foreach ($data as $key => $value) {
            // Only look at fields that match the namespace template
            if (substr($key ?? '', 0, strlen($template ?? '')) !== $template) {
                continue;
            }

            $fieldName = substr($key ?? '', strlen($template ?? ''));
            $output[$fieldName] = $value;
        }
        return $output;
    }

    /**
     * This method should not be used and will be removed
     *
     * Save an inline edit form for a block
     *
     * @param HTTPRequest $request
     * @return HTTPResponse|null JSON encoded string or null if an exception is thrown
     * @throws HTTPResponse_Exception
     *
     * @deprecated 5.3.0 Send a POST request to elementForm/$ItemID instead
     */
    public function apiSaveForm(HTTPRequest $request)
    {
        Deprecation::notice('5.3.0', 'Send a POST request to elementForm/$ItemID instead');
        throw new HTTPResponse_Exception('This endpoint should not be used');
    }

    /**
     * Provides action control for form fields that are request handlers when they're used in an in-line edit form.
     *
     * Eg. UploadField
     *
     * @param HTTPRequest $request
     * @return array|HTTPResponse|\SilverStripe\Control\RequestHandler|string
     *
     * @deprecated 5.3.0 Will be removed without equivalent functionality to replace it
     */
    public function formAction(HTTPRequest $request)
    {
        // This method no longer appears to be needed, Form fields on blocks that use nested request handlers
        // such as UploadField do no use this method.
        Deprecation::notice('5.3.0', 'This method will be removed without equivalent functionality to replace it');
        $formName = $request->param('FormName');

        // Get the element ID from the form name
        $id = substr($formName ?? '', strlen(sprintf(self::FORM_NAME_TEMPLATE, '')));
        $form = $this->getElementForm($id);

        $field = $form->getRequestHandler()->handleField($request);

        return $field->handleRequest($request);
    }

    /**
     * Create a form for a given element
     */
    private function createElementForm(BaseElement $element): Form
    {
        $id = $element->ID;
        $scaffolder = Injector::inst()->get(EditFormFactory::class);

        /** @var Form $form */
        $form = $scaffolder->getForm(
            $this,
            sprintf(static::FORM_NAME_TEMPLATE, $id),
            ['Record' => $element]
        );

        $urlSegment = $this->config()->get('url_segment');
        $form->setFormAction("admin/$urlSegment/elementForm/$id");

        if (!$element->canEdit()) {
            $form->makeReadonly();
        }

        $form->addExtraClass('element-editor-editform__form');
        $form->addExtraClass('bypass-entwine-submission');

        // Add a save button to the form
        // This button needs to be present for the save() method to be called
        // It will be hidden with CSS via the btn--hidden class
        $form->setActions(FieldList::create([
            FormAction::create('save', 'Save')
                ->addExtraClass('btn--hidden')
        ]));

        // Set the form request handler to return a FormSchema response during a POST request
        // This will override the default FormRequestHandler::getAjaxErrorResponse() which isn't useful
        $form->setValidationResponseCallback(function (ValidationResult $errors) use ($form, $id) {
            $schemaId = Controller::join_links(
                $this->Link('schema'),
                $this->config()->get('url_segment'),
                $id
            );
            return $this->getSchemaResponse($schemaId, $form, $errors);
        });

        return $form;
    }

    /**
     * Call model validation taking into account the namespaced fields
     */
    private function getElementValidationResult(
        Form $form,
        array $data,
        BaseElement $element
    ): ValidationResult {

        // Remove the namespace prefixes that were added by EditFormFactory
        $dataWithoutNamespaces = $this->removeNamespacesFromFields($data, $element->ID);

        // Create a seperate form because we're going to modify it
        // if We need it to be we simply updated $form it will mess up the FormSchema response, even if we `clone $form`
        $formWithoutNamespaces = $this->createElementForm($element);

        // Remove namespace prefixes from fields so that validation works
        foreach ($formWithoutNamespaces->Fields()->flattenFields() as $field) {
            $rx = '#^PageElements_[0-9]+_#';
            $namespacedName = $field->getName();
            if (!preg_match($rx, $namespacedName)) {
                continue;
            }
            $regularName = preg_replace($rx, '', $namespacedName);
            // If there's an existing field with the same name, remove it
            // EditFormFactory creates fields so that frontend validation works
            // e.g. for element #2 there's a "Title" field and a "PageElements_2_Title" field
            // The namespaced fields are what are POSTed in, so only keep those ones
            if ($formWithoutNamespaces->Fields()->flattenFields()->fieldByName($regularName)) {
                $formWithoutNamespaces->Fields()->removeByName($regularName);
            }
            // Update the name of the field to remove the namespace
            $field->setName($regularName);
        }
        // Merge submitted data into the form
        $formWithoutNamespaces->loadDataFrom($dataWithoutNamespaces);

        // Update the element from from data
        $validationResult = ValidationResult::create();
        try {
            $element->updateFromFormData($dataWithoutNamespaces);
        } catch (ValidationException $e) {
            // noop
            $validationResult->combineAnd($e->getResult());
        }

        // Validate the element
        $validationResult->combineAnd($element->validate());

        // Create a new ValidationResult with namespaced fields
        $signatures = [];
        $validationResultWithNameSpaces = ValidationResult::create();
        foreach ($validationResult->getMessages() as $message) {
            // ensure there are no duplicates
            $signature = md5(implode(',', array_values($message)));
            if (array_key_exists($signature, $signatures)) {
                continue;
            }
            $messageText = $message['message'] ?? '';
            $messageFieldName = $message['fieldName'] ?? '';
            $messageType = $message['messageType'] ?? ValidationResult::TYPE_ERROR;
            $messageCast = $message['messageCast'] ?? ValidationResult::CAST_TEXT;
            if ($messageFieldName) {
                $fieldName = sprintf(EditFormFactory::FIELD_NAMESPACE_TEMPLATE, $element->ID, $messageFieldName);
                $params = [$fieldName, $messageText, $messageType, null, $messageCast];
                $validationResultWithNameSpaces->addFieldError(...$params);
            } else {
                $validationResultWithNameSpaces->addError($messageText, $messageType, null, $messageCast);
            }
            $signatures[$signature] = $message;
        }
        return $validationResultWithNameSpaces;
    }
}
