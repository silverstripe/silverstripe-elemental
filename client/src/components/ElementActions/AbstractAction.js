import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DropdownItem } from 'reactstrap';
import { elementTypeType } from 'types/elementTypeType';

/**
 * Renders an action item for the "more actions" dropdown on elements
 */
const AbstractAction = (props) => {
  const { className, title, label } = props;

  const itemProps = {
    className: classNames(className, 'dropdown-item'),
    ...props,
  };
  const { showForNonInlineEditableBlock, ...reactStrapProps } = itemProps;

  return (
    <DropdownItem {...reactStrapProps}>
      {label || title}
    </DropdownItem>
  );
};

AbstractAction.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
  name: PropTypes.string,
  type: elementTypeType,
  active: PropTypes.bool,
  label: PropTypes.string,
  showForNonInlineEditableBlock: PropTypes.bool
};

AbstractAction.defaultProps = {
  disabled: false,
  showForNonInlineEditableBlock: true
};

export default AbstractAction;
