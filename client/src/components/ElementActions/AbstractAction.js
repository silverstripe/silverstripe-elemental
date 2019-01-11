import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DropdownItem } from 'reactstrap';

/**
 * Renders an action item for the "more actions" dropdown on elements
 */
const AbstractAction = (props) => {
  const { className, title } = props;

  const itemProps = {
    className: classNames(className, 'dropdown-item'),
    ...props,
  };

  return (
    <DropdownItem {...itemProps}>
      {title}
    </DropdownItem>
  );
};

AbstractAction.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
  name: PropTypes.string,
  active: PropTypes.bool,
};

AbstractAction.defaultProps = {
  disabled: false,
};

export default AbstractAction;
