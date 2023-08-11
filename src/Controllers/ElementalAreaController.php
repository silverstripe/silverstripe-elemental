<?php

namespace DNADesign\Elemental\Controllers;

use DNADesign\Elemental\Forms\EditFormFactory;
use DNADesign\Elemental\Forms\MoveElementHandler;
use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Services\ElementTypeRegistry;
use Exception;
use Psr\Log\LoggerInterface;
use SilverStripe\CMS\Controllers\CMSMain;
use SilverStripe\Control\Controller;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\Control\HTTPResponse;
use SilverStripe\Control\HTTPResponse_Exception;
use SilverStripe\Core\Convert;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Forms\Form;
use SilverStripe\ORM\ValidationResult;
use SilverStripe\Security\SecurityToken;

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
        'moveElementForm',
    ];

    public function getClientConfig()
    {
        $clientConfig = parent::getClientConfig();
        $clientConfig['form']['elementForm'] = [
            'schemaUrl' => $this->Link('schema/elementForm'),
            'moveModalSchemaUrl' => $this->Link('schema/moveElementForm'),
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
        // Validate required input data
        if (!isset($this->urlParams['ID'])) {
            $this->jsonError(400);
            return null;
        }

        $data = json_decode($request->getBody(), true);
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
        $element = BaseElement::get()->byID($this->urlParams['ID']);
        // Ensure the element can be edited by the current user
        if (!$element || !$element->canEdit()) {
            $this->jsonError(403);
            return null;
        }

        // Remove the pseudo namespaces that were added by the form factory
        $data = $this->removeNamespacesFromFields($data, $element->ID);

        try {
            $updated = false;

            $element->updateFromFormData($data);
            // Check if anything will actually be changed before writing
            if ($element->isChanged()) {
                $element->write();
                // Track changes so we can return to the client
                $updated = true;
            }
        } catch (Exception $ex) {
            Injector::inst()->get(LoggerInterface::class)->debug($ex->getMessage());

            $this->jsonError(500);
            return null;
        }

        $body = json_encode([
            'status' => 'success',
            'updated' => $updated,
        ]);
        return HTTPResponse::create($body)->addHeader('Content-Type', 'application/json');
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

        if (substr($formName, 0, 15) === 'MoveElementForm') {
            // Get the element ID from the form name
            $id = substr($formName, strlen(sprintf('MoveElementForm_%s', '')));
            $form = $this->getMoveElementForm($id);
        } else {
            // Get the element ID from the form name
            $id = substr($formName, strlen(sprintf(self::FORM_NAME_TEMPLATE, '')));
            $form = $this->getElementForm($id);
        }

        $field = $form->getRequestHandler()->handleField($request);

        return $field->handleRequest($request);
    }

    public function moveElementForm(HTTPRequest $request)
    {
        $elementID = $request->param('ElementID');
        return $this->getMoveElementForm($elementID);
    }

    public function getMoveElementForm($elementID)
    {
        $handler = MoveElementHandler::create($this);
        $form = $handler->Form($elementID);

        $form->setValidationResponseCallback(function (ValidationResult $errors) use ($form, $elementID) {
            $schemaId = Controller::join_links($this->Link('schema/moveElementForm'), $elementID);
            return $this->getSchemaResponse($schemaId, $form, $errors);
        });

        return $form;
    }

    public function moveelement($data, $form)
    {
        $id = $data['ElementID'];
        $record = BaseElement::get()->byID($id);
        $handler = MoveElementHandler::create($this);
        $results = $handler->moveElement($record, $data);

        if (!isset($results)) {
            return null;
        }

        // Send extra "message" data with schema response
        $extraData = ['message' => $results];
        $schemaId = Controller::join_links($this->Link('schema/moveElementForm'), $id);
        return $this->getSchemaResponse($schemaId, $form, null, $extraData);
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
