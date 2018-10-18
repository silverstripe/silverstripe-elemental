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
 * @param {number|null} elementID If provided, will be concatenated on as value is treated as a URL
 * @returns {string}
 */
export const getElementSchemaValue = (key, elementID = null) => {
  const schemaValue = elementConfigProvider().form.elementForm[key] || '';

  if (elementID) {
    return `${schemaValue}/${elementID}`;
  }

  return schemaValue;
};

/**
 * Returns the form name used to store state for the form in redux for the given
 * element ID (or with {id} as a placeholder if no element ID is given)
 *
 * @param {number|null} elementID
 * @returns {string}
 */
export const getElementFormStateName = (elementID = null) => {
  const { formNameTemplate } = elementConfigProvider().form.elementForm;

  if (elementID) {
    return formNameTemplate.replace('{id}', elementID);
  }

  return formNameTemplate;
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
    // Compare to both key (PHP classname) and the name
    .find(([key, value]) => key === elementType || value.name === elementType);

  if (!typeEntry) {
    return null;
  }

  // The result is the [key, value] array from Object.entries - we only want the value
  return typeEntry[1];
};
