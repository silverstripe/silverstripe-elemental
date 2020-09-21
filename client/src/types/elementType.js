import PropTypes from 'prop-types';

// Describes the structure of an element coming in via GraphQL
const elementType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  blockSchema: PropTypes.object,
  inlineEditable: PropTypes.bool,
  isPublished: PropTypes.bool,
  isLiveVersion: PropTypes.bool,
  version: PropTypes.number
});

export { elementType };
