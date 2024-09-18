<?php

namespace DNADesign\Elemental\TopPage;

use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementalArea;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\Queries\SQLUpdate;
use TractorCow\Fluent\State\FluentState;
use SilverStripe\Forms\FieldList;
use SilverStripe\Dev\Deprecation;

/**
 * Class FluentExtension
 *
 * Use in place of @see DataExtension if you use the Fluent module for page localisation.
 *
 * @link https://github.com/tractorcow-farm/silverstripe-fluent
 * @property string $TopPageLocale
 *
 * @extends DataExtension<DataObject&static>
 *
 * @deprecated 5.4.0 Will be replaced with DNADesign\Elemental\Extensions\TopPageFluentElementExtension
 */
class FluentExtension extends DataExtension
{
    /**
     * @var array
     */
    private static $db = [
        'TopPageLocale' => 'Varchar',
    ];

    public function __construct()
    {
        Deprecation::withSuppressedNotice(function () {
            Deprecation::notice(
                '5.4.0',
                'Will be replaced with DNADesign\Elemental\Extensions\TopPageFluentElementExtension',
                Deprecation::SCOPE_CLASS
            );
        });
    }

    public function updateCMSFields(FieldList $fields)
    {
        $fields->removeByName('TopPageID');
        $fields->removeByName('TopPageLocale');
    }

    /*
     * @inheritdoc
     */
    protected function assignTopPage(SiteTree $page): void
    {
        parent::assignTopPage($page);

        $this->owner->TopPageLocale = FluentState::singleton()->getLocale();
    }

    /*
     * @inheritdoc
     */
    protected function clearTopPage(): void
    {
        parent::clearTopPage();

        $this->owner->TopPageLocale = null;
    }

    /*
     * @inheritdoc
     */
    protected function assignFixedTopPage(): void
    {
        parent::assignFixedTopPage();

        $this->owner->TopPageLocale = FluentState::singleton()->getLocale();
    }

    /*
     * @inheritdoc
     */
    protected function saveChanges(array $extraData = []): void
    {
        $extraData['"TopPageLocale"'] = $this->owner->TopPageLocale;

        parent::saveChanges($extraData);
    }
}
