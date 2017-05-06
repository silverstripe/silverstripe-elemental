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
            $fields->removeByName('InternalLinkID');
            $currentLinkType = false;
            if ($this->InternalLinkID) {
                $currentLinkType = 'internal';
            } else if ($this->LinkURL) {
                $currentLinkType = 'external';
            }
            $fields->addFieldsToTab(
                'Root.Main',
                array(
                    $linkType = OptionsetField::create(
                        'LinkType',
                        'Link type',
                        array('internal' => 'Internal page', 'external' => 'External website'),
                        $currentLinkType
                    ),
                    $url = TextField::create('LinkURL', 'Link URL'),
                    $internalLink = DisplayLogicWrapper::create(
                        TreeDropdownField::create('InternalLinkID', 'Link To', 'SiteTree')
                    ),
                    $newWindow = CheckboxField::create('NewWindow', 'Open in a new window'),
                ),
                'LinkText'
            );

            $url->setRightTitle('Including protocol e.g: ' . Director::absoluteBaseURL());
            $internalLink->setName('InternalLinkWrapper')->displayIf('LinkType')->isEqualTo('internal');
            $url->displayIf('LinkType')->isEqualTo('external');
            $newWindow->displayIf('LinkType')->isNotEmpty();
            $fields->dataFieldByName('LinkText')->setTitle('Link Label')->displayIf('LinkType')->isNotEmpty();
            $fields->dataFieldByName('LinkDescription')->displayIf('LinkType')->isNotEmpty();

        });

        return parent::getCMSFields();
    }
}
