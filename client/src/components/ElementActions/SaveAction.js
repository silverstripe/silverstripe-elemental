import React from 'react';
import AbstractAction from 'components/ElementActions/AbstractAction';
import backend from 'lib/Backend';
import i18n from 'i18n';
import { loadElementSchemaValue } from 'state/editor/loadElementSchemaValue';
import { getSerializedFormData } from 'state/editor/getSerializedFormData';

/**
 * Using a REST backend, serialize the current form data and post it to the backend endpoint to save
 * the inline edit form's data for the current block.
 */
const SaveAction = (MenuComponent) => (props) => {
  const handleClick = (event) => {
    event.stopPropagation();

    const { id } = this.props;

    const formData = getSerializedFormData(`Form_ElementForm_${id}`);

    const endpointSpec = {
      url: loadElementSchemaValue('saveUrl', id),
      method: loadElementSchemaValue('saveMethod'),
      payloadFormat: loadElementSchemaValue('payloadFormat'),
    };

    // @todo add CSRF SecurityID token
    const endpoint = backend.createEndpointFetcher(endpointSpec);
    endpoint(formData).then((result) => {
      console.log(result);
      // @todo update apollo cache?
    });
  };

  const newProps = {
    title: i18n._t('SaveAction.SAVE', 'Save'),
    extraClass: 'element-editor__actions-save',
    onClick: handleClick,
  };

  return (
    <MenuComponent {...props}>
      {props.children}

      <AbstractAction {...newProps} />
    </MenuComponent>
  );
};

export default SaveAction;
