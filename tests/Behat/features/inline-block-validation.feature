@retry
Feature: Blocks are validated when inline saving individual blocks
  As a CMS user
  I want to blocks have be validating when individual saving them
  So that I can see what content needs to be fixed

  Background:
    Given I add an extension "DNADesign\Elemental\Extensions\ElementalPageExtension" to the "Page" class
    And I add an extension "SilverStripe\FrameworkTest\Elemental\Extension\ElementContentExtension" to the "DNADesign\Elemental\Models\ElementContent" class
    And I add an extension "SilverStripe\FrameworkTest\Elemental\Extension\NumericFieldExtension" to the "SilverStripe\Forms\NumericField" class
    And I go to "/dev/build?flush"
    And a "page" "Blocks Page" with a "My title" content element with "My content" content
    And the "group" "EDITOR" has permissions "Access to 'Pages' section"
    And I am logged in as a member of "EDITOR" group
    And I go to "/admin/pages"
    And I follow "Blocks Page"
    And I click on the caret button for block 1
    And I click on the "#Form_ElementForm_1_PageElements_1_MyPageID" element
    And I click on the ".ss-searchable-dropdown-field__option:nth-of-type(2)" element
    And I press the "View actions" button
    And I click on the ".element-editor__actions-save" element

  # Note that each test is split into a seperate scenario instead a large single scenario which would
  # be faster due to a limitation with behat testing react where changing the value of a field can
  # sometimes lead to the value of field being suffixed rather than replaced

  Scenario: Required field validation error with javascript
    When I fill in "" for "Title" for block 1
    Then I should see "Title is required" in the ".form__validation-message" element
    When I press the "View actions" button
    # Will not be an inline save button because formDirty not set yet, intercepted by JS validation
    Then I should not see a ".element-editor__actions-save" element

@sboyd
  Scenario: Field validation error
    When I fill in "x" for "Title" for block 1
    When I press the "View actions" button
    And I click on the ".element-editor__actions-save" element
    Then I should see "Title cannot be x" in the ".form__validation-message" element

  Scenario: General validation error
    When I fill in "z" for "Title" for block 1
    And I fill in "z" for "My Field" for block 1
    When I press the "View actions" button
    And I click on the ".element-editor__actions-save" element
    Then I should see "This is a general error message" in the ".message-box.alert" element

  Scenario: FormField validation error
    When I fill in "1" for "My Int" for block 1
    When I press the "View actions" button
    And I click on the ".element-editor__actions-save" element
    Then I should see "This field cannot be 1" in the ".form__validation-message" element
    # Reset value to something valid to prevent "unsaved changes" alert
    Then I fill in "2" for "My Int" for block 1
    # Ensure react field is filled in before submitting
    And I wait for 1 second
    # Need to save the whole page to stop the alert
    And I press the "Save" button

  Scenario: Publishing triggers validation error
    When I fill in "x" for "Title" for block 1
    When I press the "View actions" button
    And I click on the ".element-editor__actions-publish" element
    Then I should see "Title cannot be x" in the ".form__validation-message" element

  Scenario: Saving closed block triggers validation error
    When I fill in "x" for "My Field" for block 1
    And I click on the caret button for block 1
    Then I should not see "My Field"
    When I press the "View actions" button
    And I click on the ".element-editor__actions-save" element
    Then I should see "My Field"
    And I should see "MyField cannot be x" in the ".form__validation-message" element
    # Reset value to something valid to prevent "unsaved changes" alert
    Then I fill in "abc" for "My Field" for block 1
    # Ensure react field is filled in before submitting
    And I wait for 1 second
    # Need to save the whole page to stop the alert
    And I press the "Save" button
