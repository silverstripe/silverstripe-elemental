import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'lib/Injector';
import { elementTypeType } from 'types/elementTypeType';

// eslint-disable-next-line react/prefer-stateless-function
class Toolbar extends PureComponent {
  render() {
    const { AddNewButtonComponent, elementTypes, areaId, } = this.props;
    return <div className="element-editor__toolbar">
      <AddNewButtonComponent
        elementTypes={elementTypes}
        areaId={areaId}
      />
    </div>;
  }
}

Toolbar.defaultProps = {};
Toolbar.propTypes = {
  elementTypes: PropTypes.arrayOf(elementTypeType).isRequired,
  areaId: PropTypes.number.isRequired,
  AddNewButtonComponent: PropTypes.elementType.isRequired,
  onDragDrop: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
};

export default inject(
  ['ElementAddNewButton'],
  (AddNewButtonComponent) => ({
    AddNewButtonComponent,
  }),
  () => 'ElementEditor.ElementToolbar'
)(Toolbar);
