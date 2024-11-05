@retry @job2
Feature: Files can be saved in and removed from elemental blocks
  As a CMS user
  I want to attach and remove files from elemental blocks

  Background:
    Given I add an extension "DNADesign\Elemental\Extensions\ElementalPageExtension" to the "Page" class
    And I add an extension "SilverStripe\FrameworkTest\Elemental\Extension\FileElementalExtension" to the "DNADesign\Elemental\Models\ElementContent" class
    And I go to "/dev/build?flush"
    And a "image" "file1.jpg"
    And a "page" "Blocks Page" with a "My title" content element with "My content" content
    And the "group" "EDITOR" has permissions "Access to 'Pages' section"
    And I am logged in as a member of "EDITOR" group
    And I go to "/admin/pages"
    And I follow "Blocks Page"

  Scenario: Add a file and save the block, then remove the file and save the block
    # Add a file to the block
    Given I click on the caret button for block 1
    Then I should not see "file1"
    Given I take a screenshot after every step
    When I click "Choose existing" in the "#Form_ElementForm_1 .uploadfield" element
    And I press the "Back" HTML field button
    And I click on the file named "file1" in the gallery
    And I press the "Insert" button
    And I press the "View actions" button
    And I click on the ".element-editor__actions-save" element
    Then I should see a "Saved 'My title' successfully" success toast
    # Check we see the file both in the current page load (react state is correct) and after reloading the form
    Then I should see "file1"
    When I go to "/admin/pages"
    And I follow "Blocks Page"
    And I click on the caret button for block 1
    Then I should see "file1"
    # Then remove the file from the block
    And I click on the "#Form_ElementForm_1 .uploadfield-item__remove-btn" element
    And I press the "View actions" button
    And I click on the ".element-editor__actions-save" element
    Then I should see a "Saved 'My title' successfully" success toast
    # Check we don't see the file anymore
    Then I should not see "file1"
    When I go to "/admin/pages"
    And I follow "Blocks Page"
    And I click on the caret button for block 1
    Then I should not see "file1"
