<?php

namespace DNADesign\Elemental\Models;

use Textfield;
use EmailField;
use Director;
use Email;


/**
 * @package elemental
 */
class ElementContact extends BaseElement
{

    private static $db = array(
        'ContactName' => 'Varchar(255)',
        'Phone' => 'Varchar(100)',
        'Mobile' => 'Varchar(100)',
        'Fax' => 'Varchar(100)',
        'Email' => 'Varchar(255)',
        'Website' => 'Varchar(255)',
    );

    private static $extensions = array(
        'SilverStripe\Addressable\Addressable',
        'SilverStripe\Addressable\Geocodable'
    );

    /**
     * @var string
     */
    private static $title = "Contact Element";

    /**
     * @return FieldList
     */
    public function getCMSFields()
    {
        $this->beforeUpdateCMSFields(function ($fields) {
            $fields->addFieldsToTab('Root.Main', array(
                Textfield::create('ContactName', 'Name'),
                TextField::create('Phone', 'Phone'),
                TextField::create('Mobile', 'Mobile'),
                TextField::create('Fax', 'Fax'),
                EmailField::create('Email', 'Email'),
                $website = TextField::create('Website', 'Website')
            ));

            $website->setRightTitle('e.g '.Director::absoluteBaseURL());
        });

        return parent::getCMSFields();
    }

    /**
     * Return the obfuscated email.
     *
     * @return string
     */
    public function ObfuscatedEmail()
    {
        return ($this->Email) ? Email::obfuscate($this->Email, 'hex') : null;
    }
}
