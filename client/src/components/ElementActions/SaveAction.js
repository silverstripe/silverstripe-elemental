/* global window */
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import AbstractAction from 'components/ElementActions/AbstractAction';
import backend from 'lib/Backend';
import i18n from 'i18n';
import { loadElementSchemaValue } from 'state/editor/loadElementSchemaValue';
import { loadElementFormStateName } from 'state/editor/loadElementFormStateName';

/**
 * Using a REST backend, serialize the current form data and post it to the backend endpoint to save
 * the inline edit form's data for the current block.
 */
const SaveAction = (MenuComponent) => (props) => {
  const handleClick = (event) => {
    event.stopPropagation();

    const { id, title, securityId, elementType, formData } = props;
    const { jQuery: $ } = window;
    const noTitle = i18n.inject(
      i18n._t(
        'ElementHeader.NOTITLE',
        'Untitled {type} block'
      ),
      { type: elementType }
    );

    const endpointSpec = {
      url: loadElementSchemaValue('saveUrl', id),
      method: loadElementSchemaValue('saveMethod'),
      payloadFormat: loadElementSchemaValue('payloadFormat'),
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

        const preview = $('.cms-preview');
        preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));

        const newTitle = formData[`PageElements_${id}_Title`];
        $.noticeAdd({
          text: i18n.inject(
            i18n._t(
              'SaveAction.SUCCESS_NOTIFICATION',
              'Saved \'{title}\' successfully'),
            { title: newTitle || noTitle }
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
            { title: title || noTitle }
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

function mapStateToProps(state, ownProps) {
  const formName = loadElementFormStateName(ownProps.id);

  let formData = null;

  if (state.form.formState.element && state.form.formState.element[formName]) {
    formData = state.form.formState.element[formName].values;
  }

  return {
    formData,
    securityId: state.config.SecurityID,
  };
}

export { SaveAction as Component };

export default compose(connect(mapStateToProps), SaveAction);
