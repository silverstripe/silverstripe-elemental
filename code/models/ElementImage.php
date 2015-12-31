<?php

/**
 * Image tiles can link to a certain page.
 *
 * @package elemental
 */
class ElementImage extends ElementLink
{

    private static $db = array(
        'Caption' => 'HTMLText'
    );

    private static $has_one = array(
        'Image' => 'Image'
    );

    private static $title = "Image Element";

    public function getCMSFields()
    {
        $this->beforeUpdateCMSFields(function ($fields) {
            $uploadField = UploadField::create('Image', 'Image')
                ->setAllowedFileCategories('image')
                ->setAllowedMaxFileNumber(1)
                ->setFolderName('Uploads/images');
            $fields->addFieldToTab('Root.Main', $uploadField);

            $caption = HTMLEditorField::create('Caption', 'Caption');
            $caption->setRightTitle('Optional');

            $fields->addFieldToTab('Root.Main', $caption);
        });

        return parent::getCMSFields();
    }
}
