/* global window */

import React, { Component, PropTypes } from 'react';
import { Button } from 'reactstrap';
import classNames from 'classnames';

/**
 * The AddElementPopoverContent component used in the context of an ElementEditor shows the
 * available elements that can be added to an ElementalArea.
 */
class AddElementPopoverContent extends Component {
  constructor(props) {
    super(props);

    this.renderElementButtons = this.renderElementButtons.bind(this);
  }

  renderElementButtons() {
    const { elementTypes } = this.props;

    return elementTypes.map((elementType) =>
      (
        <Button
          className={
            classNames(
              elementType.icon,
              'btn--icon-xl',
              'element-editor-add-element-content__button'
            )
          }
          key={elementType.ID}
        >
          {elementType.title}
        </Button>
      )
    );
  }

  render() {
    return (
      <div className="element-editor-add-element-content">
        <div className="element-editor-add-element-content__button-container">
          {this.renderElementButtons()}
        </div>
      </div>
    );
  }
}
AddElementPopoverContent.propTypes = {
  elementTypes: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    icon: PropTypes.string,
  })),
};

AddElementPopoverContent.defaultProps = {

};

export default AddElementPopoverContent;
