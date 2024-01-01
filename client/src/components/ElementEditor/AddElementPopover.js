/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { inject } from 'lib/Injector';
import { elementTypeType } from 'types/elementTypeType';
import i18n from 'i18n';
import backend from 'lib/Backend';

/**
 * The AddElementPopover component used in the context of an ElementEditor shows the
 * available elements that can be added to an ElementalArea.
 */
class AddElementPopover extends Component {
  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
  }

  /**
   * #graphql
   * 
   * click handler that preserves the details of what was clicked
   * @param {object} elementType in the shape of types/elmementTypeType
   * @returns {function}
   */
  getGraphQLElementButtonClickHandler(elementType) {
    return (event) => {
      // handleAddElementToArea comes from addElementMutation.js
      const {
        actions: { handleAddElementToArea },
        insertAfterElement
      } = this.props;

      event.preventDefault();
      handleAddElementToArea(elementType.class, insertAfterElement).then(
        () => {
          const preview = window.jQuery('.cms-preview');
          preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));
        }
      );
      this.handleToggle();
    };
  }

  /**
   * #rpc
   * - call add element to area endpoint (areaID, elementType, insertAfterElementID)
   * - then call read blocks from area endpoint (areaID)
   * - also then update the preview via jquery/entwine
   */
  getElementButtonClickHandler(elementType) {
    return (event) => {
      event.preventDefault();
      backend.post(`/admin/elemental-area/add/`,{
        elementClass: elementType.class,
        elementalAreaID: this.props.areaId,
        insertAfterElementID: this.props.insertAfterElement,
      })
        .then(() => {
          // todo call read blocks from area endpoint (areaID)
        })
        .then(() => {
            const preview = window.jQuery('.cms-preview');
            preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));
        });
      this.handleToggle();
    };
  }

  /**
   * Pass toggle to parent and clear the search input
   */
  handleToggle() {
    const { toggle } = this.props;

    toggle();
  }

  /**
   * Render the add element popover
   * @returns {DOMElement}
   */
  render() {
    const {
      PopoverOptionSetComponent, elementTypes,
      container, extraClass, isOpen, placement, target
    } = this.props;

    const popoverClassNames = classNames(
      'element-editor-add-element',
      extraClass
    );

    const globalUseGraphQL = false;

    const buttons = elementTypes.map((elementType) => ({
      content: elementType.title,
      key: elementType.name,
      className: classNames(elementType.icon, 'btn--icon-xl', 'element-editor-add-element__button'),
      onClick: globalUseGraphQL
        ? this.getGraphQLElementButtonClickHandler(elementType)
        : this.getElementButtonClickHandler(elementType),
    }));

    return (
      <PopoverOptionSetComponent
        buttons={buttons}
        searchPlaceholder={i18n._t('ElementAddElementPopover.SEARCH_BLOCKS', 'Search blocks')}
        extraClass={popoverClassNames}
        container={container}
        isOpen={isOpen}
        placement={placement}
        target={target}
        toggle={this.handleToggle}
      />
    );
  }
}

AddElementPopover.propTypes = {
  container: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  elementTypes: PropTypes.arrayOf(elementTypeType).isRequired,
  extraClass: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  isOpen: PropTypes.bool.isRequired,
  placement: PropTypes.string,
  target: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]).isRequired,
  toggle: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  areaId: PropTypes.number.isRequired,
  insertAfterElement: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default inject(
  ['PopoverOptionSet'],
  (PopoverOptionSetComponent) => ({
    PopoverOptionSetComponent,
  }),
  () => 'ElementEditor'
)(AddElementPopover);
