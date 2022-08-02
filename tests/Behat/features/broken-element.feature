@javascript
Feature: Broken element in CMS
  As a CMS user
  I want elemental areas to function correctly even with a broken block
  So that I can continue to update my content

  Background:
    Given I add an extension "DNADesign\Elemental\Extensions\ElementalPageExtension" to the "Page" class
      And a "page" "Blocks Page" with a "Alice's Block" content element with "Some content" content
      And the "page" "Blocks Page" has a broken element named "This one is broken"
      And the "page" "Blocks Page" has a "Bob's Block" content element with "Some content II" content

    Given I am logged in with "ADMIN" permissions
      And I go to "/admin/pages"
      And I left click on "Blocks Page" in the tree
    When I see a list of blocks
    Then I should see "Alice's Block"
      And I should see "Bob's Block"
      And I should see "This element is of obsolete type BrokenClass."
      And I should see "This block had the title \"This one is broken\""
      # Assert the order so when we say "block 2" below it's clear we mean the broken block
      And the element order should be "Alice's Block,This element is of obsolete type BrokenClass.,Bob's Block"

  @modal
  Scenario: I can archive a block
    Given I see a list of blocks
    When I press the "View actions" button for block 2
    Then I should see the archive button for block 2
      And I should not see the publish button for block 2
      And I should not see the save button for block 2
      And I should not see the duplicate button for block 2
    When I press the "archive" button for block 2
      And I see the text "Are you sure you want to send this block to the archive?" in the alert
      And I confirm the dialog
      And I wait for 2 seconds
    Then I see a list of blocks
      And I should not see "This element is of obsolete type BrokenClass."
      And I should not see "This one is broken"
      And I should see "Bob's Block"
      And I should see "Alice's Block"

  Scenario: I can publish the page
    Given I see a list of blocks
    When I press the "Publish" button
    Then I should see a "Published 'Blocks Page' successfully." success toast
      # This message displays if the ObsoleteClass check is not present in BaseElement::write()
      And I should not see "you need to change the ClassName before you can write it"
