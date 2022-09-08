Feature: View the report for content blocks in use
  As a CMS user
  I want to view a report of all created content blocks
  So that I can see which elements I am using in my site

  Background:
    Given I add an extension "DNADesign\Elemental\Extensions\ElementalPageExtension" to the "Page" class
    And a "page" "Blocks Page" with a "Alice's Block" content element with "Some content" content

    And the "group" "EDITOR" has permissions "Access to 'Reports' section" and "Access to 'Pages' section"
    And I am logged in as a member of "EDITOR" group
    And I go to "/admin/reports"
    Then I should see "Content blocks in use"

  Scenario: View content blocks in use report
    When I click on the "Content blocks in use" report
    Then I should see "Alice's Block"

  Scenario: Click on block name to go to owner page
    When I click on the "Content blocks in use" report
    And I follow "Alice's Block"
    And I wait for 2 seconds
    Then I should see an edit page form
