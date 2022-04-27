Feature: Preview a non-inline-editable block
  As an author
  I want to preview the parent page of the non-inline-editable block I'm editing in the CMS
  So that I can see how it would look like to my visitors

  Background:
    Given I add an extension "DNADesign\Elemental\Extensions\ElementalPageExtension" to the "Page" class
      And I add an extension "DNADesign\Elemental\Tests\Src\TestReplacePageContentExtension" to the "Page" class
      And content blocks are not in-line editable
      And a "page" "Preview Blocks Page" with a "Alice's Block" content element with "Alice's content" content

    Given I am logged in with "ADMIN" permissions
      And I go to "/admin/pages"
      And I left click on "Preview Blocks Page" in the tree
      And I set the CMS mode to "Edit mode"
      And I press the "Publish" button
      And I click on block 1

  @javascript
  Scenario: I can show a preview of the current block's page from the pages section
    When I set the CMS mode to "Preview mode"
    Then I can see the preview panel
      And the preview contains "Alice's content"

    Given I set the CMS mode to "Edit mode"

  @javascript
  Scenario: I can see an updated preview when editing inline-editable blocks
    When I fill in "<p>New published content</p>" for the "Content" HTML field
      And I press the "Publish" button
      And I fill in "<p>New preview content</p>" for the "Content" HTML field
      And I press the "Save" button
      And I set the CMS mode to "Preview mode"

    When I switch the preview to "Published"
    Then the preview does not contain "New preview content"
      And the preview contains "New published content"

    When I switch the preview to "Draft"
    Then the preview does not contain "New published content"
      And the preview contains "New preview content"

    Given I set the CMS mode to "Edit mode"
