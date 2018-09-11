<?php
namespace DNADesign\Elemental\Tests\Behat\Context;

use Behat\Mink\Element\NodeElement;
use SilverStripe\BehatExtension\Context\SilverStripeContext;

if (!class_exists(SilverStripeContext::class)) {
    return;
}
class FeatureContext extends SilverStripeContext
{
    /**
     * @Then /^I (?:should\s)?see a list of blocks$/i
     */
    public function iShouldSeeAListOfBlocks()
    {
        assertNotEmpty($this->getBlocks());
    }

    /**
     * @Then I should see block :position
     */
    public function iShouldSeeBlock($position)
    {
        assertNotNull($this->getSpecificBlock($position));
    }

    /**
     * @When /^I click on block (\d+)(?:\sagain)?$/i
     */
    public function iClickOnBlock($position)
    {
        $block = $this->getSpecificBlock($position);
        assertNotNull($block, 'Block ' . $position . ' was not found in the page.');
        $block->click();
    }

    /**
     * @Then I should see :text as the title for block :position
     */
    public function iShouldSeeAsTheTitleForBlock($text, $position)
    {
        $block = $this->getSpecificBlock($position);
        $title = $block->find('css', '.element-editor-header__title');
        assertEquals($title->getText(), $text);
    }

    /**
     * @Then I should see :text as the summary for block :position
     */
    public function iShouldSeeAsTheSummaryForBlock($text, $position)
    {
        $block = $this->getSpecificBlock($position);
        $summary = $block->find('css', '.element-editor-summary__content');
        assertEquals($summary->getText(), $text);
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
     * @When I hover over block :position
     *
     * @param int $position
     */
    public function iHoverOverBlock($position)
    {
        $block = $this->getSpecificBlock($position);
        assertNotNull($block, 'Block ' . $position . ' was not found in the page.');
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
        assertNotNull($block, 'Block ' . $position . ' was not found in the page.');
        $icon = $block->find(
            'css',
            '.element-editor-header .element-editor-header__info .element-editor-header__icon-container'
        );
        $icon->mouseOver();
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
        $this->getSession()->wait(3000, 'window.jQuery(".element-editor .elemental-editor__list").length > 0');

        // Wait for blocks to be rendered
        $this->getSession()->wait(3000, 'window.jQuery(".element-editor__element").length > 0');

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
     * @param $position
     * @return NodeElement
     */
    protected function getArchiveButton($position)
    {
        $block = $this->getSpecificBlock($position);
        assertNotNull($block, 'Block ' . $position . ' was not found in the page.');

        $button = $block->find('css', '.element-editor__actions-archive');
        assertNotNull($button, 'Archive button not found');

        return $button;
    }
}
