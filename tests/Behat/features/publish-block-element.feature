@javascript
Feature: Publish elements in the CMS
  As a CMS user
  I want to publish elements in the CMS
  So that I can add elements to a published page


  Background:
    Given I add an extension "DNADesign\Elemental\Extensions\ElementalPageExtension" to the "Page" class
    And a "page" "Blocks Page" with a "Block A" content element with "Some content" content
    And the "page" "Blocks Page" has a "Block B" content element with "Some content II" content

    Given the "group" "EDITOR" has permissions "Access to 'Pages' section"
      And I am logged in as a member of "EDITOR" group
      # Remove with 'And I click "Blocks Page" in the ".breadcrumbs-wrapper" element' once the ElementalArea refreshes,
      # See https://github.com/dnadesign/silverstripe-elemental/issues/320
    And I go to "/admin/pages"
    And I left click on "Blocks Page" in the tree
    When I see a list of blocks
    Then I should see "Block A"
    And I should see "Block B"

  @modal
  Scenario: I can publish a block
    Given I see a list of blocks
    When I press the "View actions" button
    Then I should see the publish button for block 1
    When I press the "Publish" button
      And I wait 1 second
    Then I should see a "Published 'Block A' successfully" success toast
        # Behat's assertion is faster than React's rendering
    When I wait 1 second
      And I press the "View actions" button
    Then I should see the unpublish button for block 1
      But I should not see the publish button for block 1

  Scenario: Correct toast notification shows when saving or publishing block will show new title
    # Changing title, saving and then publishing
    When I click on the caret button for block 1
    And I fill in "New title" for "Title" for block 1
    When I press the "View actions" button
    And I press the "Save" button
    And I wait 1 second
    Then I should see a "Saved 'New title' successfully" success toast
    When I click on the ".toast__close" element
    And I press the "View actions" button
    And I press the "Publish" button
    And I wait 1 second
    Then I should see a "Published 'New title' successfully" success toast

    # Changing title and publishing straight away
    When I fill in "Great title" for "Title" for block 1
    And I press the "View actions" button
    And I press the "Publish" button
    And I wait 1 second
    Then I should see a "Published 'Great title' successfully" success toast
