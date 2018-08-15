<?php
namespace DNADesign\Elemental\Tests\Behat\Context;

use DNADesign\Elemental\Extensions\ElementalAreasExtension;
use DNADesign\Elemental\Extensions\ElementalPageExtension;
use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementContent;
use SilverStripe\BehatExtension\Context\FixtureContext as BaseFixtureContext;
use SilverStripe\BehatExtension\Utility\StepHelper;
use SilverStripe\Core\ClassInfo;
use SilverStripe\Core\Extensible;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Dev\FixtureBlueprint;
use SilverStripe\ORM\DB;
use SilverStripe\ORM\HasManyList;

if (!class_exists(BaseFixtureContext::class)) {
    return;
}
/**
 * Context used to create fixtures in the SilverStripe ORM.
 */
class FixtureContext extends BaseFixtureContext
{
    /**
     * @Given I add an extension :extension to the :class class
     */
    public function iAddAnExtensionToTheClass($extension, $class)
    {
        $targetClass = $this->convertTypeToClass($class);
        $targetClass::add_extension(ElementalPageExtension::class);
    }
}
