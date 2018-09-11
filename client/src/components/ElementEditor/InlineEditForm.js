import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import FormBuilderLoader from 'containers/FormBuilderLoader/FormBuilderLoader';
import Config from 'lib/Config';

class InlineEditForm extends Component {
  getConfig() {
    const sectionKey = 'DNADesign\\Elemental\\Controllers\\ElementalAreaController';
    return Config.getSection(sectionKey);
  }

  render() {
    const { extraClass, elementId, onClick } = this.props;

    const classNames = classnames('element-editor-editform', extraClass);
    const schemaUrl = `${this.getConfig().form.elementForm.schemaUrl}/${elementId}`;

    const formProps = {
      formTag: 'div',
      schemaUrl,
      identifier: 'element',
    };

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
  elementId: PropTypes.number,
};

export default InlineEditForm;
