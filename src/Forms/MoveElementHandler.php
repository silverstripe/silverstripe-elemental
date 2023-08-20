<?php

namespace DNADesign\Elemental\Forms;

use DNADesign\Elemental\Extensions\ElementalPageExtension;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Control\Controller;
use SilverStripe\Core\Injector\Injectable;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\Form;
use SilverStripe\Forms\FormAction;
use SilverStripe\Forms\HiddenField;
use SilverStripe\Forms\LiteralField;
use SilverStripe\Forms\TreeDropdownField;
use SilverStripe\ORM\ValidationException;
use SilverStripe\ORM\ValidationResult;

class MoveElementHandler
{
    use Injectable;

    /**
     * Parent controller for this form
     *
     * @var Controller
     */
    protected ?Controller $controller;

    public function __construct($controller = null)
    {
        $this->controller = $controller;
    }

    public function Form($elementID)
    {
        $fields = FieldList::create([
            LiteralField::create(
                'MoveWarning',
                '<p class="alert alert-info">' .
                '<strong>Note</strong>: All published blocks will change to draft state once moved. ' .
                'If you would like to copy this block to another page, duplicate this block and then ' .
                'move the duplicate.' .
                '</p>'
            ),
            HiddenField::create(
                'ElementID',
                null,
                $elementID
            ),
            $pageField = TreeDropdownField::create(
                'PageID',
                'Select a page',
                SiteTree::class
            )
            // TODO add check if there's multiple elemental areas on the selected page
        ]);
        $actions = FieldList::create([
            FormAction::create('moveelement', 'Move')
                ->addExtraClass('btn btn-primary')
        ]);

        $pageField->setDisableFunction(function ($page) {
            return !$page->hasExtension(ElementalPageExtension::class);
        });

        $form = Form::create(
            $this->controller,
            sprintf('MoveElementForm_%s', $elementID),
            $fields,
            $actions
        );

        // Todo: make this dynamic
        $form->setFormAction('admin/elemental-area/MoveElementForm/');
        $form->addExtraClass('form--no-dividers');

        return $form;
    }

    public function moveElement($element, $formData)
    {
        $page = SiteTree::get()->byId($formData['PageID']);

        // if ElementalAreaNotFound
        if (!$page->ElementalArea()->exists()) {
            throw $this->validationResult(_t(
                __CLASS__ . '.ElementalAreaNotFound',
                'Could not find an elemental area on <strong>{PageName}</strong> to move ' .
                '<strong>{BlockName}</strong> to',
                [
                    'PageName' => $page->Title,
                    'BlockName' => $element->Title
                ]
            ));
        }

        if (!$page->canEdit() || !$element->canEdit()) {
            throw $this->validationResult(_t(
                __CLASS__ . '.InsufficientPermissions',
                'Can not move <strong>{PageName}</strong> to <strong>{BlockName}</strong> due to ' .
                'insufficient permissions',
                [
                    'PageName' => $page->Title,
                    'BlockName' => $element->Title
                ]
            ));
        }

        // TODO: Error handling
        // TODO: pages with multiple element areas
        // TODO: How does this work with sort?
        $page->ElementalArea()->Elements()->add($element->ID);

        $request = $this->controller->getRequest();
        $message = _t(
            __CLASS__ . '.Success',
            'Successfully moved <a href="{BlockEditLink}">{BlockName}</a> to <a href="{PageEditLink}">{PageName}</a>.',
            [
                'BlockName' => $element->Title,
                'BlockEditLink' => $element->MovedElementCMSLink(true, $element->ID),
                'PageName' => $page->Title,
                'PageEditLink' => $page->CMSEditLink(),
            ]
        );
        if ($request->getHeader('X-Formschema-Request')) {
            return $message;
        } elseif (Director::is_ajax()) {
            $response = new HTTPResponse($message, 200);

            $response->addHeader('Content-Type', 'text/html; charset=utf-8');
            return $response;
        } else {
            return $this->controller->redirectBack();
        }
    }

    /**
     * Raise validation error
     *
     * @param string $message
     * @param string $field
     * @return ValidationException
     */
    protected function validationResult($message, $field = null)
    {
        $error = ValidationResult::create()
            ->addFieldError($field, $message);
        return new ValidationException($error);
    }
}
