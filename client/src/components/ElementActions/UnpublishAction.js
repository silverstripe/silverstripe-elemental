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

    const { id, actions: { handleUnpublishBlock } } = props;

    if (handleUnpublishBlock) {
      handleUnpublishBlock(id);
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
