import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Header from 'components/ElementEditor/Header';
import { DragLayer } from 'react-dnd';
import { elementType } from 'types/elementType';

// eslint-disable-next-line react/prefer-stateless-function
class ElementDragPreview extends Component {
  render() {
    const { isDragging, element, currentOffset } = this.props;

    if (!isDragging || !currentOffset) {
      return null;
    }

    const { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;
    const style = {
      transform,
      WebkitTransform: transform,
    };

    return (
      <div className="element-editor-drag-preview" style={style}>
        <Header
          element={element}
          simple
        />
      </div>
    );
  }
}

ElementDragPreview.propTypes = {
  element: elementType,
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
