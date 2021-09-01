<?php

namespace DNADesign\Elemental\Tests\Src;

use DNADesign\Elemental\Models\ElementContent;
use SilverStripe\Dev\TestOnly;

class TestContentElement extends ElementContent implements TestOnly
{
    public const INVALID_TITLE = 'INVALID_TITLE';

    public const INVALID_TITLE_MESSAGE = 'INVALID_TITLE_MESSAGE';

    public function validate()
    {
        $validationResult = parent::validate();
        if ($this->Content === static::INVALID_TITLE) {
            $validationResult->addFieldError('Content', static::INVALID_TITLE_MESSAGE);
        }
        return $validationResult;
    }
}
