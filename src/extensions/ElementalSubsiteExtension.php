<?php

namespace SilverStripe\Elemental\Extensions;

use SilverStripe\ORM\DataExtension;
use SilverStripe\ORM\Queries\SQLSelect;
use SilverStripe\ORM\DataQuery;
use SilverStripe\Forms\FieldList;

/**
 * @package elemental
 *
 * Make elements compatibale with subsites
 * Apply this extension to BaseElement
 */
class ElementSubsiteExtension extends DataExtension
{

    private static $has_one = array(
        'Subsite' => Subsite::class
    );

    public function updateCMSFields(FieldList $fields) {

        // add SubsiteID if Subsites is installed andf Elemental has a subsite
        if(class_exists('Subsite')) {
            $fields->push(new HiddenField('SubsiteID', null, Subsite::currentSubsiteID()));
        }
    }

    /**
     * Update any requests for elements to limit the results to the current site
     */
    public function augmentSQL(SQLSelect $query, DataQuery $dataQuery = NULL) {

        if(!class_exists('Subsite')) {
            return;
        }

        if (Subsite::$disable_subsite_filter) {
            return;
        }

        if ($dataQuery && $dataQuery->getQueryParam('Subsite.filter') === false) {
            return;
        }

        if ($query->filtersOnID()) {
            return;
        }

        if (Subsite::$force_subsite) {
            $subsiteID = Subsite::$force_subsite;
        } else {
            $subsiteID = (int)Subsite::currentSubsiteID();
        }

        // The foreach is an ugly way of getting the first key :-)
        foreach ($query->getFrom() as $tableName => $info) {
            // The tableName should be BaseElement or BaseElement_Live...
            if(strpos($tableName, 'BaseElement') !== false) {
                $query->addWhere("\"$tableName\".\"SubsiteID\" IN ($subsiteID)");
                break;
            }
        }
    }

}


