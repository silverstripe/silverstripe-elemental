<?php
namespace DNADesign\Elemental\Tests\Behat\Context;

use Behat\Behat\Hook\Scope\BeforeScenarioScope;
use Behat\Mink\Element\NodeElement;
use PHPUnit\Framework\Assert;
use SilverStripe\BehatExtension\Context\BasicContext;
use SilverStripe\BehatExtension\Context\SilverStripeContext;
use SilverStripe\Framework\Tests\Behaviour\CmsFormsContext;

if (!class_exists(SilverStripeContext::class)) {
    return;
}

class FeatureContext extends SilverStripeContext
{
    /**
     * @var CmsFormsContext
     */
    protected $cmsContext;

    /**
     * @var BasicContext
     */
    protected $basicContext;


    /** @BeforeScenario */
    public function gatherContexts(BeforeScenarioScope $scope)
    {
        $this->cmsContext = $scope->getEnvironment()->getContext(CmsFormsContext::class);
        $this->basicContext = $scope->getEnvironment()->getContext(BasicContext::class);
    }

    /**
     * @Then /^I should( not |\s+)see the edit form for block (\d+)$/i
     */
    public function iShouldSeeTheEditFormForBlock($negative, $position)
    {
        $iShouldNotSee = $negative === ' not ';

        $block = $this->getSpecificBlock($position);

        $form = $block->find('css', '.element-editor-editform');

        if ($iShouldNotSee) {
            Assert::assertTrue(!$form || !$form->isVisible(), 'I see the form! Try again later.');
        } else {
            Assert::assertNotNull($form, 'Edit form not found');
            Assert::assertTrue($form->isVisible());
        }
    }

    /**
     * @Then /^I (?:should\s)?see a list of blocks$/i
     */
    public function iShouldSeeAListOfBlocks()
    {
        Assert::assertNotEmpty($this->getBlocks());
    }

    /**
     * @Then /^I (?:should\s)?see an empty list of blocks$/i
     */
    public function iShouldSeeAnEmptyListOfBlocks()
    {
        Assert::assertEmpty($this->getBlocks());
    }

    /**
     * @Then I should see block :position
     */
    public function iShouldSeeBlock($position)
    {
        Assert::assertNotNull($this->getSpecificBlock($position));
    }

    /**
     * @When /^I click on block (\d+)(?:\sagain)?$/i
     */
    public function iClickOnBlock($position)
    {
        $block = $this->getSpecificBlock($position);
        Assert::assertNotNull($block, 'Block ' . $position . ' was not found in the page.');
        $block->click();
    }

    /**
     * @When /^I click on the caret button for block (\d+)(?:\sagain)?$/i
     */
    public function iClickOnTheCaretButtonForBlock($position)
    {
        $block = $this->getSpecificBlock($position);
        $button = $this->getCaretButton($block);
        Assert::assertNotNull($button, 'Caret button for block ' . $position . ' was not found in the page.');
        $button->click();
    }

    /**
     * @Then I should see :text as the title for block :position
     */
    public function iShouldSeeAsTheTitleForBlock($text, $position)
    {
        $block = $this->getSpecificBlock($position);
        $title = $block->find('css', '.element-editor-header__title');
        Assert::assertEquals($title->getText(), $text);
    }

    /**
     * @Then I should see :text as the summary for block :position
     */
    public function iShouldSeeAsTheSummaryForBlock($text, $position)
    {
        $block = $this->getSpecificBlock($position);
        $summary = $block->find('css', '.element-editor-summary__content');
        Assert::assertEquals($summary->getText(), $text);
    }

    /**
     * @Then I should see the archive button for block :position
     *
     * @param int $position
     */
    public function iShouldSeeArchiveButtonForBlock($position)
    {
        $this->getArchiveButton($position);
    }

    /**
     * @Then /^I should( not |\s+)see the publish button for block (\d+)$/i
     *
     * @param string $negative
     * @param int $position
     *
     */
    public function iShouldSeeThePublishButtonForBlock($negative, $position)
    {
        $iShouldNotSee = $negative === ' not ';

        $publishButton = $this->findPublishButton($position);

        if ($iShouldNotSee) {
            Assert::assertNull($publishButton, 'Publish button displayed (but shouldn\'t)');
        } else {
            Assert::assertNotNull($publishButton, 'Publish button not displayed (but should be)');
        }
    }

    /**
     * @Then /^I should( not |\s+)see the unpublish button for block (\d+)$/i
     *
     * @param string $negative
     * @param int $position
     */
    public function iShouldSeeTheUnpublishButtonForBlock($negative, $position)
    {
        $iShouldNotSee = $negative === ' not ';

        $unpublishButton = $this->findUnpublishButton($position);

        if ($iShouldNotSee) {
            Assert::assertNull($unpublishButton, 'Unpublish button displayed (but shouldn\'t)');
        } else {
            Assert::assertNotNull($unpublishButton, 'Unpublish button not displayed (but should be)');
        }
    }

    /**
     * @When I hover over block :position
     *
     * @param int $position
     */
    public function iHoverOverBlock($position)
    {
        $block = $this->getSpecificBlock($position);
        Assert::assertNotNull($block, 'Block ' . $position . ' was not found in the page.');
        $block->mouseOver();
    }

    /**
     * @When I hover over the icon of block :position
     *
     * @param int $position
     */
    public function iHoverOverTheIconOfBlock($position)
    {
        $block = $this->getSpecificBlock($position);
        Assert::assertNotNull($block, 'Block ' . $position . ' was not found in the page.');
        $icon = $block->find(
            'css',
            '.element-editor-header .element-editor-header__info .element-editor-header__icon-container'
        );
        $icon->mouseOver();
    }

    /**
     * @Given /^I press the "([^"]*)" button in the add block popover$/
     * @param string $text
     */
    public function stepIPressTheButtonInTheAddBlockPopover($text)
    {
        $popover = $this->getSession()->getPage()->find('css', '.popover-option-set');

        $blockType = strtolower($text);

        // Selector preferable not font-icon, but other class shared among all buttons
        $button = $popover->find('css', '.font-icon-block-'. $blockType);
        Assert::assertNotNull($button, "{$text} button not found in Add Block popover");
        $button->click();
    }

    /**
     * @Given /^I press the "([^"]*)" button in the actions? menu for block (\d+)$/
     */
    public function stepIPressTheButtonInTheActionMenuForBlock($buttonName, $blockNumber)
    {
        $block = $this->getSpecificBlock($blockNumber);

        // Check if the popover is open for the block
        $popover = $block->find('css', '.action-menu__dropdown');
        if (!$popover->isVisible()) {
            $block->find('css', '.element-editor-header__actions-toggle')->click();
        }

        $button = $popover->find('xpath', sprintf('/button[contains(text(), \'%s\')]', $buttonName));

        Assert::assertNotNull($button, sprintf('Could not find button labelled "%s"', $buttonName));

        $button->click();
    }

    /**
     * @Given /^I fill in "([^"]*)" for "([^"]*)" for block (\d+)$/
     */
    public function stepIFillInForForBlock($value, $name, $blockNumber)
    {
        $block = $this->getSpecificBlock($blockNumber);
        $field = $this->findFieldInBlock($block, $name);
        $fieldName = $field->getAttribute('name');

        $isTinyMCE = $field->getAttribute('data-editor') === 'tinyMCE';

        if ($isTinyMCE) {
            $this->cmsContext->stepIFillInTheHtmlFieldWith($fieldName, $value);
        } else {
            $this->basicContext->iFillinTheRegion($fieldName, $value, 'html');
        }
    }

    /**
     * @Given /^the "([^"]*)" field for block (\d+) should (not\s*)?contain "([^"]*)"$/
     */
    public function theFieldForBlockShouldContain($field, $blockNumber, $negate, $content)
    {
        $block = $this->getSpecificBlock($blockNumber);
        $field = $this->findFieldInBlock($block, $field);
        $isTinyMCE = $field->getAttribute('data-editor') === 'tinyMCE';

        if ($isTinyMCE) {
            $this->cmsContext->theHtmlFieldShouldContain(
                $field->getAttribute('name'),
                $negate,
                $content
            );
        } elseif ($negate) {
            $this->assertFieldNotContains($field, $content);
        } else {
            $this->assertFieldContains($field, $content);
        }
    }

    /**
     * @When I click on the :reportName report
     */
    public function iClickOnTheReport($reportName)
    {
        $reportsTable = $this->getSession()->getPage()->find('css', '.all-reports-gridfield .grid-field__table');
        Assert::assertNotNull($reportsTable, 'Report table could not be found');

        $report = $reportsTable->find('xpath', sprintf('//a[contains(text(), \'%s\')]', $reportName));
        Assert::assertNotNull($report, 'Specified report "' . $reportName . '" could not be found.');

        $report->click();

        // Wait for the report to load
        $this->getSession()->wait(5000, 'window.jQuery(".all-reports-gridfield").length === 0');
    }

    /**
     * @When I click on the add block button in hover bar area for block :position
     */
    public function iClickOnHoverBarButton($position)
    {
        $hoverBarButton = $this->getSpecificHoverBar($position);
        $hoverBarButton->click();
    }

    /**
     * Returns the blocks from the element editor
     *
     * @param string $modifier Optional CSS selector modifier
     * @return NodeElement[]
     */
    protected function getBlocks($modifier = '')
    {
        // Wait for the list to be visible
        $this->getSession()->wait(5000, 'window.jQuery(".element-editor .elemental-editor__list").length > 0');

        // Wait for blocks to be rendered
        $this->getSession()->wait(5000, 'window.jQuery(".element-editor__element").length > 0');

        return $this->getSession()
            ->getPage()
            ->findAll('css', '.element-editor__element' . $modifier);
    }
    /**
     * Returns the selected element
     *
     * @param int $position
     * @return NodeElement
     */
    protected function getSpecificBlock($position)
    {
        $blocks = $this->getBlocks();
        /** @var NodeElement $block */
        if ($blocks[$position - 1] !== false) {
            return $blocks[$position - 1];
        }
    }

    /**
     * Returns the archive button for a specific block
     *
     * @param int $position
     * @return NodeElement
     */
    protected function getArchiveButton($position)
    {
        $block = $this->getSpecificBlock($position);
        Assert::assertNotNull($block, 'Block ' . $position . ' was not found in the page.');

        $button = $block->find('css', '.element-editor__actions-archive');
        Assert::assertNotNull($button, 'Archive button not found');

        return $button;
    }

    /**
     * Returns the publish button for a specific block if it exists
     *
     * @param int $position
     * @return NodeElement|null
     */
    protected function findPublishButton($position)
    {
        $block = $this->getSpecificBlock($position);
        Assert::assertNotNull($block, 'Block ' . $position . ' was not found in the page.');

        $button = $block->find('css', '.element-editor__actions-publish');

        return $button;
    }

    /**
     * Returns the unpublish button for a specific block if it exists
     *
     * @param $position
     * @return NodeElement|null
     */
    protected function findUnpublishButton($position)
    {
        $block = $this->getSpecificBlock($position);
        Assert::assertNotNull($block, 'Block ' . $position . ' was not found in the page.');

        $button = $block->find('css', '.element-editor__actions-unpublish');

        return $button;
    }

    /**
     * Returns the caret button for a specific block
     *
     * @param NodeElement $block
     * @return NodeElement
     */
    protected function getCaretButton($block)
    {
        $button = $block->find('css', '.element-editor-header__expand');
        Assert::assertNotNull($button, 'Caret button not found');

        return $button;
    }

    /**
     * @param $block
     * @param $name
     * @return mixed
     */
    protected function findFieldInBlock($block, $name)
    {
        $label = $block->findAll('xpath', sprintf('//label[contains(text(), \'%s\')]', $name));

        Assert::assertNotCount(0, $label, sprintf('Could not find a label for a field with the content "%s"', $name));
        Assert::assertCount(
            1,
            $label,
            sprintf(
                'Found more than one label containing the phrase "%s".',
                $name
            )
        );

        $label = array_shift($label);

        $fieldId = $label->getAttribute('for');
        $field = $block->find('css', '#' . $fieldId);

        Assert::assertNotNull($field, sprintf(
            'Label found matching "%s" but there was no field that has the ID matching the "for" attribute ("#%s")',
            $name,
            $fieldId
        ));

        return $field;
    }

    /**
     * Returns the selected hover bar element
     *
     * @param int $position
     * @return NodeElement
     */
    protected function getSpecificHoverBar($position)
    {
        $hoverBarAreas = $this->getSession()
            ->getPage()
            ->findAll('css', '.element-editor__hover-bar-area');

        /** @var NodeElement $hoverBarAreas */
        if ($hoverBarAreas[$position] !== false) {
            return $hoverBarAreas[$position];
        }
    }
}
