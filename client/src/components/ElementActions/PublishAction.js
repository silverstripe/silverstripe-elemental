/* global window */
import React from 'react';
import { compose } from 'redux';
import AbstractAction from 'components/ElementActions/AbstractAction';
import publishBlockMutation from 'state/editor/publishBlockMutation';
import i18n from 'i18n';
import backend from 'lib/Backend';
import { connect } from 'react-redux';
import { loadElementSchemaValue } from 'state/editor/loadElementSchemaValue';
import { loadElementFormStateName } from 'state/editor/loadElementFormStateName';

/**
 * Show a toast message reporting whether publication of Element was successful
 *
 * @param {string} elementType E.g. "Content" - human friendly element type (not PHP FQCN)
 * @param {string} title Title of the element, or a false value if unset (e.g. undefined)
 * @param {bool} success Show a success message (true), or an error message (false)
 */
const reportPublicationStatus = (elementType, title, success) => {
  const noTitle = i18n.inject(
    i18n._t('ElementHeader.NOTITLE', 'Untitled {type} block'),
    { type: elementType }
  );
  const successMessage = i18n.inject(
    i18n._t('ElementPublishAction.SUCCESS_NOTIFICATION', 'Published \'{title}\' successfully'),
    { title: title || noTitle }
  );
  const errorMessage = i18n.inject(
    i18n._t('ElementPublishAction.ERROR_NOTIFICATION', 'Error publishing \'{title}\''),
    { title: title || noTitle }
  );
  window.jQuery.noticeAdd({
    text: success ? successMessage : errorMessage,
    stay: false,
    type: success ? 'success' : 'error',
  });
};

/**
 * Post updated Element data to save it
 *
 * @param {number} id Element ID
 * @param {object} formData Information to be saved
 * @param {string} securityId Security ID for form submission
 */
const performSaveForElementWithFormData = (id, formData, securityId) => {
  const saveEndpoint = backend.createEndpointFetcher({
    url: loadElementSchemaValue('saveUrl', id),
    method: loadElementSchemaValue('saveMethod'),
    payloadFormat: loadElementSchemaValue('payloadFormat'),
    defaultData: {
      SecurityID: securityId
    },
  });

  // Perform save & get new version number to publish
  return saveEndpoint(formData)
    .then(() => window.ss.apolloClient.queryManager.reFetchObservableQueries())
    .then((input) => {
      const preview = window.jQuery('.cms-preview');
      preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));
      return input;
    })
    .then((newPageData) => {
      const newElementData = newPageData[0] && newPageData[0]
        .data
        .readOneElementalArea
        .Elements
        .edges
        .find((elementData) => elementData.node.ID === id);
      return newElementData && newElementData.node.Version;
    });
};

/**
 * Adds the elemental menu action to publish a draft/modified block
 */
const PublishAction = (MenuComponent) => (props) => {
  const { element, formDirty } = props;

  const handleClick = (event) => {
    event.stopPropagation();

    const {
      element: {
        ID: id,
        Title: title,
        Version: version,
        BlockSchema: { type: elementType }
      },
      securityId,
      formData,
      actions: { handlePublishBlock },
    } = props;

    let actionFlow = new Promise((resolve) => resolve(version));

    // Edits have been made to the form. Peform a "Save & Publish"
    if (formDirty) {
      actionFlow = performSaveForElementWithFormData(id, formData, securityId);
    }

    // Perform publish. Data is assumed to be up to date
    actionFlow
      .then((versionToPublish) => handlePublishBlock(id, 'DRAFT', 'LIVE', versionToPublish))
      .then(() => reportPublicationStatus(elementType, title, true))
      .catch(() => reportPublicationStatus(elementType, title, false));
  };

  const newProps = {
    title: i18n._t('ElementPublishAction.PUBLISH', 'Publish'),
    className: 'element-editor__actions-publish',
    onClick: handleClick,
    toggle: props.toggle,
  };

  return (
    <MenuComponent {...props}>
      {props.children}

      {(formDirty || !element.IsLiveVersion) && <AbstractAction {...newProps} />}
    </MenuComponent>
  );
};

function mapStateToProps(state, ownProps) {
  const formName = loadElementFormStateName(ownProps.element.ID);

  let formData = null;

  if (state.form.formState.element && state.form.formState.element[formName]) {
    formData = state.form.formState.element[formName].values;
  }

  return {
    formData,
    securityId: state.config.SecurityID,
    formDirty: state.unsavedForms.find((unsaved) => unsaved.name === `element.${formName}`),
  };
}

export { PublishAction as Component };

export default compose(publishBlockMutation, connect(mapStateToProps), PublishAction);
