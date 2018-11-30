import PropTypes from 'prop-types';

// Describes the structure of an element coming in via GraphQL
const elementType = PropTypes.shape({
  ID: PropTypes.string.isRequired,
  Title: PropTypes.string,
  BlockSchema: PropTypes.object,
  InlineEditable: PropTypes.bool,
  IsPublished: PropTypes.bool,
  IsLiveVersion: PropTypes.bool,
  Version: PropTypes.number
});

export { elementType };
