/* global window */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FormBuilder from 'components/FormBuilder/FormBuilder';
import FormBuilderLoader from 'containers/FormBuilderLoader/FormBuilderLoader';
import FormBuilderModal from 'components/FormBuilderModal/FormBuilderModal';
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

    // formTag needs to be a form rather than a div so that the php FormAction that turns into
    // a <button type="submit>" submits this <form>, rather than the <form> for the parent page EditForm
    const formTag = 'form';

    const formProps = {
      formTag,
      schemaUrl,
      identifier: 'element',
      refetchSchemaOnMount: !formHasState,
      onLoadingError: this.handleLoadingError
    };

    if (typeof formSchema !== 'undefined' && Object.keys(formSchema).length > 0) {
      formProps.schema = formSchema;
    }

    if (loadingError) {
      formProps.loading = false;
    }

    if (typeof onFormInit === 'function') {
      formProps.onReduxFormInit = onFormInit;
    }

    return (
      <div className={classNames} onClick={onClick} role="presentation">
        <FormBuilderLoader {...formProps}>
          <div>lorem ipsum</div>
        </FormBuilderLoader>
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
