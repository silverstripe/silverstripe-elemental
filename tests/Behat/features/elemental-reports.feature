Feature: View types of elements in a report
  As a CMS user
  I want to view a report of element types in the CMS
  So that I can see which elements I have available and how many are used

  Background:
    Given I add an extension "DNADesign\Elemental\Extensions\ElementalPageExtension" to the "Page" class
    And a "page" "My page" with a "My block" content element with "Some content" content

  Scenario: I can view the types of elements used
    Given the "group" "EDITOR" has permissions "Access to 'Pages' section" and "Access to 'Reports' section"
    And I am logged in as a member of "EDITOR" group
    And I go to "/admin/reports"

    # View content blocks in use
    When I click on the "Content blocks in use" report
    Then I should see "My page"

    # View content block types
    When I go to "/admin/reports"
    And I follow "Content block types"

    # Content element, bundled by default with elemental
    And I should see "HTML text block"
    And the rendered HTML should contain "font-icon-block-content"

    # Ensure BaseElement is ignored
    And I should not see text matching "Base element class"

    # Click block to filter by type
    When I follow "HTML text block"
    Then I should see "My page"

    # Open links to page edit form
    When I follow "My page"
    Then I should see "Add block"
