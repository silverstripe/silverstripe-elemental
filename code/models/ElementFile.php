<?php

/**
 * @package elemental
 */
class ElementFile extends BaseElement
{

    private static $db = array(
        'FileDescription' => 'Text'
    );

    private static $has_one = array(
        'File' => 'File'
    );

    private static $title = 'File Element';

    private static $enable_title_in_template = true;

    public function getCMSFields()
    {
        $this->beforeUpdateCMSFields(function ($fields) {

            $desc = TextareaField::create('FileDescription', 'Description');
            $desc->setRightTitle('Optional');
            $fields->addFieldToTab('Root.Main', $desc);

            $uploadField = UploadField::create('File', 'File')
                ->setAllowedMaxFileNumber(1)
                ->setFolderName('Uploads/files');
            $fields->addFieldToTab('Root.Main', $uploadField);
        });

        return parent::getCMSFields();
    }
}
