import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'lib/Injector';
import { elementTypeType } from 'types/elementTypeType';

const Toolbar = ({
  AddNewButtonComponent,
  elementTypes,
  areaId,
}) => (
  <div className="element-editor__toolbar">
    <AddNewButtonComponent
      elementTypes={elementTypes}
      areaId={areaId}
    />
  </div>
);

Toolbar.propTypes = {
  elementTypes: PropTypes.arrayOf(elementTypeType).isRequired,
  areaId: PropTypes.number.isRequired,
  AddNewButtonComponent: PropTypes.elementType.isRequired,
  onDragDrop: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
};

// Wrapping export in React.memo() because the old class component extended React.PureComponent
const MemoizedToolbar = memo(Toolbar);

export default inject(
  ['ElementAddNewButton'],
  (AddNewButtonComponent) => ({
    AddNewButtonComponent,
  }),
  () => 'ElementEditor.ElementToolbar'
)(MemoizedToolbar);
