import Config from 'lib/Config';

/**
 * Returns the named component from the elementForm's state data
 *
 * @param {number|null} elementId
 * @returns {string}
 */
export const loadElementFormStateName = (elementId = null) => {
  const sectionKey = 'DNADesign\\Elemental\\Controllers\\ElementalAreaController';
  const section = Config.getSection(sectionKey);
  const formNameTemplate = section.form.elementForm.formNameTemplate;

  if (elementId) {
    return formNameTemplate.replace('{id}', elementId);
  }
  return formNameTemplate;
};
