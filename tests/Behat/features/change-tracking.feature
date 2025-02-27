@retry @job5
Feature: Unsaved changes are identified by changetracker
  As a CMS user
  I want to know when I have unsaved changes

  Background:
    Given I add an extension "DNADesign\Elemental\Extensions\ElementalPageExtension" to the "Page" class
    And a "page" "Blocks Page" with a "My title" content element with "<p>My content</p>" content
    And the "group" "EDITOR" has permissions "Access to 'Pages' section"
    And I am logged in as a member of "EDITOR" group
    And I go to "/admin/pages"
    And I follow "Blocks Page"

  Scenario: Change tracking for text and HTML fields
    # Note we can't just check for "Save" vs "Saved" because one is a subset of the other,
    # so `I should not see a "Save" button` will always fail when the "Saved" button is present.
    # Instead, font-icon-tick is a CSS class on the "Saved" button, and font-icon-save is on the "Save" button
    Then I should see the "button.font-icon-tick" element
    Then I should not see the "button.font-icon-save" element
    # Just opening the block doesn't get seen as a "change"
    When I click on the caret button for block 1
    Then I should see the "button.font-icon-tick" element
    Then I should not see the "button.font-icon-save" element
    # Update the title
    # For some reason, using the usual 'When I fill in "changed" for "Title" for block 1'
    # it fails to recognise the change in CI even though it works locally for some people.
    When I focus on the "#Form_ElementForm_1_Title" element
    And I type "changed" in the field
    # When I fill in "changed" for "Title" for block 1
    Then I should not see the "button.font-icon-tick" element
    Then I should see the "button.font-icon-save" element
    # Change it back
    When I fill in "" for "Title" for block 1
    When I focus on the "#Form_ElementForm_1_Title" element
    And I type "My title" in the field
    Then I should see the "button.font-icon-tick" element
    Then I should not see the "button.font-icon-save" element
    # Update the HTML content
    When I fill in "<p>New sample content</p>" for "Content" for block 1
    Then I should not see the "button.font-icon-tick" element
    Then I should see the "button.font-icon-save" element
    # Change it back
    When I fill in "<p>My content</p>" for "Content" for block 1
    Then I should see the "button.font-icon-tick" element
    Then I should not see the "button.font-icon-save" element
    # Don't click save at the end - there should be no alert because there were no changes

