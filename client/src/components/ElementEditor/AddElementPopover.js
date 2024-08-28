/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import classNames from 'classnames';
import * as toastsActions from 'state/toasts/ToastsActions';
import { inject } from 'lib/Injector';
import { elementTypeType } from 'types/elementTypeType';
import i18n from 'i18n';
import backend from 'lib/Backend';
import Config from 'lib/Config';
import { ElementEditorContext } from 'components/ElementEditor/ElementEditor';
import getJsonErrorMessage from 'lib/getJsonErrorMessage';

/**
 * The AddElementPopover component used in the context of an ElementEditor shows the
 * available elements that can be added to an ElementalArea.
 */
class AddElementPopover extends Component {
  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
    AddElementPopover.contextType = ElementEditorContext;
  }

  /**
   * - Call add element to area endpoint (areaID, elementType, insertAfterElementID)
   * - Then call read blocks from area endpoint (areaID)
   * - Then update the preview via jquery/entwine
   */
  getElementButtonClickHandler(elementType) {
    return (event) => {
      event.preventDefault();
      const sectionConfigKey = 'DNADesign\\Elemental\\Controllers\\ElementalAreaController';
      const url = `${Config.getSection(sectionConfigKey).controllerLink}/api/create`;
      backend.post(url, {
        elementClass: elementType.class,
        elementalAreaID: this.props.areaId,
        insertAfterElementID: this.props.insertAfterElement,
      }, {
        'X-SecurityID': Config.get('SecurityID')
      })
        .then(() => {
          const { fetchElements } = this.context;
          return fetchElements();
        })
        .then(() => {
          const preview = window.jQuery('.cms-preview');
          preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));
        })
        .catch(async (err) => {
          const message = await getJsonErrorMessage(err);
          this.props.actions.toasts.error(message);
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

    const buttons = elementTypes.map((elementType) => ({
      content: elementType.title,
      key: elementType.name,
      className: classNames(elementType.icon, 'btn--icon-xl', 'element-editor-add-element__button'),
      onClick: this.getElementButtonClickHandler(elementType),
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

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      toasts: bindActionCreators(toastsActions, dispatch),
    },
  };
}

export { AddElementPopover as Component };

const InjectedComponent = inject(
  ['PopoverOptionSet'],
  (PopoverOptionSetComponent) => ({
    PopoverOptionSetComponent,
  }),
  () => 'ElementEditor'
)(AddElementPopover);

export default compose(
  connect(null, mapDispatchToProps),
)(InjectedComponent);
