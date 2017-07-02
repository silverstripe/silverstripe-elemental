<?php

namespace DNADesign\Elemental\Tasks;

use SilverStripe\Dev\BuildTask;

class RemoveOrphanedElements extends BuildTask
{

    protected $title = 'Remove Orphaned Elements';

    protected $description = 'Tidy up the database and remove elements that no longer belong to a valid page or list.';

    public function run($request)
    {
        $elementalAreas = ElementalArea::get();
        $deleteCount = 0;
        foreach($elementalAreas as $elementalArea) {
            if ($elementalArea->getOwnerPage() == false) {
                $deleteCount++;
                $elementalArea->delete();
            }
        }
        echo 'Found ' . $deleteCount . ' areas no longer used';

        $bogusNoAreas = BaseElement::get()
            ->leftJoin('ElementalArea', 'ea.ID = ElementalArea.ParentID', 'ea')
            ->where('ea.ID IS NULL and BaseElement.ListID = 0');
        echo 'Found ' . $bogusNoAreas->Count() . ' bogus areas';
        foreach($bogusNoAreas as $bogus) {
            $bogus->delete();
        }

        $bogusNoLists = BaseElement::get()
            ->leftJoin('ElementList', 'el.ID = BaseElement.ListID', 'el')
            ->where('el.ID IS NULL and BaseElement.ListID > 0');
        echo 'Found ' . $bogusNoLists->Count() . ' bogus lists';
        foreach($bogusNoLists as $bogus) {
            echo $bogus->ListID;
            // $bogus->delete();
        }
    }

}
