/* global window */

import React, { Component, PropTypes } from 'react';
import { elementType } from 'types/elementType';
import { inject } from 'lib/Injector';
import i18n from 'i18n';

/**
 * The Element component used in the context of an ElementEditor shows the summary
 * of an element's details when used in the CMS, including ID, Title and Summary.
 */
class Element extends Component {
  constructor(props) {
    super(props);

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleExpand = this.handleExpand.bind(this);

    this.state = {
      previewExpanded: false,
    };
  }

  /**
   * Expand the element to show the  preview
   * If the element is not inline-editable, take user to the GridFieldDetailForm to edit the record
   */
  handleExpand() {
    const {
      element,
      link
    } = this.props;

    if (element.InlineEditable) {
      this.setState({
        previewExpanded: !this.state.previewExpanded
      });
    } else {
      // link to edit form
      window.location = link;
    }
  }

  /**
   * If pressing enter key, treat it like a mouse click
   *
   * @param {Object} event
   */
  handleKeyUp(event) {
    if (event.keyCode === 13) {
      this.handleClick();
    }
  }

  render() {
    const {
      element,
      HeaderComponent,
      ContentComponent,
      link,
    } = this.props;

    const {
      previewExpanded,
    } = this.state;

    const linkTitle = i18n.inject(
      i18n._t('ElementalElement.TITLE', 'Edit this {type} block'),
      { type: element.BlockSchema.type }
    );

    if (!element.ID) {
      return null;
    }

    return (
      <span
        className="element-editor__element"
        onClick={this.handleExpand}
        onKeyUp={this.handleKeyUp}
        role="button"
        tabIndex={0}
        title={linkTitle}
      >
        <HeaderComponent
          id={element.ID}
          title={element.Title}
          elementType={element.BlockSchema.type}
          fontIcon={element.BlockSchema.iconClass}
          link={link}
          caretClickCallback={this.handleExpand}
          previewExpanded={previewExpanded}
          expandable={element.InlineEditable}
        />
        <ContentComponent
          fileUrl={element.BlockSchema.fileURL}
          fileTitle={element.BlockSchema.fileTitle}
          content={element.BlockSchema.content}
          previewExpanded={previewExpanded}
        />
      </span>
    );
  }
}

Element.propTypes = {
  element: elementType,
  link: PropTypes.string.isRequired,
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
