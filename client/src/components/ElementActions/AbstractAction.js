import React, { PropTypes } from 'react';
import classNames from 'classnames';

/**
 * Renders an action item for the "more actions" dropdown on elements
 */
const AbstractAction = (props) => {
  const { disabled, extraClass, title, onClick } = props;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      type="button"
      className={classNames(extraClass, 'dropdown-item')}
    >
      {title}
    </button>
  );
};

AbstractAction.propTypes = {
  disabled: PropTypes.bool,
  extraClass: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
};

AbstractAction.defaultProps = {
  disabled: false,
};

export default AbstractAction;
