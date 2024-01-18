/* global window */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FormBuilderLoader from 'containers/FormBuilderLoader/FormBuilderLoader';
import { loadElementSchemaValue } from 'state/editor/loadElementSchemaValue';
import i18n from 'i18n';
import { loadElementFormStateName } from 'state/editor/loadElementFormStateName';
import { connect } from 'react-redux';

class InlineEditForm extends PureComponent {
  constructor(props) {
    super(props);

    this.handleLoadingError = this.handleLoadingError.bind(this);

    this.state = {
      loadingError: null
    };
  }

  handleLoadingError() {
    const { jQuery: $ } = window;
    const { handleLoadingError } = this.props;

    this.setState({
      loadingError: true,
    });

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
  }

  render() {
    const { elementId, extraClass, onClick, onFormInit, formHasState } = this.props;
    const { loadingError } = this.state;

    const classNames = classnames('element-editor-editform', extraClass);
    const schemaUrl = loadElementSchemaValue('schemaUrl', elementId);

    const formProps = {
      formTag: 'div',
      schemaUrl,
      identifier: 'element',
      refetchSchemaOnMount: !formHasState,
      onLoadingError: this.handleLoadingError,
      // This null submit handler is used to prevent the FormBuilder form from submitting when any nested
      // FormBuilder forms, such as LinkField v4+, are themselves submitted
      // This FormBuilder form is not submitted in the traditional sense i.e. there is no rendered submit button
      // instead the inline save button will do its own submission in SaveAction.js
      onSubmit: () => new Promise(resolve => resolve),
    };

    if (loadingError) {
      formProps.loading = false;
    }

    if (typeof onFormInit === 'function') {
      formProps.onReduxFormInit = onFormInit;
    }

    return (
      <div className={classNames} onClick={onClick} role="presentation">
        <FormBuilderLoader {...formProps} />
      </div>
    );
  }
}

InlineEditForm.propTypes = {
  extraClass: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClick: PropTypes.func,
  elementId: PropTypes.string,
  handleLoadingError: PropTypes.func,
};

function mapStateToProps(state, ownProps) {
  const formName = loadElementFormStateName(ownProps.elementId);

  return {
    formHasState: state.form.formState && state.form.formState.element &&
      !!state.form.formState.element[formName],
  };
}

export default connect(mapStateToProps)(InlineEditForm);
