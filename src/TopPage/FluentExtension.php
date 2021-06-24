<?php

namespace DNADesign\Elemental\TopPage;

use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementalArea;
use Page;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\Queries\SQLUpdate;
use TractorCow\Fluent\State\FluentState;

/**
 * Class FluentExtension
 *
 * Use in place of @see DataExtension if you use the Fluent module for page localisation.
 * Be sure to also update @see TestState to use this extension
 *
 * @link https://github.com/tractorcow-farm/silverstripe-fluent
 * @property string $TopPageLocale
 * @property BaseElement|ElementalArea|$this $owner
 * @package DNADesign\Elemental\TopPage
 */
class FluentExtension extends DataExtension
{
    /**
     * @var array
     */
    private static $db = [
        'TopPageLocale' => 'Varchar',
    ];

    /*
     * @inheritdoc
     */
    protected function assignTopPage(Page $page): void
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
        /** @var DataObject|FluentExtension $owner */
        $owner = $this->owner;
        $extraData['"TopPageLocale"'] = $owner->TopPageLocale;

        parent::saveChanges($extraData);
    }
}
