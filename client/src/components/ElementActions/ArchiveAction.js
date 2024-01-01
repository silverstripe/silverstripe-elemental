/* global window */
import React, { useContext } from 'react';
import { compose } from 'redux';
import AbstractAction from 'components/ElementActions/AbstractAction';
import archiveBlockMutation from 'state/editor/archiveBlockMutation';
import i18n from 'i18n';
import { ElementEditorContext } from 'components/ElementEditor/ElementEditor';
import backend from 'lib/Backend';

/**
 * Adds the elemental menu action to archive a block of any state
 */
const ArchiveAction = (MenuComponent) => (props) => {
  const { fetchBlocks } = useContext(ElementEditorContext);

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
    if (!window.confirm(archiveMessage)) {
      return;
    }
    const globalUseGraphqQL = false;
    if (globalUseGraphqQL) {
      const { element: { id }, actions: { handleArchiveBlock } } = props;
      // eslint-disable-next-line no-alert
      if (handleArchiveBlock) {
        handleArchiveBlock(id).then(() => {
          const preview = window.jQuery('.cms-preview');
          preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));
        });
      }
    } else {
      const id = props.element.id;
      backend.post(`/admin/elemental-area/archive`, {
        ID: id,
      })
        .then(() => fetchBlocks());
    }
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

export default compose(archiveBlockMutation, ArchiveAction);
