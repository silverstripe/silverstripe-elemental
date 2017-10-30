<?php

namespace DNADesign\Elemental\Forms;

use SilverStripe\Control\Controller;
use SilverStripe\View\ArrayData;
use SilverStripe\View\SSViewer;
use SilverStripe\Forms\GridField\GridFieldViewButton;

class ElementalGridFieldHistoryButton extends GridFieldViewButton
{
    public function getColumnContent($field, $record, $col)
    {
        if ($record->isLatestVersion()) {
            return null;
        }

        $data = new ArrayData(array(
            'Link' => Controller::join_links($field->Link('item'), $record->ID, 'view?VersionID='. $record->Version)
        ));

        $template = SSViewer::get_templates_by_class($this, '', GridFieldViewButton::class);

        return $data->renderWith($template);
    }
}
