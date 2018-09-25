/* global window */
import React from 'react';
import { compose } from 'redux';
import AbstractAction from 'components/ElementActions/AbstractAction';
import unpublishBlockMutation from 'state/editor/unpublishBlockMutation';
import i18n from 'i18n';

/**
 * Adds the elemental menu action to unpublish a published block
 */
const UnpublishAction = (MenuComponent) => (props) => {
  const handleClick = (event) => {
    event.stopPropagation();

    const { id, title, actions: { handleUnpublishBlock } } = props;
    const { jQuery: $ } = window;

    if (handleUnpublishBlock) {
      handleUnpublishBlock(id)
        .then(() => {
          $.noticeAdd({
            text: i18n.inject(
              i18n._t(
                'UnpublishAction.SUCCESS_NOTIFICATION',
                'Removed \'{title}\' from the published page'),
              { title }
            ),
            stay: false,
            type: 'success'
          });
        })
        .catch(() => {
          $.noticeAdd({
            text: i18n.inject(
              i18n._t(
                'UnpublishAction.ERROR_NOTIFICATION',
                'Error unpublishing \'{title}\''),
              { title }
            ),
            stay: false,
            type: 'error'
          });
        });
    }
  };

  const newProps = {
    title: i18n._t('UnpublishAction.UNPUBLISH', 'Unpublish'),
    className: 'element-editor__actions-unpublish',
    onClick: handleClick,
    toggle: props.toggle,
  };

  return (
    <MenuComponent {...props}>
      {props.children}

      {props.isPublished && <AbstractAction {...newProps} />}
    </MenuComponent>
  );
};

export { UnpublishAction as Component };

export default compose(unpublishBlockMutation, UnpublishAction);
