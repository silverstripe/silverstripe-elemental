import { PropTypes } from 'react';

// Describes the structure of an element coming in via GraphQL
const elementTypeType = PropTypes.shape({
  name: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  tabs: PropTypes.arrayOf(PropTypes.string),
});

export { elementTypeType };
