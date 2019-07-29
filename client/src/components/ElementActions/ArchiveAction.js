import React from 'react';
import { compose } from 'redux';
import confirm from '@silverstripe/reactstrap-confirm';
import AbstractAction from 'components/ElementActions/AbstractAction';
import archiveBlockMutation from 'state/editor/archiveBlockMutation';
import i18n from 'i18n';
import Preview from 'lib/previewHelper';

/**
 * Adds the elemental menu action to archive a block of any state
 */
const ArchiveAction = (MenuComponent) => (props) => {
  const handleClick = async (event) => {
    event.stopPropagation();

    const {
      element: { ID: id, Title: elementTitle, IsPublished: isPublished },
      type,
      actions: { handleArchiveBlock }
    } = props;

    const noTitle = i18n.inject(
      i18n._t('ElementHeader.NOTITLE', 'Untitled {type} block'),
      { type: type.title }
    );

    const archiveTitle = i18n.inject(
      i18n._t(
        'ElementArchiveAction.CONFIRM_DELETE_TITLE',
        'Archive {block}'
      ),
      { block: elementTitle || noTitle }
    );

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

    const deleteButton = i18n._t(
      'ElementArchiveAction.CONFIRM_DELETE_BUTTON',
      'Archive'
    );

    // eslint-disable-next-line no-alert
    if (handleArchiveBlock && await confirm(archiveMessage, {
      title: archiveTitle,
      confirmLabel: deleteButton,
    })) {
      handleArchiveBlock(id).then(() => {
        (new Preview()).reload();
      });
    }
  };

  const newProps = {
    title: i18n._t('ElementArchiveAction.ARCHIVE', 'Archive'),
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
