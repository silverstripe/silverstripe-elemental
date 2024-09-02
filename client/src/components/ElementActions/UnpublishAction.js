/* global window */
import React, { useContext } from 'react';
import AbstractAction from 'components/ElementActions/AbstractAction';
import i18n from 'i18n';
import backend from 'lib/Backend';
import { ElementEditorContext } from 'components/ElementEditor/ElementEditor';
import Config from 'lib/Config';
import { getConfig } from 'state/editor/elementConfig';

/**
 * Adds the elemental menu action to unpublish a published block
 */
const UnpublishAction = (MenuComponent) => (props) => {
  const { fetchElements } = useContext(ElementEditorContext);

  if (props.type.broken) {
    // Don't allow this action for a broken element.
    return (
      <MenuComponent {...props} />
    );
  }

  const reportUnpublicationStatus = (type, title, success) => {
    const noTitle = i18n.inject(
      i18n._t('ElementHeader.NOTITLE', 'Untitled {type} block'),
      { type }
    );
    const successMessage = i18n.inject(
      i18n._t('ElementUnpublishAction.SUCCESS_NOTIFICATION', 'Removed \'{title}\' from the published page'),
      { title: title || noTitle }
    );
    const errorMessage = i18n.inject(
      i18n._t('ElementUnpublishAction.ERROR_NOTIFICATION', 'Error unpublishing \'{title}\''),
      { title: title || noTitle }
    );
    // Using jquery instead of redux toasts because redux won't connect to an AbstractAction
    window.jQuery.noticeAdd({
      text: success ? successMessage : errorMessage,
      stay: false,
      type: success ? 'success' : 'error',
    });
  };

  const unpublishElement = () => {
    const id = props.element.id;
    const url = `${getConfig().controllerLink.replace(/\/$/, '')}/api/unpublish`;
    return backend.post(url, {
      id,
    }, {
      'X-SecurityID': Config.get('SecurityID')
    })
      .then(() => fetchElements())
      .then(() => reportUnpublicationStatus(props.type.title, props.element.title, true))
      .catch(() => reportUnpublicationStatus(props.type.title, props.element.title, false));
  };

  const handleClick = (event) => {
    event.stopPropagation();
    unpublishElement();
  };

  const disabled = props.element.canUnpublish !== undefined && !props.element.canUnpublish;
  const label = i18n._t('ElementArchiveAction.UNPUBLISH', 'Unpublish');
  const title = disabled
    ? i18n._t('ElementArchiveAction.UNPUBLISH_PERMISSION_DENY', 'Unpublish, insufficient permissions')
    : label;
  const newProps = {
    label,
    title,
    disabled,
    className: 'element-editor__actions-unpublish',
    onClick: handleClick,
    toggle: props.toggle,
  };

  return (
    <MenuComponent {...props}>
      {props.children}
      {props.element.isPublished && <AbstractAction {...newProps} />}
    </MenuComponent>
  );
};

export { UnpublishAction as Component };

export default UnpublishAction;
