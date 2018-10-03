/* global window */

import React, { Component, PropTypes } from 'react';
import { elementType } from 'types/elementType';
import { inject } from 'lib/Injector';
import i18n from 'i18n';
import classNames from 'classnames';

/**
 * The Element component used in the context of an ElementEditor shows the summary
 * of an element's details when used in the CMS, including ID, Title and Summary.
 */
class Element extends Component {
  constructor(props) {
    super(props);

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);

    this.state = {
      previewExpanded: false,
      activeTab: '',
    };
  }

  /**
   * Returns the applicable versioned state class names for the element
   *
   * @returns {string}
   */
  getVersionedStateClassName() {
    const { element } = this.props;

    const baseClassName = 'element-editor__element';

    if (!element.IsPublished) {
      return `${baseClassName}--draft`;
    }

    if (element.IsPublished && !element.IsLiveVersion) {
      return `${baseClassName}--modified`;
    }

    return `${baseClassName}--published`;
  }

  /**
   * Update the active tab state on tab click that is passed down to InlineEditForm
   *
   * @param {string} toBeActiveTab
   */
  handleTabClick(toBeActiveTab) {
    this.setState({
      activeTab: toBeActiveTab,
      previewExpanded: true,
    });
  }

  /**
   * Expand the element to show the  preview
   * If the element is not inline-editable, take user to the GridFieldDetailForm to edit the record
   */
  handleExpand(event) {
    const { element, link } = this.props;

    if (event.target.type === 'button') {
      // Stop bubbling if the click target was a button within this container
      event.stopPropagation();
      return;
    }

    if (element.InlineEditable) {
      this.setState({
        previewExpanded: !this.state.previewExpanded
      });
      return;
    }

    // If inline editing is disabled for this element, send them to the standalone
    // edit form
    window.location = link;
  }

  /**
   * If pressing enter or space key, treat it like a mouse click
   *
   * @param {Object} event
   */
  handleKeyUp(event) {
    const { nodeName } = event.target;

    if (event.code === 'Enter') {
      this.handleExpand(event);
    } else if (
      event.code === 'Space'
      // Ignore space presses while focusing inputs and textareas
      && !['input', 'textarea'].includes(nodeName.toLowerCase())
    ) {
      this.handleExpand(event);
    }
  }

  render() {
    const {
      element,
      HeaderComponent,
      ContentComponent,
      link,
      editTabs,
      pageId,
    } = this.props;

    const { previewExpanded, activeTab } = this.state;

    const linkTitle = i18n.inject(
      i18n._t('ElementalElement.TITLE', 'Edit this {type} block'),
      { type: element.BlockSchema.type }
    );

    if (!element.ID) {
      return null;
    }

    const elementClassNames = classNames(
      'element-editor__element',
      {
        'element-editor__element--expandable': element.InlineEditable,
      },
      this.getVersionedStateClassName()
    );

    return (
      <div
        className={elementClassNames}
        onClick={this.handleExpand}
        onKeyUp={this.handleKeyUp}
        role="button"
        tabIndex={0}
        title={linkTitle}
        key={element.ID}
      >
        <HeaderComponent
          id={element.ID}
          title={element.Title}
          version={element.Version}
          isLiveVersion={element.IsLiveVersion}
          isPublished={element.IsPublished}
          elementType={element.BlockSchema.type}
          fontIcon={element.BlockSchema.iconClass}
          link={link}
          pageId={pageId}
          editTabs={editTabs}
          previewExpanded={previewExpanded}
          expandable={element.InlineEditable}
          handleEditTabsClick={this.handleTabClick}
        />
        <ContentComponent
          id={element.ID}
          fileUrl={element.BlockSchema.fileURL}
          fileTitle={element.BlockSchema.fileTitle}
          content={element.BlockSchema.content}
          previewExpanded={previewExpanded}
          activeTab={activeTab}
        />
      </div>
    );
  }
}

Element.propTypes = {
  element: elementType,
  link: PropTypes.string.isRequired,
  editTabs: PropTypes.arrayOf(PropTypes.object),
};

Element.defaultProps = {
  element: null,
};

export { Element as Component };

export default inject(
  ['ElementHeader', 'ElementContent'],
  (HeaderComponent, ContentComponent) => ({
    HeaderComponent, ContentComponent,
  }),
  () => 'ElementEditor.ElementList.Element'
)(Element);
