<?php

/**
 * @package elemental
 */
class ElementLink extends BaseElement
{
    private static $db = array(
        'LinkText' => 'Varchar(255)',
        'LinkDescription' => 'Text',
        'LinkURL' => 'Varchar(255)',
        'NewWindow' => 'Boolean'
    );

    private static $has_one = array(
        'InternalLink' => 'SiteTree'
    );

    private static $title = "Link Element";

    private static $description = "";

    public function getCMSFields()
    {
        $this->beforeUpdateCMSFields(function ($fields) {
            $url = TextField::create('LinkURL', 'Link URL');
            $url->setRightTitle('Including protocol e.g: '.Director::absoluteBaseURL());
            $fields->addFieldToTab('Root.Main', $url);


            $fields->addFieldsToTab('Root.Main', array(
                TreeDropdownField::create('InternalLinkID', 'Link To', 'SiteTree'),
                CheckboxField::create('NewWindow', 'Open in a new window'),
                $text = TextField::create('LinkText', 'Link Text'),
                $desc = TextareaField::create('LinkDescription', 'Link Description')
            ));
        });

        return parent::getCMSFields();
    }
}
