<?php

namespace DNADesign\Elemental\Models;

use SilverStripe\Control\Controller;
use SilverStripe\Control\Director;
use SilverStripe\Core\ClassInfo;
use SilverStripe\Core\Config\Config;
use SilverStripe\Core\Object;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\DropdownField;
use SilverStripe\Forms\GridField\GridFieldConfig_Base;
use SilverStripe\Forms\HiddenField;
use SilverStripe\Forms\LiteralField;
use SilverStripe\Forms\NumericField;
use SilverStripe\Forms\ReadonlyField;
use SilverStripe\Forms\TextField;
use SilverStripe\ORM\CMSPreviewable;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\DB;
use SilverStripe\ORM\Search\SearchContext;
use SilverStripe\Security\Permission;
use SilverStripe\SiteConfig\SiteConfig;
use SilverStripe\Versioned\Versioned;
use SilverStripe\View\Parsers\URLSegmentFilter;

use DNADesign\Elemental\Controllers\ElementController;
use DNADesign\Elemental\Models\ElementList;
use DNADesign\Elemental\Models\ElementVirtualLinked;
use DNADesign\Elemental\ElementalGridFieldDeleteAction;
use DNADesign\Elemental\Extensions\ElementPageExtension;

/**
 * @package elemental
 */
class BaseElement extends DataObject implements CMSPreviewable
{
    /**
     * @var array $db
     */
    private static $db = array(
        'Title' => 'Varchar(255)',
        'Sort' => 'Int',
        'Enabled' => 'Int',
        'ExtraClass' => 'Varchar(255)',
        'AvailableGlobally' => 'Boolean(1)'
    );

    /**
     * @var array $has_one
     */
    private static $has_one = array(
        'Parent' => ElementalArea::class,
        'List' => ElementList::class // optional.
    );

    /**
     * @var array $has_many
     */
    private static $has_many = array(
        'VirtualClones' => ElementVirtualLinked::class
    );

    private static $table_name = 'Element';

    /**
     * @var array
     */
    private static $defaults = array(
        'Enabled' => true,
    );

    /**
     * @var ElementController
     */
    protected $controller;

    /**
     * @var string
     */
    private static $default_sort = 'Sort';

    /**
     * @var string
     */
    private static $title = 'Content Element';

    /**
     * @var string
     */
    private static $singular_name = 'Content Element';

    /**
     * @var array
     */
    private static $summary_fields = array(
        'Title' => 'Title',
        'ElementType' => 'Type',
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
        'AvailableGlobally'
    );

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

    /**
     * @var Object
     * The virtual owner VirtualLinkedElement
     */
    public $virtualOwner;

    /**
     * @config
     * Elements available globally by default
     */
    private static $default_global_elements = true;

    /**
     * Basic permissions, defaults to page perms where possible
     */
    public function canView($member = null)
    {
        if ($this->hasMethod('getPage')) {
            if($page = $this->getPage()) {
                return $page->canView($member);
            }
        }

        if(Director::is_cli()) return true;

        return (Permission::check('CMS_ACCESS', 'any', $member)) ? true : null;
    }

    /**
     * Basic permissions, defaults to page perms where possible
     */
    public function canEdit($member = null)
    {
        if ($this->hasMethod('getPage')) {
            if ($page = $this->getPage()) {
                return $page->canEdit($member);
            }
        }

        if(Director::is_cli()) return true;

        return (Permission::check('CMS_ACCESS', 'any', $member)) ? true : null;
    }

    /**
     * Basic permissions, defaults to page perms where possible
     * Uses archive not delete so that current stage is respected
     * i.e if a widget is not published, then it can be deleted by someone who
     * doesn't have publishing permissions
     */
    public function canDelete($member = null)
    {
        if ($this->hasMethod('getPage')) {
            if ($page = $this->getPage()) {
                return $page->canArchive($member);
            }
        }

        if(Director::is_cli()) return true;

        return (Permission::check('CMS_ACCESS', 'any', $member)) ? true : null;
    }

    /**
     * Basic permissions, defaults to page perms where possible
     */
    public function canCreate($member = NULL, $context = Array())
    {
        if(Director::is_cli()) return true;

        return (Permission::check('CMS_ACCESS', 'any', $member)) ? true : null;
    }

    public function populateDefaults()
    {
        $this->AvailableGlobally = $this->config()->get('default_global_elements');
        parent::populateDefaults();
    }

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
        $fields->removeByName('AvailableGlobally');

        $title = $fields->fieldByName('Root.Main.Title');

        if ($title) {
            $title->setRightTitle('For reference only. Does not appear in the template.');
        }

        $fields->addFieldToTab('Root.Settings', new CheckboxField('Enabled'));
        $fields->addFieldToTab('Root.Settings', new CheckboxField('AvailableGlobally', 'Available globally - can be linked to multiple pages'));
        $fields->addFieldToTab('Root.Settings', new TextField('ExtraClass', 'Extra CSS Classes to add'));

        if (!is_a($this, ElementList::class)) {
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
            if ($this->VirtualClones()->Count() > 0) {
                $tab = $fields->findOrMakeTab('Root.VirtualClones');
                $tab->setTitle(_t('BaseElement.VIRTUALTABTITLE', 'Linked To'));

                if ($ownerPage = $this->getPage()) {
                    $fields->addFieldToTab(
                        'Root.VirtualClones',
                        new LiteralField(
                            'DisplaysOnPage',
                            sprintf(
                                "<p>The original content element appears on <a href='%s'>%s</a></p>",
                                ($ownerPage->hasMethod('CMSEditLink') && $ownerPage->canEdit()) ? $ownerPage->CMSEditLink() : $ownerPage->Link(),
                                $ownerPage->MenuTitle
                            )
                        ),
                        'VirtualClones'
                    );
                }

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
                        'ParentCMSEditLink' => 'Used on'
                    ));
            } else {
                $fields->removeByName('VirtualClones');
            }
        }

        $this->extend('updateCMSFields', $fields);

        if ($this->IsInDB()) {
            if ($this->isEndofLine(BaseElement::class) && $this->hasExtension('VersionViewerDataObject')) {
                $fields = $this->addVersionViewer($fields, $this);
            }
        }

        $fields->push($liveLinkField = new HiddenField('AbsoluteLink', false, Director::absoluteURL($this->PreviewLink())));
        $fields->push($liveLinkField = new HiddenField('LiveLink', false, Director::absoluteURL($this->Link())));
        $fields->push($stageLinkField = new HiddenField('StageLink', false, Director::absoluteURL($this->PreviewLink())));

        return $fields;
    }

    /**
     * @throws Exception
     *
     * @return WidgetController
     */
    public function getController()
    {
        if ($this->controller) {
            return $this->controller;
        }

        foreach (array_reverse(ClassInfo::ancestry($this->class)) as $widgetClass) {
            $controllerClass = "{$widgetClass}Controller";
            if (class_exists($controllerClass)) {
                break;
            }
        }

        if (!class_exists($controllerClass)) {
            throw new Exception("Could not find controller class for $this->classname");
        }

        $this->controller = Injector::inst()->create($controllerClass, $this);

        return $this->controller;
    }

    /**
     * Note: Overloaded in {@link WidgetController}.
     *
     * @return string HTML
     */
    public function ElementHolder()
    {
        return $this->renderWith("ElementHolder");
    }

    /**
     * Default way to render widget in templates.
     * @return string HTML
     */
    public function forTemplate($holder = true)
    {
        $config = SiteConfig::current_site_config();

        if ($config->Theme) {
            Config::inst()->update('SSViewer', 'theme_enabled', true);
            Config::inst()->update('SSViewer', 'theme', $config->Theme);
        }

        if ($holder) {
            return $this->ElementHolder();
        }

        return $this->RenderElement();
    }

    /**
     * Renders the element in a custom template with the same name as the
     * current class. This should be the main point of output customization.
     *
     * Invoked from within ElementHolder.ss, which contains the "framing" around
     * the custom content, like a title.
     *
     * @return string HTML
     */
    public function RenderElement()
    {
        return $this->renderWith(array_reverse(ClassInfo::ancestry($this->class)));
    }

    /**
     * get all pages where this element is used
     *
     * @return ArrayList
     */
    public function getUsage()
    {
        $usage = new ArrayList();

        if($page = $this->getPage()) {
            $usage->push($page);
            if ($this->virtualOwner) {
                $page->setField('ElementType', 'Linked');
            } else {
                $page->setField('ElementType', 'Master');
            }
        }

        $linkedElements = ElementVirtualLinked::get()->filter('LinkedElementID', $this->ID);
        foreach($linkedElements as $element) {
            $area = $element->Parent();
            if ($area instanceof ElementalArea && $page = $area->getOwnerPage()) {
                $page->setField('ElementType', 'Linked');
                $usage->push($page);
            }
        }

        $usage->removeDuplicates();
        return $usage;
    }

    public function UsageSummary()
    {
        $usage = $this->getUsage();
        $arr = array();
        foreach($usage as $page) {
            $type = ($page->ElementType) ? sprintf("<em> - %s</em>", $page->ElementType) : null;
            $arr[] = sprintf("<a href=\"%s\" target=\"blank\">%s</a> %s", $page->CMSEditLink(), $page->Title, $type);
        }
        $html = DBField::create_field('HTMLText', implode('<br>', $arr));

        return $html;
    }

    public function Link()
    {
        /* TODO
            Use smarter template rendering to just show this element
        */
        if($page = $this->getPage()) {
            return $page->Link() . '#' . $this->getAnchor();
        }
    }

    public function PreviewLink($action = null)
    {
        return Controller::join_links(
            Director::baseURL(),
            'cms-preview',
            'show',
            $this->ClassName,
            $this->ID
        );
    }

    public function isCMSPreview()
    {
        if(Controller::has_curr()) {
            $c = Controller::curr();
            if($c->getRequest()->requestVar('CMSPreview')) {
                return true;
            }
        }
        return false;
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

            $this->Sort = DB::query("SELECT MAX(\"Sort\") + 1 FROM \"Element\" WHERE \"ParentID\" = $parentID")->value();
        }

        if ($this->MoveToListID) {
            $this->ListID = $this->MoveToListID;
        }
    }

    /**
     * Ensure that if there are elements that are virtualised from this element
     * that we move the original element to replace one of the virtual elements
     * But only if it's a delete not an unpublish
     */
    public function onBeforeDelete()
    {
        parent::onBeforeDelete();

        if(Versioned::get_reading_mode() == 'Stage.Stage') {
            $firstVirtual = false;
            $allVirtual = $this->getVirtualLinkedElements();
            if ($this->getPublishedVirtualLinkedElements()->Count() > 0) {
                // choose the first one
                $firstVirtual = $this->getPublishedVirtualLinkedElements()->First();
                $wasPublished = true;
            } else if ($allVirtual->Count() > 0) {
                // choose the first one
                $firstVirtual = $this->getVirtualLinkedElements()->First();
                $wasPublished = false;
            }
            if ($firstVirtual) {
                $origParentID = $this->ParentID;
                $origSort = $this->Sort;

                $clone = $this->duplicate(false);

                // set clones values to first virtual's values
                $clone->ParentID = $firstVirtual->ParentID;
                $clone->Sort = $firstVirtual->Sort;

                $clone->write();
                if ($wasPublished) {
                    $clone->doPublish();
                    $firstVirtual->doUnpublish();
                }

                // clone has a new ID, so need to repoint
                // all the other virtual elements
                foreach($allVirtual as $virtual) {
                    if ($virtual->ID == $firstVirtual->ID) {
                        continue;
                    }
                    $pub = false;
                    if ($virtual->isPublished()) {
                        $pub = true;
                    }
                    $virtual->LinkedElementID = $clone->ID;
                    $virtual->write();
                    if ($pub) {
                        $virtual->doPublish();
                    }
                }

                $firstVirtual->delete();
            }
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
    public function getAnchor()
    {
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
        return (Controller::has_curr()) ? Controller::curr() : null;
    }

    public function getPage()
    {
        if ($this->virtualOwner) {
            return $this->virtualOwner->getPage();
        }

        if ($this->ListID) {
            return $this->List()->getPage();
        }

        $area = $this->Parent();

        if ($area instanceof ElementalArea) {
            return $area->getOwnerPage();
        }

        return null;
    }

    /**
     * @return string
     */
    public function getEditLink()
    {
        return $this->CMSEditLink();
    }

    /**
     * @return string
     */
    public function CMSEditLink($inList = false)
    {
        if ($this->ListID) {
            if ($parentLink = $this->List()->CMSEditLink(true)) {
                return Controller::join_links(
                    $parentLink,
                    'ItemEditForm/field/Elements/item/',
                    $this->ID,
                    'edit'
                );
            }
        }
        if (!$this->getPage() || $this->config()->editlink_modeladmin) {
            return Controller::join_links(
                Director::absoluteBaseURL(),
                'admin/elemental/BaseElement/EditForm/field/BaseElement/item',
                $this->ID,
                'edit'
            );
        }

        $link = Controller::join_links(
            singleton('CMSPageEditController')->Link('EditForm'),
            $this->getPage()->ID,
            'field/ElementArea/item/',
            $this->ID
        );

        if ($inList) {
            return $link;
        }
        return Controller::join_links(
            $link,
            'edit'
        );
    }

    public function PageLink()
    {
        if ($page = $this->getPage()) {
            $html = new HTMLText('PageLink');
            $html->setValue('<a href="' . $page->Link() . '">' . $page->Title . '</a>');
            return $html;
        }
    }

    public function PageCMSEditLink()
    {
        if ($page = $this->getPage()) {
            $html = new HTMLText('UsedOn');
            $html->setValue('<a href="' . $page->CMSEditLink() . '">' . $page->Title . '</a>');
            return $html;
        }
    }

    public function ParentCMSEditLink()
    {
        $html = new HTMLText('ParentCMSEditLink');
        if ($this->ListID) {
            $html->setValue('<a href="' . $this->List()->CMSEditLink() . '">' . $this->List()->Title . '</a>');
        } elseif ($page = $this->getPage()) {
            $html->setValue('<a href="' . $page->CMSEditLink() . '">' . $page->Title . '</a>');
        }
        return $html;
    }

    public static function all_allowed_elements()
    {
        $classes = array();

        // get all dataobject with the elemental extension
        foreach(ClassInfo::subclassesFor('DataObject') as $className) {
            if(Object::has_extension($className, ElementPageExtension::class)) {
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

    public function setVirtualOwner(ElementVirtualLinked $virtualOwner)
    {
        $this->virtualOwner = $virtualOwner;
    }

    /**
     * Finds and returns elements
     * that are virtual elements which link to this element
     */
    public function getVirtualLinkedElements()
    {
        return ElementVirtualLinked::get()->filter('LinkedElementID', $this->ID);
    }

    /**
     * Finds and returns published elements
     * that are virtual elements which link to this element
     */
    public function getPublishedVirtualLinkedElements()
    {
        $current = Versioned::get_reading_mode();
        Versioned::set_reading_mode('Stage.Live');
        $v = $this->getVirtualLinkedElements();
        Versioned::set_reading_mode($current);
        return $v;
    }

    public function getMimeType()
    {
        return 'text/html';
    }

    /**
     * Handles unpublishing as VersionedDataObjects doesn't
     * Modelled on SiteTree::doUnpublish
     * Has to be applied here, rather than BaseElement so that it goes against Widget
     */
    // public function doUnpublish() {
    //     if(!$this->owner->ID) return false;

    //     $this->owner->extend('onBeforeUnpublish');

    //     $origStage = Versioned::get_reading_mode();
    //     Versioned::set_reading_mode('Stage.Live');

    //     // This way our ID won't be unset
    //     $clone = clone $this->owner;
    //     $clone->delete();

    //     Versioned::set_reading_mode($origStage);

    //     $virtualLinkedElements = $this->owner->getPublishedVirtualLinkedElements();
    //     if ($virtualLinkedElements) foreach($virtualLinkedElements as $vle) $vle->doUnpublish();

    //     $this->owner->extend('onAfterUnpublish');

    //     return true;
    // }
}
