import React from 'react';
import { compose } from 'redux';
import AbstractAction from 'components/ElementActions/AbstractAction';
import unpublishBlockMutation from 'state/editor/unpublishBlockMutation';
import i18n from 'i18n';

/**
 * Adds the elemental menu action to unpublish a published block
 */
const UnpublishAction = (WrappedComponent) => (props) => (
  <WrappedComponent {...props}>
    {props.children}

    {props.isPublished && <AbstractAction
      title={i18n._t('UnpublishAction.UNPUBLISH', 'Unpublish')}
      extraClass="element-editor__actions-unpublish"
      onClick={(event) => {
        event.stopPropagation();

        const { id, actions: { handleUnpublishBlock } } = props;

        if (handleUnpublishBlock) {
          handleUnpublishBlock(id);
        }
      }}
    />}
  </WrappedComponent>
);

export { UnpublishAction as Component };

export default compose(unpublishBlockMutation, UnpublishAction);
