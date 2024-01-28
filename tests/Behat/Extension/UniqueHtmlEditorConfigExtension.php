<?php

namespace DNADesign\Elemental\Tests\Behat\Extension;

use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\Core\Extension;
use SilverStripe\Dev\TestOnly;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\HTMLEditor\HTMLEditorConfig;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;

/**
 * @extends Extension<BaseElement>
 */
class UniqueHtmlEditorConfigExtension extends Extension implements TestOnly
{
    public function updateCMSFields(FieldList $fields)
    {
        $wysiwyg = $fields->dataFieldByName('HTML');
        if ($wysiwyg instanceof HTMLEditorField) {
            $config = clone HTMLEditorConfig::get('cms');
            $config->setOption('editorIdentifier', 'cms-' . $this->getOwner()->getUniqueKey());
            $wysiwyg->setEditorConfig($config);
        }
    }
}
