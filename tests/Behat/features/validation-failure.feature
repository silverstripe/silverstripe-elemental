@javascript
Feature: Don't lose content when page or block is invalid
  As a CMS user
  I want to retain my unsaved content when a validation error occurs
  So that I can fix the content and save it without recreating content

  Background:
    Given I add an extension "DNADesign\Elemental\Extensions\ElementalPageExtension" to the "Page" class
      And a "page" "Blocks Page" with a "Alice's Block" content element with "original content" content
      And the "group" "EDITOR" has permissions "Access to 'Pages' section"
      And I am logged in as a member of "EDITOR" group

  # The "unsaved changes" dialog causes errors unless this is tagged with "@unsavedChanges"
  @unsavedChanges
  Scenario: If a page is invalid, changes aren't lost
    Given I add an extension "DNADesign\Elemental\Tests\Src\ValidationFailedExtension" to the "Page" class
      And I go to "/admin/pages"
      And I left click on "Blocks Page" in the tree
    Then I should see a list of blocks
      And I should see "Alice's Block"
      And I should see the ".element-editor-header__version-state--draft" element
    When I click on the caret button for block 1
      And I fill in "<p>New sample content</p>" for "Content" for block 1
      And I fill in "Charlie's Block" for "Title" for block 1
      And I press the "Save" button
    Then I should see a "Validation error" error toast
      And I should see "Page is invalid"
      And I should see the ".element-editor-header__version-state--draft" element
    When I click on the caret button for block 1
    Then the "Content" field for block 1 should contain "New sample content"
      And the "Title" field for block 1 should contain "Charlie's Block"
      And I should see the ".element-editor-header__version-state--draft" element

  @unsavedChanges
  Scenario: If a block is invalid, changes aren't lost
    Given I add an extension "DNADesign\Elemental\Tests\Src\ValidationFailedExtension" to the "DNADesign\Elemental\Models\BaseElement" class
      And I go to "/admin/pages"
      And I left click on "Blocks Page" in the tree
    Then I should see a list of blocks
      And I should see "Alice's Block"
      And I should see the ".element-editor-header__version-state--draft" element
    When I click on the caret button for block 1
      And I fill in "<p>New sample content</p>" for "Content" for block 1
      And I fill in "Charlie's Block" for "Title" for block 1
      And I press the "Save" button
    Then I should see a "Validation error" error toast
      And I should see "ElementContent is invalid"
      And I should see the ".element-editor-header__version-state--draft" element
    When I click on the caret button for block 1
    Then the "Content" field for block 1 should contain "New sample content"
      And the "Title" field for block 1 should contain "Charlie's Block"
      And I should see the ".element-editor-header__version-state--draft" element
