@javascript
Feature: Delete elements in the CMS
  As a CMS user
  I want to delete elements in the CMS
  So that I can remove elements I have used on a page


  Background:
    Given I am logged in with "ADMIN" permissions
      And I add an extension "DNADesign\Elemental\Extensions\ElementalPageExtension" to the "Page" class
      And a "page" "Blocks Page" with a "Alice's Block" content element with "Some content" content
      And the "page" "Blocks Page" has a "Bob's Block" content element with "Some content II" content

      # Remove with 'And I click "Blocks Page" in the ".breadcrumbs-wrapper" element' once the ElementalArea refreshes,
      # See https://github.com/dnadesign/silverstripe-elemental/issues/320
      And I go to "/admin/pages/edit/show/6"
      And I wait until I see the ".element-editor__element" element
    Then I should see "Alice's Block"
      And I should see "Bob's Block"

  @modal
  Scenario: I can delete a block
    Given I wait until I see the ".element-editor__element" element
    When I should see the delete button for block 1
      And I click on the delete button for block 1
      And I see the text "Are you sure you want to delete this block?" in the alert
      And I confirm the dialog
      And I wait for 2 seconds
      And I wait until I see the ".element-editor__element" element
    Then I should see "Bob's Block"
      But I should not see "Alice's Block"
