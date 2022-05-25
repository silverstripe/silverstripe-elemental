Feature: Link to anchors in elements
As a cms author
I want to link to anchors in my content
So that I can direct users directly to the relevant information

  Background:
    Given a "page" "No Blocks" has the "Content" "<p>My awesome content<a name="normal-anchor"></a></p>"
      And a "BasicElementalPage" "Elemental" with a "Anchor Test Block" content element with "<p>My awesomer content<a name="element-anchor"></a></p>" content
      And the "BasicElementalPage" "Elemental" has a "Same Page Anchor Block" content element with "<p><a id="another-anchor"></a></p>" content
      And I am logged in with "ADMIN" permissions
      And I go to "/admin/pages"

  Scenario: I can link to anchors in an elemental block from a normal page
    Given I left click on "No Blocks" in the tree
      And I select "awesome" in the "Content" HTML field
      And I press the "Insert link" HTML field button
      And I click "Anchor on a page" in the ".mce-menu" element
    Then I should see an "form#Form_editorAnchorLink" element
      And I should see "No Blocks" in the "#Form_editorAnchorLink_PageID_Holder .Select-multi-value-wrapper" element
    When I click "No Blocks" in the "#Form_editorAnchorLink_PageID_Holder .Select-multi-value-wrapper" element
      And I click "Elemental" in the "#Form_editorAnchorLink_PageID_Holder .Select-menu-outer" element
      And I click "Select or enter anchor" in the "#Form_editorAnchorLink_Anchor_Holder .Select-multi-value-wrapper" element
      And I click "element-anchor" in the "#Form_editorAnchorLink_Anchor_Holder .Select-menu-outer" element
    Then I should see "element-anchor" in the "#Form_editorAnchorLink_Anchor_Holder .Select-value" element
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
      And I click "Anchor on a page" in the ".mce-menu" element
    Then I should see an "form#Form_editorAnchorLink" element
      And I should see "Elemental" in the "#Form_editorAnchorLink_PageID_Holder .Select-multi-value-wrapper" element
    When I click "Elemental" in the "#Form_editorAnchorLink_PageID_Holder .Select-multi-value-wrapper" element
      And I click "No Blocks" in the "#Form_editorAnchorLink_PageID_Holder .Select-menu-outer" element
      And I click "Select or enter anchor" in the "#Form_editorAnchorLink_Anchor_Holder .Select-multi-value-wrapper" element
      And I click "normal-anchor" in the "#Form_editorAnchorLink_Anchor_Holder .Select-menu-outer" element
    Then I should see "normal-anchor" in the "#Form_editorAnchorLink_Anchor_Holder .Select-value" element
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
      And I click "Anchor on a page" in the ".mce-menu" element
    Then I should see an "form#Form_editorAnchorLink" element
      And I should see "Elemental" in the "#Form_editorAnchorLink_PageID_Holder .Select-multi-value-wrapper" element
    When I click "Select or enter anchor" in the "#Form_editorAnchorLink_Anchor_Holder .Select-multi-value-wrapper" element
      And I click "another-anchor" in the "#Form_editorAnchorLink_Anchor_Holder .Select-menu-outer" element
    Then I should see "another-anchor" in the "#Form_editorAnchorLink_Anchor_Holder .Select-value" element
    # Close the dialog now that we're done with it.
    When I click on the "button.close" element
