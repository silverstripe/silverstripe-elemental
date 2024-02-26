import React, { useContext } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import AbstractAction from 'components/ElementActions/AbstractAction';
import backend from 'lib/Backend';
import i18n from 'i18n';
import { loadElementSchemaValue } from 'state/editor/loadElementSchemaValue';
import { loadElementFormStateName } from 'state/editor/loadElementFormStateName';
import { initialize } from 'redux-form';
import { ElementContext } from 'components/ElementEditor/Element';
import { submit } from 'redux-form'



/**
 * Using a REST backend, serialize the current form data and post it to the backend endpoint to save
 * the inline edit form's data for the current block.
 */
const SaveAction = (MenuComponent) => (props) => {
  const failureHandlers = useContext(ElementContext);

  if (!props.expandable || props.type.broken) {
    // Some elemental blocks can not be edited inline (e.g. User form blocks)
    // We don't want to add a "Save" action for those blocks.
    return (
      <MenuComponent {...props} />
    );
  }

  const handleClick = (event) => {
    event.stopPropagation();

    const { element, type, securityId, formData, reinitialiseForm, submitForm } = props;
    const { jQuery: $ } = window;
    const noTitle = i18n.inject(
      i18n._t(
        'ElementHeader.NOTITLE',
        'Untitled {type} block'
      ),
      { type: type.title }
    );

    // https://redux-form.com/8.3.0/examples/remotesubmit/
    submitForm();

    return;

    // === The following is wrong, should using the Formbuilder to submit the form ===
    // === instead of doing a submissions from the button ==

    const endpointSpec = {
      url: loadElementSchemaValue('saveUrl', element.id),
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
        reinitialiseForm(formData);

        const preview = $('.cms-preview');
        preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));

        const newTitle = formData ? formData[`PageElements_${element.id}_Title`] : null;
        $.noticeAdd({
          text: i18n.inject(
            i18n._t(
              'ElementSaveAction.SUCCESS_NOTIFICATION',
              'Saved \'{title}\' successfully'
            ),
            { title: newTitle || noTitle }
          ),
          stay: false,
          type: 'success'
        });
      })
      .catch(e => {
        $.noticeAdd({
          text: i18n.inject(
            i18n._t(
              'ElementSaveAction.ERROR_NOTIFICATION',
              'Error saving \'{title}\''
            ),
            { title: element.Title || noTitle }
          ),
          stay: false,
          type: 'error'
        });
        e.response.json()
          .then(formSchema => {
            // failurreHandlers is defined in Element.js and passed via ElementContext
            failureHandlers.onFailedSave(formSchema);
          });
      });
  };

  const newProps = {
    title: i18n._t('ElementSaveAction.SAVE', 'Save'),
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
  const formName = loadElementFormStateName(ownProps.element.id);

  let formData = null;

  if (state.form.formState.element && state.form.formState.element[formName]) {
    formData = state.form.formState.element[formName].values;
  }

  return {
    formData,
    securityId: state.config.SecurityID,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const formName = loadElementFormStateName(ownProps.element.id);

  return {
    reinitialiseForm(savedData) {
      dispatch(initialize(`element.${formName}`, savedData));
    },
    submitForm() {
      console.log('submitting form for elmenet with ID 1 - THIS IS HARDCODED TO element #1');
      // dispatch() is a param of mapDispatchToProps()
      // submit() is an imported function from 'redux-form'
      dispatch(submit('element.ElementForm_1'));
    }
  };
}

export { SaveAction as Component };

export default compose(connect(mapStateToProps, mapDispatchToProps), SaveAction);
