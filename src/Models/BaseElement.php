<?php

namespace DNADesign\Elemental\Models;

use Exception;
use DNADesign\Elemental\Controllers\ElementController;
use SilverStripe\CMS\Controllers\CMSPageEditController;
use SilverStripe\Control\Controller;
use SilverStripe\Control\Director;
use SilverStripe\Core\ClassInfo;
use SilverStripe\Core\Config\Config;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Core\Manifest\ModuleResourceLoader;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\DropdownField;
use SilverStripe\Forms\FieldGroup;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\HiddenField;
use SilverStripe\Forms\NumericField;
use SilverStripe\Forms\ReadonlyField;
use SilverStripe\Forms\TextField;
use SilverStripe\ORM\ArrayList;
use SilverStripe\ORM\CMSPreviewable;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\DB;
use SilverStripe\ORM\FieldType\DBField;
use SilverStripe\ORM\Search\SearchContext;
use SilverStripe\Security\Permission;
use SilverStripe\SiteConfig\SiteConfig;
use SilverStripe\Versioned\Versioned;
use SilverStripe\View\Parsers\URLSegmentFilter;
use SilverStripe\View\SSViewer;
use VersionViewerDataObject;

class BaseElement extends DataObject implements CMSPreviewable
{
    /**
     * Override this on your custom elements to specify a cms icon
     * @var string
     */
    private static $icon = 'dnadesign/silverstripe-elemental:images/base.svg';

    private static $db = [
        'Title' => 'Varchar(255)',
        'ShowTitle' => 'Boolean',
        'Sort' => 'Int',
        'ExtraClass' => 'Varchar(255)'
    ];

    private static $has_one = [
        'Parent' => ElementalArea::class
    ];

    private static $extensions = [
        Versioned::class
    ];

    private static $table_name = 'Element';

    /**
     * @var string
     */
    private static $controller_class = ElementController::class;

    /**
     * @var string
     */
    private static $controller_template = 'ElementHolder';

    /**
     * @var ElementController
     */
    protected $controller;

    private static $default_sort = 'Sort';

    private static $singular_name = 'block';

    private static $plural_name = 'blocks';

    private static $summary_fields = [
        'EditorPreview' => 'Summary'
    ];

    private static $searchable_fields = [
        'ID' => [
            'field' => NumericField::class,
        ],
        'Title',
        'LastEdited'
    ];

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
    protected static $_used_anchors = [];

    /**
     * For caching 'getAnchor'
     *
     * @var string
     */
    protected $_anchor = null;

    /**
     * @return array
     */
    public function getAllowedElementClasses()
    {
        $classes = [];

        foreach (ClassInfo::subclassesFor(DataObject::class) as $className) {
            if (Injector::inst()->get($className)->hasExtension(ElementPageExtension::class)) {
                $classes[] = $className;
            }
        }

        $allowed = [];

        foreach ($classes as $className) {
            $elements = Config::inst()->get($className, 'allowed_elements');

            if ($elements) {
                $allowed = array_merge($allowed, $elements);
            }
        }

        $allowed = array_unique($allowed);

        $elements = [];

        foreach ($allowed as $className) {
            $elements[$className] = _t($className, Config::inst()->get($className, 'title'));
        }

        $this->invokeWithExtensions('updateAllowedElementClasses', $elements);

        return $elements;
    }

    /**
     * Basic permissions, defaults to page perms where possible.
     *
     * @param Member $member
     *
     * @return boolean
     */
    public function canView($member = null)
    {
        if ($this->hasMethod('getPage')) {
            if ($page = $this->getPage()) {
                return $page->canView($member);
            }
        }

        return (Permission::check('CMS_ACCESS', 'any', $member)) ? true : null;
    }

    /**
     * Basic permissions, defaults to page perms where possible.
     *
     * @param Member $member
     *
     * @return boolean
     */
    public function canEdit($member = null)
    {
        if ($this->hasMethod('getPage')) {
            if ($page = $this->getPage()) {
                return $page->canEdit($member);
            }
        }

        return (Permission::check('CMS_ACCESS', 'any', $member)) ? true : null;
    }

    /**
     * Basic permissions, defaults to page perms where possible.
     *
     * Uses archive not delete so that current stage is respected i.e if a
     * element is not published, then it can be deleted by someone who doesn't
     * have publishing permissions.
     *
     * @param Member $member
     *
     * @return boolean
     */
    public function canDelete($member = null)
    {
        if ($this->hasMethod('getPage')) {
            if ($page = $this->getPage()) {
                return $page->canArchive($member);
            }
        }

        return (Permission::check('CMS_ACCESS', 'any', $member)) ? true : null;
    }

    /**
     * Basic permissions, defaults to page perms where possible.
     *
     * @param Member $member
     * @param array $context
     *
     * @return boolean
     */
    public function canCreate($member = null, $context = array())
    {
        return (Permission::check('CMS_ACCESS', 'any', $member)) ? true : null;
    }

    /**
     *
     */
    public function onBeforeWrite()
    {
        parent::onBeforeWrite();

        if ($areaID = $this->ParentID) {
            if ($elementalArea = ElementalArea::get()->byID($areaID)) {
                $elementalArea->write();
            }
        }

        if (!$this->Sort) {
            $parentID = ($this->ParentID) ? $this->ParentID : 0;

            $this->Sort = static::get()->max('Sort') + 1;
        }
    }

    public function getCMSFields()
    {
        $this->beforeUpdateCMSFields(function (FieldList $fields) {
            // Remove relationship fields
            $fields->removeByName('ParentID');
            $fields->removeByName('Sort');

            $fields->addFieldToTab(
                'Root.Settings',
                TextField::create('ExtraClass', _t(__CLASS__ . '.ExtraCssClassesLabel', 'Custom CSS classes'))
                    ->setAttribute(
                        'placeholder',
                        _t(__CLASS__ . '.ExtraCssClassesPlaceholder', 'my_class another_class')
                    )
            );

            // Add a combined field for "Title" and "Displayed" checkbox in a Bootstrap input group
            $fields->removeByName('ShowTitle');
            $fields->replaceField(
                'Title',
                FieldGroup::create(
                    TextField::create('Title', ''),
                    CheckboxField::create('ShowTitle', _t(__CLASS__ . '.ShowTitleLabel', 'Displayed'))
                )
                    ->setTemplate(__CLASS__ . '\\FieldGroup')
                    ->setTitle(_t(__CLASS__ . '.TitleLabel', 'Title (not displayed unless specified)'))
            );

            // Rename the "Main" tab
            $fields->fieldByName('Root.Main')
                ->setTitle(_t(__CLASS__ . '.MainTabLabel', 'Content'));

            // Remove divider lines on all block forms
            $fields->fieldByName('Root')->addExtraClass('form--no-dividers');

            if ($this->isInDB()) {
                if ($this->hasExtension(VersionViewerDataObject::class)) {
                    $fields = $this->addVersionViewer($fields, $this);
                }
            }

            $fields->addFieldsToTab('Root.Main', [
                HiddenField::create('AbsoluteLink', false, Director::absoluteURL($this->PreviewLink())),
                HiddenField::create('LiveLink', false, Director::absoluteURL($this->Link())),
                HiddenField::create('StageLink', false, Director::absoluteURL($this->PreviewLink())),
            ]);
        });

        return parent::getCMSFields();
    }

    /**
     * Used in ElementalAdmin
     */
    public function getDefaultSearchContext()
    {
        $fields = $this->scaffoldSearchFields();
        $elements = BaseElement::all_allowed_elements();

        if (!$elements) {
            $elements = ClassInfo::subclassesFor(self::class);
        }
        foreach ($elements as $key => $value) {
            if ($key == self::class) {
                unset($elements[$key]);
                continue;
            }
            $elements[$key] = $this->stripNamespacing($value);
        }

        $fields->push(
            DropdownField::create('ClassName', _t(__CLASS__.'.ELEMENTTYPE', 'Element Type'), $elements)
                ->setEmptyString(_t(__CLASS__.'.ALL', 'All types'))
        );

        $filters = $this->owner->defaultSearchFilters();

        return new SearchContext(
            self::class,
            $fields,
            $filters
        );
    }

    /**
     * Get the type of the current block, for use in GridField summaries, block type dropdowns etc. Examples
     * are "Content", "File", "Media", etc.
     *
     * @return string
     */
    public function getType()
    {
        return _t(__CLASS__ . '.BlockType', 'Block');
    }

    /**
     * @param ElementController
     *
     * @return $this
     */
    public function setController($controller)
    {
        $this->controller = $controller;

        return $this;
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

    /**
     * @return Controller
     */
    public function Top()
    {
        return (Controller::has_curr()) ? Controller::curr() : null;
    }

    /**
     * Default way to render element in templates. Note that all blocks should
     * be rendered through their {@link ElementController} class as this
     * contains the holder styles.
     *
     * @return string HTML
     */
    public function forTemplate($holder = true)
    {
        $templates = $this->getRenderTemplates();

        if ($templates) {
            return $this->renderWith($templates);
        }
    }

    /**
     * @param string $suffix
     *
     * @return array
     */
    public function getRenderTemplates($suffix = '')
    {
        $classes = ClassInfo::ancestry($this->ClassName);
        $classes[static::class] = static::class;
        $classes = array_reverse($classes);
        $templates = array();

        foreach ($classes as $key => $value) {
            if ($value == BaseElement::class) {
                continue;
            }

            if ($value == DataObject::class) {
                break;
            }

            $templates[] = $value . $suffix;
        }

        return $templates;
    }

    /**
     * Strip all namespaces from class namespace
     * @param string $classname e.g. "\Fully\Namespaced\Class"
     *
     * @return string following the param example, "Class"
     */
    protected function stripNamespacing($classname)
    {
        $classParts = explode('\\', $classname);
        return array_pop($classParts);
    }

    /**
     * @return string
     */
    public function getSimpleClassName()
    {
        return strtolower($this->sanitiseClassName($this->ClassName, '__'));
    }

    /**
     * @return SiteTree
     */
    public function getPage()
    {
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
            } elseif ($this->config()->enable_title_in_template) {
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
     * @param string $action
     *
     * @return string
     */
    public function AbsoluteLink($action = null)
    {
        if ($page = $this->getPage()) {
            $link = $page->AbsoluteLink($action) . '#' . $this->getAnchor();

            return $link;
        }
    }

    /**
     * @param string $action
     *
     * @return string
     */
    public function Link($action = null)
    {
        if ($page = $this->getPage()) {
            $link = $page->Link($action) . '#' . $this->getAnchor();

            $this->extend('updateLink', $link);

            return $link;
        }
    }

    /**
     * @param string $action
     *
     * @return string
     */
    public function PreviewLink($action = null)
    {
        $action = $action . '?ElementalPreview=' . mt_rand();
        $link = $this->Link($action);
        $this->extend('updatePreviewLink', $link);

        return $link;
    }

    /**
     * @return boolean
     */
    public function isCMSPreview()
    {
        if (Controller::has_curr()) {
            $c = Controller::curr();

            if ($c->getRequest()->requestVar('CMSPreview')) {
                return true;
            }
        }

        return false;
    }

    /**
     * @return string
     */
    public function CMSEditLink()
    {
        $relationName = $this->getAreaRelationName();

        $link = Controller::join_links(
            singleton(CMSPageEditController::class)->Link('EditForm'),
            $this->getPage(true)->ID,
            'field/' . $relationName . '/item/',
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
     * Retrieve a elemental area relation for creating cms links
     *
     * @return string - the name of a valid elemental area relation
     */
    public function getAreaRelationName()
    {
        $page = $this->getPage(true);
        $has_one = $page->config()->get('has_one');
        $area = $this->Parent();

        foreach ($has_one as $relationName => $relationClass) {
            if ($relationClass === $area->ClassName) {
                return $relationName;
            }
        }

        return 'ElementalArea';
    }

    /**
     * Sanitise a model class' name for inclusion in a link.
     *
     * @return string
     */
    protected function sanitiseClassName($class, $delimiter = '-')
    {
        return str_replace('\\', $delimiter, $class);
    }

    /**
     * @return string
     */
    public function getEditLink()
    {
        return $this->CMSEditLink();
    }

    /**
     * @return HTMLText
     */
    public function PageCMSEditLink()
    {
        if ($page = $this->getPage()) {
            return DBField::create_field('HTMLText', sprintf(
                '<a href="%s">%s</a>',
                $page->CMSEditLink(),
                $page->Title
            ));
        }
    }

    /**
     * @return string
     */
    public function getMimeType()
    {
        return 'text/html';
    }

    /**
     * This can be overridden on child elements to create a summary for display
     * in GridFields.
     *
     * @return string
     */
    public function getSummary()
    {
        return '';
    }


    /**
     * Generate markup for element type icons suitable for use in GridFields.
     *
     * @return DBField
     */
    public function getIcon()
    {
        $icon = $this->config()->get('icon');

        if ($icon) {
            $icon = ModuleResourceLoader::resourceURL($icon);

            return DBField::create_field('HTMLVarchar', '<img width="16px" src="' . Director::absoluteBaseURL() . $icon . '" alt="" />');
        }
    }

    /**
     * Generate markup for element type, with description suitable for use in
     * GridFields.
     *
     * @return DBField
     */
    public function getTypeNice()
    {
        $description = $this->config()->get('description');

        return DBField::create_field(
            'HTMLVarchar',
            $this->getType() . ' <span class="el-description"> &mdash; ' . $description . '</span>'
        );
    }

    /**
     * @return HTMLText
     */
    public function getEditorPreview()
    {
        $templates = $this->getRenderTemplates('_EditorPreview');
        $templates[] = BaseElement::class . '_EditorPreview';

        return $this->renderWith($templates);
    }
}
