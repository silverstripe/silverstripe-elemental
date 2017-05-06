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
            $fields->removeByName('Caption');
            $fields->removeByName('LinkText');

            $uploadField = UploadField::create('Image', 'Image')
                ->setAllowedFileCategories('image')
                ->setAllowedMaxFileNumber(1)
                ->setFolderName('Uploads/images');
            $fields->addFieldToTab('Root.Main', $uploadField, 'LinkType');
            $currentLink = false;
            if ($this->LinkURL || $this->InternalLinkID) {
                $currentLink = true;
            }
            $fields->addFieldToTab('Root.Main', CheckboxField::create('ImageHasLink', 'Does the image need a link?', $currentLink), 'LinkType');

            $lt = DisplayLogicWrapper::create($fields->dataFieldByName('LinkType'));
            $lt->displayIf('ImageHasLink')->isChecked();
            $fields->replaceField('LinkType', $lt);

            $caption = HTMLEditorField::create('Caption', 'Caption');
            $hasCaption = false;
            if ($this->Caption) {
                $hasCaption = true;
            }
            $fields->addFieldToTab('Root.Main', CheckboxField::create('ImageHasCaption', 'Does the image need a caption?', $hasCaption));
            $fields->addFieldToTab('Root.Main', $captionWrapper = DisplayLogicWrapper::create($caption));
            $captionWrapper->displayIf('ImageHasCaption')->isChecked();

            $fields->fieldByName('Root.Main.InternalLinkWrapper')->getDisplayLogicCriteria()->andIf('ImageHasLink')->isChecked();
            $fields->dataFieldByName('LinkURL')->getDisplayLogicCriteria()->andIf('ImageHasLink')->isChecked();
            $fields->dataFieldByName('NewWindow')->getDisplayLogicCriteria()->andIf('ImageHasLink')->isChecked();
            $fields->dataFieldByName('LinkDescription')->getDisplayLogicCriteria()->andIf('ImageHasLink')->isChecked();
        });

        return parent::getCMSFields();
    }
}
