@javascript
Feature: Edit elements in the CMS
  As a CMS user
  I want to edit elements in the CMS
  So that I can modify elements I have used on a page

  Background:
    Given I add an extension "DNADesign\Elemental\Extensions\ElementalPageExtension" to the "Page" class
      And a "page" "Blocks Page" with a "Alice's Block" content element with "Some content" content
      And the "page" "Blocks Page" has a "Bob's Block" content element with "Some content II" content

    Given the "group" "EDITOR" has permissions "Access to 'Pages' section"
      And I am logged in as a member of "EDITOR" group
      # Remove with 'And I click "Blocks Page" in the ".breadcrumbs-wrapper" element' once the ElementalArea refreshes,
      # See https://github.com/dnadesign/silverstripe-elemental/issues/312
      And I go to "/admin/pages"
      And I left click on "Blocks Page" in the tree
    Then I should see a list of blocks
      And I should see "Alice's Block"
      And I should see "Bob's Block"

  Scenario: I can edit a non in-line editable block
    Given content blocks are not in-line editable
      And I go to "/admin/pages"
      And I left click on "Blocks Page" in the tree
      And I see a list of blocks
    Then I should see block 1

    Given I click on block 1
    Then I should see "Alice's Block"
      And the "Content" field should contain "Some content"

    Given I fill in "Eve's Block" for "Title"
      # Note: using un-namespaced fields in PHP GridField
      And I fill in "<p>New sample content</p>" for the "HTML" HTML field
      And I press the "Publish" button
    Then I should see a "Published content block" message
    When I go to "/admin/pages"
    And I left click on "Blocks Page" in the tree
      And I see a list of blocks
    Then I should see "Eve's Block"
      And I should see "New sample content"
      But I should not see "Alice's Block"

  # The "unsaved changes" dialog causes errors unless this is tagged with "@unsavedChanges"
  @unsavedChanges
  Scenario: I can preview a block and hide the form again
    Given I see a list of blocks
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

  @unsavedChanges
  Scenario: I can edit an inline-editable block and save the individual block
    Given I see a list of blocks
    Given I click on block 2
      Then I fill in "<p>New sample content</p>" for "Content" for block 2
      And I fill in "Charlie's Block" for "Title" for block 2
    When I press the "Save" button in the actions menu for block 2
      And I wait 1 second
      Then I should see a "Saved 'Charlie's Block' successfully" notice
    When I click on the caret button for block 2
      Then I should see "New sample content"

  @unsavedChanges
  Scenario: I can edit inline-editable blocks and save the page as a whole
    Given I see a list of blocks
    Given I click on block 1
      Then I fill in "<p>New content for block 1</p>" for "Content" for block 1
      And I fill in "Alice's Much Improved Block" for "Title" for block 1
    Given I click on block 2
      Then I fill in "<p>Alternate HTML within element 2</p>" for "Content" for block 2
      And I fill in "Bob's Radically Redesigned Revolutionary Element" for "Title" for block 2
    When I press the "Save" button
    Then I should see a "Saved 'Blocks Page' successfully" notice
      And I should see "Alice's Much Improved Block"
      And I should see "New content for block 1"
      And I should see "Bob's Radically Redesigned Revolutionary Element"
      And I should see "Alternate HTML within element 2"
    When I wait 1 second
      And I click on block 2
      Then the "Content" field for block 2 should contain "<p>Alternate HTML within element 2</p>"


