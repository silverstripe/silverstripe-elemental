import React, { useContext, useEffect } from 'react';
import AbstractAction from 'components/ElementActions/AbstractAction';
import i18n from 'i18n';
import { ElementContext } from 'components/ElementEditor/Element';

const SaveAction = (MenuComponent) => (props) => {
  const {
    doSaveElement,
    onSaveButtonClick,
    onAfterSave,
    submitForm,
    formHasRendered,
    formDirty,
  } = useContext(ElementContext);

  const handleClick = (event) => {
    event.stopPropagation();
    onSaveButtonClick();
  };

  const saveElement = () => {
    submitForm();
    onAfterSave();
  };

  const newProps = {
    title: i18n._t('ElementSaveAction.SAVE', 'Save'),
    className: 'element-editor__actions-save',
    onClick: handleClick,
    toggle: props.toggle,
  };

  useEffect(() => {
    if (formHasRendered && doSaveElement) {
      saveElement();
    }
  }, [formHasRendered, doSaveElement]);

  if (!props.expandable || props.type.broken) {
    // Some elemental blocks can not be edited inline (e.g. User form blocks)
    // We don't want to add a "Save" action for those blocks.
    return (
      <MenuComponent {...props} />
    );
  }

  return (
    <MenuComponent {...props}>
      {props.children}
      { formDirty && <AbstractAction {...newProps} /> }
    </MenuComponent>
  );
};

export { SaveAction as Component };

export default SaveAction;
