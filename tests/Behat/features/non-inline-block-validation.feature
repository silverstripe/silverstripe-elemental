@retry @job7
Feature: Blocks are validated when non-inline saving blocks
  As a CMS user
  I want to blocks have be validating when non-inline saving them
  So that I can see what content needs to be fixed

  Background:
    Given I add an extension "DNADesign\Elemental\Extensions\ElementalPageExtension" to the "Page" class
    And I add an extension "SilverStripe\FrameworkTest\Elemental\Extension\ElementContentExtension" to the "DNADesign\Elemental\Models\ElementContent" class
    And I add an extension "SilverStripe\FrameworkTest\Elemental\Extension\NumericFieldExtension" to the "SilverStripe\Forms\NumericField" class
    And a "image" "file1.jpg"
    And content blocks are not in-line editable
    And I go to "/dev/build?flush"
    And a "page" "Blocks Page" with a "My title" content element with "My content" content
    And the "group" "EDITOR" has permissions "Access to 'Pages' section"
    And I am logged in as a member of "EDITOR" group
    And I go to "/admin/pages"
    And I follow "Blocks Page"
    And I click on the caret button for block 1

  Scenario: Non-inline block validation

    # Related has_one RequiredFields with ID suffix (MyPageID)
    When I press the "Save" button
    Then I should see "\"My page\" is required" in the "#message-Form_ItemEditForm_MyPageID" element
    And I click on the "#Form_ItemEditForm_MyPageID" element
    And I click on the ".ss-searchable-dropdown-field__option:nth-of-type(2)" element

    # Related has_one RequiredFields without ID suffix (MyFile)
    Then I should see "\"My file\" is required" in the "#message-Form_ItemEditForm_MyFile" element
    When I click "Choose existing" in the ".uploadfield" element
    And I press the "Back" HTML field button
    And I click on the file named "file1" in the gallery
    And I press the "Insert" button

    # RequiredFields on TextCheckboxGroupField (composite) field
    When I fill in "Title" with ""
    And I press the "Save" button
    Then I should see "\"Title\" is required" in the "#message-Form_ItemEditForm_Title" element
    And I fill in "Title" with "My title"

    # FormField::validate()
    When I fill in "My Int" with "1"
    And I press the "Save" button
    Then I should see "This field cannot be 1" in the "#message-Form_ItemEditForm_MyInt" element
    And I fill in "My Int" with "2"

    # DataObject::validate() addFieldError()
    When I fill in "My Field" with "x"
    And I press the "Save" button
    Then I should see "MyField cannot be x" in the "#message-Form_ItemEditForm_MyField" element
    And I fill in "My Field" with "lorem"

    # DataObject::validate() addError()
    When I fill in "Title" with "z"
    And I fill in "My Field" with "z"
    And I press the "Save" button
    Then I should see "This is a general error message" in the "#Form_ItemEditForm_error" element
    And I fill in "Title" with "My title"
    And I fill in "My Field" with "lorem"

    # Success message
    When I press the "Save" button
    Then I should see "Saved content block \"My title\"" in the "#Form_ItemEditForm_error" element
    Then I should see "Home" in the "#Form_ItemEditForm_MyPageID" element
    And I should see "file1" in the ".uploadfield-item__title" element
