import React, { Component, PropTypes } from 'react';

class Content extends Component {


  render() {
    const { summary, fileUrl, content } = this.props;

    return (
      <div className="element-editor-content">
        {fileUrl &&
          <img className="elemental-editor-content__thumbnail-image"
               src={fileUrl}
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
  summary: PropTypes.string,
  fileUrl: PropTypes.string,
};

export { Content as Component };
export default Content;
