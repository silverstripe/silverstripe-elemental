import React, { PureComponent, PropTypes } from 'react';
import { inject } from 'lib/Injector';

// eslint-disable-next-line react/prefer-stateless-function
class Toolbar extends PureComponent {
  render() {
    const { AddNewButtonComponent, elementTypes } = this.props;
    return (
      <div>
        <AddNewButtonComponent elementTypes={elementTypes} />
      </div>
    );
  }
}

Toolbar.defaultProps = {};
Toolbar.propTypes = {
  elementTypes: PropTypes.array.isRequired,
  AddNewButtonComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default inject(
  ['ElementAddNewButton'],
  (AddNewButtonComponent) => ({
    AddNewButtonComponent,
  }),
  () => 'ElementEditor.ElementToolbar'
)(Toolbar);
