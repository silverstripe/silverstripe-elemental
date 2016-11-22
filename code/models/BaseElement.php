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
     * @var array
     */
    private static $searchable_fields = array(
        'ID' => array(
            'field' => 'NumericField'
        ),
        'Title',
        'LastEdited',
        'ClassName'
    );

    /**
     * @var boolean
     */
    private static $enable_title_in_template = false;

    /**
     * Enable for backwards compatibility
     * 
     * @var boolean
     */
    private static $disable_pretty_anchor_name = false;

    /**
     * Store used anchor names, this is to avoid title clashes
     * when calling 'getAnchor'
     *
     * @var array
     */
    protected static $_used_anchors = array();

    /**
     * For caching 'getAnchor'
     *
     * @var string
     */
    protected $_anchor = null;

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

        if (!$this->config()->enable_title_in_template) {
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
                $fields->addFieldToTab('Root.Settings',
                    $move = new DropdownField('MoveToListID', 'Move this to another list', $lists->map('ID', 'CMSTitle'), '')
                );

                $move->setEmptyString('Select a list..');
                $move->setHasEmptyDefault(true);
            }
        }


        if($virtual = $fields->dataFieldByName('VirtualClones')) {
            if($this->Parent() && $this->Parent()->exists() && $this->Parent()->getOwnerPage() && $this->Parent()->getOwnerPage()->exists()) {
                $tab = $fields->findOrMakeTab('Root.VirtualClones');
                $tab->setTitle(_t('BaseElement.VIRTUALTABTITLE', 'Linked To'));

                $ownerPage = $this->Parent()->getOwnerPage();
                $tab->push(new LiteralField('DisplaysOnPage', sprintf(
                    "<p>The original content block appears on <a href='%s'>%s</a></p>",
                    ($ownerPage->hasMethod('CMSEditLink') && $ownerPage->canEdit()) ? $ownerPage->CMSEditLink() : $ownerPage->Link(),
                    $ownerPage->MenuTitle
                )));

                $virtual->setConfig(new GridFieldConfig_Base());
                $virtual
                    ->setTitle(_t('BaseElement.OTHERPAGES', 'Other pages'))
                    ->getConfig()
                        ->removeComponentsByType('GridFieldAddExistingAutocompleter')
                        ->removeComponentsByType('GridFieldAddNewButton')
                        ->removeComponentsByType('GridFieldDeleteAction')
                        ->removeComponentsByType('GridFieldDetailForm')
                        ->addComponent(new ElementalGridFieldDeleteAction());

                $virtual->getConfig()
                    ->getComponentByType('GridFieldDataColumns')
                    ->setDisplayFields(array(
                        'getPage.Title' => 'Title',
                        'getPage.Link' => 'Link'
                    ));
            }
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

    /**
     * @return string
     */
    public function i18n_singular_name()
    {
        return _t(__CLASS__, $this->config()->title);
    }

    /**
     * @return string
     */
    public function getElementType()
    {
        return $this->i18n_singular_name();
    }

    /**
     * @return string
     */
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

    /**
     * Get a unique anchor name
     *
     * @return string
     */
    public function getAnchor() {
        if ($this->_anchor !== null) {
            return $this->_anchor;
        }

        $anchorTitle = '';
        if (!$this->config()->disable_pretty_anchor_name) {
            if ($this->hasMethod('getAnchorTitle')) {
                $anchorTitle = $this->getAnchorTitle();
            } else if ($this->config()->enable_title_in_template) {
                $anchorTitle = $this->getField('Title');
            }
        }
        if (!$anchorTitle) {
            $anchorTitle = 'e'.$this->ID;
        }

        $filter = URLSegmentFilter::create();
        $titleAsURL = $filter->filter($anchorTitle);

        // Ensure that this anchor name isn't already in use
        // ie. If two elemental blocks have the same title, it'll append '-2', '-3'
        $result = $titleAsURL;
        $count = 1;
        while (isset(self::$_used_anchors[$result]) && self::$_used_anchors[$result] !== $this->ID) {
            ++$count;
            $result = $titleAsURL.'-'.$count;
        }
        self::$_used_anchors[$result] = $this->ID;
        return $this->_anchor = $result;
    }

    /**
     * @return string
     */
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
    public function forTemplate($holder = true)
    {
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

    public static function all_allowed_elements() {
        $classes = array();

        // get all dataobject with the elemental extension
        foreach(ClassInfo::subclassesFor('DataObject') as $className) {
            if(Object::has_extension($className, 'ElementPageExtension')) {
               $classes[] = $className;
            }
        }

        // get all allowd_elements for these classes
        $allowed = array();
        foreach($classes as $className) {
            $allowed_elements = Config::inst()->get($className, 'allowed_elements');
            if ($allowed_elements) {
                $allowed = array_merge($allowed, $allowed_elements);
            }
        }

       // $allowed[] = 'ElementVirtualLinked';
        $allowed = array_unique($allowed);

        $elements = array();
        foreach($allowed as $className) {
            $elements[$className] = _t($className, Config::inst()->get($className, 'title'));
        }

        asort($elements);

        return $elements;
    }

    public function getDefaultSearchContext()
    {
        $fields = $this->scaffoldSearchFields();

        $elements = BaseElement::all_allowed_elements();

        $fields->push(DropdownField::create('ClassName', 'Element Type', $elements)
            ->setEmptyString('All types'));
        $filters = $this->owner->defaultSearchFilters();

        return new SearchContext(
            $this->owner->class,
            $fields,
            $filters
        );
    }
}
