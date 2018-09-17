/* global confirm */
import React from 'react';
import { compose } from 'redux';
import AbstractAction from 'components/ElementActions/AbstractAction';
import archiveBlockMutation from 'state/editor/archiveBlockMutation';
import i18n from 'i18n';

/**
 * Adds the elemental menu action to archive a block of any state
 */
const ArchiveAction = (MenuComponent) => (props) => {
  const handleClick = (event) => {
    event.stopPropagation();

    const { id, isPublished, actions: { handleArchiveBlock } } = props;

    let archiveMessage = i18n._t(
      'ArchiveAction.CONFIRM_DELETE',
      'Are you sure you want to send this block to the archive?'
    );

    if (isPublished) {
      archiveMessage = i18n._t(
        'ArchiveAction.CONFIRM_DELETE_AND_UNPUBLISH',
        'Warning: This block will be unpublished before being sent to the archive. Are you sure you want to proceed?'
      );
    }

    // eslint-disable-next-line no-alert
    if (handleArchiveBlock && confirm(archiveMessage)) {
      handleArchiveBlock(id);
    }
  };

  const newProps = {
    title: i18n._t('ArchiveAction.ARCHIVE', 'Archive'),
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
