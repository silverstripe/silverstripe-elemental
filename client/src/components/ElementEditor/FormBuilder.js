import React from 'react';
import classnames from 'classnames';
import FormBuilderLoader from 'containers/FormBuilderLoader/FormBuilderLoader';
import Config from 'lib/Config';

function FormBuilder(props) {
  const classNames = classnames(
    'element-editor-formbuilder',
    props.extraClasses
  );
  const baseURL = Config.get('baseUrl').replace(/\/$/, '');
  return (<div className={classNames} onClick={props.onClick} role="presentation">
    <FormBuilderLoader
      formTag="div"
      schemaUrl={`${baseURL}/admin/elemental-area/schema/elementForm/${props.elementId}`}
      identifier="element"
    />
  </div>);
}

export default FormBuilder;
