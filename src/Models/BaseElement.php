<?php

namespace DNADesign\Elemental\Models;

use SilverStripe\CMS\Controllers\CMSPageEditController;
use SilverStripe\Control\Controller;
use SilverStripe\Control\Director;
use SilverStripe\Core\ClassInfo;
use SilverStripe\Core\Config\Config;
use SilverStripe\DataObjectPreview\Controllers\DataObjectPreviewController;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\DropdownField;
use SilverStripe\Forms\GridField\GridFieldAddExistingAutocompleter;
use SilverStripe\Forms\GridField\GridFieldAddNewButton;
use SilverStripe\Forms\GridField\GridFieldConfig_Base;
use SilverStripe\Forms\GridField\GridFieldDataColumns;
use SilverStripe\Forms\GridField\GridFieldDeleteAction;
use SilverStripe\Forms\GridField\GridFieldDetailForm;
use SilverStripe\Forms\HiddenField;
use SilverStripe\Forms\LiteralField;
use SilverStripe\Forms\ReadonlyField;
use SilverStripe\Forms\TextField;
use SilverStripe\ORM\ArrayList;
use SilverStripe\ORM\CMSPreviewable;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\DB;
use SilverStripe\ORM\FieldType\DBField;
use SilverStripe\ORM\FieldType\DBHTMLText;
use SilverStripe\ORM\Search\SearchContext;
use SilverStripe\Security\Permission;
use SilverStripe\SiteConfig\SiteConfig;
use SilverStripe\Versioned\Versioned;
use SilverStripe\View\Parsers\URLSegmentFilter;
use SilverStripe\Core\Injector\Injector;

use Exception;

use DNADesign\Elemental\Controllers\ElementController;
use DNADesign\Elemental\Forms\ElementalGridFieldDeleteAction;

/**
 * @package elemental
 */
class BaseElement extends DataObject implements CMSPreviewable
{

    private static $icon = 'elemental/images/base.svg';
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

    private static $extensions = array(
        Versioned::class
    );

    private static $table_name = 'Element';

    private static $controller_class = ElementController::class;

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
        'ElementIcon' => 'ElementIcon',
        'Title' => 'Title',
        'ElementType' => 'Type',
    );

    /**
     * @var array
     */
    private static $searchable_fields = array(
        'ID' => array(
            'field' => 'SilverStripe\Forms\NumericField'
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
     * i.e if a element is not published, then it can be deleted by someone who
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

    public function onBeforeWrite()
    {
        parent::onBeforeWrite();

        if($areaID = $this->ParentID) {
        	if ($elementalArea = ElementalArea::get()->byID($areaID)) {
        		$elementalArea->write();
			}
		}

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
                        ->removeComponentsByType(GridFieldAddExistingAutocompleter::class)
                        ->removeComponentsByType(GridFieldAddNewButton::class)
                        ->removeComponentsByType(GridFieldDeleteAction::class)
                        ->removeComponentsByType(GridFieldDetailForm::class)
                        ->addComponent(new ElementalGridFieldDeleteAction());

                $virtual->getConfig()
                    ->getComponentByType(GridFieldDataColumns::class)
                    ->setDisplayFields(array(
                        'getPage.Title' => 'Title',
                        'ParentCMSEditLink' => 'Used on'
                    ));
            } else {
                $fields->removeByName('VirtualClones');
            }
        }

        if ($this->IsInDB()) {
            if ($this->isEndofLine(BaseElement::class) && $this->hasExtension('VersionViewerDataObject')) {
                $fields = $this->addVersionViewer($fields, $this);
            }
        }

        $fields->push($liveLinkField = new HiddenField('AbsoluteLink', false, Director::absoluteURL($this->PreviewLink())));
        $fields->push($liveLinkField = new HiddenField('LiveLink', false, Director::absoluteURL($this->Link())));
        $fields->push($stageLinkField = new HiddenField('StageLink', false, Director::absoluteURL($this->PreviewLink())));

        $this->extend('updateCMSFields', $fields);

        return $fields;
    }

    /**
     * Used in ElementalAdmin
     */
    public function getDefaultSearchContext()
    {
        $fields = $this->scaffoldSearchFields();
        $elements = BaseElement::all_allowed_elements();
        if(!$elements) {
            $elements = ClassInfo::subclassesFor(self::class);
        }
        foreach($elements as $key => $value) {
            if ($key == self::class) {
                unset($elements[$key]);
                continue;
            }
            $elements[$key] = DataObjectPreviewController::stripNamespacing($value);
        }

        $fields->push(DropdownField::create('ClassName', 'Element Type', $elements)
            ->setEmptyString('All types'));
        $filters = $this->owner->defaultSearchFilters();

        return new SearchContext(
            self::class,
            $fields,
            $filters
        );
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

    /**
     * @throws Exception
     *
     * @return ElementController
     */
    public function getController()
    {
        if ($this->controller) {
            return $this->controller;
        }

        $controllerClass = self::config()->controller_class;

        if (!class_exists($controllerClass)) {
            throw new Exception('Could not find controller class ' . $controllerClass . ' as defined in ' . static::class);
        }

        $this->controller = Injector::inst()->create($controllerClass, $this);
        $this->controller->doInit();
        return $this->controller;
    }

    public function ControllerTop()
    {
        return (Controller::has_curr()) ? Controller::curr() : null;
    }

    /**
     * Element holder used to wrap each element in a consistent way
     *
     * @return string HTML
     */
    public function ElementHolder()
    {
        return $this->renderWith('ElementHolder');
    }

    /**
     * Default way to render element in templates.
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

    public function renderPreview() {
        return $this->forTemplate();
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
        return $this->renderWith($this->getRenderTemplates());
    }

    public function getRenderTemplates() {
        $classes = ClassInfo::ancestry($this->ClassName);
        $classes[self::class] = self::class;
        $classes = array_reverse($classes);
        $templates = array();
        foreach($classes as $key => $value) {
            $templates[] = $value;
            $templates[] = 'elements/' . DataObjectPreviewController::stripNamespacing($value);
            $templates[] = DataObjectPreviewController::stripNamespacing($value);
            if ($value == BaseElement::class) break;
        }
        return $templates;
    }

    public function SimpleClassName() {
        return DataObjectPreviewController::stripNamespacing($this->ClassName);
    }

    public function getPage($discard_virtualisation = false)
    {

        // used on
        if (!$discard_virtualisation && $this->virtualOwner) {
            return $this->virtualOwner->getPage();
        }

        // discard_virtualisation used when we need to link back to the
        // original items page
        if ($discard_virtualisation && $this instanceof ElementVirtualLinked) {
            return $this->LinkedElement()->getPage(true);
        }

        // if this element belongs to a list return the list's page
        if ($this->ListID) {
            return $this->List()->getPage();
        }

        // return the elemental area's page
        $area = $this->Parent();
        if ($area instanceof ElementalArea) {
            return $area->getOwnerPage();
        }

        return null;
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
        $html = DBHTMLText::create('UsageSummary');
        $html->setValue(implode('<br>', $arr));

        return $html;
    }

    public function Link()
    {
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
            urlencode($this->ClassName),
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
            singleton(CMSPageEditController::class)->Link('EditForm'),
            $this->getPage(true)->ID,
            'field/ElementalArea/item/',
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

    /**
     * @return string
     */
    public function getEditLink()
    {
        return $this->CMSEditLink();
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
        $html = new DBHTMLText('ParentCMSEditLink');
        if ($this->ListID) {
            $html->setValue('<a href="' . $this->List()->CMSEditLink() . '">' . $this->List()->Title . '</a>');
        } elseif ($page = $this->getPage()) {
            $html->setValue('<a href="' . $page->CMSEditLink() . '">' . $page->Title . '</a>');
        }
        return $html;
    }

    /**
     * TODO: check is required for new version of the module
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
     * Has to be applied here, rather than BaseElement so that it goes against Element
     * TODO: check if required
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

    public function ElementIcon() {
        $icon = $this->config()->get('icon');
        return DBField::create_field('HTMLVarchar', '<img width="16px" src="' . Director::absoluteBaseURL() . $icon . '" alt="" />');
    }
}
