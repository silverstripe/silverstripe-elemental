import PropTypes from 'prop-types';

// Describes the structure of an element type:
const elementTypeType = PropTypes.shape({
  // The GraphQL typeName of the element
  name: PropTypes.string,
  // The "name" of the type (eg. "Content")
  title: PropTypes.string,
  // A font-icon class to be used for the icon of the element
  icon: PropTypes.string,
  // Whether the element is in-line editable
  inlineEditable: PropTypes.boolean,
  // The top level edit tabs for this element (Usually "Content" and "Settings")
  editTabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
  })),
  // Additional miscellaneous config for this element type. Empty by default
  config: PropTypes.object,
});

export { elementTypeType };
