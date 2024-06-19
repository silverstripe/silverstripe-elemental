@javascript
Feature: Searchable fields
  As a CMS user
  I want searchable dropdown fields to function when used in a content block
  So that I can continue to update my content

  Background:
    Given I add an extension "DNADesign\Elemental\Extensions\ElementalPageExtension" to the "Page" class
    And a "page" "Blocks Page" with a "SilverStripe\FrameworkTest\Elemental\Model\ElementalSearchableFieldsBlock" element titled "My block"
    And a "SilverStripe\FrameworkTest\Model\Company" "test-1"
    And a "SilverStripe\FrameworkTest\Model\Company" "test-2"
    And a "SilverStripe\FrameworkTest\Model\Company" "test-3"
    Given the "group" "EDITOR" has permissions "Access to 'Pages' section"
    And I am logged in as a member of "EDITOR" group
    And I go to "/admin/pages"
    And I left click on "Blocks Page" in the tree
    When I see a list of blocks
    Then I should see "My block"
    When I click on block 1

  Scenario: I can use lazy-loaded searchable dropdown fields
    When I click on the "#Form_ElementForm_1_PageElements_1_CompanyID .ss-searchable-dropdown-field__value-container" element
    And I type "test-1" in the field
    And I wait 2 seconds
    And I press the "Enter" key globally
    When I click on the "#Form_ElementForm_1_PageElements_1_Companys .ss-searchable-dropdown-field__value-container" element
    And I type "test-2" in the field
    And I wait 2 seconds
    And I press the "Enter" key globally
    And I type "test-3" in the field
    And I wait 2 seconds
    And I press the "Enter" key globally
    When I press the "View actions" button
    And I press the "Save" button
    And I wait 1 second
    Then I should see a "Saved 'My block' successfully" success toast
    And I should see "test-1"
    And I should see "test-2"
    And I should see "test-3"
