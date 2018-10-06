import configProvider from './elementalConfigProvider';
/**
 * Returns the named component from the elementForm's schema data
 *
 * @param {string} key
 * @param {number|null} elementId If provided, will be concatenated on as value is treated as a URL
 * @returns {string}
 */
export const loadElementSchemaValue = (key, elementId = null) => {
  const schemaValue = configProvider().form.elementForm[key] || '';

  if (elementId) {
    return `${schemaValue}/${elementId}`;
  }
  return schemaValue;
};
