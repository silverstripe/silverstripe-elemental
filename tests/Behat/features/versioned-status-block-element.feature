@javascript
Feature: Add elements in the CMS and see currunt status of elements
  As a CMS user
  I want to see versined status of Element blocks

  Background:
    Given I add an extension "DNADesign\Elemental\Extensions\ElementalPageExtension" to the "Page" class
      And a "page" "Blocks Page"
      And the "group" "EDITOR" has permissions "Access to 'Pages' section"
      And I am logged in as a member of "EDITOR" group
      # Remove with 'And I click "Blocks Page" in the ".breadcrumbs-wrapper" element' once the ElementalArea refreshes,
      # See https://github.com/dnadesign/silverstripe-elemental/issues/320
      And I go to "/admin/pages"
      And I left click on "Blocks Page" in the tree

  # Test that the versioned badge is shown when there are some changes in the block
  Scenario: I can add elements to the page and see versioned badge
    Then I press the "Add block" button
    Then I press the "Content" button in the add block popover
    Then I should see "Untitled Content block" as the title for block 1

    # Block 1 is not published or saved yet, so it should be draft
    And I should see "Draft" in the ".element-editor-header__info .badge" element
    Then I click on block 1
    Then I fill in "<p>New Content</p>" for "Content" for block 1
    Then I press the "Publish" button
    And I wait 1 second

    # Block 1 is published, so it should not have a badge
    Then I should not see a ".element-editor-header__info .badge" element
    Then I click on block 1
    Then I fill in "<p>Updated Content</p>" for "Content" for block 1

    # Block 1 is modified and has unsaved changes, so it should not have a badge
    And I should not see a ".element-editor-header__info .badge" element
    Then I press the "Save" button
    And I wait 1 second

    # Block 1 is modified and has saved changes, so it should be modified
    And I should see "Modified" in the ".element-editor-header__info .badge" element
    And I wait 1 second
    Then I press the "Publish" button

    # Block 1 is published, so it should not have a badge
    And I should not see a ".element-editor-header__info .badge" element
