@retry @job5
Feature: Blocks are validated when saving blocks on a non-page dataobject
  As a CMS user
  I want to blocks be validated when page saving blocks
  So that I can see what content needs to be fixed

  Background:
    And I add an extension "SilverStripe\FrameworkTest\Elemental\Extension\ElementContentExtension" to the "DNADesign\Elemental\Models\ElementContent" class
    And I add an extension "SilverStripe\FrameworkTest\Elemental\Extension\NumericFieldExtension" to the "SilverStripe\Forms\NumericField" class
    And a "image" "file1.jpg"
    And I go to "/dev/build?flush"
    And the "SilverStripe\FrameworkTest\Elemental\Model\MultiElementalBehatTestObject" "Blocks Object"
    And the "group" "EDITOR" has permissions "Access to 'Pages' section"
    And I am logged in as a member of "EDITOR" group
    And I go to "/admin/multi-elemental-behat-test-admin"
    And I click "Blocks Object" in the ".ss-gridfield-items" element

  Scenario: Validation when parent saving inline blocks
    # ElementalArea 1 - Blank title - RequiredFields
    # Click "Add element" button
    And I click on the "#Form_ItemEditForm_ElementalArea1 .element-editor__toolbar button" element
    # Select ElementContent block type
    And I click "Content" in the ".popover-option-set__button-container" element
    # Open the inline edit form for the newly added block
    And I click on the caret button for block 1
    # Need to fill in at least one field so that the form is in a dirty state in
    # order for it be submitted on page object save
    And I fill in "Lorem" for "My Field" for block 1
    And I click on the "#Form_ElementForm_1_PageElements_1_MyPageID" element
    And I click on the ".ss-searchable-dropdown-field__option:nth-of-type(2)" element
    And I click "Choose existing" in the "#Form_ItemEditForm_ElementalArea1 .uploadfield" element
    And I press the "Back" HTML field button
    And I click on the file named "file1" in the gallery
    And I press the "Insert" button

    # ElementalArea 2 - Title=x - DataObject validate() method
    And I scroll to the bottom of the edit form panel
    # Click "Add element" button
    And I click on the "#Form_ItemEditForm_ElementalArea2 .element-editor__toolbar button" element
    # Select ElementContent block type
    # And I click on the ".font-icon-block-content" element
    And I click "Content" in the ".popover-option-set__button-container" element
    # Open the inline edit form for the newly added block
    And I click on the caret button for block 2
    And I fill in "x" for "Title" for block 2
    And I click on the "#Form_ElementForm_2_PageElements_2_MyPageID" element
    And I click on the ".ss-searchable-dropdown-field__option:nth-of-type(2)" element
    And I click "Choose existing" in the "#Form_ItemEditForm_ElementalArea2 .uploadfield" element
    And I press the "Back" HTML field button
    And I click on the file named "file1" in the gallery
    And I press the "Insert" button
    And I click on the caret button for block 2

    # Save the parent Object
    # Check that that client side validation for RequiredFields has been disabled
    # and that an error response triggers a single validation error toast
    When I press the "Save" button
    When I click on the ".toast__close" element
    Then I should see a "Validation Error" error toast
    Then I should not see a ".toast__close" element
    Then I should see "Title cannot be x"
    And I scroll to the top of the edit form panel
    Then I should see "\"Title\" is required"

    # Provide a valid value for the DataObject validate() test
    When I scroll to the bottom of the edit form panel
    And I fill in "Valid block two" for "Title" for block 2
    And I press the "Save" button

    # Only one success toast should show for the valid block,
    # We should see a failure toast for the invalid parent object
    Then I should see a "Saved 'Valid block two' successfully" success toast
    When I click on the ".toast__close" element
    Then I should see a "Validation Error" error toast
    When I click on the ".toast__close" element
    Then I should not see a ".toast__close" element

    # Provide a valid value for the RequiredFields test
    # The parent object will save after this is resolved
    When I scroll to the top of the edit form panel
    And I fill in "Valid block one" for "Title" for block 1
    And I press the "Save" button

    # Now should see 2x success toast messages, one for the block, the other for the parent object
    Then I should see a "Saved 'Valid block one' successfully" success toast
    When I click on the ".toast__close" element
    Then I should see a "Saved Multi Elemental Behat Test Object "Blocks Object" successfully." success toast
    When I click on the ".toast__close" element
    Then I should not see a ".toast__close" element
