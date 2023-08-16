/* global window */
import React, { useState } from 'react';
import { loadComponent } from 'lib/Injector';
import { compose } from 'redux';
import AbstractAction from 'components/ElementActions/AbstractAction';
import moveBlockMutation from 'state/editor/moveBlockMutation';
import { getConfig } from 'state/editor/elementConfig';
import i18n from 'i18n';

/**
 * Adds the elemental menu action to move a block of any state
 */
const MoveAction = (MenuComponent) => (props) => {
  const FormBuilderModal = loadComponent('FormBuilderModal');
  const [modalOpen, setModalOpen] = useState(false);
  const { element: { id }, actions: { handleMoveBlock } } = props;

  const handleClick = (event) => {
    event.stopPropagation();

    setModalOpen(true);
  };

  const closeModal = () => {
    if (handleMoveBlock) {
      handleMoveBlock(id).then(() => {
        const preview = window.jQuery('.cms-preview');
        preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));
      });
    }

    setModalOpen(false);
  };

  // Allow user to move to another page if they have create permissions
  const disabled = props.element.canCreate !== undefined && !props.element.canCreate;
  const label = i18n._t('ElementMoveAction.MOVE', 'Move');
  const title = disabled
    ? i18n._t('ElementMoveAction.MOVE_PERMISSION_DENY', 'Move, insufficient permissions')
    : label;
  const newProps = {
    label,
    title,
    disabled,
    className: 'element-editor__actions-move',
    onClick: handleClick,
    toggle: props.toggle,
  };

  const modalSchemaUrl = `${getConfig().form.elementForm.moveModalSchemaUrl}/${id}`;

  // Todo: Render modal once per area rather than once per block
  return (
    <MenuComponent {...props}>
      {props.children}
      <AbstractAction {...newProps} />
      <FormBuilderModal
        title="Move block to"
        identifier="Elemental.MoveBlockTo"
        isOpen={modalOpen}
        onClosed={closeModal}
        schemaUrl={modalSchemaUrl}
        bodyClassName="modal__dialog"
        responseClassBad="modal__response modal__response--error"
        responseClassGood="modal__response modal__response--good"
      />
    </MenuComponent>
  );
};

export { MoveAction as Component };

export default compose(moveBlockMutation, MoveAction);
