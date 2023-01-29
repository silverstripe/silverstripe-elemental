Feature: Link to anchors in elements
As a cms author
I want to link to anchors in my content
So that I can direct users directly to the relevant information

  Background:
    Given a "page" "No Blocks" has the "Content" "<p>My awesome content<a name="normal-anchor"></a></p>"
      And a "BasicElementalPage" "Elemental" with a "Anchor Test Block" content element with "<p>My awesomer content<a name="element-anchor"></a></p>" content
      And the "BasicElementalPage" "Elemental" has a "Same Page Anchor Block" content element with "<p><a id="another-anchor"></a></p>" content
      And the "group" "EDITOR" has permissions "Access to 'Pages' section"
      And I am logged in as a member of "EDITOR" group
      And I go to "/admin/pages"

  Scenario: I can link to anchors in an elemental block from a normal page
    Given I left click on "No Blocks" in the tree
      And I select "awesome" in the "Content" HTML field
      And I press the "Insert link" HTML field button
      And I click "Anchor on a page" in the ".tox-menu" element
    Then I should see an "form#Form_editorAnchorLink" element
      And I should see "No Blocks" in the "#Form_editorAnchorLink_PageID_Holder .treedropdownfield__value-container" element
    When I select "Elemental" in the "#Form_editorAnchorLink_PageID_Holder" tree dropdown
      And I select "element-anchor" in the "#Form_editorAnchorLink_Anchor_Holder" anchor dropdown
    Then I should see "element-anchor" in the "#Form_editorAnchorLink_Anchor_Holder .anchorselectorfield__value-container" element
    # Close the dialog now that we're done with it.
    When I click on the "button.close" element

  Scenario: I can link to anchors on a normal page from an elemental block
    Given I left click on "Elemental" in the tree
    Then I should see a list of blocks
      And I should see "Anchor Test Block"
    Given I click on block 1
      Then the "Content" field for block 1 should contain "My awesomer content"
    When I select "awesomer" in the "Content" HTML field
      And I press the "Insert link" HTML field button
      And I click "Anchor on a page" in the ".tox-menu" element
    Then I should see an "form#Form_editorAnchorLink" element
      And I should see "Elemental" in the "#Form_editorAnchorLink_PageID_Holder .treedropdownfield__value-container" element
    When I select "No Blocks" in the "#Form_editorAnchorLink_PageID_Holder" tree dropdown
      And I select "normal-anchor" in the "#Form_editorAnchorLink_Anchor_Holder" anchor dropdown
    Then I should see "normal-anchor" in the "#Form_editorAnchorLink_Anchor_Holder .anchorselectorfield__value-container" element
    # Close the dialog now that we're done with it.
    When I click on the "button.close" element

  Scenario: I can link to anchors in an elemental block from another elemental block
    Given I left click on "Elemental" in the tree
      And I should see a list of blocks
      And I should see "Anchor Test Block"
    Given I click on block 1
      Then the "Content" field for block 1 should contain "My awesomer content"
    When I select "awesomer" in the "Content" HTML field
      And I press the "Insert link" HTML field button
      And I click "Anchor on a page" in the ".tox-menu" element
    Then I should see an "form#Form_editorAnchorLink" element
      And I should see "Elemental" in the "#Form_editorAnchorLink_PageID_Holder .treedropdownfield__value-container" element
    When I select "another-anchor" in the "#Form_editorAnchorLink_Anchor_Holder" anchor dropdown
    Then I should see "another-anchor" in the "#Form_editorAnchorLink_Anchor_Holder .anchorselectorfield__value-container" element
    # Close the dialog now that we're done with it.
    When I click on the "button.close" element
