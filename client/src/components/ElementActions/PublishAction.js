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

    const { id, version, actions: { handlePublishBlock } } = props;

    if (handlePublishBlock) {
      handlePublishBlock(id, 'DRAFT', 'LIVE', version);
    }
  };

  const newProps = {
    title: i18n._t('PublishAction.PUBLISH', 'Publish'),
    extraClass: 'element-editor__actions-publish',
    onClick: handleClick,
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
