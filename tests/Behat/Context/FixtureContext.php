<?php
namespace DNADesign\Elemental\Tests\Behat\Context;

use DNADesign\Elemental\Models\ElementContent;
use SilverStripe\BehatExtension\Context\FixtureContext as BaseFixtureContext;

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
}
