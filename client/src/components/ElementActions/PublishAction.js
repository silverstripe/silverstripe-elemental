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
  const { element, actions: { handlePublishBlock } } = props;
  const handleClick = (event) => {
    event.stopPropagation();
    const { jQuery: $ } = window;
    const noTitle = i18n.inject(
      i18n._t(
        'ElementHeader.NOTITLE',
        'Untitled {type} block'
      ),
      { type: element.BlockSchema.type }
    );

    if (handlePublishBlock) {
      handlePublishBlock(element.ID, 'DRAFT', 'LIVE', element.Version)
        .then(() => {
          const preview = $('.cms-preview');
          preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));

          $.noticeAdd({
            text: i18n.inject(
              i18n._t(
                'UnpublishAction.SUCCESS_NOTIFICATION',
                'Published \'{title}\' successfully'),
              { title: element.Title || noTitle }
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
              { title: element.Title || noTitle }
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

      {!element.IsLiveVersion && <AbstractAction {...newProps} />}
    </MenuComponent>
  );
};

export { PublishAction as Component };

export default compose(publishBlockMutation, PublishAction);
