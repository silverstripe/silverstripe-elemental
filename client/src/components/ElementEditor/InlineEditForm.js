/* global window */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FormBuilderLoader from 'containers/FormBuilderLoader/FormBuilderLoader';
import { loadElementSchemaValue } from 'state/editor/loadElementSchemaValue';
import i18n from 'i18n';
import { loadElementFormStateName } from 'state/editor/loadElementFormStateName';
import { connect } from 'react-redux';

const InlineEditForm = ({
  elementId,
  extraClass,
  onClick,
  onFormInit,
  formHasState,
  notVisible,
  handleLoadingError,
  onFormSchemaSubmitResponse,
}) => {
  const [loadingError, setLoadingError] = useState(null);

  // A ref is used to store onFormSchemaSubmitResponse as it seemed to be necessary in order
  // to get edit-block-element.feature to pass after refactoring this from
  // a class to a functional component.
  const onFormSchemaSubmitResponseRef = useRef(onFormSchemaSubmitResponse);

  useEffect(() => {
    onFormSchemaSubmitResponseRef.current = onFormSchemaSubmitResponse;
  }, [onFormSchemaSubmitResponse]);

  const handleLoadingErrorFn = () => {
    const { jQuery: $ } = window;
    setLoadingError(true);
    $.noticeAdd({
      text: i18n.inject(
        i18n._t(
          'ElementEditForm.ERROR_NOTIFICATION',
          'Error displaying the edit form for this block'
        ),
      ),
      stay: true,
      type: 'notice'
    });
    handleLoadingError();
  };

  const handleSubmit = useCallback((data, action, submitFn) => {
    let title = '';
    Object.keys(data).forEach(key => {
      if (key.match(/PageElements_[0-9]+_Title/)) {
        title = data[key];
      }
    });
    return submitFn()
      .then(formSchema => onFormSchemaSubmitResponseRef.current(formSchema, title));
  }, []);

  const classNames = classnames('element-editor-editform', extraClass);
  const schemaUrl = loadElementSchemaValue('schemaUrl', elementId);

  // formTag needs to be a form rather than a div so that the php FormAction that turns into
  // a <button type="submit>" submits this <form>, rather than the <form> for the parent page EditForm
  const formTag = 'form';

  const formProps = {
    formTag,
    schemaUrl,
    identifier: 'element',
    refetchSchemaOnMount: !formHasState,
    onLoadingError: handleLoadingErrorFn,
    onSubmit: handleSubmit,
  };

  if (loadingError) {
    formProps.loading = false;
  }

  if (typeof onFormInit === 'function') {
    formProps.onReduxFormInit = onFormInit;
  }

  const extraAttrs = {};
  if (notVisible) {
    extraAttrs['aria-hidden'] = 'true';
    // Mark the element as inert so that it can't be focused or interacted with
    // when the preview is collapsed - this means that users will (correctly) not
    // be able to tab to fields that they can't see
    // Note: We don't use `.inert` = true because this won't actually add the attribute
    // Note: We don't use `extraAttrs['inert']` as this causes a linting error
    extraAttrs.inert = 'inert';
  }

  return (
    <div className={classNames} onClick={onClick} role="presentation" {...extraAttrs}>
      <FormBuilderLoader {...formProps} />
    </div>
  );
};

InlineEditForm.propTypes = {
  extraClass: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClick: PropTypes.func,
  elementId: PropTypes.string,
  handleLoadingError: PropTypes.func,
  onFormSchemaSubmitResponse: PropTypes.func,
  notVisible: PropTypes.bool,
};

function mapStateToProps(state, ownProps) {
  const formName = loadElementFormStateName(ownProps.elementId);

  return {
    formHasState: state.form.formState && state.form.formState.element &&
      !!state.form.formState.element[formName],
  };
}

export { InlineEditForm as Component };

export default connect(mapStateToProps)(InlineEditForm);
