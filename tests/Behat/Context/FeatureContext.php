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
     * @Then /^I should( not |\s+)see the edit form for block (\d+)$/i
     */
    public function iShouldSeeTheEditFormForBlock($negative, $position)
    {
        $iShouldNotSee = $negative === ' not ';

        $block = $this->getSpecificBlock($position);

        $form = $block->find('css', '.element-editor-editform');

        if ($iShouldNotSee) {
            assertTrue(!$form || !$form->isVisible(), 'I see the form! Try again later.');
        } else {
            assertNotNull($form, 'Edit form not found');
            assertTrue($form->isVisible());
        }
    }

    /**
     * @Then /^I (?:should\s)?see a list of blocks$/i
     */
    public function iShouldSeeAListOfBlocks()
    {
        assertNotEmpty($this->getBlocks());
    }

    /**
     * @Then /^I (?:should\s)?see an empty list of blocks$/i
     */
    public function iShouldSeeAnEmptyListOfBlocks()
    {
        assertEmpty($this->getBlocks());
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
     * @When /^I click on the caret button for block (\d+)(?:\sagain)?$/i
     */
    public function iClickOnTheCaretButtonForBlock($position)
    {
        $block = $this->getSpecificBlock($position);
        $button = $this->getCaretButton($block);
        assertNotNull($button, 'Caret button for block ' . $position . ' was not found in the page.');
        $button->click();
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
            assertNull($publishButton, 'Publish button displayed (but shouldn\'t)');
        } else {
            assertNotNull($publishButton, 'Publish button not displayed (but should be)');
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
            assertNull($unpublishButton, 'Unpublish button displayed (but shouldn\'t)');
        } else {
            assertNotNull($unpublishButton, 'Unpublish button not displayed (but should be)');
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
     * @Given /^I press the "([^"]*)" button in the add block popover$/
     * @param string $text
     */
    public function stepIPressTheButtonInTheAddBlockPopover($text)
    {
        $popover = $this->getSession()->getPage()->find('css', '.element-editor-add-element');

        $blockType = strtolower($text);

        // Selector preferable not font-icon, but other class shared among all buttons
        $button = $popover->find('css', '.font-icon-block-'. $blockType);
        assertNotNull($button, "{$text} button not found in Add Block popover");
        $button->click();
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
     * @param int $position
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

    /**
     * Returns the publish button for a specific block if it exists
     *
     * @param int $position
     * @return NodeElement|null
     */
    protected function findPublishButton($position)
    {
        $block = $this->getSpecificBlock($position);
        assertNotNull($block, 'Block ' . $position . ' was not found in the page.');

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
        assertNotNull($block, 'Block ' . $position . ' was not found in the page.');

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
        assertNotNull($button, 'Caret button not found');

        return $button;
    }
}
