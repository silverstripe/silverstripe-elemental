<?php

namespace DNADesign\Elemental\Forms;

use SilverStripe\Forms\GridField\GridFieldConfig;
use SilverStripe\Forms\GridField\GridFieldButtonRow;
use SilverStripe\Forms\GridField\GridFieldToolbarHeader;
use SilverStripe\Forms\GridField\GridFieldFilterHeader;
use SilverStripe\Forms\GridField\GridFieldDataColumns;
use SilverStripe\Forms\GridField\GridFieldEditButton;
use SilverStripe\Forms\GridField\GridFieldDeleteAction;
use SilverStripe\Forms\GridField\GridFieldDetailForm;
use SilverStripe\Versioned\VersionedGridFieldState\VersionedGridFieldState;
use Symbiote\GridFieldExtensions\GridFieldOrderableRows;

class ElementalAreaConfig extends GridFieldConfig
{
    public function __construct()
    {
        parent::__construct();

        $this->addComponent(new GridFieldButtonRow('before'));
        $this->addComponent(new GridFieldToolbarHeader());
        $this->addComponent($filter = new GridFieldFilterHeader());
        $this->addComponent(new GridFieldDataColumns());
        $this->addComponent(new GridFieldEditButton());
        $this->addComponent(new GridFieldDeleteAction(false));
        $this->addComponent(new GridFieldDetailForm());

        $filter->setThrowExceptionOnBadDataType(false);

        $this->removeComponentsByType(VersionedGridFieldState::class);
        $this->addComponent(new GridFieldOrderableRows('Sort'));

        $this->extend('updateConfig');
    }
}
