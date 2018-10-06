/* global window */

import React, { Component, PropTypes } from 'react';
import { elementType } from 'types/elementType';
import { inject } from 'lib/Injector';
import i18n from 'i18n';
import classNames from 'classnames';
import { getElementTypeConfig } from 'state/editor/getElementConfig';

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
   * Expand the element to show the  preview
   * If the element is not inline-editable, take user to the GridFieldDetailForm to edit the record
   */
  handleExpand(event) {
    const { element } = this.props;
    const { inlineEditable } = getElementTypeConfig(element.__typename).properties;

    if (event.target.type === 'button') {
      // Stop bubbling if the click target was a button within this container
      event.stopPropagation();
      return;
    }

    if (inlineEditable) {
      this.setState({
        previewExpanded: !this.state.previewExpanded
      });
      return;
    }

    // If inline editing is disabled for this element, send them to the standalone
    // edit form
    window.location = element.CMSEditLink;
  }

  /**
   * If pressing enter or space key, treat it like a mouse click
   *
   * @param {Object} event
   */
  handleKeyUp(event) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      this.handleExpand(event);
    }
  }

  render() {
    const {
      element,
      HeaderComponent,
      ContentComponent,
      areaId,
    } = this.props;

    const { previewExpanded } = this.state;

    const linkTitle = i18n.inject(
      i18n._t('ElementalElement.TITLE', 'Edit this {type} block'),
      { type: getElementTypeConfig(element.__typename).properties.type }
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
      >
        <HeaderComponent
          element={element}
          areaId={areaId}
          previewExpanded={previewExpanded}
        />
        <ContentComponent
          element={element}
          previewExpanded={previewExpanded}
        />
      </div>
    );
  }
}

Element.propTypes = {
  element: elementType,
  areaId: PropTypes.string,
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
