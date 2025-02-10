<?php

namespace DNADesign\Elemental\Controllers;

use DNADesign\Elemental\Forms\EditFormFactory;
use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Services\ElementTypeRegistry;
use SilverStripe\Admin\AdminRootController;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Forms\Form;
use SilverStripe\Core\Validation\ValidationException;
use SilverStripe\Security\SecurityToken;
use SilverStripe\Core\Validation\ValidationResult;
use SilverStripe\Forms\FormAction;
use SilverStripe\Forms\FieldList;
use SilverStripe\Control\Controller;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Services\ReorderElements;
use Exception;
use SilverStripe\Control\HTTPResponse;
use SilverStripe\Control\HTTPRequest;
use InvalidArgumentException;
use SilverStripe\Admin\FormSchemaController;

/**
 * Controller for "ElementalArea" - handles loading and saving of in-line edit forms in an elemental area in admin
 */
class ElementalAreaController extends FormSchemaController
{
    const FORM_NAME_TEMPLATE = 'ElementForm_%s';

    private static $url_segment = 'elemental-area';

    private static string $required_permission_codes = 'CMS_ACCESS';

    private static $url_handlers = [
        'elementForm/$ItemID' => 'elementForm',
        '$FormName/field/$FieldName' => 'formAction',
        'GET api/readElements/$elementalAreaID!' => 'apiReadElements',
        'POST api/create' => 'apiCreate',
        'POST api/delete' => 'apiDelete',
        'POST api/duplicate' => 'apiDuplicate',
        'POST api/publish' => 'apiPublish',
        'POST api/saveForm/$ID' => 'apiSaveForm',
        'POST api/sort' => 'apiSort',
        'POST api/unpublish' => 'apiUnpublish',
    ];

    private static $allowed_actions = [
        'elementForm',
        'formAction',
        'apiCreate',
        'apiDelete',
        'apiDuplicate',
        'apiPublish',
        'apiReadElements',
        'apiSaveForm',
        'apiSort',
        'apiUnpublish',
    ];

    /**
     * JSON endpoint to create a new element in an ElementalArea
     */
    public function apiCreate(HTTPRequest $request): HTTPResponse
    {
        if (!SecurityToken::inst()->checkRequest($request)) {
            $this->jsonError(400);
        }
        $elementClass = $this->getPostedJsonValue($request, 'elementClass');
        $elementalAreaID = $this->getPostedJsonValue($request, 'elementalAreaID');
        // $afterElementID can be null, so do not error if it's missing
        $data = json_decode($request->getBody(), true);
        $afterElementID = $data['insertAfterElementID'] ?? null;
        if (!is_subclass_of($elementClass, BaseElement::class)) {
            $this->jsonError(400);
        }
        $elementalArea = ElementalArea::get()->byID($elementalAreaID);
        if (!$elementalArea) {
            $this->jsonError(400);
        }
        if (!$elementalArea->canEdit()) {
            $this->jsonError(403);
        }
        /** @var BaseElement $newElement */
        $newElement = Injector::inst()->create($elementClass);
        if (!$newElement->canCreate()) {
            $this->jsonError(403);
        }
        // Assign the parent ID directly rather than via HasManyList to prevent multiple writes.
        // See BaseElement::$has_one for the "Parent" naming.
        $newElement->ParentID = $elementalArea->ID;
        $newElement->ensureSortSet();
        if ($afterElementID !== null) {
            $this->reorderElements($newElement, $afterElementID);
        } else {
            $newElement->write();
        }
        return $this->jsonSuccess(204);
    }

    /**
     * JSON endpoint to delete an element
     */
    public function apiDelete(HTTPRequest $request): HTTPResponse
    {
        if (!SecurityToken::inst()->checkRequest($request)) {
            $this->jsonError(400);
        }
        $id = $this->getPostedJsonValue($request, 'id');
        $element = BaseElement::get()->byID($id);
        if (!$element) {
            $this->jsonError(400);
        }
        if (!$element->canDelete()) {
            $this->jsonError(403);
        }
        // Elemental does not officially support unversioned elements so always call doArchive()
        $element->doArchive();
        return $this->jsonSuccess(204);
    }

    /**
     * JSON endpoint to duplicate an element
     */
    public function apiDuplicate(HTTPRequest $request): HTTPResponse
    {
        if (!SecurityToken::inst()->checkRequest($request)) {
            $this->jsonError(400);
        }
        $id = $this->getPostedJsonValue($request, 'id');
         $element = BaseElement::get()->byID($id);
        if (!$element) {
            $this->jsonError(400);
        }
        if (!$element->canCreate()) {
            $this->jsonError(403);
        }
        // check can edit the elemental area
        $areaID = $element->ParentID;
        $area = ElementalArea::get()->byID($areaID);
        if (!$area) {
            $this->jsonError(400);
        }
        if (!$area->canEdit()) {
            $this->jsonError(403);
        }
        // clone element
        $clone = $element->duplicate(false);
        $clone->Title = $this->getNewTitle($clone->Title ?? '');
        $clone->Sort = 0; // must be zeroed for reorder to work
        $area->Elements()->add($clone);
        // reorder
        $this->reorderElements($clone, $id);
        return $this->jsonSuccess(204);
    }

    /**
     * JSON endpoint to publish an element
     */
    public function apiPublish(HTTPRequest $request): HTTPResponse
    {
        if (!SecurityToken::inst()->checkRequest($request)) {
            $this->jsonError(400);
        }
        $id = $this->getPostedJsonValue($request, 'id');
        $element = BaseElement::get()->byID($id);
        if (!$element) {
            $this->jsonError(400);
        }
        if (!$element->canPublish()) {
            $this->jsonError(403);
        }
        $element->publishRecursive();
        return $this->jsonSuccess(204);
    }

    /**
     * JSON endpoint to read elements on an ElementalArea
     */
    public function apiReadElements(HTTPRequest $request): HTTPResponse
    {
        $request = $this->getRequest();
        $elementalAreaID = $request->param('elementalAreaID');
        $elementalArea = ElementalArea::get()->byID($elementalAreaID);
        if (!$elementalArea) {
            $this->jsonError(404);
        }
        if (!$elementalArea->canView()) {
            $this->jsonError(403);
        }
        $data = [];
        foreach ($elementalArea->Elements() as $element) {
            if (!$element->canView()) {
                continue;
            }
            $data[] = [
                'id' => $element->ID,
                'title' => $element->Title,
                'blockSchema' => $element->getBlockSchema(),
                'obsoleteClassName' => $element->getObsoleteClassName(),
                'version' => $element->Version,
                'isPublished' => $element->isPublished(),
                'isLiveVersion' => $element->isLiveVersion(),
                'canDelete' => $element->canDelete(),
                'canPublish' => $element->canPublish(),
                'canUnpublish' => $element->canUnpublish(),
                'canCreate' => $element->canCreate(),
                'statusFlags' => $element->getStatusFlags(),
            ];
        }
        $this->extend('updateApiReadElementalArea', $data, $request);
        return $this->jsonSuccess(200, $data);
    }

    /**
     * JSON endpoint to sort elements on an ElementalArea
     */
    public function apiSort(HTTPRequest $request): HTTPResponse
    {
        if (!SecurityToken::inst()->checkRequest($request)) {
            $this->jsonError(400);
        }
        $id = $this->getPostedJsonValue($request, 'id');
        $afterBlockID = $this->getPostedJsonValue($request, 'afterBlockID');
        $element = BaseElement::get()->byID($id);
        if (!$element) {
            $this->jsonError(400);
        }
        if (!$element->canEdit()) {
            $this->jsonError(403);
        }
        $this->reorderElements($element, $afterBlockID);
        return $this->jsonSuccess(204);
    }

    /**
     * JSON endpoint to unpublish an element
     */
    public function apiUnpublish(HTTPRequest $request): HTTPResponse
    {
        if (!SecurityToken::inst()->checkRequest($request)) {
            $this->jsonError(400);
        }
        $id = $this->getPostedJsonValue($request, 'id');
        $element = BaseElement::get()->byID($id);
        if (!$element) {
            $this->jsonError(400);
        }
        if (!$element->canUnpublish()) {
            $this->jsonError(403);
        }
        $element->doUnpublish();
        return $this->jsonSuccess(204);
    }

    /**
     * Returns configuration required by the client app
     */
    public function getClientConfig(): array
    {
        $clientConfig = parent::getClientConfig();
        $clientConfig['form']['elementForm'] = [
            'schemaUrl' => $this->Link('schema/elementForm'),
            'formNameTemplate' => sprintf(static::FORM_NAME_TEMPLATE, '{id}'),
        ];
        $clientConfig['controllerLink'] = $this->Link();

        // Configuration that is available per element type
        $clientConfig['elementTypes'] = ElementTypeRegistry::generate()->getDefinitions();
        return $clientConfig;
    }

    /**
     * Used for both:
     * - GET requests to get the FormSchema via getElementForm() called from LeftAndMain::schema()
     * - POST Requests to save the Form. Will be handled by to FormRequestHandler::httpSubmission()
     * /admin/linkfield/elementForm/<ElementID>
     */
    public function elementForm(): Form
    {
        $id = $this->getRequest()->param('ItemID');
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
     */
    public function getElementForm(): Form
    {
        return $this->elementForm();
    }

    /**
     * Arrive here from FormRequestHandler::httpSubmission() during a POST request.
     * The 'save' method is called because it is the FormAction set on the Form
     */
    public function save(array $data, Form $form): HTTPResponse
    {
        $request = $this->getRequest();

        // Check security token for non-view operation - note token is pased in POST body, not headers
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

        // Remove the namespace prefixes
        $factory = Injector::inst()->get(EditFormFactory::class);
        $factory->removeNamespaceFromFields($form->Fields(), ['Record' => $element]);
        // Update the record
        $form->saveInto($element);
        // Add the namespace prefixes back - this is necessary for the response to be handled correctly
        $factory->namespaceFields($form->Fields(), ['Record' => $element]);

        // Write the data object which will trigger model validation
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

    private function reorderElements(BaseElement $element, int $afterElementID): void
    {
        if ($afterElementID < 0) {
            $this->jsonError(400);
        }
        /** @var ReorderElements $reorderer */
        $reorderer = Injector::inst()->create(ReorderElements::class, $element);
        $reorderer->reorder($afterElementID);
    }

    private function getNewTitle(string $title = ''): ?string
    {
        $hasCopyPattern = '/^.*(\scopy($|\s[0-9]+$))/';
        $hasNumPattern = '/^.*(\s[0-9]+$)/';
        $parts = [];
        // does $title end with 'copy' (ignoring numbers for now)?
        if (preg_match($hasCopyPattern ?? '', $title ?? '', $parts)) {
            $copy = $parts[1];
            // does $title end with numbers?
            if (preg_match($hasNumPattern ?? '', $copy ?? '', $parts)) {
                $num = trim($parts[1] ?? '');
                $len = strlen($num ?? '');
                $inc = (int)$num + 1;
                return substr($title ?? '', 0, -$len) . "$inc";
            } else {
                return $title . ' 2';
            }
        } else {
            return $title . ' copy';
        }
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
                $params = [$fieldName, $messageText, $messageType, '', $messageCast];
                $validationResultWithNameSpaces->addFieldError(...$params);
            } else {
                $validationResultWithNameSpaces->addError($messageText, $messageType, '', $messageCast);
            }
            $signatures[$signature] = $message;
        }
        return ValidationException::create($validationResultWithNameSpaces);
    }
}
