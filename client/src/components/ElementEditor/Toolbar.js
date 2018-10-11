import React, { PureComponent, PropTypes } from 'react';
import { inject } from 'lib/Injector';
import { elementTypeType } from 'types/elementTypeType';

// eslint-disable-next-line react/prefer-stateless-function
class Toolbar extends PureComponent {
  render() {
    const { AddNewButtonComponent, elementTypes, elementalAreaId } = this.props;
    return (
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
};

export default inject(
  ['ElementAddNewButton'],
  (AddNewButtonComponent) => ({
    AddNewButtonComponent,
  }),
  () => 'ElementEditor.ElementToolbar'
)(Toolbar);
