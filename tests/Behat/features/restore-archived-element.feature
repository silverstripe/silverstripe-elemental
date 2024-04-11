@javascript
Feature: Restore to draft
  As a CMS author
  I want to restore archived element to draft version

  Background:
    Given I add an extension "DNADesign\Elemental\Extensions\ElementalPageExtension" to the "Page" class
      And a "page" "MyPage"
      And the "group" "EDITOR" has permissions "Access to 'Pages' section" and "Access to 'Archive' section"
      And I am logged in as a member of "EDITOR" group
      And I go to "/admin/pages"
      And I should see "MyPage"
      And I click on "MyPage" in the tree
      And I press the "Publish" button

  Scenario: I can restore archived elemental block to draft version
    When I press the "Add block" button
    Then I click on the ".font-icon-block-content" element
    Then I should see "Untitled Content block" in the ".element-editor__element" element
    And I click on the ".element-editor__element" element
    And I fill in "Form_ElementForm_1_Title" with "MyBlock"
    When I press the "View actions" button
    And I press the "Publish" button
    And I wait 1 second
    And I press the "View actions" button
    And I click on the ".element-editor__actions-archive" element, confirming the dialog
    And I go to "/admin/archive"
    Then I click "Blocks" in the ".ui-tabs-nav" element
    And I should see "MyBlock" in the "#Form_EditForm" element
    Then I click "MyBlock" in the "#Form_EditForm" element
    When I press the "Restore to draft" button
    Then I should see "Successfully restored the content block" in the "#Form_EditForm" element
    And I go to "/admin/pages"
    And I click on "MyPage" in the tree
    Then I should see "Draft" in the ".element-editor__element" element
