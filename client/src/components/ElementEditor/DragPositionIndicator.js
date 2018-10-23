import React, { PureComponent } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class DragPositionIndicator extends PureComponent {
  render() {
    return (
      <div className="elemental-editor-drag-indicator">
        <div className="elemental-editor-drag-indicator__ball" />
      </div>
    );
  }
}

export default DragPositionIndicator;
