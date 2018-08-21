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
     * @Given /(?:the|a) "([^"]+)" "([^"]+)" (?:with|has) a "([^"]+)" content element with "([^"]+)" content/
     *
     * @param string $pageTitle
     * @param string $type
     * @param string $elementTitle
     * @param string $elementContent
     */
    public function theHasAContentElementWithContent($type, $pageTitle, $elementTitle, $elementContent)
    {
        // Create the page (ElementalArea is created on write and attached to it)
        $targetClass = $this->convertTypeToClass($type);

        $page = $this->getFixtureFactory()->get($targetClass, $pageTitle);
        if (!$page) {
            $page = $this->getFixtureFactory()->createObject($targetClass, $pageTitle);
        }

        $elementalArea = $page->ElementalArea();
        $elementalArea->Elements()->add($this->getFixtureFactory()->createObject(ElementContent::class, $elementTitle));

        // Create element
        $element = $this->getFixtureFactory()->get(ElementContent::class, $elementTitle);

        if ($element) {
            $element->HTML = $elementContent;
            $element->write();
        } else {
            $element = $this->getFixtureFactory()->createObject(ElementContent::class, $elementTitle, $fields);
            $element->write();
        }
    }
}
