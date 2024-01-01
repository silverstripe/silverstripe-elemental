/* global window */
import React, { useContext } from 'react';
import { compose } from 'redux';
import AbstractAction from 'components/ElementActions/AbstractAction';
import unpublishBlockMutation from 'state/editor/unpublishBlockMutation';
import i18n from 'i18n';
import backend from 'lib/Backend';
import { ElementEditorContext } from 'components/ElementEditor/ElementEditor';

/**
 * Adds the elemental menu action to unpublish a published block
 */
const UnpublishAction = (MenuComponent) => (props) => {
  const { fetchBlocks } = useContext(ElementEditorContext);
  const globalUseGraphqQL = false;

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
    window.jQuery.noticeAdd({
      text: success ? successMessage : errorMessage,
      stay: false,
      type: success ? 'success' : 'error',
    });
  }

  const unpublishElement = () => {
    if (globalUseGraphqQL) {
      const { element: { id }, actions: { handleUnpublishBlock } } = props;
      return handleUnpublishBlock(id)
        .then(() => {
          const preview = $('.cms-preview');
          preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));
        });
    } else {
      const id = props.element.id;
      return backend.post('/admin/elemental-area/unpublish', {
        ID: id,
      })
        .then(() => fetchBlocks());
    }
  }

  const { element, type } = props;

  const handleClick = (event) => {
    event.stopPropagation();
    unpublishElement()
      .then(() => reportUnpublicationStatus(type.title, element.title, true))
      .catch(() => reportUnpublicationStatus(type.title, element.title, false));
  }

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
      {element.isPublished && <AbstractAction {...newProps} />}
    </MenuComponent>
  );
};

export { UnpublishAction as Component };

export default compose(unpublishBlockMutation, UnpublishAction);
