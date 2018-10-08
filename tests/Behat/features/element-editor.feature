@javascript
Feature: View types of elements in an area on a page
  As a CMS user
  I want to view a list of elements that I have on a page
  So that I can manage these elements individually

  Background:
    Given I add an extension "DNADesign\Elemental\Extensions\ElementalPageExtension" to the "Page" class
      And a "page" "Blocks Page" with a "Alice's Block" content element with "Some content" content
      And the "page" "Blocks Page" has a "Bob's Block" content element with "Some content II" content

    Given I am logged in with "ADMIN" permissions
      And I go to "/admin/pages/edit/show/6"
    When I see a list of blocks
      Then I should see "Alice's Block"
      And I should see "Bob's Block"

  Scenario: I can see the title and summary of each element
    Given I see a list of blocks
    Then I should see "Alice's Block" as the title for block 1
      And I should see "Some content" as the summary for block 1
      And I should see "Bob's Block" as the title for block 2
      And I should see "Some content II" as the summary for block 2

  Scenario: I can preview a block and hide the form again
    Given I see a list of blocks
    Then I should see block 1
    # The entire block should be clickable to reveal the form
    When I click on block 1
    Then I should see the edit form for block 1
      And I should see "Title (displayed if checked)"
      And the "Content" field should contain "Some content"
      And I fill in "<p>New sample content</p>" for the "Content" HTML field
    When I click on the caret button for block 1
    Then I should not see the edit form for block 1
    # Re-opening the closed form should contain the updated content
    When I click on the caret button for block 1
    Then I should see the edit form for block 1
      And the "Content" field should contain "<p>New sample content</p>"

  Scenario: Opening the "more actions" menu will not expand a block
    When I press the "View actions" button
    Then I should not see "Title (displayed if checked)"

  Scenario: I can see the block type when I hover over an element's icon
    Given I see a list of blocks
    When I hover over the icon of block 1
    Then I should see text matching "Content"
