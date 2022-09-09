@javascript
Feature: View an elemental area with no blocks on a page
  As a CMS user
  I want to be visually alerted in case there are not yet any blocks on my  page
  So that I can add elements to my page

  Background:
    Given I add an extension "DNADesign\Elemental\Extensions\ElementalPageExtension" to the "Page" class
      And a "page" "Blocks Page"

    Given the "group" "EDITOR" has permissions "Access to 'Pages' section"
      And I am logged in as a member of "EDITOR" group
      And I go to "/admin/pages"
      And I left click on "Blocks Page" in the tree

  Scenario: I can see a message that alerts me to add blocks
    Given I should see an empty list of blocks
    Then I should see "Add blocks to place your content"

