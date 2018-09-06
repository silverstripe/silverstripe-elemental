/* global document */
/**
 * Get all form inputs (etc) inside the given formName div and return as a serialised object
 *
 * @param {string} formName
 * @returns {object}
 */
export const getSerializedFormData = (formName) => {
  const form = document.getElementById(formName);
  const fields = form.querySelectorAll('input, select, textarea, checkbox');

  const output = {};
  for (let i = 0; i <= fields.length; i++) {
    if (fields[i]) {
      const formField = fields[i];
      const fieldName = formField.name;

      output[fieldName] = formField.value;
    }
  }

  return output;
};
