@javascript @retry @job6
Feature: Restore to draft
  As a CMS author
  I want to restore archived pages with elemental areas to draft version

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
    And I click "More options" in the "#ActionMenus" element
    And I press the "Unpublish and archive" button, confirming the dialog
    And I go to "/admin/archive"
    Then I should see "MyPage" in the "#Form_EditForm" element
    Then I click "MyPage" in the "#Form_EditForm" element
    When I press the "Restore to draft" button
    Then I should see "Successfully restored the page" in the "#Form_EditForm" element
    And I go to "/admin/pages"
    And I click on "MyPage" in the tree
    Then I should see "MyBlock" in the ".element-editor__element" element
