import React from 'react';
import { Button as BaseButton } from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const ElementOptionButton = ({
  icon,
  className,
  noText = false,
  children,
  ...props
}) =>
  (<BaseButton
    className={classnames(className, { 'btn--no-text': noText })}
    aria-label={noText ? children : undefined}
    {...props}
  >
    {icon && <span className={`btn__icon ${icon}`} aria-hidden="true" />}
    {noText ? undefined : <span className="btn__title">{children}</span>}
  </BaseButton>);

ElementOptionButton.propTypes = {
  ...BaseButton.propTypes,
  noText: PropTypes.bool,
  icon: PropTypes.string,
};

ElementOptionButton.defaultProps = {
  ...BaseButton.defaultProps,
  noText: false
};

export default ElementOptionButton;
