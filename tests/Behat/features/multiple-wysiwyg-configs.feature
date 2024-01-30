Feature: multiple elemental blocks with different HTMLEditorConfig instances
  As a developer
  I want my elemental blocks to have different HTMLEditorConfig instances
  So that the appropriate options are available for each block

  Background:
    Given I add an extension "DNADesign\Elemental\Tests\Behat\Extension\UniqueHtmlEditorConfigExtension" to the "DNADesign\Elemental\Models\BaseElement" class
    And I add an extension "DNADesign\Elemental\Extensions\ElementalPageExtension" to the "Page" class
    And a "page" "Blocks Page" with a "Alice's Block" content element with "<p>Some content</p>" content
    And the "page" "Blocks Page" has a "Bob's Block" content element with "<p>completely different stuff</p>" content
    And the "group" "EDITOR" has permissions "Access to 'Pages' section"
    And I am logged in as a member of "EDITOR" group
    And I go to "/admin/pages"
    And I left click on "Blocks Page" in the tree

  @unsavedChanges
  Scenario: The WYSIWYG should work correctly for all configs
    Given I see a list of blocks
    # Check the link menu in the WYSIWYG "insert link" button is correct for block 1
    When I click on block 1
    And I click on the "#Form_ElementForm_1 button[aria-label^='Insert link']" element
    Then I should see "Page on this site" in the ".tox-menu" element
    And I should see "Link to a file" in the ".tox-menu" element
    And I should see "Link to external URL" in the ".tox-menu" element
    And I should see "Anchor on a page" in the ".tox-menu" element
    And I should see "Link to email address" in the ".tox-menu" element
    # Check the link menu in the WYSIWYG "insert link" button is correct for block 2
    When I click on block 2
    # In CI, the mouse position just happens to produce a tooltip that stops us clicking on the insert link button
    # so we have to move the mouse somewhere else to avoid that
    And I click on the "input[type='text']" element
    And I click on the "#Form_ElementForm_2 button[aria-label^='Insert link']" element
    Then I should see "Page on this site" in the ".tox-menu" element
    And I should see "Link to a file" in the ".tox-menu" element
    And I should see "Link to external URL" in the ".tox-menu" element
    And I should see "Anchor on a page" in the ".tox-menu" element
    And I should see "Link to email address" in the ".tox-menu" element
    # Check the content of both WYSIWYG fields is correct
    And the "Content" field for block 1 should contain "<p>Some content</p>"
    And the "Content" field for block 2 should contain "<p>completely different stuff</p>"


