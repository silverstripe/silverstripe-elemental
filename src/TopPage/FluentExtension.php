<?php

namespace DNADesign\Elemental\TopPage;

use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementalArea;
use Page;
use TractorCow\Fluent\State\FluentState;

/**
 * Class FluentExtension
 *
 * Use in place of @see DataExtension if you use the Fluent module for page localisation.
 *
 * @link https://github.com/tractorcow-farm/silverstripe-fluent
 *
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

    /**
     * Assigns top page relation and stores reference for page locale
     *
     * @param Page $page
     */
    protected function assignTopPage(Page $page): void
    {
        parent::assignTopPage($page);

        $this->owner->TopPageLocale = FluentState::singleton()->getLocale();
    }

    protected function clearTopPage(): void
    {
        parent::clearTopPage();

        $this->owner->TopPageLocale = null;
    }
}
