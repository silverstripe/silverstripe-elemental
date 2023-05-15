<?php
namespace DNADesign\Elemental\Tests\Behat\Context;

use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Models\ElementContent;
use SilverStripe\BehatExtension\Context\FixtureContext as BaseFixtureContext;
use SilverStripe\Core\ClassInfo;
use SilverStripe\ORM\DB;
use SilverStripe\ORM\Queries\SQLInsert;

if (!class_exists(BaseFixtureContext::class)) {
    return;
}
/**
 * Context used to create fixtures in the SilverStripe ORM.
 */
class FixtureContext extends BaseFixtureContext
{
    /**
     * @Given /(?:the|a) "([^"]+)" "([^"]+)" (?:with|has) a "([^"]+)" content element with "(.*)" content/
     *
     * @param string $pageTitle
     * @param string $type
     * @param string $elementTitle
     * @param string $elementContent
     */
    public function theHasAContentElementWithContent($type, $pageTitle, $elementTitle, $elementContent)
    {
        $elementalArea = $this->getElementalArea($type, $pageTitle);
        $elementalArea->Elements()->add(
            $this->getFixtureFactory()->createObject(ElementContent::class, $elementTitle)
        );

        // Create element
        $element = $this->getFixtureFactory()->get(ElementContent::class, $elementTitle);

        if ($element) {
            $element->HTML = $elementContent;
            $element->write();
        } else {
            $element = $this->getFixtureFactory()->createObject(ElementContent::class, $elementTitle, [
                'Title' => $elementTitle,
                'HTML' => $elementContent
            ]);
            $element->write();
        }
    }

    /**
     * @Given /(?:the|a) "([^"]+)" "([^"]+)" (?:with|has) a broken element named "([^"]+)"/
     */
    public function thePageHasABrokenElement(string $type, string $pageTitle, string $name)
    {
        $table = singleton(BaseElement::class)->baseTable();
        $brokenClass = 'BrokenClass';
        $manager = DB::get_schema();
        // Update ClassName enum to allow the broken class name
        $manager->schemaUpdate(function () use ($manager, $table, $brokenClass) {
            //For reference, this is what typically gets passed to this function:
            $classes = ClassInfo::subclassesFor(BaseElement::class);
            $classes[] = $brokenClass;
            $parts=['enums' => $classes, 'default' => BaseElement::class];
            DB::require_field($table, 'ClassName', $manager->enum($parts));
        });

        // Add the broken element.
        $elementalArea = $this->getElementalArea($type, $pageTitle);
        $currentMaxSort = BaseElement::get()->filter('ParentID', $elementalArea->ID)->max('Sort');
        $blockData = [
            'Title' => $name,
            'ParentID' => $elementalArea->ID,
            'ClassName' => $brokenClass,
            'Sort' => $currentMaxSort + 1,
        ];
        $insert = SQLInsert::create($table, $blockData);
        $insert->execute();
    }

    /**
     * @Given content blocks are not in-line editable
     *
     * @param $elementTitle
     */
    public function contentBlocksAreNotInLineEditable()
    {
        $contentBlockClass = ElementContent::class;
        $config = <<<YAML
---
Name: testonly-content-blocks-not-inline-editable
---
$contentBlockClass:
  inline_editable: false
YAML;

        $file = 'content-blocks-not-inline-editable.yml';
        $path = $this->getDestinationConfigFolder($file);
        file_put_contents($path ?? '', $config);

        $this->activatedConfigFiles[] = $path;

        $this->getMainContext()->visit('/?flush');
    }

    protected function getElementalArea(string $type, string $pageTitle): ElementalArea
    {
        // Create the page (ElementalArea is created on write and attached to it)
        $targetClass = $this->convertTypeToClass($type);

        $page = $this->getFixtureFactory()->get($targetClass, $pageTitle);
        if (!$page) {
            $page = $this->getFixtureFactory()->createObject($targetClass, $pageTitle);
        }

        return $page->ElementalArea();
    }
}
