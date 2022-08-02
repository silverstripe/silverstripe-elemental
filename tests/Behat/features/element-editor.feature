@javascript
Feature: View types of elements in an area on a page
  As a CMS user
  I want to view a list of elements that I have on a page
  So that I can manage these elements individually

  Background:
    Given I add an extension "DNADesign\Elemental\Extensions\ElementalPageExtension" to the "Page" class
    And a "group" "AUTHOR group" has permissions "Access to 'Pages' section"
    And a "page" "Blocks Page" with a "Alice's Block" content element with "Some content" content
    And the "page" "Blocks Page" has a "Bob's Block" content element with "Some content II" content

  Scenario Outline: I can see the title and summary of each element
    Given I am logged in with "<group>" permissions
    When I go to "/admin/pages"
      And I left click on "Blocks Page" in the tree
    Then I should see a list of blocks
      Then I should see "Alice's Block" as the title for block 1
      And I should see "Some content" as the summary for block 1
      And I should see "Bob's Block" as the title for block 2
      And I should see "Some content II" as the summary for block 2

    Examples:
      | group  |
      | ADMIN  |
      | AUTHOR |

  Scenario: Opening the "more actions" menu will not expand a block
    Given I am logged in with "ADMIN" permissions
    When I go to "/admin/pages"
    And I left click on "Blocks Page" in the tree
      Then I should see a list of blocks

    When I press the "View actions" button
      Then I should not see "Title"

  Scenario: I can see the block type when I hover over an element's icon
    Given I am logged in with "ADMIN" permissions
    When I go to "/admin/pages"
      And I left click on "Blocks Page" in the tree

    When I see a list of blocks
      And I hover over the icon of block 1
      Then I should see text matching "Content"

  @unsavedChanges
  Scenario: I can preview a block and hide the form again
    Given I am logged in with "ADMIN" permissions
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

    Given I am logged in with "ADMIN" permissions
    When I go to "/admin/pages"

    # Content blocks are not applied to other page types
    When I follow "Virtual Page"
    Then I should not see "Add block"

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
    Then I should not see a ".mce-tinymce" element
    # This will click on the first content block
    When I click on the ".element-editor-header__title" element
    And I wait for 1 seconds
    Then I should see a ".mce-tinymce" element

    # Navigate between primary block tabs
    Then I should not see "Custom CSS classes"
    When I click on the ".element-editor-header__actions-toggle" element
    And I click on the ".dropdown-item[name='Settings']" element
    Then I should see "Custom CSS classes"

  @unsavedChanges
  Scenario: I can operate blocks with a keyboard
    Given I am logged in with "ADMIN" permissions
    When I go to "/admin/pages"
    And I follow "Blocks Page"

    # Click on the on the first content block to focus it so the number of times
    # to press the tab key is predictable
    When I click on the ".element-editor-header__title" element
    And I wait for 1 seconds
    Then I should see a ".mce-tinymce" element

    # More actions menu can be accessed with keyboard actions
    When I press the "tab" key globally
    Then I should not see "Duplicate"
    When I press the "space" key globally
    Then I should see "Duplicate"
    When I press the "enter" key globally
    Then I should not see "Duplicate"

    # Block can be collapsed with keyboard actions
    When I press the "shift-tab" key globally
    And I press the "space" key globally
    And I wait for 1 seconds
    Then I should not see a ".mce-tinymce" element

    # Block can be expanded with keyboard actions
    When I press the "space" key globally
    And I wait for 1 seconds
    Then I should see a ".mce-tinymce" element
