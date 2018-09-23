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
      handleUnpublishBlock(id);
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
    }
  };

  const newProps = {
    title: i18n._t('UnpublishAction.UNPUBLISH', 'Unpublish'),
    extraClass: 'element-editor__actions-unpublish',
    onClick: handleClick,
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
