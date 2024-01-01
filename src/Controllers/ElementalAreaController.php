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
use SilverStripe\Security\SecurityToken;
use InvalidArgumentException;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Services\ReorderElements;
use SilverStripe\Control\Controller;

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
        //
        'GET readBlocks/$elementalAreaID!' => 'readBlocks',
        'POST add' => 'add',
    ];

    private static $allowed_actions = [
        'elementForm',
        'schema',
        'apiSaveForm',
        'formAction',
        //a
        'readBlocks',
        'add',
    ];

    // ===

    public function readBlocks()
    {
        $request = $this->getRequest();
        $elementalAreaID = $request->param('elementalAreaID');

        // validate post vars
        $elementalArea = ElementalArea::get()->byID($elementalAreaID);
        if (!$elementalArea) {
            throw new InvalidArgumentException("Invalid ElementalAreaID: $elementalAreaID");
        }
        // permission checks
        if (!$elementalArea->canView()) {
            throw new InvalidArgumentException("The current user has insufficient permission to view ElementalArea");
        }
        $json = [];
        foreach ($elementalArea->Elements() as $element) {
            if (!$element->canView()) {
                continue;
            }
            $typeName = str_replace('//', '_', get_class($element)); // todo obsolete class name
            // should probably be able to just red rid of this
            $blockSchema = [
                'typeName' => $typeName,
                'actions' => [
                    'edit' => Controller::join_links(BASE_URL, "/admin/pages/edit/show/4") // todo pageID
                ],
                'content' => '',
            ];
            $json[] = [
                'id' => $element->ID,
                'title' => $element->Title,
                'type' => $element->Type,
                'blockSchema' => $blockSchema,
                'obsoleteClassName' => null, // todo
                'version' => 1, // todo
                'isPublished' => false, // todo
                'isLiveVersion' => false, // todo
                // 'canEdit' => $element->canEdit(), // not in graphql response
                'canDelete' => $element->canDelete(),
                'canPublish' => $element->canPublish(),
                'canUnpublish' => $element->canUnpublish(),
                'canCreate' => $element->canCreate(),
            ];
        }
        $response = $this->getResponse();
        $response->setStatusCode(200);
        $response->addHeader('Content-Type', 'application/json');
        $response->setBody(json_encode($json));
        return $response;
    }

    // Resolver.php resolveAddElementToArea()
    public function add()
    {
        $request = $this->getRequest();
        $postVars = json_decode($request->getBody(), true);
        $elementClass = $postVars['elementClass'];
        $elementalAreaID = $postVars['elementalAreaID'];
        $afterElementID = $postVars['afterElementID'] ?? null;

        // validate post vars
        if (!is_subclass_of($elementClass, BaseElement::class)) {
            throw new InvalidArgumentException("$elementClass is not a subclass of " . BaseElement::class);
        }
        $elementalArea = ElementalArea::get()->byID($elementalAreaID);
        if (!$elementalArea) {
            throw new InvalidArgumentException("Invalid ElementalAreaID: $elementalAreaID");
        }

        // permission checks
        if (!$elementalArea->canEdit()) {
            throw new InvalidArgumentException("The current user has insufficient permission to edit ElementalAreas");
        }
        /** @var BaseElement $newElement */
        $newElement = Injector::inst()->create($elementClass);
        if (!$newElement->canEdit()) {
            throw new InvalidArgumentException(
                'The current user has insufficient permission to edit Elements'
            );
        }

        // Assign the parent ID directly rather than via HasManyList to prevent multiple writes.
        // See BaseElement::$has_one for the "Parent" naming.
        $newElement->ParentID = $elementalArea->ID;
        // Ensure that a sort order is assigned - see BaseElement::onBeforeWrite()
        $newElement->onBeforeWrite();

        if ($afterElementID !== null) {
            /** @var ReorderElements $reorderer */
            $reorderer = Injector::inst()->create(ReorderElements::class, $newElement);
            $reorderer->reorder($afterElementID); // also writes the element
        } else {
            $newElement->write();
        }

        $response = $this->getResponse();
        $response->setStatusCode(201);
        // return $newElement;
    }

    // ===

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
