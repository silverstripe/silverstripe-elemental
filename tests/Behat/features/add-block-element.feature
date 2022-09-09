@javascript
Feature: Add elements in the CMS
  As a CMS user
  I want to add elements in the CMS
  So that I can use multiple elements on a page

  Background:
    Given I add an extension "DNADesign\Elemental\Extensions\ElementalPageExtension" to the "Page" class
      And a "page" "Blocks Page" with a "Alice's Block" content element with "Some content" content
      And the "page" "Blocks Page" has a "Bob's Block" content element with "Some content II" content

    Given the "group" "EDITOR" has permissions "Access to 'Pages' section"
      And I am logged in as a member of "EDITOR" group
      # Remove with 'And I click "Blocks Page" in the ".breadcrumbs-wrapper" element' once the ElementalArea refreshes,
      # See https://github.com/dnadesign/silverstripe-elemental/issues/320
      And I go to "/admin/pages"
      And I left click on "Blocks Page" in the tree
    Then I should see a list of blocks
      And I should see "Alice's Block"
      And I should see "Bob's Block"

  Scenario: I can add elements to the page
    When I see a list of blocks
    Then I press the "Add block" button
    Then I press the "Content" button in the add block popover
    Then I should see "Untitled Content block" as the title for block 1

    When I go to "/admin/pages"
    And I left click on "Blocks Page" in the tree
      And I see a list of blocks
    Then I wait 1 second
      And I should see "Untitled Content block"
