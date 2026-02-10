@javascript @retry @job4
Feature: View types of elements in an area on a page
  As a CMS user
  I want to view a list of elements that I have on a page
  So that I can manage these elements individually

  Background:
    Given I add an extension "DNADesign\Elemental\Extensions\ElementalPageExtension" to the "Page" class
    And a "group" "AUTHOR" has permissions "Access to 'Pages' section"
    And a "page" "Blocks Page" with a "Alice's Block" content element with "Some content" content
    And the "page" "Blocks Page" has a "Bob's Block" content element with "Some content II" content

  Scenario: I can see the title and summary of each element
    Given I am logged in as a member of "AUTHOR" group
    When I go to "/admin/pages"
      And I left click on "Blocks Page" in the tree
    Then I should see a list of blocks
      Then I should see "Alice's Block" as the title for block 1
      And I should see "Some content" as the summary for block 1
      And I should see "Bob's Block" as the title for block 2
      And I should see "Some content II" as the summary for block 2

  Scenario: Opening the "more actions" menu will not expand a block
    Given I am logged in as a member of "AUTHOR" group
    When I go to "/admin/pages"
    And I left click on "Blocks Page" in the tree
      Then I should see a list of blocks
    When I press the "View actions" button
      Then I should not see "Title"

  Scenario: Clicking the drag handle will not expand a block
    Given I am logged in as a member of "AUTHOR" group
    When I go to "/admin/pages"
    And I left click on "Blocks Page" in the tree
    When I see a list of blocks
    Then I should see "Alice's Block" as the title for block 1
    And I should see "Bob's Block" as the title for block 2
    # Tab to the block so that the drag handle show for the active block (hidden by default)
    When I click on the "#Form_EditForm_MenuTitle" element
    And I press the "Tab" key globally
    And I press the "Tab" key globally
    And I press the "Tab" key globally
    When I click on the ".element-editor-header__drag-handle" element
    Then I should not see the edit form for block 1

  Scenario: I can see the block type when I hover over an element's icon
    Given I am logged in as a member of "AUTHOR" group
    When I go to "/admin/pages"
      And I left click on "Blocks Page" in the tree
    When I see a list of blocks
      And I hover over the icon of block 1
      Then I should see text matching "Content"

  @unsavedChanges
  Scenario: I can preview a block and hide the form again
    Given I am logged in as a member of "AUTHOR" group
    When I go to "/admin/pages"
      And I left click on "Blocks Page" in the tree
    When I see a list of blocks
      Then I should see block 1

    # The entire block should be clickable to reveal the form
    When I click on block 1
     Then I should see the edit form for block 1
      And I should see "Title"
      And the "Content" field should contain "Some content"
      And I fill in "<p>New sample content</p>" for the "Content" HTML field

    When I click on the caret button for block 1
      Then I should not see the edit form for block 1

    # Re-opening the closed form should contain the updated content
    When I click on the caret button for block 1
      Then I should see the edit form for block 1
      And the "Content" field should contain "<p>New sample content</p>"

  Scenario: I can operate blocks with a mouse
    Given a "virtual page" "Virtual Page"

    Given I am logged in as a member of "AUTHOR" group
    When I go to "/admin/pages"

    # Content blocks are not applied to other page types
    When I follow "Virtual Page"
    Then I should not see "Add new block"

    # Publish to remove the draft icons
    # Would be used so that we could assert presence of modified icons to test drag and drop
    # And I press the "Publish" button
    # And I wait for 5 seconds

    # Drag and drop the first content block to below the second content block
    # (commented out as chromedriver doesn't appear to like this react component)
    # When I drag the ".elemental-editor-list > div:nth-of-type(2) .element-editor-summary" element by "0,150"
    # And I wait for 5 seconds

    # Add a block in between two existing blocks
    When I go to "/admin/pages"
    And I follow "Blocks Page"
    Then I should not see "Untitled Content Block"
    When I click on the add block button in hover bar area for block 1
    And I wait for 1 seconds
    And I click on the ".popover .font-icon-block-content" element
    And I wait for 5 seconds
    Then I should see "Untitled Content Block"

    # Expand blocks for inline editing
    Then I should not see the edit form for block 1
    # This will click on the first content block
    When I click on the ".element-editor-header__title" element
    And I wait for 1 seconds
    Then I should see the edit form for block 1

    # Navigate between primary block tabs
    Then I should not see "Custom CSS classes"
    When I click on the ".element-editor-header__actions-toggle" element
    And I click on the ".dropdown-item[name='Settings']" element
    Then I should see "Custom CSS classes"

  Scenario: I can click the settings tab before the inline edit form has been expanded
    Given I am logged in as a member of "AUTHOR" group
    When I go to "/admin/pages"
    And I follow "Blocks Page"
    When I click on the ".element-editor-header__actions-toggle" element
    And I click on the ".dropdown-item[name='Settings']" element
    Then I should see "Custom CSS classes"

  @unsavedChanges
  Scenario: I can operate blocks with a keyboard
    Given I am logged in as a member of "AUTHOR" group
    When I go to "/admin/pages"
    And I follow "Blocks Page"

    # Click on the on the first content block to focus it so the number of times
    # to press the tab key is predictable
    When I click on the ".element-editor-header__title" element
    And I wait for 1 seconds
    Then I should see the edit form for block 1

    # More actions menu can be accessed and hidden with keyboard actions
    # Doing so does not collapse the block as a whole
    When I press the "tab" key globally
    When I press the "tab" key globally
    Then I should not see "Duplicate"
    And I should see the edit form for block 1
    # open menu with space and close with escape
    When I press the "space" key globally
    Then I should see "Duplicate"
    And I should see the edit form for block 1
    When I press the "escape" key globally
    Then I should not see "Duplicate"
    And I should see the edit form for block 1
    # open menu with enter and close with escape
    When I press the "enter" key globally
    Then I should see "Duplicate"
    And I should see the edit form for block 1
    When I press the "escape" key globally
    Then I should not see "Duplicate"
    And I should see the edit form for block 1

    # Block can be collapsed with keyboard actions
    When I press the "shift-tab" key globally
    When I press the "shift-tab" key globally
    And I press the "space" key globally
    And I wait for 1 seconds
    Then I should not see the edit form for block 1

    # Block can be expanded with keyboard actions
    When I press the "space" key globally
    And I wait for 1 seconds
    Then I should see the edit form for block 1

  Scenario: Keyboard navigation for block reordering
    Given a "page" "Blocky" with a "Block 1" content element with "My content" content
    And the "page" "Blocky" has a "Block 2" content element with "My other" content
    And I am logged in as a member of "AUTHOR" group
    And I go to "/admin/pages"
    And I follow "Blocky"
    When I press the "Publish" button
    Then I should see a "Published Page "Blocky"" success toast
    And I wait for 1 seconds
    # Note that :nth-of-type() selectors are x2 what you'd expect them to be, (2) is the 1st block
    Then I should not see a ".element-editor__element:nth-of-type(2) .badge" element
    # Assert the order is correct
    Then the element order should be "Block 1,Block 2"
    # Tab to the drag handle of the first block
    When I click on the "#Form_EditForm_MenuTitle" element
    And I press the "Tab" key globally
    And I press the "Tab" key globally
    And I press the "Tab" key globally
    And I press the "Tab" key globally
    Then the ".element-editor-header__drag-handle" element should have focus
    # Move the element with space
    When I press the "Space" key globally
    And I press the "Down" key globally
    When I press the "Space" key globally
    Then the element order should be "Block 2,Block 1"
    # Note that :nth-of-type() selectors are x2 what you'd expect them to be, (4) is the 2nd block
    And I should see a ".element-editor__element:nth-of-type(4) .badge.status-modified" element
    # Note that :nth-of-type() selectors are x2 what you'd expect them to be, (2) is the 1st block
    And I should not see a ".element-editor__element:nth-of-type(2) .badge" element
    # Move the element with enter
    When I press the "Enter" key globally
    When I press the "Up" key globally
    When I press the "Enter" key globally
    Then the element order should be "Block 1,Block 2"
    # Move the element down and refresh the page to confirm it saved correctly after moving
    When I press the "Enter" key globally
    When I press the "Down" key globally
    When I press the "Enter" key globally
    Then the element order should be "Block 2,Block 1"
    And I go to "/admin/pages"
    And I follow "Blocky"
    Then the element order should be "Block 2,Block 1"

  @unsavedChanges @modal
  Scenario: Moving a block with unsaved changes using keyboard keeps the inline form state
    Given I am logged in as a member of "AUTHOR" group
    When I go to "/admin/pages"
    And I follow "Blocks Page"
    When I see a list of blocks
    And I click on the "#Form_EditForm_MenuTitle" element
    And I press the "Tab" key globally
    And I press the "Tab" key globally
    And I press the "Tab" key globally
    # Expand the block
    And I press the "Space" key globally
    And I fill in "<p>Unsaved change</p>" for the "Content" HTML field
    And I press the "Tab" key globally
    Then the ".element-editor-header__drag-handle" element should have focus
    When I press the "Space" key globally
    And I press the "Down" key globally
    And I press the "Space" key globally
    Then the element order should be "Bob's Block,Alice's Block"
    # Expand the block again as it collapsed during move
    And I press the "Shift-Tab" key globally
    And I press the "Space" key globally
    And the "Content" field for block 2 should contain "<p>Unsaved change</p>"
    # Confirm content was not changed on page reload (only sort order was)
    When I go to "/admin/pages"
    # Bypass the "you have unsaved changes" dialog
    And I confirm the dialog
    And I follow "Blocks Page"
    Then I should see "Some content" as the summary for block 2
