import React from "react";

const CustomActions = (props) => {
  const { children } = props;

  // Don't render if there are no children
  if (!Array.isArray(children) || !children.length > 0) {
    return null;
  }

  return (
    <div role="none" onClick={(event) => event.stopPropagation()}>
      {children}
    </div>
  );
};

export default CustomActions;
