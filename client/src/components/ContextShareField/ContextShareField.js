import { useContext } from 'react';
import { ElementContext } from 'components/ElementEditor/Element';
import { FormContext } from 'components/Form/Form';

/**
 * This component is used to share the handleSubmit function from the FormContext
 * with the Element component by calling the setFormHandleSubmit() function
 * from ElementContext
 */
const ContextShareField = () => {
  const { formHandleSubmit, setFormHandleSubmit } = useContext(ElementContext);
  const { handleSubmit } = useContext(FormContext);

  if (!formHandleSubmit && handleSubmit) {
    // Update state with a function calls the function straight away,
    // so set a function that returns the function we want to call
    setFormHandleSubmit(() => handleSubmit);
  }

  return '';
};

export default ContextShareField;
