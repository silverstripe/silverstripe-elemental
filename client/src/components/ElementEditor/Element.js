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

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  /**
   * Take the user to the GridFieldDetailForm to edit the record
   */
  handleClick() {
    const { link } = this.props;

    window.location = link;
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
      element: { ID, Title, BlockSchema },
      HeaderComponent,
      ContentComponent,
    } = this.props;

    const linkTitle = i18n.inject(
      i18n._t('ElementalElement.TITLE', 'Edit this {type} block'), { type: BlockSchema.type }
    );

    if (!ID) {
      return null;
    }

    return (
      <span
        className="element-editor__element"
        onClick={this.handleClick}
        onKeyUp={this.handleKeyUp}
        role="button"
        tabIndex={0}
        title={linkTitle}
      >
        <HeaderComponent
          id={ID}
          title={Title}
          elementType={BlockSchema.type}
          fontIcon={BlockSchema.iconClass}
        />
        <ContentComponent
          fileUrl={BlockSchema.fileURL}
          fileTitle={BlockSchema.fileTitle}
          content={BlockSchema.content}
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
