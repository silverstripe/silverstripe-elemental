import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import FormBuilderLoader from 'containers/FormBuilderLoader/FormBuilderLoader';
import { loadElementSchemaValue } from 'state/editor/loadElementSchemaValue';
import { bindActionCreators } from 'redux';
import { change } from 'redux-form/lib';
import Config from 'lib/Config';

class InlineEditForm extends PureComponent {
  constructor(props) {
    super(props);

    const sectionKey = 'DNADesign\\Elemental\\Controllers\\ElementalAreaController';
    const section = Config.getSection(sectionKey);
    const formNameTemplate = section.form.elementForm.formNameTemplate;

    this.state = {
      formNameTemplate
    };

    this.updateFormTab = this.updateFormTab.bind(this);
  }

  componentDidMount() {
    this.updateFormTab();
  }

  /**
   * Update the active tab on tab actions menu button click event.
   * @param event onChangeEvent from a input field.
   */
  componentDidUpdate(prevProps) {
    const { activeTab } = this.props;

    if (activeTab !== prevProps.activeTab) {
      this.updateFormTab();
    }
  }

  getFormName(elementId) {
    return `element.${this.state.formNameTemplate.replace('{id}', elementId)}`;
  }

  updateFormTab() {
    const { elementId, actions, activeTab } = this.props;

    // form value hardcoded since neither ElementAreaController.php's getElementForm() nor the
    // schema data can't be accessed
    if (activeTab !== '') {
      actions.reduxForm.change(this.getFormName(elementId), 'Root', activeTab);
    }
  }

  render() {
    const { elementId, extraClass, onClick } = this.props;

    const classNames = classnames('element-editor-editform', extraClass);
    const schemaUrl = loadElementSchemaValue('schemaUrl', elementId);

    const formProps = {
      formTag: 'div',
      schemaUrl,
      identifier: 'element',
      onReduxFormInit: this.updateFormTab,
    };

    return (
      <div className={classNames} onClick={onClick} role="presentation">
        <FormBuilderLoader {...formProps} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      reduxForm: bindActionCreators({ change }, dispatch),
    },
  };
}

InlineEditForm.propTypes = {
  extraClass: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClick: PropTypes.func,
  elementId: PropTypes.string,
  activeTab: PropTypes.string,
};

export { InlineEditForm as Component };

export default connect(null, mapDispatchToProps)(InlineEditForm);
