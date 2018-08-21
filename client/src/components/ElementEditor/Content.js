import React, { PureComponent, PropTypes } from 'react';

class Content extends PureComponent {
  render() {
    const { fileUrl, fileTitle, content } = this.props;

    if (!content && !fileUrl) {
      return null;
    }

    return (
      <div className="element-editor-content">
        {fileUrl &&
          <img
            className="element-editor-content__thumbnail-image"
            src={fileUrl}
            alt={fileTitle}
          />
        }
        {content &&
          <p className="element-editor-content__content">
            {content}
          </p>
        }
      </div>
    );
  }
}

Content.defaultProps = {};
Content.propTypes = {
  content: PropTypes.string,
  fileUrl: PropTypes.string,
  fileTitle: PropTypes.string
};

export default Content;
