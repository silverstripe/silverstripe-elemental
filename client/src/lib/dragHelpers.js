import { findDOMNode } from 'react-dom';

export const isOverTop = (monitor, component) => {
  const clientOffset = monitor.getClientOffset();
  const componentRect = findDOMNode(component).getBoundingClientRect();

  return clientOffset.y < componentRect.y + (componentRect.height / 2);
};

export const getDragIndicatorIndex = (items, dragTarget, draggedItem, dragSpot) => {
  if (dragTarget === null || !draggedItem) {
    return null;
  }

  let targetIndex = dragTarget ?
    items.findIndex(element => element === dragTarget) : 0;
  const sourceIndex = items.findIndex(item => item === draggedItem);

  if (dragSpot === 'bottom') {
    targetIndex += 1;
  }

  // Don't render if...
  if (
    // The indicator will be placed before the item that's being dragged
    (sourceIndex === targetIndex)
    // The indicator will be placed after the item that's being dragged
    || (sourceIndex + 1 === targetIndex)
  ) {
    return null;
  }

  return targetIndex;
};
