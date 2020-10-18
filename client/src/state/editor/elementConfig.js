import Config from 'lib/Config';

/**
 * Returns the client config provided by `ElementalAreaController`
 *
 * @returns {object}
 */
export const getConfig = () => Config.getSection('DNADesign\\Elemental\\Controllers\\ElementalAreaController');

/**
 * Get the configuration for the given element type from the (optional) given config.
 * If config to pull from is not given it will auto-resolve the element types from client config
 *
 * @param {string} elementType
 * @param {object} typeConfig
 * @returns {object|null}
 */
export const getElementTypeConfig = (elementType, typeConfig = null) => {
  const types = Array.isArray(typeConfig) ? typeConfig : getConfig().elementTypes;

  // Compare to both key (PHP classname) and the name
  return types.find(value => value.class === elementType || value.name === elementType);
};
