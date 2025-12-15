/* global window */

import React, { useContext } from 'react';
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
const AddElementPopover = ({
  PopoverOptionSetComponent,
  elementTypes,
  container,
  extraClass,
  isOpen,
  placement,
  target,
  toggle,
  areaId,
  insertAfterElement,
  actions,
}) => {
  const context = useContext(ElementEditorContext);

  /**
   * Pass toggle to parent and clear the search input
   */
  const handleToggle = () => {
    toggle();
  };

  /**
   * - Call add element to area endpoint (areaID, elementType, insertAfterElementID)
   * - Then call read blocks from area endpoint (areaID)
   * - Then update the preview via jquery/entwine
   */
  const getElementButtonClickHandler = (elementType) => (event) => {
    event.preventDefault();
    const sectionConfigKey = 'DNADesign\\Elemental\\Controllers\\ElementalAreaController';
    const url = `${Config.getSection(sectionConfigKey).controllerLink}/api/create`;
    backend.post(url, {
      elementClass: elementType.class,
      elementalAreaID: areaId,
      insertAfterElementID: insertAfterElement,
    }, {
      'X-SecurityID': Config.get('SecurityID')
    })
      .then(() => {
        const { fetchElements } = context;
        return fetchElements();
      })
      .then(() => {
        const preview = window.jQuery('.cms-preview');
        preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));
      })
      .catch(async (err) => {
        const message = await getJsonErrorMessage(err);
        actions.toasts.error(message);
      });
    handleToggle();
  };

  const popoverClassNames = classNames(
    'element-editor-add-element',
    extraClass
  );

  const buttons = elementTypes.map((elementType) => ({
    content: <span className="btn__title">{elementType.title}</span>,
    key: elementType.name,
    className: classNames('btn--icon-xl', 'element-editor-add-element__button'),
    icon: elementType.icon.replace(/^(font-icon-)/g, ''),
    onClick: getElementButtonClickHandler(elementType),
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
      toggle={handleToggle}
    />
  );
};

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
