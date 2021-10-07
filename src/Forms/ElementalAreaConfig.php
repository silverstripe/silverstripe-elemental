<?php

namespace DNADesign\Elemental\Forms;

use SilverStripe\Forms\GridField\GridFieldConfig;
use SilverStripe\Forms\GridField\GridFieldDeleteAction;
use SilverStripe\Forms\GridField\GridFieldDetailForm;

class ElementalAreaConfig extends GridFieldConfig
{
    public function __construct()
    {
        parent::__construct();

        $this->addComponent(new GridFieldDeleteAction(false));
        $this->addComponent(new GridFieldDetailForm(null, false, false));

        $this->extend('updateConfig');
    }
}
