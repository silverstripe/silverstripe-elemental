<?php

namespace DNADesign\Elemental\Tasks;

use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Models\ElementContent;

use SilverStripe\Dev\BuildTask;
use SilverStripe\Versioned\Versioned;

class MigrateContentToElement extends BuildTask
{

    protected $title = 'MigrateContentToElement';

    protected $description = 'When installing Elemental this task converts content in the $Content '
        . 'field to an ElementContent';

    public function run($request)
    {
        // TODO: needs rewriting for multiple elemental areas
        $pageTypes = singleton(ElementalArea::class)->supportedPageTypes();
        $count = 0;
        foreach ($pageTypes as $pageType) {
            $pages = $pageType::get()->filter('Content:not', ['', null]);
            foreach ($pages as $page) {
                $content = $page->Content;
                $page->Content = '';
                // trigger area relations to be setup
                $page->write();
                $area = $page->ElementalArea();
                $element = new ElementContent();
                $element->Title = 'Auto migrated content';
                $element->HTML = $content;
                $element->ParentID = $area->ID;
                $element->write();
                if (class_exists(Versioned::class)) {
                    $page->copyVersionToStage(Versioned::DRAFT, Versioned::LIVE);
                }
            }
            $count += $pages->Count();
            echo 'Migrated ' . $pages->Count() . ' ' . $pageType . ' pages\' content<br>';
        }
        echo 'Finished migrating ' . $count . ' pages\' content<br>';
    }
}
