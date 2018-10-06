import React, { PureComponent } from 'react';
import { elementType } from 'types/elementType';
import striptags from 'striptags';

class Summary extends PureComponent {
  render() {
    const { fileUrl, fileTitle, HTML } = this.props.element;

    return (
      <div className="element-editor-summary">
        {fileUrl &&
        <img
          className="element-editor-summary__thumbnail-image"
          src={fileUrl}
          alt={fileTitle}
        />
        }
        {HTML &&
        <p className="element-editor-summary__content">
          {striptags(HTML)}
        </p>
        }
      </div>
    );
  }
}


Summary.defaultProps = {};

Summary.propTypes = {
  element: elementType,
};

export default Summary;

