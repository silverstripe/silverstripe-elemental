import React, { Component, PropTypes } from 'react';
import { Tooltip } from 'reactstrap';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    const { id, title, elementType, fontIcon } = this.props;

    return (
      <div className="element-editor-header">
        <div className="element-editor-header__info">
          <div className="element-editor-header__icon-container">
            <i className={fontIcon} id={`element-editor-header__icon${id}`} />
            <Tooltip
              placement="top"
              isOpen={this.state.tooltipOpen}
              target={`element-editor-header__icon${id}`}
              toggle={this.toggle}
            >
              {elementType}
            </Tooltip>
          </div>
          <h3 className="element-editor-header__title">{title}</h3>
        </div>
      </div>
    );
  }
}

Header.defaultProps = {
};

Header.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  elementType: PropTypes.string,
  fontIcon: PropTypes.string,
};

export default Header;
