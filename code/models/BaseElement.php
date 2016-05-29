<?php

/**
 * @package elemental
 */
class BaseElement extends Widget
{
    /**
     * @var array $db
     */
    private static $db = array(
        'ExtraClass' => 'Varchar(255)',
        'HideTitle' => 'Boolean'
    );

    /**
     * @var array $has_one
     */
    private static $has_one = array(
        'List' => 'ElementList' // optional.
    );

    /**
     * @var array $has_many
     */
    private static $has_many = array(
        'VirtualClones' => 'ElementVirtualLinked'
    );

    /**
     * @var string
     */
    private static $title = "Content Block";

    /**
     * @var string
     */
    private static $singular_name = 'Content Block';

    /**
     * @var array
     */
    private static $summary_fields = array(
        'ID' => 'ID',
        'Title' => 'Title',
        'ElementType' => 'Type'
    );

    /**
     * @var boolean
     */
    protected $enable_title_in_template = false;


    public function getCMSFields()
    {
        $fields = $this->scaffoldFormFields(array(
            'includeRelations' => ($this->ID > 0),
            'tabbed' => true,
            'ajaxSafe' => true
        ));

        $fields->insertAfter(new ReadonlyField('ClassNameTranslated', _t('BaseElement.TYPE', 'Type'), $this->i18n_singular_name()), 'Title');
        $fields->removeByName('ListID');
        $fields->removeByName('ParentID');
        $fields->removeByName('Sort');
        $fields->removeByName('ExtraClass');

        if (!$this->enable_title_in_template) {
            $fields->removeByName('HideTitle');
            $title = $fields->fieldByName('Root.Main.Title');

            if ($title) {
                $title->setRightTitle('For reference only. Does not appear in the template.');
            }
        }

        $fields->addFieldToTab('Root.Settings', new TextField('ExtraClass', 'Extra CSS Classes to add'));

        if (!is_a($this, 'ElementList')) {
            $lists = ElementList::get()->filter('ParentID', $this->ParentID);

            if ($lists->exists()) {
                $fields->addFieldToTab('Root.Main',
                    $move = new DropdownField('MoveToListID', 'Move this to another list', $lists->map('ID', 'CMSTitle'), '')
                );

                $move->setEmptyString('Select a list..');
                $move->setHasEmptyDefault(true);
            }
        }


        if($virtual = $fields->dataFieldByName('VirtualClones')) {
            $tab = $fields->findOrMakeTab('Root.VirtualClones');
            $tab->setTitle(_t('BaseElement.VIRTUALTABTITLE', 'Linked To'));

            $virtual
                ->setTitle(_t('BaseElement.VIRTUALTABTITLE', 'Linked To'))
                ->getConfig()
                    ->removeComponentsByType('GridFieldAddExistingAutocompleter')
                    ->removeComponentsByType('GridFieldAddNewButton');

            $virtual->getConfig()
                ->getComponentByType('GridFieldDataColumns')
                ->setDisplayFields(array(
                    'Parent.getOwnerPage.Title' => 'Title',
                    'Parent.getOwnerPage.Link' => 'Link'
                ));
        }

        $this->extend('updateCMSFields', $fields);

        if ($this->IsInDB()) {
            if ($this->isEndofLine('BaseElement') && $this->hasExtension('VersionViewerDataObject')) {
                $fields = $this->addVersionViewer($fields, $this);
            }
        }

        return $fields;
    }

    /**
     * Version viewer must only be added at if this is the final getCMSFields for a class.
     * in order to avoid having to rename all fields from eg Root.Main to Root.Current.Main
     * To do this we test if getCMSFields is from the current class
     */
    public function isEndofLine($className)
    {
        $methodFromClass = ClassInfo::has_method_from(
            $this->ClassName, 'getCMSFields', $className
        );

        if($methodFromClass) {
            return true;
        }
    }


    public function onBeforeWrite()
    {
        parent::onBeforeWrite();

        if (!$this->Sort) {
            $parentID = ($this->ParentID) ? $this->ParentID : 0;

            $this->Sort = DB::query("SELECT MAX(\"Sort\") + 1 FROM \"Widget\" WHERE \"ParentID\" = $parentID")->value();
        }

        if ($this->MoveToListID) {
            $this->ListID = $this->MoveToListID;
        }
    }

    public function i18n_singular_name()
    {
        return _t(__CLASS__, $this->config()->title);
    }

    public function getElementType()
    {
        return $this->i18n_singular_name();
    }

    public function getTitle()
    {
        if ($title = $this->getField('Title')) {
            return $title;
        } else {
            if (!$this->isInDb()) {
                return;
            }

            return $this->config()->title;
        }
    }

    public function getCMSTitle()
    {
        if ($title = $this->getField('Title')) {
            return $this->config()->title . ': ' . $title;
        } else {
            if (!$this->isInDb()) {
                return;
            }
            return $this->config()->title;
        }
    }

    public function canView($member = null)
    {
        return Permission::check('CMS_ACCESS_CMSMain', 'any', $member);
    }

    public function canEdit($member = null)
    {
        return Permission::check('CMS_ACCESS_CMSMain', 'any', $member);
    }

    public function canDelete($member = null)
    {
        return Permission::check('CMS_ACCESS_CMSMain', 'any', $member);
    }

    public function canCreate($member = null)
    {
        return Permission::check('CMS_ACCESS_CMSMain', 'any', $member);
    }

    public function ControllerTop()
    {
        return Controller::curr();
    }

    public function getPage()
    {
        $area = $this->Parent();

        if ($area instanceof ElementalArea) {
            return $area->getOwnerPage();
        }

        return null;
    }

    /**
     * Override the {@link Widget::forTemplate()} method so that holders are not rendered twice. The controller should
     * render with widget inside the
     *
     * @return HTML
     */
    public function forTemplate($holder = true) {
        return $this->renderWith($this->class);
    }

    /**
     * @return string
     */
    public function getEditLink() {
        return Controller::join_links(
            Director::absoluteBaseURL(),
            'admin/elemental/BaseElement/EditForm/field/BaseElement/item',
            $this->ID,
            'edit'
        );
    }

    public function onBeforeVersionedPublish()
    {

    }
}
