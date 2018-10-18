import React, { PureComponent, PropTypes } from 'react';
import { inject } from 'lib/Injector';

// eslint-disable-next-line react/prefer-stateless-function
class Toolbar extends PureComponent {
  render() {
    const { AddNewButtonComponent, elementalAreaId } = this.props;
    return (
      <div className="element-editor__toolbar">
        <AddNewButtonComponent
          elementalAreaId={elementalAreaId}
        />
      </div>
    );
  }
}

Toolbar.defaultProps = {};
Toolbar.propTypes = {
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
