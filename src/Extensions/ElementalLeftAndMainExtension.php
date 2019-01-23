<?php

namespace DNADesign\Elemental\Extensions;

use SilverStripe\Core\Extension;
use SilverStripe\View\Requirements;

class ElementalLeftAndMainExtension extends Extension
{

    public function init()
    {
        Requirements::add_i18n_javascript('dnadesign/silverstripe-elemental:client/lang');
    }
}
