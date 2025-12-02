import React, { memo } from 'react';

const DragPositionIndicator = () => (
  <div className="elemental-editor-drag-indicator">
    <div className="elemental-editor-drag-indicator__ball" />
  </div>
);

// Wrapping export in React.memo() because the old class component extended React.PureComponent
export default memo(DragPositionIndicator);
