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
 * Adds the elemental menu action to duplicate a block
 */
const DuplicateAction = (MenuComponent) => (props) => {
  const { fetchElements } = useContext(ElementEditorContext);

  if (props.type.broken) {
    // Don't allow this action for a broken element.
    return (
      <MenuComponent {...props} />
    );
  }

  const handleClick = (event) => {
    event.stopPropagation();
    const id = props.element.id;
    const url = `${getConfig().controllerLink.replace(/\/$/, '')}/api/duplicate`;
    backend.post(url, {
      id,
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

  const disabled = props.element.canCreate !== undefined && !props.element.canCreate;
  const label = i18n._t('ElementArchiveAction.DUPLICATE', 'Duplicate');
  const title = disabled
    ? i18n._t('ElementArchiveAction.DUPLICATE_PERMISSION_DENY', 'Duplicate, insufficient permissions')
    : label;
  const newProps = {
    label,
    title,
    disabled,
    className: 'element-editor__actions-duplicate',
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

export { DuplicateAction as Component };

export default DuplicateAction;
