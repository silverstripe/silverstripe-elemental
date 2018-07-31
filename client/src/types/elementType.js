import { PropTypes } from 'react';

// Describes the structure of an element coming in via GraphQL
const elementType = {
  ID: PropTypes.number.isRequired,
  Title: PropTypes.string,
  Summary: PropTypes.string,
  Type: PropTypes.string,
  IconClass: PropTypes.string,
  FileURL: PropTypes.string,
  Content: PropTypes.string,
};

export { elementType };
