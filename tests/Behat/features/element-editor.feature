@javascript
Feature: View types of elements in the elemental editor
  As a CMS user
  I want to view a list of elements in the CMS
  So that I can see which elements I have used on a page

  Background:
    Given I am logged in with "ADMIN" permissions
      And I add an extension "DNADesign\Elemental\Extensions\ElementalPageExtension" to the "Page" class
      And a "page" "Blocks Page" with a "Alice's Block" content element with "Some content" content
      And the "page" "Blocks Page" has a "Bob's Block" content element with "Some content II" content
      And I go to "/admin/pages/edit/show/6"
      And I wait until I see the ".element-editor__element" element
    Then I should see "Alice's Block"
      And I should see "Bob's Block"

  Scenario: I can see the title and summary of each element
    Given I wait until I see the ".element-editor__element" element
    Then I should see a list of blocks
      And I should see "Alice's Block" as the title for block 1
      And I should see "Some content" as the summary for block 1
      And I should see "Bob's Block" as the title for block 2
      And I should see "Some content II" as the summary for block 2

  Scenario: I can see the block type when I hover over an element's icon
    Given I wait until I see the ".element-editor__element" element
    When I hover over the icon of block 1
    Then I should see text matching "Content"
