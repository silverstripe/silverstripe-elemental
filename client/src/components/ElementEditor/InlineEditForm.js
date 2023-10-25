/* global window */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FormBuilder from 'components/FormBuilder/FormBuilder';
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
    const { elementId, extraClass, onClick, onFormInit, formHasState, formSchema } = this.props;
    const { loadingError } = this.state;

    const classNames = classnames('element-editor-editform', extraClass);
    const schemaUrl = loadElementSchemaValue('schemaUrl', elementId);

    const formProps = {
      formTag: 'div',
      schemaUrl,
      identifier: 'element',
      refetchSchemaOnMount: !formHasState,
      onLoadingError: this.handleLoadingError
    };

    console.log(['formSchema is', formSchema]);

    if (typeof formSchema !== 'undefined' && Object.keys(formSchema).length > 0) {
      formProps.schema = formSchema;
    }

    if (loadingError) {
      formProps.loading = false;
    }

    if (typeof onFormInit === 'function') {
      formProps.onReduxFormInit = onFormInit;
    }

    // ==== BORROWED FROM FormBuilderLoader to use on FormBuilder ===
    // function createFormIdentifierFromProps({ identifier, schema = {} }) {
    //   return [
    //     identifier,
    //     schema.schema && schema.schema.name,
    //   ].filter(id => id).join('.');
    // }
    
    // function getIdentifier() {
    //   return createFormIdentifierFromProps(this.props);
    // }

    // if (formProps.hasOwnProperty('schema')) {
    //   formProps.form = getIdentifier(),
    //   onSubmit: this.handleSubmit,
    //   onAutofill: this.handleAutofill,
    // }
    // ======================================

    return (
      <div className={classNames} onClick={onClick} role="presentation">
        {formProps.hasOwnProperty('schema') &&
          <>
            <div>I HAVE A FORM SCHEMA</div>
            <FormBuilder {...formProps} />
          </>
        }
        {!formProps.hasOwnProperty('schema') &&
          <FormBuilderLoader {...formProps} />
        }
      </div>
    );
  }
}

InlineEditForm.propTypes = {
  extraClass: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClick: PropTypes.func,
  elementId: PropTypes.string,
  handleLoadingError: PropTypes.func,
  formSchema: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  const formName = loadElementFormStateName(ownProps.elementId); // ElementForm_3

  return {
    formHasState: state.form.formState && state.form.formState.element &&
      !!state.form.formState.element[formName],
  };
}

export default connect(mapStateToProps)(InlineEditForm);
