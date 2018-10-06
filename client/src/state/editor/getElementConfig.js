import Config from 'lib/Config';

/**
 * Returns the client config provided by `ElementalAreaController`
 *
 * @returns {object}
 */
export const elementConfigProvider = () => Config.getSection('DNADesign\\Elemental\\Controllers\\ElementalAreaController');

/**
 * Returns the named component from the elementForm's schema data
 *
 * @param {string} key
 * @param {number|null} elementId If provided, will be concatenated on as value is treated as a URL
 * @returns {string}
 */
export const getElementSchemaValue = (key, elementId = null) => {
  const schemaValue = elementConfigProvider().form.elementForm[key] || '';

  if (elementId) {
    return `${schemaValue}/${elementId}`;
  }
  return schemaValue;
};

/**
 * Get the configuration for the given element type
 *
 * @param {string} elementType
 * @returns {object|null}
 */
export const getElementTypeConfig = (elementType) => {
  const typeEntry = Object
    .entries(elementConfigProvider().elementTypes)
    // Compare to both key (PHP classname) and the GraphQL type name
    .find(([key, value]) => key === elementType || value.graphQL.type === elementType);

  if (!typeEntry) {
    return null;
  }

  // The result is the [key, value] array from Object.entries - we only want the value
  return typeEntry[1];
};
