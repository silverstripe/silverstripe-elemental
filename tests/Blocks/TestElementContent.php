<?php

namespace DNADesign\Elemental\Tests\Blocks;

use SilverStripe\Dev\TestOnly;
use DNADesign\Elemental\Models\ElementContent;
use SilverStripe\Forms\CompositeValidator;
use SilverStripe\Core\Validation\ValidationResult;
use SilverStripe\Forms\Validator;

class TestElementContent extends ElementContent implements TestOnly
{
    private static $table_name = 'TestElementContent';

    public static $fail = '';

    public function canCreate($member = null, $context = [])
    {
        return self::$fail !== 'can-create';
    }

    public function canDelete($member = null, $context = [])
    {
        return self::$fail !== 'can-delete';
    }

    public function canEdit($member = null, $context = [])
    {
        return self::$fail !== 'can-edit';
    }

    public function canView($member = null)
    {
        return self::$fail !== 'can-view';
    }

    public function canPublish($member = null)
    {
        return self::$fail !== 'can-publish';
    }

    public function canUnpublish($member = null)
    {
        return self::$fail !== 'can-unpublish';
    }

    public function validate(): ValidationResult
    {
        $validationResult = parent::validate();
        if (self::$fail === 'validate') {
            $validationResult->addFieldError('Fail', 'Fail was validate');
        }
        return $validationResult;
    }

    public function getCMSCompositeValidator(): CompositeValidator
    {
        $compositeValidator = parent::getCMSCompositeValidator();
        $compositeValidator->addValidator(new class extends Validator {
            public function php($data): bool
            {
                $valid = true;
                if (TestElementContent::$fail == 'cms-composite-validator') {
                    $valid = false;
                    $this->validationError('Fail', 'Fail was cms-composite-validator');
                }
                return $valid;
            }
        });
        return $compositeValidator;
    }
}
