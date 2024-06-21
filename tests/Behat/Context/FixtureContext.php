<?php
namespace DNADesign\Elemental\Tests\Behat\Context;

use DNADesign\Elemental\Models\BaseElement;
use DNADesign\Elemental\Models\ElementalArea;
use DNADesign\Elemental\Models\ElementContent;
use PHPUnit\Framework\Assert;
use SilverStripe\CMS\Tests\Behaviour\FixtureContext as BaseFixtureContext;
use SilverStripe\Core\ClassInfo;
use SilverStripe\ORM\DB;
use SilverStripe\ORM\Queries\SQLInsert;
use SilverStripe\FrameworkTest\Elemental\Model\ElementalSearchableFieldsBlock;

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
     * @Given /a "([^"]+)" "([^"]+)" with a "([^"]+)" element titled "([^"]+)"/
     *
     * e.g. Given a "page" "My page" with a "My\App\MyBlock" element titled "Some block"
     *
     * @param string $type - will be converted to a class name
     * @param string $pageTitle
     * @param string $elementClass
     * @param string $elementTitle
     */
    public function theDataObjectWithAnElement($type, $pageTitle, $elementClass, $elementTitle)
    {
        $elementalArea = $this->getElementalArea($type, $pageTitle);
        $elementalArea->Elements()->add(
            $this->getFixtureFactory()->createObject($elementClass, $elementTitle)
        );
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

    /**
     * The method is copied from asset-admin SilverStripe\AssetAdmin\Tests\Behat\Context\FixtureContext
     * Behat does not seem to allow two different FixtureContext files to be added in the
     * same behat.yml config file
     *
     * Select a gallery item by type and name
     *
     * @Given /^I (?:(?:click on)|(?:select)) the (?:file|folder) named "([^"]+)" in the gallery$/
     * @param string $name
     */
    public function stepISelectGalleryItem($name)
    {
        $item = $this->getGalleryItem($name);
        Assert::assertNotNull($item, "File named $name could not be found");
        $item->click();
    }

    /**
     * The method is copied from asset-admin SilverStripe\AssetAdmin\Tests\Behat\Context\FixtureContext
     * Behat does not seem to allow two different FixtureContext files to be added in the
     * same behat.yml config file
     *
     * Helper for finding items in the visible gallery view
     *
     * @param string $name Title of item
     * @param int $timeout
     * @return NodeElement
     */
    protected function getGalleryItem($name, $timeout = 3)
    {
        /** @var DocumentElement $page */
        $page = $this->getMainContext()->getSession()->getPage();
        // Find by cell
        $cell = $page->find(
            'xpath',
            "//div[contains(@class, 'gallery-item')]//div[contains(text(), '{$name}')]"
        );
        if ($cell) {
            return $cell;
        }
        // Find by row
        $row = $page->find(
            'xpath',
            "//tr[contains(@class, 'gallery__table-row')]//div[contains(text(), '{$name}')]"
        );
        if ($row) {
            return $row;
        }
        return null;
    }
}
