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
use SilverStripe\Control\Director;

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
        // new api
        'GET readBlocks/$elementalAreaID!' => 'apiReadBlocks',
        'POST add' => 'apiAdd',
        'POST sort' => 'apiSort',
        'POST duplicate' => 'apiDuplicate',
        'POST archive' => 'apiArchive',
        'POST publish' => 'apiPublish',
        'POST unpublish' => 'apiUnpublish',
    ];

    private static $allowed_actions = [
        'elementForm',
        'schema',
        'apiSaveForm',
        'formAction',
        // new api
        'apiReadBlocks',
        'apiAdd',
        'apiSort',
        'apiDuplicate',
        'apiArchive',
        'apiPublish',
        'apiUnpublish',
        'revert', // ???? todo there is a revert mutation, though not sure it's actually used?
    ];

    private function jsonResponse(int $statusCode = 200, ?array $data = null, string $message = ''): HTTPResponse
    {
        $response = $this->getResponse();
        $response->setStatusCode($statusCode);
        $response->addHeader('Content-Type', 'application/json');
        $body = '';
        if ($data) {
            $body = json_encode($data);
        } elseif ($message) {
            $body = json_encode(['message' => $message]);
        }
        $response->setBody($body);
        return $response;
    }

    // ===

    private function getPostData()
    {
        $request = $this->getRequest();
        $postData = json_decode($request->getBody(), true);
        return $postData;
    }

    public function apiArchive(): HTTPResponse
    {
        $id = $this->getPostData()['ID'] ?? '';
        $element = BaseElement::get()->byID($id);
        if (!$element) {
            return $this->jsonResponse(400, null, "Element with ID $id does not exist");
        }
        if (!$element->canDelete()) {
            return $this->jsonResponse(403, null, "Unable to delete element with ID $id");
        }
        $element->doArchive();
        return $this->jsonResponse(204);
    }

    public function apiPublish(): HTTPResponse
    {
        $id = $this->getPostData()['ID'] ?? '';
        $element = BaseElement::get()->byID($id);
        if (!$element) {
            return $this->jsonResponse(400, null, "Element with ID $id does not exist");
        }
        if (!$element->canPublish()) {
            return $this->jsonResponse(403, null, "Unable to publish element with ID $id");
        }
        $element->publishRecursive();
        return $this->jsonResponse(204);
    }

    public function apiUnpublish(): HTTPResponse
    {
        $id = $this->getPostData()['ID'] ?? '';
        $element = BaseElement::get()->byID($id);
        if (!$element) {
            return $this->jsonResponse(400, null, "Element with ID $id does not exist");
        }
        if (!$element->canUnpublish()) {
            return $this->jsonResponse(403, null, "Unable to publish element with ID $id");
        }
        $element->doUnpublish();
        return $this->jsonResponse(204);
    }

    // Resolver.php resolveDuplicateBlock()
    public function apiDuplicate(): HTTPResponse
    {
        $id = $this->getPostData()['ID'] ?? '';
                $element = BaseElement::get()->byID($id);
        if (!$element) {
            return $this->jsonResponse(400, null, "Element with ID $id does not exist");
        }
        // check can edit the elemental area
        $areaID = $element->ParentID;
        $area = ElementalArea::get()->byID($areaID);
        if (!$area) {
            return $this->jsonResponse(400, null, "Invalid ParentID on BaseElement $id");
        }
        if (!$area->canEdit()) {
            return $this->jsonResponse(403, null, "Unable to edit element with ID $id");
        }
        try {
            // clone element
            $clone = $element->duplicate(false);
            $clone->Title = $this->getNewTitle($clone->Title ?? '');
            $clone->Sort = 0; // must be zeroed for reorder to work
            $area->Elements()->add($clone);
            // reorder
            $reorderer = Injector::inst()->create(ReorderElements::class, $clone);
            $reorderer->reorder($id);
            return $this->jsonResponse(204);
        } catch (Exception $e) {
            return $this->jsonResponse(500, null, "Something went wrong when duplicating element with ID $id");
        }
    }

    // Resolver.php newTitle()
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

    // Resolver.php resolveSortBlock()
    public function apiSort(): HTTPResponse
    {
        $postData = $this->getPostData();
        $id = $postData['ID'] ?? 0;
        $afterBlockID = $postData['afterBlockID'] ?? 0;
        $element = BaseElement::get()->byID($id);
        if (!$element) {
            // todo 404
            throw new InvalidArgumentException(sprintf('%s#%s not found', BaseElement::class, $id));
        }
        if (!$element->canEdit()) {
            $message = 'Changing the sort order of blocks is not allowed for the current user';
            throw new InvalidArgumentException($message);
        }
        $reorderingService = Injector::inst()->create(ReorderElements::class, $element);
        $reorderingService->reorder($afterBlockID);
        return $this->jsonResponse(204);
    }

    public function apiReadBlocks(): HTTPResponse
    {
        $request = $this->getRequest();
        $elementalAreaID = $request->param('elementalAreaID');
        $elementalArea = ElementalArea::get()->byID($elementalAreaID);
        if (!$elementalArea) {
            throw new InvalidArgumentException("Invalid ElementalAreaID: $elementalAreaID");
        }
        if (!$elementalArea->canView()) {
            throw new InvalidArgumentException("The current user has insufficient permission to view ElementalArea");
        }
        $data = [];
        foreach ($elementalArea->Elements() as $element) {
            if (!$element->canView()) {
                continue;
            }
            $typeName = str_replace('\\', '_', get_class($element)); // todo obsolete class name
            // should probably be able to just red rid of this
            $blockSchema = [
                'typeName' => $typeName,
                'actions' => [
                    'edit' => Controller::join_links(
                        Director::absoluteBaseURL(),
                        "/admin/pages/edit/show/4" // todo pageID
                    )
                ],
                'content' => '',
            ];
            $data[] = [
                'id' => (string) $element->ID,
                'title' => $element->Title,
                '__typename' => 'Block', // todo (delete)
                'blockSchema' => $blockSchema,
                'obsoleteClassName' => $element->getObsoleteClassName(),
                'version' => $element->Version,
                'isPublished' => $element->isPublished(),
                'isLiveVersion' => $element->isLiveVersion(),
                // 'canEdit' => $element->canEdit(), // not in graphql response
                'canDelete' => $element->canDelete(),
                'canPublish' => $element->canPublish(),
                'canUnpublish' => $element->canUnpublish(),
                'canCreate' => $element->canCreate(), // todo shouldn't be in response?
            ];
        }
        return $this->jsonResponse(200, $data);
    }

    // Resolver.php resolveAddElementToArea()
    public function apiAdd(): HTTPResponse
    {
        $request = $this->getRequest();
        $postData = json_decode($request->getBody(), true);
        $elementClass = $postData['elementClass'];
        $elementalAreaID = $postData['elementalAreaID'];
        $afterElementID = $postData['afterElementID'] ?? null;

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
        return $response;
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
