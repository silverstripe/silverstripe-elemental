/* global window */
import React, { useContext } from 'react';
import { compose } from 'redux';
import AbstractAction from 'components/ElementActions/AbstractAction';
import duplicateBlockMutation from 'state/editor/duplicateBlockMutation';
import i18n from 'i18n';
import { ElementEditorContext } from 'components/ElementEditor/ElementEditor';
import backend from 'lib/Backend';

/**
 * Adds the elemental menu action to duplicate a block
 */
const DuplicateAction = (MenuComponent) => (props) => {
  const { fetchBlocks } = useContext(ElementEditorContext);

  if (props.type.broken) {
    // Don't allow this action for a broken element.
    return (
      <MenuComponent {...props} />
    );
  }

  const handleClick = (event) => {
    event.stopPropagation();
    const globalUseGraphqQL = false;
    if (globalUseGraphqQL) {
      const { element: { id }, actions: { handleDuplicateBlock } } = props;
      if (handleDuplicateBlock) {
        handleDuplicateBlock(id).then(() => {
          const preview = window.jQuery('.cms-preview');
          preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));
        });
      }
    } else {
      const id = props.element.id;
      backend.post('/admin/elemental-area/duplicate', {
        ID: id,
      })
        .then(() => fetchBlocks());
    }
  }

  const disabled = props.element.canCreate !== undefined && !props.element.canCreate;
  const label = i18n._t('ElementArchiveAction.DUPLICATE', 'Duplicate');
  const title = disabled
    ? i18n._t('ElementArchiveAction.DUPLICATE_PERMISSION_DENY', 'Duplicate, insufficient permissions')
    : label;
  const newProps = {
    label,
    title,
    disabled,
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
