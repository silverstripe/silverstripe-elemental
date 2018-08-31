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
      And I wait until I see the ".elemental-editor__list" element
    Then I should see "Alice's Block"
      And I should see "Bob's Block"

  Scenario: I can see the title and summary of each element
    Given I wait until I see the ".element-editor__element" element
    Then I should see a list of blocks
      And I should see "Alice's Block" as the title for block 1
      And I should see "Some content" as the summary for block 1
      And I should see "Bob's Block" as the title for block 2
      And I should see "Some content II" as the summary for block 2

  Scenario: I can preview a block
    Given I wait until I see the ".element-editor__element" element
      Then I should see block 1
    Given I click on block 1
      # Needs rewrite once the FormBuilder component is fully functional.
      # Test checks only if placeholder text is rendered.
      Then I should see "Imagine some fancy form builder here!"

  Scenario: Opening the "more actions" menu will not expand a block
    When I press the "View actions" button
    Then I should not see "Imagine some fancy form builder here!"

  Scenario: I can see the block type when I hover over an element's icon
    Given I wait until I see the ".element-editor__element" element
    When I hover over the icon of block 1
    Then I should see text matching "Content"
