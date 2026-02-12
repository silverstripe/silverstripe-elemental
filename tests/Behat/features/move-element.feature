@javascript @retry @job5
Feature: Move elements in the CMS
  As a CMS user
  I want to move elements in the CMS
  So that I can avoid recreating content from scratch

  Background:
    # Note: Explicitly DO NOT add the ElementalPageExtension extension to the "Page" class.
    #       This allows us to validate that page subclasses get boiled down to just "Page" as the hierarchical base.
    Given a "SilverStripe\FrameworkTest\Elemental\Model\MultiElementalBehatTestObject" "Blocks Object1"
    And a "SilverStripe\FrameworkTest\Elemental\Model\MultiElementalBehatTestObject" "Blocks Object2"
    And a "SilverStripe\FrameworkTest\Elemental\Model\ElementalBehatTestObject" "Blocks Object3"
    And a "Page" "Non-elemental page"
    And a "BasicElementalPage" "Blocks Page1" with a "Block A" content element with "Some content" content
    And the "BasicElementalPage" "Blocks Page1" has a "Block B" content element with "Some content II" content
    And a "BasicElementalPage" "Blocks Page2"
    And the "group" "EDITOR" has permissions "Access to 'Pages' section"
    And I am logged in as a member of "EDITOR" group

  Scenario: I can move a block from one page to another
    Given I go to "/admin/pages"
    And I left click on "Blocks Page1" in the tree
    When I press the "View actions" button for block 2
    Then I should see the move button for block 2
    # Validate the button explicitly, since I can't rely on 'And the "Move" button should be disabled' when the title changes
    And I should see the "button[title='Move']" element
    And I should not see the "button[title='Move, cannot move with unsaved changes']" element
    And the "Move" button should not be disabled

    # Dirty the form and try using the button
    When I click on the caret button for block 2
    And I fill in "Lorem" for "Title" for block 2
    When I press the "View actions" button for block 2
    Then I should see the move button for block 2
    # Unfortunately checking for a missing "button[title='Move']" element fails, because behat checks if the title is LIKE that, not EXACTLY that.
    And I should see the "button[title='Move, cannot move with unsaved changes']" element
    And the "Move, cannot move with unsaved changes" button should be disabled
    When I fill in "Block B" for "Title" for block 2
    And the "Move" button should not be disabled

    # Open the modal and check it has the correct initial state
    When I press the "Move" button
    Then I should see "Move block Block B" in the ".form-builder-modal .modal-title" element
    And I should see a "ParentClass" field
    And the "ParentClass" field should contain "SilverStripe\CMS\Model\SiteTree"
    # can't just check for "ParentID" field because that's a hidden input for tree dropdown field.
    And I should see a "Form_ElementForm_2_move_ParentID" field
    And I should see "Blocks Page1" in the "#Form_ElementForm_2_move_ParentID_Holder .treedropdownfield__value-container" element
    And I should not see a "ElementalAreaRelation" field
    # can't use "field should contain" for hidden fields
    And the "input[name=ElementalAreaRelation]" element "value" attribute should be "ElementalArea"

    # Try just submitting the form - get an error but state remains as it was
    When I press the "Move" button
    Then I should see a "Validation Error" error toast
    And I should see "Cannot move here" in the "#Form_ElementForm_2_move_ParentID_Holder .form__validation-message" element
    And the "ParentClass" field should contain "SilverStripe\CMS\Model\SiteTree"
    And I should see "Blocks Page1" in the "#Form_ElementForm_2_move_ParentID_Holder .treedropdownfield__value-container" element
    And the "input[name=ElementalAreaRelation]" element "value" attribute should be "ElementalArea"
    When I dismiss all toasts

    # Select a different page and submit
    When I select "Blocks Page2" in the "#Form_ElementForm_2_move_ParentID_Holder" tree dropdown
    Then I should see "Blocks Page2" in the "#Form_ElementForm_2_move_ParentID_Holder .treedropdownfield__value-container" element
    And I should not see a "ElementalAreaRelation" field
    And the "input[name=ElementalAreaRelation]" element "value" attribute should be "ElementalArea"
    When I press the "Move" button
    Then I should see a "Moved block 'Block B' successfully" success toast with these actions: Go to edit form for new block parent
    # Check the other page now shows the block
    Given I left click on "Blocks Page2" in the tree
    Then I should see "Block B"
    When I click on the caret button for block 1
    Then the "Content" field should contain "Some content II"
    And I should see "Draft" in the ".element-editor__element .element-editor-header__info .badge" element

  Scenario: I can move a block between elemental areas on the same parent record
    Given I go to "/admin/multi-elemental-behat-test-admin"
    And I click "Blocks Object1" in the ".ss-gridfield-items" element
    # Create elemental block first - can't use fixtures which rely on the relation named explicitly "ElementalArea"
    And I click on the "#Form_ItemEditForm_ElementalArea1 .element-editor__toolbar button" element
    And I click "Content" in the ".popover-option-set__button-container" element
    And I click on the caret button for block 1
    And I fill in "Lorem" for "Title" for block 1
    And I press the "View actions" button for block 1
    And I press the "Publish" button
    Then I should see a "Published 'Lorem' successfully" success toast

    # Open move modal and check initial state is as expected
    When I press the "View actions" button for block 1
    Then I should see the move button for block 1
    When I press the "Move" button
    Then I should see "Move block Lorem" in the ".form-builder-modal .modal-title" element
    And I should see a "ParentClass" field
    And the "ParentClass" field should contain "SilverStripe\FrameworkTest\Elemental\Model\MultiElementalBehatTestObject"
    # can't just check for "ParentID" field because that's a hidden input for searchable dropdown field.
    And I should see a "Form_ElementForm_3_move_ParentID__input" field
    And the "input[name=ParentID]" element "value" attribute should be "1"
    And I should see a "ElementalAreaRelation" field
    And the "ElementalAreaRelation" field should contain ""

    # Select the second elemental area and validate the state is correct
    When I select "ElementalArea2" from "ElementalAreaRelation"
    Then I should see a "ParentClass" field
    And the "ParentClass" field should contain "SilverStripe\FrameworkTest\Elemental\Model\MultiElementalBehatTestObject"
    # can't just check for "ParentID" field because that's a hidden input for searchable dropdown field.
    And I should see a "Form_ElementForm_3_move_ParentID__input" field
    And the "input[name=ParentID]" element "value" attribute should be "1"
    And I should see a "ElementalAreaRelation" field
    And the "ElementalAreaRelation" field should contain "ElementalArea2"

    # Move the block and check it has visible moved
    When I press the "Move" button
    # We shouldn't see the action, since we're staying on the same record.
    Then I should see a "Moved block 'Lorem' successfully" success toast with no actions
    Then I should not see "Lorem" in the "#Form_ItemEditForm_ElementalArea1" element
    And I should see "Lorem" in the "#Form_ItemEditForm_ElementalArea2" element
    And I should see "Draft" in the "#Form_ItemEditForm_ElementalArea2 .element-editor__element .element-editor-header__info .badge" element

  Scenario: I can move a block between different non-SiteTree DataObject parents
    Given I go to "/admin/multi-elemental-behat-test-admin"
    And I click "Blocks Object1" in the ".ss-gridfield-items" element
    # Create elemental block first - can't use fixtures which rely on the relation named explicitly "ElementalArea"
    And I click on the "#Form_ItemEditForm_ElementalArea1 .element-editor__toolbar button" element
    And I click "Content" in the ".popover-option-set__button-container" element
    And I click on the caret button for block 1
    And I fill in "Lorem" for "Title" for block 1
    And I press the "View actions" button for block 1
    And I press the "Publish" button
    Then I should see a "Published 'Lorem' successfully" success toast

    # Open move modal, select the new parent class, and move the block
    When I press the "View actions" button for block 1
    And I press the "Move" button
    And I select "SilverStripe\FrameworkTest\Elemental\Model\ElementalBehatTestObject" from "Parent type"
    # we can skip selecting the parent record itself because there's only one, so it's pre-selected
    When I press the "Move" button
    # The ElementalBehatTestObject class returns null for getCMSEditLink, so we shouldn't provide a link
    And I should see a "Moved block 'Lorem' successfully" success toast with no actions

    # Move the block back again
    Given I go to "/admin/elemental-behat-test-admin"
    And I click "Blocks Object3" in the ".ss-gridfield-items" element
    When I click on the caret button for block 1
    Then the "Title" field for block 1 should contain "Lorem"
    When I press the "View actions" button for block 1
    And I press the "Move" button
    And I select "SilverStripe\FrameworkTest\Elemental\Model\MultiElementalBehatTestObject" from "Parent type"
    And I click on the "#Form_ElementForm_3_move_ParentID" element
    And I click on the ".ss-searchable-dropdown-field__option:nth-of-type(2)" element
    And I select "ElementalArea2" from "Elemental Area"
    And I press the "Move" button
    And I should see a "Moved block 'Lorem' successfully" success toast with these actions: Go to edit form for new block parent
