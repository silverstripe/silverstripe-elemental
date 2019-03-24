Feature: View types of elements in a report
  As a CMS user
  I want to view a report of element types in the CMS
  So that I can see which elements I have available and how many are used

  @javascript
  Scenario: I can view the types of elements used
    Given I am logged in with "ADMIN" permissions
    And I go to "/admin/reports"
    Then I should see text matching "Content block types"

    When I click on the "Content block types" report
    Then I should see text matching "Content block types"
    # See: Content element, bundled by default with elemental
    And I should see text matching "HTML text block"
    # Ensure BaseElement is ignored
    And I should not see text matching "Base element class"
