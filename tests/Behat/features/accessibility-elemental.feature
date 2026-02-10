@retry @job5
Feature: Accessibility
  As a CMS user
  I want to blocks to be accessible
  So that I can use them with assistive technologies

  Background:
    Given I add an extension "DNADesign\Elemental\Extensions\ElementalPageExtension" to the "Page" class
    And I add an extension "SilverStripe\FrameworkTest\Elemental\Extension\ElementContentExtension" to the "DNADesign\Elemental\Models\ElementContent" class
    And I go to "/dev/build?flush"
    And a "page" "Blocks Page" with a "My title" content element with "My content" content
    And the "group" "EDITOR" has permissions "Access to 'Pages' section"
    And I am logged in as a member of "EDITOR" group
    And I go to "/admin/pages"
    And I follow "Blocks Page"

  Scenario: Tab through inline edit forms
    # `#Form_EditForm_MenuTitle` is used as a clickable, predictable starting element above the blocks area
    # `#Form_EditForm_Metadata .ui-accordion-header` is used as a predictable ending element below the blocks area
    # `My file` is used to test if the form in an expanded state

    # Tab through an unrendered inline edit form
    Then I should not see "My file"
    When I click on the "#Form_EditForm_MenuTitle" element
    And I press the "Tab" key globally
    And I press the "Tab" key globally
    And I press the "Tab" key globally
    And I press the "Tab" key globally
    And I press the "Tab" key globally
    And I press the "Tab" key globally
    And I press the "Tab" key globally
    Then the "#Form_EditForm_Metadata .ui-accordion-header" element should have focus

    # Render the form
    When I click on the caret button for block 1
    Then I should see "My file"
    # Do a quick check that we can tab to a field in the form
    And I press the "Tab" key globally
    And I press the "Tab" key globally
    And I press the "Tab" key globally
    Then the ".element-editor__element input[type='text']" element should have focus

    # Tab through a rendered inline when collapsed (should be the same number of tabs as unrendered)
    When I click on the caret button for block 1
    Then I should not see "My file"
    When I click on the "#Form_EditForm_MenuTitle" element
    And I press the "Tab" key globally
    And I press the "Tab" key globally
    And I press the "Tab" key globally
    And I press the "Tab" key globally
    And I press the "Tab" key globally
    And I press the "Tab" key globally
    And I press the "Tab" key globally
    Then the "#Form_EditForm_Metadata .ui-accordion-header" element should have focus
