import React, { PureComponent, PropTypes } from 'react';
import { inject } from 'lib/Injector';
import { elementTypeType } from 'types/elementTypeType';
import { DropTarget } from 'react-dnd';

const toolbarTarget = {
  drop(props) {
    const { onDragDrop } = props;
    if (onDragDrop) {
      onDragDrop();
    }
  },
  hover(props) {
    const { onDragOver } = props;
    if (onDragOver) {
      onDragOver();
    }
  }
};

// eslint-disable-next-line react/prefer-stateless-function
class Toolbar extends PureComponent {
  render() {
    const { AddNewButtonComponent, elementTypes, elementalAreaId, connectDropTarget } = this.props;
    return connectDropTarget(
      <div className="element-editor__toolbar">
        <AddNewButtonComponent
          elementTypes={elementTypes}
          elementalAreaId={elementalAreaId}
        />
      </div>
    );
  }
}

Toolbar.defaultProps = {};
Toolbar.propTypes = {
  elementTypes: PropTypes.arrayOf(elementTypeType).isRequired,
  elementalAreaId: PropTypes.number.isRequired,
  AddNewButtonComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  onDragOver: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  onDragDrop: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
};

export default DropTarget('element', toolbarTarget, (connect) => ({
  connectDropTarget: connect.dropTarget(),
}))(inject(
  ['ElementAddNewButton'],
  (AddNewButtonComponent) => ({
    AddNewButtonComponent,
  }),
  () => 'ElementEditor.ElementToolbar'
)(Toolbar));
