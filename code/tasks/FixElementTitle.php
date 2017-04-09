<?php

namespace DNADesign\Elemental\Tasks;

use BuildTask;

use DB;
use Convert;
use Versioned;
use DNADesign\Elemental\Models\BaseElement;


class FixElementTitle extends BuildTask
{

    protected $title = 'Fix Element title';

    protected $description = 'Now that element label has been removed and widget title been created, we need to move the values from the label field to the title field';

    public function run($request)
    {
        $elements = BaseElement::get();
        foreach ($elements as $element) {
            $label = DB::query('SELECT Label FROM "BaseElement" WHERE "ID" = ' . $element->ID)->record();
            $element->Title = $label['Label'];

            $label = DB::query('UPDATE "Widget" SET "Title" = \'' . Convert::raw2sql($label['Label']) . '\' WHERE "ID" = ' . $element->ID)->record();
        }

        $origStage = Versioned::current_stage();
        Versioned::reading_stage('Live');

        $elements = BaseElement::get();
        foreach ($elements as $element) {
            $label = DB::query('SELECT Label FROM "BaseElement_Live" WHERE "ID" = ' . $element->ID)->record();

            $label = DB::query('UPDATE "Widget_Live" SET "Title" = \'' . Convert::raw2sql($label['Label']) . '\' WHERE "ID" = ' . $element->ID)->record();
        }

        Versioned::reading_stage($origStage);
    }
}
