import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import FormBuilderLoader from 'containers/FormBuilderLoader/FormBuilderLoader';
import { loadElementSchemaValue } from 'state/editor/loadElementSchemaValue';

class InlineEditForm extends PureComponent {
  render() {
    const { elementId, extraClass, onClick, onFormInit } = this.props;

    const classNames = classnames('element-editor-editform', extraClass);
    const schemaUrl = loadElementSchemaValue('schemaUrl', elementId);

    const formProps = {
      formTag: 'div',
      schemaUrl,
      identifier: 'element',
    };

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
};

export default InlineEditForm;
