<?php

namespace DNADesign\Elemental\Extensions;

use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\View\Requirements;
use SilverStripe\Core\ClassInfo;
use SilverStripe\Control\Director;
use SilverStripe\Core\Extension;

/**
 * Extension to include custom element icons
 */
class LeftAndMainElementIconsExtension extends Extension
{

    public function init()
    {
        Requirements::customCSS($this->generateElementIconsCss());
    }

    /**
     * Include CSS for element icons.
     *
     * @return string CSS
     */
    public function generateElementIconsCss()
    {
        $css = '';

        $classes = ClassInfo::subclassesFor(BaseElement::class);

        foreach ($classes as $class) {
            $obj = singleton($class);
            $iconSpec = $obj->config()->get('icon');

            if (!$iconSpec) {
                continue;
            }

            $class = str_replace('\\', '-', strtolower($class)); // match the syntax used by AddMultiClassButton
            $selector = ".chosen-results li.$class:before";

            if (Director::fileExists($iconSpec)) {
                $css .= "$selector { background: transparent url('$iconSpec') 0 0 no-repeat; }\n";
            }
        }

        return $css;
    }
}
