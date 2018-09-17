import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
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

    const { id, securityId } = props;

    const formData = getSerializedFormData(`Form_ElementForm_${id}`);

    const endpointSpec = {
      url: loadElementSchemaValue('saveUrl', id),
      method: loadElementSchemaValue('saveMethod'),
      payloadFormat: loadElementSchemaValue('payloadFormat'),
      defaultData: {
        SecurityID: securityId
      },
    };

    const endpoint = backend.createEndpointFetcher(endpointSpec);
    endpoint(formData).then(() => {
      // @todo update apollo cache? `result` argument is available
    });
  };

  const newProps = {
    title: i18n._t('SaveAction.SAVE', 'Save'),
    className: 'element-editor__actions-save',
    onClick: handleClick,
  };

  return (
    <MenuComponent {...props}>
      {props.children}

      <AbstractAction {...newProps} />
    </MenuComponent>
  );
};

function mapStateToProps(state) {
  return {
    securityId: state.config.SecurityID,
  };
}

export { SaveAction as Component };

export default compose(connect(mapStateToProps), SaveAction);
