@javascript
Feature: Archive elements in the CMS
  As a CMS user
  I want to archive elements in the CMS
  So that I can remove elements I have used on a page


  Background:
    Given I add an extension "DNADesign\Elemental\Extensions\ElementalPageExtension" to the "Page" class
      And a "page" "Blocks Page" with a "Alice's Block" content element with "Some content" content
      And the "page" "Blocks Page" has a "Bob's Block" content element with "Some content II" content

    Given I am logged in with "ADMIN" permissions
      # Remove with 'And I click "Blocks Page" in the ".breadcrumbs-wrapper" element' once the ElementalArea refreshes,
      # See https://github.com/dnadesign/silverstripe-elemental/issues/320
      And I go to "/admin/pages/edit/show/6"
    When I see a list of blocks
      Then I should see "Alice's Block"
      And I should see "Bob's Block"

  @modal
  Scenario: I can archive a block
    Given I see a list of blocks
    When I press the "View actions" button
      Then I should see the archive button for block 1
    When I press the "Archive" button
      And I see the text "Are you sure you want to send this block to the archive?" in the alert
      And I confirm the dialog
      And I wait for 2 seconds
    Then I see a list of blocks
      And I should see "Bob's Block"
      But I should not see "Alice's Block"
