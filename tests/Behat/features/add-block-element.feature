@javascript
Feature: Add elements in the CMS
  As a CMS user
  I want to add elements in the CMS
  So that I can use multiple elements on a page

  Background:
    Given I add an extension "DNADesign\Elemental\Extensions\ElementalPageExtension" to the "Page" class
      And a "page" "Blocks Page" with a "Alice's Block" content element with "Some content" content
      And the "page" "Blocks Page" has a "Bob's Block" content element with "Some content II" content

    Given I am logged in with "ADMIN" permissions
      # Remove with 'And I click "Blocks Page" in the ".breadcrumbs-wrapper" element' once the ElementalArea refreshes,
      # See https://github.com/dnadesign/silverstripe-elemental/issues/320
      And I go to "/admin/pages/edit/show/6"
    Then I should see a list of blocks
      And I should see "Alice's Block"
      And I should see "Bob's Block"

  Scenario: I can add elements to the page
    When I see a list of blocks
    Then I select "Content" from "elemental-editor_add-new-block-control_select-dropdown"
      And I click "Add" in the ".elemental-editor__add-new-block-control" element
      And I fill in "Eve's Block" for "Title"
      # Note: using un-namespaced fields in PHP GridField
      And I fill in "<p>Some content III</p>" for the "HTML" HTML field
      And I press the "Create" button
    Then I should see a "Saved content block" message

    When I go to "/admin/pages/edit/show/6"
      And I see a list of blocks
    Then I wait 1 second
      And I should see "Eve's Block"
