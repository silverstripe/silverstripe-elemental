/* global window */
import React from 'react';
import { compose } from 'redux';
import AbstractAction from 'components/ElementActions/AbstractAction';
import duplicateBlockMutation from 'state/editor/duplicateBlockMutation';
import i18n from 'i18n';

/**
 * Adds the elemental menu action to duplicate a block
 */
const DuplicateAction = (MenuComponent) => (props) => {
  const handleClick = (event) => {
    event.stopPropagation();

    const { element: { ID: id }, actions: { handleDuplicateBlock } } = props;

    if (handleDuplicateBlock) {
      handleDuplicateBlock(id).then(() => {
        const preview = window.jQuery('.cms-preview');
        preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));
      });
    }
  };

  const newProps = {
    title: i18n._t('ElementArchiveAction.DUPLICATE', 'Duplicate'),
    className: 'element-editor__actions-duplicate',
    onClick: handleClick,
    toggle: props.toggle,
  };

  return (
    <MenuComponent {...props}>
      {props.children}

      <AbstractAction {...newProps} />
    </MenuComponent>
  );
};

export { DuplicateAction as Component };

export default compose(duplicateBlockMutation, DuplicateAction);
