import { PropTypes } from 'react';

// Describes the structure of an element coming in via GraphQL
const elementType = PropTypes.shape({
  ID: PropTypes.string.isRequired,
  Title: PropTypes.string,
  IsPublished: PropTypes.bool,
  IsLiveVersion: PropTypes.bool,
  Version: PropTypes.number
});

export { elementType };
