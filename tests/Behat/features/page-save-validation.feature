@retry
Feature: Blocks are validated when page saving blocks
  As a CMS user
  I want to blocks be validated when page saving blocks
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

  Scenario: Validation when page saving inline blocks

    # Related has_one RequiredFields
    When I click on the "#Form_ElementForm_1_PageElements_1_MyPageID" element
    And I click on the ".ss-searchable-dropdown-field__option:nth-of-type(1)" element
    And I press the "Save" button
    Then I should see "\"My page\" is required" in the "#Form_EditForm_error" element
    When I click on the caret button for block 1
    And I click on the "#Form_ElementForm_1_PageElements_1_MyPageID" element
    And I click on the ".ss-searchable-dropdown-field__option:nth-of-type(2)" element

    # FormField::validate()
    And I fill in "1" for "My Int" for block 1
    And I press the "Save" button
    Then I should see "This field cannot be 1" in the "#Form_EditForm_error" element
    And I click on the caret button for block 1
    And I fill in "2" for "My Int" for block 1

    # DataObject::validate() addFieldError()
    # Note that this currently has poor UX and will show the validation message on the
    # page Title field, rather than on the element Title field. This is expected.
    And I fill in "x" for "Title" for block 1
    And I press the "Save" button
    Then I should see "There are validation errors on this page, please fix them before saving or publishing." in the "#Form_EditForm_error" element
    Then I should see "Title cannot be x" in the "#message-Form_EditForm_Title" element
    And I click on the caret button for block 1
    And I fill in "lorem" for "Title" for block 1

    # DataObject::validate() addError()
    And I fill in "z" for "Title" for block 1
    And I fill in "z" for "My Field" for block 1
    And I press the "Save" button
    Then I should see "This is a general error message" in the "#Form_EditForm_error" element
    And I click on the caret button for block 1
    And I fill in "some title" for "Title" for block 1
    And I fill in "lorem" for "My Field" for block 1

    # Success message
    When I press the "Save" button
    Then I should see a "Saved 'Blocks Page' successfully." success toast
