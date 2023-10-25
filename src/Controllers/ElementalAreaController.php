<?php

namespace DNADesign\Elemental\Controllers;

use DNADesign\Elemental\Forms\EditFormFactory;
use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Services\ElementTypeRegistry;
use Exception;
use Psr\Log\LoggerInterface;
use SilverStripe\CMS\Controllers\CMSMain;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\Control\HTTPResponse;
use SilverStripe\Control\HTTPResponse_Exception;
use SilverStripe\Core\Convert;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Forms\Form;
use SilverStripe\ORM\ValidationException;
use SilverStripe\Security\SecurityToken;
use SilverStripe\ORM\ValidationResult;

/**
 * Controller for "ElementalArea" - handles loading and saving of in-line edit forms in an elemental area in admin
 */
class ElementalAreaController extends CMSMain
{
    const FORM_NAME_TEMPLATE = 'ElementForm_%s';

    private static $url_segment = 'elemental-area';

    private static $ignore_menuitem = true;

    private static $url_handlers = [
        // API access points with structured data
        'POST api/saveForm/$ID' => 'apiSaveForm',
        '$FormName/field/$FieldName' => 'formAction',
    ];

    private static $allowed_actions = [
        'elementForm',
        'schema',
        'apiSaveForm',
        'formAction',
    ];

    public function getClientConfig()
    {
        $clientConfig = parent::getClientConfig();
        $clientConfig['form']['elementForm'] = [
            'schemaUrl' => $this->Link('schema/elementForm'),
            'saveUrl' => $this->Link('api/saveForm'),
            'saveMethod' => 'post',
            'payloadFormat' => 'json',
            'formNameTemplate' => sprintf(static::FORM_NAME_TEMPLATE ?? '', '{id}'),
        ];

        // Configuration that is available per element type
        $clientConfig['elementTypes'] = ElementTypeRegistry::generate()->getDefinitions();

        return $clientConfig;
    }

    /**
     * @param HTTPRequest|null $request
     * @return Form
     * @throws HTTPResponse_Exception
     */
    public function elementForm(HTTPRequest $request = null)
    {
        // Get ID either from posted back value, or url parameter
        if (!$request) {
            $this->jsonError(400);
            return null;
        }
        $id = $request->param('ID');
        if (!$id) {
            $this->jsonError(400);
            return null;
        }
        return $this->getElementForm($id) ?: $this->jsonError(404);
    }

    /**
     * @param int $elementID
     * @return Form|null Returns null if no element exists for the given ID
     */
    public function getElementForm($elementID)
    {
        $scaffolder = Injector::inst()->get(EditFormFactory::class);
        $element = BaseElement::get()->byID($elementID);

        if (!$element) {
            return null;
        }

        /** @var Form $form */
        $form = $scaffolder->getForm(
            $this,
            sprintf(static::FORM_NAME_TEMPLATE ?? '', $elementID),
            ['Record' => $element]
        );

        $urlSegment = $this->config()->get('url_segment');
        $form->setFormAction("admin/$urlSegment/api/saveForm/$elementID");
        $form->setEncType('application/json');

        if (!$element->canEdit()) {
            $form->makeReadonly();
        }

        $form->addExtraClass('element-editor-editform__form');

        return $form;
    }

    /**
     * Save an inline edit form for a block
     *
     * @param HTTPRequest $request
     * @return HTTPResponse|null JSON encoded string or null if an exception is thrown
     * @throws HTTPResponse_Exception
     */
    public function apiSaveForm(HTTPRequest $request)
    {
        $id = $this->urlParams['ID'] ?? 0;
        // Validate required input data
        if ($id === 0) {
            $this->jsonError(400);
            return null;
        }

        // previously was json being sent by the SaveAction.js request
        //$data = json_decode($request->getBody(), true);

        // now will be form urlencoded data coming from the form
        // created by formbuilder
        $data = $request->postVars();

        if (empty($data)) {
            $this->jsonError(400);
            return null;
        }

        // Inject request body as request vars
        foreach ($data as $key => $value) {
            $request->offsetSet($key, $value);
        }

        // Check security token
        if (!SecurityToken::inst()->checkRequest($request)) {
            $this->jsonError(400);
            return null;
        }

        /** @var BaseElement $element */
        $element = BaseElement::get()->byID($id);
        // Ensure the element can be edited by the current user
        if (!$element || !$element->canEdit()) {
            $this->jsonError(403);
            return null;
        }

        // Remove the pseudo namespaces that were added by the form factory
        $data = $this->removeNamespacesFromFields($data, $element->ID);

        // create a temporary Form to use for validation - will contain existing dataobject values
        $form = $this->getElementForm($id);
        // remove element namespaces from fields so that something like RequiredFields('Title') works
        // element namespaces are added in DNADesign\Elemental\Forms\EditFormFactory
        foreach ($form->Fields()->flattenFields() as $field) {
            $rx = '#^PageElements_[0-9]+_#';
            $namespacedName = $field->getName();
            if (!preg_match($rx, $namespacedName)) {
                continue;
            }
            $regularName = preg_replace($rx, '', $namespacedName);
            // If there's an existing field with the same name, remove it
            // this is probably a workaround for EditFormFactory creating too many fields?
            // e.g. for element #2 there's a "Title" field and a "PageElements_2_Title" field
            // same with "SecurityID" and "PageElements_2_SecurityID"
            // possibly this would be better to just remove fields if they match the rx, not sure,
            // this approach seems more conservative
            if ($form->Fields()->flattenFields()->fieldByName($regularName)) {
                $form->Fields()->removeByName($regularName);
            }
            // update the name of the field
            $field->setName($regularName);
        }
        // merge submitted data into the form
        $form->loadDataFrom($data);

        // validate the Form
        $validationResult = $form->validationResult();

        // validate the DataObject
        $element->updateFromFormData($data);
        $validationResult->combineAnd($element->validate());

        // handle validation failure and sent json formschema as response
        if (!$validationResult->isValid()) {
            // Re-add prefixes to field names
            $prefixedValidationResult = ValidationResult::create();
            foreach ($validationResult->getMessages() as $message) {
                $fieldName = $message['fieldName'];
                $prefixMessage = $message;
                $prefixMessage['fieldName'] = "PageElements_{$id}_{$fieldName}";
                $prefixedValidationResult->addMessage($prefixMessage);
            }
            // add headers to the request here so you don't need to do it in the client
            // in the future I'd like these be the default response from formschema if
            // the header wasn't defined
            $request->addHeader('X-Formschema-Request', 'auto,schema,state,errors');
            // generate schema response
            $url = $this->getRequest()->getURL(); // admin/elemntal-area/api/saveForm/3
            $response = $this->getSchemaResponse($url, $form, $prefixedValidationResult);
            // returning a 400 means that FormBuilder.js::handleSubmit() submitFn()
            // that will end up in the catch() .. throw error block and the error
            // will just end up in the javascript console
            // $response->setStatusCode(400);
            //
            // return a 200 for now just to get things to work even though it's
            // clearly the wrong code. Will require a PR to admin to fix this
            $response->setStatusCode(200);
            return $response;
        }

        // write the data object
        $updated = false;
        if ($element->isChanged()) {
            $element->write();
            // Track changes so we can return to the client
            $updated = true;
        }

        // create and send success json response
        $body = json_encode([
            'status' => 'success',
            'updated' => $updated,
        ]);
        return HTTPResponse::create($body)->addHeader('Content-Type', 'application/json');
    }

    /**
     * Override LeftAndMain::jsonError() to allow multiple error messages
     *
     * This is fairly ridicious, it's really for demo purposes
     * We could use this though we'd be better off updating LeftAndMain::jsonError() to support multiple errors
     */
    public function jsonError($errorCode, $errorMessage = null)
    {
        try {
            parent::jsonError($errorCode, $errorMessage);
        } catch (HTTPResponse_Exception $e) {
            // JeftAndMain::jsonError() will always throw this exception
            if (!is_array($errorMessage)) {
                // single error, no need to update
                throw $e;
            }
            // multiple errors
            $response = $e->getResponse();
            $json = json_decode($response->getBody(), true);
            $errors = [];
            foreach ($errorMessage as $message) {
                $errors[] = [
                    'type' => 'error',
                    'code' => $errorCode,
                    'value' => $message
                ];
            }
            $json['errors'] = $errors;
            $body = json_encode($json);
            $response->setBody($body);
            $e->setResponse($response);
            throw $e;
        }
    }

    /**
     * Provides action control for form fields that are request handlers when they're used in an in-line edit form.
     *
     * Eg. UploadField
     *
     * @param HTTPRequest $request
     * @return array|HTTPResponse|\SilverStripe\Control\RequestHandler|string
     */
    public function formAction(HTTPRequest $request)
    {
        $formName = $request->param('FormName');

        // Get the element ID from the form name
        $id = substr($formName ?? '', strlen(sprintf(self::FORM_NAME_TEMPLATE ?? '', '')));
        $form = $this->getElementForm($id);

        $field = $form->getRequestHandler()->handleField($request);

        return $field->handleRequest($request);
    }

    /**
     * Remove the pseudo namespaces that were added to form fields by the form factory
     *
     * @param array $data
     * @param int $elementID
     * @return array
     */
    public static function removeNamespacesFromFields(array $data, $elementID)
    {
        $output = [];
        $template = sprintf(EditFormFactory::FIELD_NAMESPACE_TEMPLATE ?? '', $elementID, '');
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
}
