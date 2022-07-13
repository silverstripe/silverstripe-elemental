import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/ElementEditor/Header';
import { DragLayer } from 'react-dnd';
import { elementType } from 'types/elementType';
import { elementTypeType } from 'types/elementTypeType';
import { getElementTypeConfig } from 'state/editor/elementConfig';

// eslint-disable-next-line react/prefer-stateless-function
class ElementDragPreview extends Component {
  render() {
    const { isDragging, element, elementTypes, currentOffset } = this.props;

    if (!isDragging || !currentOffset) {
      return null;
    }

    const { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;
    const style = {
      transform,
      WebkitTransform: transform,
    };
    const type = getElementTypeConfig(element, elementTypes);

    return (
      <div className="element-editor-drag-preview" style={style}>
        <Header
          element={element}
          type={type}
          simple
        />
      </div>
    );
  }
}

ElementDragPreview.propTypes = {
  element: elementType,
  elementTypes: PropTypes.arrayOf(elementTypeType),
  isDragging: PropTypes.bool,
  currentOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
};

export default DragLayer(monitor => ({
  element: monitor.getItem(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
}))(ElementDragPreview);
