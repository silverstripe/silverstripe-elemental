@javascript
Feature: View types of elements in a report
  As a CMS user
  I want to view a list of elements in the CMS
  So that I can see which elements I have used on a page

  Background:
    Given I have a config file "enable-elemental.yml"
    Given I am logged in with "ADMIN" permissions
      And I add an extension "DNADesign\\Elemental\\Extensions\\ElementalPageExtension" to the "Page" class
      And I go to "/dev/build?flush"
      And a "page" "Blocks Page"
      And I go to "/admin/pages"
      And I wait until I see the ".cms-tree" element
      And I click on "Blocks Page" in the tree
      And I wait until I see the ".elemental-editor__list" element
      # Workaround until the FixtureFactory applies ElementalArea relations correctly;
      # See https://github.com/silverstripe/silverstripe-behat-extension/issues/180
      And I select "Content" from "elemental-editor_add-new-block-control_select-dropdown"
      And I click "Add" in the ".elemental-editor__add-new-block-control" element
      And I fill in "My Sample Block" for "Title"
      And I fill in "<p>My sample content</p>" for the "HTML" HTML field
      And I click "Create" in the "#Form_ItemEditForm_action_doSave" element
      # Remove with 'And I click "Blocks Page" in the ".breadcrumbs-wrapper" element' once the ElementalArea refreshes,
      # See https://github.com/dnadesign/silverstripe-elemental/issues/320
      And I go to "/admin/pages/edit/show/6"
      And I wait until I see the ".element-editor__element" element
    Then I should see "My Sample Block"

  Scenario: I can see the title and summary of each element
    Given I wait until I see the ".element-editor__element" element
    Then I should see a list of blocks
      And I should see "My Sample Block" as the title for block 1
      And I should see "My sample content" as the summary for block 1


  Scenario: I can add elements to the page
    Given I wait until I see the ".element-editor__element" element
    When I select "Content" from "elemental-editor_add-new-block-control_select-dropdown"
      And I click "Add" in the ".elemental-editor__add-new-block-control" element
      And I fill in "Additional Sample Block" for "Title"
      And I fill in "<p>Additional sample content</p>" for the "HTML" HTML field
      And I press the "Create" button
    Then I should see a "Saved content block" message

    When I go to "/admin/pages/edit/show/6"
      And I wait until I see the ".element-editor__element" element
      And I wait 1 second
    Then I should see "Additional Sample Block"

  Scenario: I can preview a block
    Given I wait until I see the ".element-editor__element" element
    Then I should see block 1

    Given I click on block 1
    # Needs rewrite once the FormBuilder component is fully functional.
    # Test checks only if placeholder text is rendered.
    Then I should see "Imagine some fancy form builder here!"

  @modal
  Scenario: I can delete a block
    Given I wait until I see the ".element-editor__element" element
    When I select "Content" from "elemental-editor_add-new-block-control_select-dropdown"
      And I click "Add" in the ".elemental-editor__add-new-block-control" element
      And I wait 1 second
      And I fill in "Second Sample Block" for "Title"
      And I fill in "<p>Additional sample content</p>" for the "HTML" HTML field
      And I press the "Create" button
      And I go to "/admin/pages/edit/show/6"
      And I wait until I see the ".element-editor__element" element
      And I wait 1 second
      And I should see "Second Sample Block"
      And I should see block 1
      And I press the "View actions" button
    Then I should see the delete button for block 1
    When I press the "Delete" button
      And I see the text "Are you sure you want to delete this block?" in the alert
      And I confirm the dialog
      And I wait until I see the ".element-editor__element" element
    Then I should see "Second Sample Block"
      But I should not see "My Sample Block Title"


  Scenario: I can see the block type when I hover over an element's icon
    Given I wait until I see the ".element-editor__element" element
    When I hover over the icon of block 1
    Then I should see text matching "Content"
