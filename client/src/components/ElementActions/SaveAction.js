/* global window */
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import AbstractAction from 'components/ElementActions/AbstractAction';
import backend from 'lib/Backend';
import i18n from 'i18n';
import { getElementSchemaValue } from 'state/editor/getElementConfig';
import { getSerializedFormData } from 'state/editor/getSerializedFormData';

/**
 * Using a REST backend, serialize the current form data and post it to the backend endpoint to save
 * the inline edit form's data for the current block.
 */
const SaveAction = (MenuComponent) => (props) => {
  const handleClick = (event) => {
    event.stopPropagation();

    const { id, title, securityId } = props;

    const { jQuery: $ } = window;

    const formData = getSerializedFormData(`Form_ElementForm_${id}`);

    const endpointSpec = {
      url: getElementSchemaValue('saveUrl', id),
      method: getElementSchemaValue('saveMethod'),
      payloadFormat: getElementSchemaValue('payloadFormat'),
      defaultData: {
        SecurityID: securityId
      },
    };

    const endpoint = backend.createEndpointFetcher(endpointSpec);
    endpoint(formData)
      .then(() => {
        // Update the Apollo query cache with the new form data
        const { apolloClient } = window.ss;

        // @todo optimistically update the data for the current element instead of
        // rerunning the whole query
        apolloClient.queryManager.reFetchObservableQueries();

        $.noticeAdd({
          text: i18n.inject(
            i18n._t(
              'SaveAction.SUCCESS_NOTIFICATION',
              'Saved \'{title}\' successfully'),
            { title }
          ),
          stay: false,
          type: 'success'
        });
      })
      .catch(() => {
        $.noticeAdd({
          text: i18n.inject(
            i18n._t(
              'SaveAction.ERROR_NOTIFICATION',
              'Error saving \'{title}\''),
            { title }
          ),
          stay: false,
          type: 'error'
        });
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
