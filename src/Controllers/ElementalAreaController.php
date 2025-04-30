<?php

namespace DNADesign\Elemental\Controllers;

use DNADesign\Elemental\Forms\EditFormFactory;
use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Services\ElementTypeRegistry;
use SilverStripe\Admin\AdminRootController;
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

    /**
     * @deprecated 5.4.0 Will be removed without equivalent functionality to replace it in a future major release
     */
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
     * @return Form
     */
    public function elementForm(HTTPRequest $request = null)
    {
        $request = $request ?: $this->getRequest();
        $id = $request->param('ItemID');

        // Respect previous behaviour
        // This should just be removed later and so that it 404's below when BaseElement::get()->byID($id) fails
        if ($id === 0) {
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

        // Remove the namespace prefixes that were added by EditFormFactory
        $dataWithoutNamespaces = static::removeNamespacesFromFields($data, $element->ID);

        // Update and write the data object which will trigger model validation.
        // Would usually be handled by $form->saveInto($element) but since the field names
        // in the form have been namespaced, we need to handle it ourselves.
        $element->updateFromFormData($dataWithoutNamespaces);
        if ($element->isChanged()) {
            try {
                $element->write();
            } catch (ValidationException $e) {
                $namespacedException = $this->createValidationExceptionWithNamespaces($e, $element);
                throw $namespacedException;
            }
        }

        // Create and send FormSchema JSON response
        $schemaID = $form->FormAction();
        $response = $this->getSchemaResponse($schemaID, $form);

        return $response;
    }

    /**
     * Remove the pseudo namespaces that were added to form fields by the form factory
     *
     * @param array $data
     * @param int $elementID
     * @return array
     * @deprecated 5.4.0 Will be removed without equivalent functionality to replace it in a future major release.
     */
    public static function removeNamespacesFromFields(array $data, $elementID)
    {
        Deprecation::noticeWithNoReplacment('5.4.0');
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
     * @deprecated 5.3.0 Will be removed without equivalent functionality to replace it in a future major release
     */
    public function formAction(HTTPRequest $request)
    {
        // This method no longer appears to be needed, Form fields on blocks that use nested request handlers
        // such as UploadField do no use this method.
        Deprecation::notice(
            '5.3.0',
            'This method will be removed without equivalent functionality to replace it in a future major release'
        );
        $formName = $request->param('FormName');

        // Get the element ID from the form name
        $id = substr($formName ?? '', strlen(sprintf(ElementalAreaController::FORM_NAME_TEMPLATE, '')));
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
        $form->setFormAction(AdminRootController::admin_url("$urlSegment/elementForm/$id"));

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

    private function createValidationExceptionWithNamespaces(
        ValidationException $validationException,
        BaseElement $element
    ): ValidationException {
        $validationResult = $validationException->getResult();
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
        return ValidationException::create($validationResultWithNameSpaces);
    }
}
