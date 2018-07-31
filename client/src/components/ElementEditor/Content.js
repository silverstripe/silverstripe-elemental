import React, { Component, PropTypes } from 'react';

class Content extends Component {

  const { summary } = this.props;

  render() {
    return (
      <div>

      </div>
    );
  }
}

Content.defaultProps = {};
Content.propTypes = {
  summary: PropTypes.string,
};

export { Content as Component };
export default Content;
