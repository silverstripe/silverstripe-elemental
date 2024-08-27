<?php

namespace DNADesign\Elemental\Tests\Src;

use SilverStripe\Core\ClassInfo;
use SilverStripe\Core\Extension;
use SilverStripe\Dev\TestOnly;
use SilverStripe\ORM\ValidationResult;

class ValidationFailedExtension extends Extension implements TestOnly
{
    public const INVALID_TITLE_MESSAGE = '%s is invalid';

    protected function updateValidate(ValidationResult $result)
    {
        $result->addFieldError('Title', sprintf(static::INVALID_TITLE_MESSAGE, ClassInfo::shortName($this->owner)));
    }
}
