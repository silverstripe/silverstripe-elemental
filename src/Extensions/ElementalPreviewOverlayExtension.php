<?php

namespace DNADesign\Elemental\Extensions;

use SilverStripe\Control\Controller;
use SilverStripe\Core\Extension;
use SilverStripe\Core\Manifest\ModuleResourceLoader;
use SilverStripe\View\Requirements;

/**
 * Manages injecting required CSS for the CMS Preview element overlay
 *
 * @package DNADesign\Elemental\Extensions
 */
class ElementalPreviewOverlayExtension extends Extension
{
    public function onAfterInit()
    {
        /** @var Controller $controller */
        $controller = $this->owner;

        if ($controller->getRequest()->getVar('CMSPreview') !== null) {
            Requirements::css(
                ModuleResourceLoader::singleton()->resolvePath(
                    'dnadesign/silverstripe-elemental: client/dist/styles/preview-overlay.css'
                )
            );
        }
    }
}
