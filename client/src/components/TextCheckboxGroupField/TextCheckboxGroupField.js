import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import fieldHolder from 'components/FieldHolder/FieldHolder';

const TextCheckboxGroupField = (props) => {
  const { children } = props;

  // Map out the children and clone to set the "noHolder" prop on them.
  const childrenWithProps = React.Children.toArray(
    React.Children.map(children, (child, index) => {
      const additionalProps = { noHolder: true };

      if (index === 0) {
        additionalProps.id = props.id;
      }

      return React.cloneElement(child, additionalProps);
    })
  );

  // If readonly we'll just show two literal fields next to each other
  if (props.readOnly) {
    return (
      <div className="text-checkbox-group-field--read-only">
        {childrenWithProps}
      </div>
    );
  }

  // If the checkbox has been removed, just render the TextField on its own
  if (childrenWithProps.length === 1) {
    return childrenWithProps[0];
  }

  return (
    <InputGroup className="text-checkbox-group-field">
      {childrenWithProps[0]}
      <InputGroupAddon addonType="append">
        <InputGroupText>{childrenWithProps[1]}</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
};

export default fieldHolder(TextCheckboxGroupField);
