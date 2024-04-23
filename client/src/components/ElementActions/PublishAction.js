/* global window */
import React, { useContext, useEffect } from 'react';
import { compose } from 'redux';
import AbstractAction from 'components/ElementActions/AbstractAction';
import publishBlockMutation from 'state/editor/publishBlockMutation';
import i18n from 'i18n';
import { ElementContext } from 'components/ElementEditor/ElementContext';

/**
 * Adds the elemental menu action to publish a draft/modified block
 */
const PublishAction = (MenuComponent) => (props) => {
  const {
    doPublishElement,
    formDirty,
    formHasRendered,
    onAfterPublish,
    onPublishButtonClick,
  } = useContext(ElementContext);

  const { element, actions } = props;

  const publishElement = () => {
    // handlePublishBlock is a graphql mutation defined in publishBlockMutation.js
    actions.handlePublishBlock(element.id)
      .then(() => onAfterPublish(false))
      .catch(() => onAfterPublish(true));
  };

  const handleClick = (event) => {
    event.stopPropagation();
    onPublishButtonClick();
  };

  const disabled = props.element.canPublish !== undefined && !props.element.canPublish;
  const label = i18n._t('ElementArchiveAction.PUBLISH', 'Publish');
  const title = disabled
    ? i18n._t('ElementArchiveAction.PUBLISH_PERMISSION_DENY', 'Publish, insufficient permissions')
    : label;
  const newProps = {
    label,
    title,
    disabled,
    className: 'element-editor__actions-publish',
    onClick: handleClick,
    toggle: props.toggle,
  };

  useEffect(() => {
    if (formHasRendered && doPublishElement) {
      publishElement();
    }
  }, [formHasRendered, doPublishElement]);

  if (props.type.broken) {
    // Don't allow this action for a broken element.
    return (
      <MenuComponent {...props} />
    );
  }

  return (
    <MenuComponent {...props}>
      {props.children}
      {(formDirty || !element.isLiveVersion) && <AbstractAction {...newProps} />}
    </MenuComponent>
  );
};

export { PublishAction as Component };

export default compose(
  publishBlockMutation,
  PublishAction
);
