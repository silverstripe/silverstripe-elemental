<?php

namespace DNADesign\Elemental\Extensions;

use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\Core\Extension;
use SilverStripe\ORM\FieldType\DBField;

class GridFieldDetailFormItemRequestExtension extends Extension
{
    public function updateBreadcrumbs($crumbs)
    {
        $record = $this->owner->getRecord();

        if ($record instanceof BaseElement) {
            $last = $crumbs->Last();

            $last->Title = DBField::create_field('HTMLVarchar', sprintf(
                "%s <small>(%s)</small>",
                DBField::create_field('Varchar', $last->Title)->XML(),
                $record->getType()
            ));
        }
    }
}
