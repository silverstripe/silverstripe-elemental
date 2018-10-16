import React, { PureComponent, PropTypes } from 'react';

class Summary extends PureComponent {
  render() {
    const { fileUrl, fileTitle, content } = this.props;

    return (

      <div className="element-editor-summary">
        {fileUrl &&
        <img
          className="element-editor-summary__thumbnail-image"
          src={fileUrl}
          alt={fileTitle}
        />
        }
        {(content || !fileUrl) &&
        <p className="element-editor-summary__content">
          {content}
        </p>
        }
      </div>
    );
  }
}


Summary.defaultProps = {};

Summary.propTypes = {
  content: PropTypes.string,
  fileUrl: PropTypes.string,
  fileTitle: PropTypes.string,
};

export default Summary;

