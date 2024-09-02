/* global window */
import React, { useContext } from 'react';
import AbstractAction from 'components/ElementActions/AbstractAction';
import i18n from 'i18n';
import { ElementEditorContext } from 'components/ElementEditor/ElementEditor';
import backend from 'lib/Backend';
import Config from 'lib/Config';
import { getConfig } from 'state/editor/elementConfig';
import getJsonErrorMessage from 'lib/getJsonErrorMessage';

/**
 * Adds the elemental menu action to archive a block of any state
 */
const ArchiveAction = (MenuComponent) => (props) => {
  const { fetchElements } = useContext(ElementEditorContext);

  const handleClick = (event) => {
    event.stopPropagation();
    const isPublished = props.element.isPublished;
    let archiveMessage = i18n._t(
      'ElementArchiveAction.CONFIRM_DELETE',
      'Are you sure you want to send this block to the archive?'
    );
    if (isPublished) {
      archiveMessage = i18n._t(
        'ElementArchiveAction.CONFIRM_DELETE_AND_UNPUBLISH',
        'Warning: This block will be unpublished before being sent to the archive. Are you sure you want to proceed?'
      );
    }
    // eslint-disable-next-line no-alert
    if (!window.confirm(archiveMessage)) {
      return;
    }
    const id = props.element.id;
    const url = `${getConfig().controllerLink.replace(/\/$/, '')}/api/delete`;
    backend.post(url, {
      id
    }, {
      'X-SecurityID': Config.get('SecurityID')
    })
      .then(() => fetchElements())
      .catch(async (err) => {
        const message = await getJsonErrorMessage(err);
        // Using jquery instead of redux toasts because redux won't connect to an AbstractAction
        window.jQuery.noticeAdd({
          text: message,
          stay: true,
          type: 'error',
        });
      });
  };

  const disabled = props.element.canDelete !== undefined && !props.element.canDelete;
  const label = i18n._t('ElementArchiveAction.ARCHIVE', 'Archive');
  const title = disabled
    ? i18n._t('ElementArchiveAction.ARCHIVE_PERMISSION_DENY', 'Archive, insufficient permissions')
    : label;
  const newProps = {
    label,
    title,
    disabled,
    className: 'element-editor__actions-archive',
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

export { ArchiveAction as Component };

export default ArchiveAction;
