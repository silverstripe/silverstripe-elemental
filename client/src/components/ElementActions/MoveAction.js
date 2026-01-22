/* global window */
import React, { useMemo, useState, useContext } from 'react';
import i18n from 'i18n';
import AbstractAction from 'components/ElementActions/AbstractAction';
import { ElementEditorContext } from 'components/ElementEditor/ElementEditor';
import { ElementContext } from 'components/ElementEditor/Element';
import { loadComponent } from 'lib/Injector';

/**
 * Adds the elemental menu action to move a block
 */
const MoveAction = (MenuComponent) => (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { fetchElements, actions } = useContext(ElementEditorContext);
  const { formDirty } = useContext(ElementContext);

  if (props.type.broken) {
    // Don't allow this action for a broken element.
    return (
      <MenuComponent {...props} />
    );
  }

  const handleClick = (event) => {
    event.stopPropagation();
    setModalIsOpen(true);
  };

  const handleSuccess = ({ elementalAreaId, newEditLink }) => {
    setModalIsOpen(false);
    fetchElements();
    // If we have the ID of the new elemental area, we should refetch that as well.
    if (elementalAreaId) {
      actions.editor.forceReload(elementalAreaId);
    }
    const elementTitle = props.element.title ?? i18n.inject(
      i18n._t('ElementHeader.NOTITLE', 'Untitled {type} block'),
      { type: props.type.title }
    );
    const successMessage = i18n.inject(
      i18n._t('ElementMoveAction.SUCCESS', 'Moved block "{title}" successfully'),
      { title: elementTitle }
    );
    if (newEditLink) {
      actions.toasts.display({
        text: successMessage,
        type: 'success',
        actions: [{
          label: i18n._t('ElementMoveAction.EDIT_LINK', 'Go to edit form for new block parent'),
          href: newEditLink,
        }],
      });
    } else {
      actions.toasts.success(successMessage);
    }
  };

  const disabled = formDirty;
  const label = i18n._t('ElementMoveAction.MOVE', 'Move');
  const title = disabled
    ? i18n._t('ElementMoveAction.MOVE_DIRTY', 'Move, cannot move with unsaved changes')
    : label;
  const newProps = {
    label,
    title,
    disabled,
    className: 'element-editor__actions-move',
    onClick: handleClick,
    toggle: true,
  };
  const MoveModal = useMemo(() => loadComponent('ElementMoveModal.FormBuilderModal'), []);

  return <>
    <MenuComponent {...props}>
      {props.children}
      <AbstractAction {...newProps} />
    </MenuComponent>
    { modalIsOpen && <MoveModal
      element={props.element}
      type={props.type}
      isOpen={modalIsOpen}
      onSuccess={handleSuccess}
      onClosed={() => setModalIsOpen(false)}
    />
    }
  </>;
};

export { MoveAction as Component };

export default MoveAction;
