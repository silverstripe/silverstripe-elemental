<?php

namespace DNADesign\Elemental\Validators;

use DNADesign\Elemental\Controllers\ElementalAreaController;
use DNADesign\Elemental\Forms\EditFormFactory;
use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementalArea;
use SilverStripe\Core\Config\Config;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Forms\Validator;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\ValidationResult;

class ElementalAreasValidator extends Validator
{
    /**
     * @param array $data
     */
    public function php($data)
    {
        $valid = true;
        $areaErrors = [];
        $areaFieldNames = $this->getElementalAreaFieldNames($data['ClassName']);
        foreach ($areaFieldNames as $areaFieldName) {
            $elementsData = $data[$areaFieldName] ?? [];
            if (empty($elementsData)) {
                continue;
            }
            foreach (array_values($elementsData) as $elementData) {
                $elementID = $this->getElementID($elementData);
                if (!$elementID) {
                    continue;
                }
                $key = sprintf(EditFormFactory::FIELD_NAMESPACE_TEMPLATE, $elementID, 'ClassName');
                $className = $elementData[$key] ?? '';
                if (!$className) {
                    continue;
                }
                /** @var BaseElement $element */
                $element = DataObject::get_by_id($className, $elementID, false);
                if (!$element) {
                    continue;
                }
                $originalTitle = $element->Title ??
                   sprintf('(Untitled %s)', ucfirst($element->config()->get('singular_name')));
                $formData = ElementalAreaController::removeNamespacesFromFields($elementData, $elementID);
                $element->updateFromFormData($formData);
                /** @var ValidationResult $validationResult */
                $validationResult = $element->validate();
                if ($validationResult->isValid()) {
                    continue;
                }
                if (!array_key_exists($areaFieldName, $areaErrors)) {
                    $areaErrors[$areaFieldName] = [
                        'The elements below have the following errors:' // TODO _t()
                    ];
                }
                foreach ($validationResult->getMessages() as $message) {
                    $this->validationError(
                        "PageElements_{$elementID}_{$message['fieldName']}",
                        $message['message'],
                        $message['messageType'],
                        $message['messageCast']
                    );
                    $areaErrors[$areaFieldName][] = sprintf(
                        '%s - %s',
                        $originalTitle,
                        $message['message']
                    );
                }
                $valid = false;
            }
        }
        if (!$valid) {
            foreach ($areaErrors as $areaFieldName => $errors) {
                $this->validationError(
                    $areaFieldName,
                    implode('<br>', $errors),
                    ValidationResult::TYPE_ERROR,
                    ValidationResult::CAST_HTML
                );
            }
            // TODO: see what happens when you have multiple cms tabs
            // Show a generic form message. Ideally this would be done in admin LeftAndMain.EditForm.js
            // TODO: this is defined in en.js, needs to be in en.yml too (preferably admin, not elemental)
            $msg = _t(
                'VALIDATION_ERRORS_ON_PAGE',
                'There are validation errors on this page, please fix them before saving or publishing.'
            );
            // If message above is change to javascript, instead set a blank string here to hide the
            // generic form message by overriding any PageElement_3_Title type of message which will
            // show as a generic form message since it won't match dataFieldByName($field) in
            // Form::loadMessageFrom($data)
            $this->validationError('GenericFormMessage', $msg);
        }
        return $valid;
    }

    /**
     * @param string $parentClassName
     * @return array
     */
    private function getElementalAreaFieldNames(string $parentClassName): array
    {
        $fieldNames = [];
        $hasOnes = Config::inst()->get($parentClassName, 'has_one');
        foreach ($hasOnes as $fieldName => $className) {
            if (!(Injector::inst()->get($className) instanceof ElementalArea)) {
                continue;
            }
            $fieldNames[] = $fieldName;
        }
        return $fieldNames;
    }

    /**
     * @param array $elementData
     * @return string
     */
    private function getElementID(array $elementData): string
    {
        foreach (array_keys($elementData) as $key) {
            $rx = str_replace(['%d', '%s'], ['([0-9]+)', '(.+)'], EditFormFactory::FIELD_NAMESPACE_TEMPLATE);
            if (!preg_match("#^{$rx}$#", $key, $match)) {
                continue;
            }
            return $match[1];
        }
        return '';
    }
}
