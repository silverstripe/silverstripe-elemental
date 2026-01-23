@javascript @retry @job1
Feature: Add elements in the CMS DataObject
  As a CMS user
  I want to add elements in the CMS DataObject
  So that I can use multiple elements in a Dataobject

  Background:
    Given the "group" "EDITOR" has permissions "CMS_ACCESS_CMSMain"
    And I am logged in as a member of "EDITOR" group

  Scenario: I can add inline-editable elements to the DataObject
    When I go to "/admin/elemental-behat-test-admin/"
    Then I press the "Add Elemental Behat Test Object" button
    Then I press the "Create" button
    Then I wait 1 second
    Then I press the "Add block" button
    Then I press the "Content" button in the add block popover
    Then I should see "Untitled Content block" as the title for block 1
    When I click on block 1
    And I should see "Title"
    And I should see "Content"
    And I fill in "Elemental Behat Test Title" for "Title" for block 1
    Then I press the "Save" button
    Then I should see "Elemental Behat Test Title" as the title for block 1

  Scenario: I can add non-inline-editable elements to the DataObject
    Given content blocks are not in-line editable
        And I add an extension "SilverStripe\FrameworkTest\Elemental\Model\ElementalBehatTestObjectCMSEditLinkExtension" to the "SilverStripe\FrameworkTest\Elemental\Model\ElementalBehatTestObject" class
        When I go to "/admin/elemental-behat-test-admin/"
        Then I press the "Add Elemental Behat Test Object" button
        Then I press the "Create" button
        Then I wait 1 second
        Then I press the "Add block" button
        Then I press the "Content" button in the add block popover
        When I click on block 1
        And I should see "Title"
        And I should see "Content"

    Given I fill in "New Elemental Behat Test Title" for "Title"
        And I fill in "<p>New sample content</p>" for the "Content" HTML field
        And I press the "Publish" button
        Then I should see a "Published content block" message
        Then I should see "New Elemental Behat Test Title"
        And the "Content" field should contain "<p>New sample content</p>"
        Then I press the "Navigate up a folder" button
        Then I should see "New Elemental Behat Test Title" as the title for block 1

    # very quick check that history tab is broadly working
    Given I click on block 1
        When I click on "History" in the header tabs
        And I wait for 3 seconds until I see the ".history-viewer__table" element
        And I click on the ".history-viewer__row" element
        And I wait for 3 seconds until I see the "#Form_versionForm" element
        Then I should see "New sample content"
