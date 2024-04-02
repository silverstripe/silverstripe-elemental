/* global window */
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import AbstractAction from 'components/ElementActions/AbstractAction';
import unpublishBlockMutation from 'state/editor/unpublishBlockMutation';
import { loadElementFormStateName } from 'state/editor/loadElementFormStateName';
import i18n from 'i18n';
import * as elementActions from 'state/reducer/ElementActions';

/**
 * Adds the elemental menu action to unpublish a published block
 */
const UnpublishAction = (MenuComponent) => (props) => {
  if (props.type.broken) {
    // Don't allow this action for a broken element.
    return (
      <MenuComponent {...props} />
    );
  }

  const { element, type, actions: { handleUnpublishBlock }, handleVersionStatus } = props;

  const handleClick = (event) => {
    event.stopPropagation();
    const { jQuery: $ } = window;
    const noTitle = i18n.inject(
      i18n._t(
        'ElementHeader.NOTITLE',
        'Untitled {type} block'
      ),
      { type: type.title }
    );

    if (handleUnpublishBlock) {
      handleUnpublishBlock(element.id)
        .then((data) => {
          const newData = data.data.unpublishBlock;
          handleVersionStatus(newData.isPublished, newData.isLiveVersion);
        })
        .then(() => {
          const preview = $('.cms-preview');
          preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));

          $.noticeAdd({
            text: i18n.inject(
              i18n._t(
                'ElementUnpublishAction.SUCCESS_NOTIFICATION',
                'Removed \'{title}\' from the published page'
              ),
              { title: element.title || noTitle }
            ),
            stay: false,
            type: 'success'
          });
        })
        .catch(() => {
          $.noticeAdd({
            text: i18n.inject(
              i18n._t(
                'ElementUnpublishAction.ERROR_NOTIFICATION',
                'Error unpublishing \'{title}\''
              ),
              { title: element.title || noTitle }
            ),
            stay: false,
            type: 'error'
          });
        });
    }
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
      {element.isPublished && <AbstractAction {...newProps} />}
    </MenuComponent>
  );
};

function mapDispatchToProps(dispatch, ownProps) {
  const formName = loadElementFormStateName(ownProps.element.id);

  return {
    handleVersionStatus(isPublished, isLiveVersion) {
      dispatch(elementActions.changeVersionState(`element.${formName}`, { isPublished, isLiveVersion }));
    },
  };
}

export { UnpublishAction as Component };

export default compose(
  unpublishBlockMutation,
  connect(null, mapDispatchToProps),
  UnpublishAction);
