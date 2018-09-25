/* global window */
import React from 'react';
import { compose } from 'redux';
import AbstractAction from 'components/ElementActions/AbstractAction';
import publishBlockMutation from 'state/editor/publishBlockMutation';
import i18n from 'i18n';

/**
 * Adds the elemental menu action to publish a draft/modified block
 */
const PublishAction = (MenuComponent) => (props) => {
  const handleClick = (event) => {
    event.stopPropagation();

    const { id, title, version, actions: { handlePublishBlock } } = props;
    const { jQuery: $ } = window;

    if (handlePublishBlock) {
      handlePublishBlock(id, 'DRAFT', 'LIVE', version)
        .then(() => {
          $.noticeAdd({
            text: i18n.inject(
              i18n._t(
                'UnpublishAction.SUCCESS_NOTIFICATION',
                'Published \'{title}\' successfully'),
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
                'Error publishing \'{title}\''),
              { title }
            ),
            stay: false,
            type: 'error'
          });
        });
    }
  };

  const newProps = {
    title: i18n._t('PublishAction.PUBLISH', 'Publish'),
    className: 'element-editor__actions-publish',
    onClick: handleClick,
    toggle: props.toggle,
  };

  return (
    <MenuComponent {...props}>
      {props.children}

      {!props.isLiveVersion && <AbstractAction {...newProps} />}
    </MenuComponent>
  );
};

export { PublishAction as Component };

export default compose(publishBlockMutation, PublishAction);
