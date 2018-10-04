/* global window */

import React, { Component, PropTypes } from 'react';
import { elementType } from 'types/elementType';
import { bindActionCreators, compose } from 'redux';
import { inject } from 'lib/Injector';
import i18n from 'i18n';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import { loadElementFormStateName } from 'state/editor/loadElementFormStateName';
import { loadElementSchemaValue } from 'state/editor/loadElementSchemaValue';


/**
 * The Element component used in the context of an ElementEditor shows the summary
 * of an element's details when used in the CMS, including ID, Title and Summary.
 */
class Element extends Component {
  constructor(props) {
    super(props);

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
    this.updateFormTab = this.updateFormTab.bind(this);

    this.state = {
      previewExpanded: false,
      initialTab: '',
    };
  }

  /**
   * Returns the applicable versioned state class names for the element
   *
   * @returns {string}
   */
  getVersionedStateClassName() {
    const { element } = this.props;

    const baseClassName = 'element-editor__element';

    if (!element.IsPublished) {
      return `${baseClassName}--draft`;
    }

    if (element.IsPublished && !element.IsLiveVersion) {
      return `${baseClassName}--modified`;
    }

    return `${baseClassName}--published`;
  }

  /**
   * Dispatcher to Redux-Form state for the Tabs container 'value'
   * @param {string} activeTab Name prop of the active tab
   */
  updateFormTab(activeTab) {
    const { element, actions } = this.props;
    const { initialTab } = this.state;

    const formStateName = loadElementFormStateName(element.ID);

    if (!initialTab) {
      this.setState({
        initialTab: activeTab
      });
    }

    if (activeTab || initialTab) {
      actions.reduxForm.change(formStateName, 'Root', activeTab || initialTab);
    } else {
      const defaultFirstTab = 'Main';
      actions.reduxForm.change(formStateName, 'Root', defaultFirstTab);
    }
  }

  /**
   * Update the active tab on tab actions menu button click event. Is passed down to InlineEditForm.
   *
   * @param {string} toBeActiveTab
   */
  handleTabClick(toBeActiveTab) {
    const { activeTab } = this.props;

    if (toBeActiveTab !== activeTab) {
      this.setState({
        previewExpanded: true,
      });

      this.updateFormTab(toBeActiveTab);
    }
  }

  /**
   * Expand the element to show the  preview
   * If the element is not inline-editable, take user to the GridFieldDetailForm to edit the record
   */
  handleExpand(event) {
    const { element, link } = this.props;

    if (event.target.type === 'button') {
      // Stop bubbling if the click target was a button within this container
      event.stopPropagation();
      return;
    }

    if (element.InlineEditable) {
      this.setState({
        previewExpanded: !this.state.previewExpanded
      });
      return;
    }

    // If inline editing is disabled for this element, send them to the standalone
    // edit form
    window.location = link;
  }

  /**
   * If pressing enter or space key, treat it like a mouse click
   *
   * @param {Object} event
   */
  handleKeyUp(event) {
    const { nodeName } = event.target;

    if (event.code === 'Enter') {
      this.handleExpand(event);
    } else if (
      event.code === 'Space'
      // Ignore space presses while focusing inputs and textareas
      && !['input', 'textarea'].includes(nodeName.toLowerCase())
    ) {
      this.handleExpand(event);
    }
  }

  render() {
    const {
      element,
      HeaderComponent,
      ContentComponent,
      link,
      editTabs,
      pageId,
      activeTab
    } = this.props;

    const { previewExpanded } = this.state;

    const linkTitle = i18n.inject(
      i18n._t('ElementalElement.TITLE', 'Edit this {type} block'),
      { type: element.BlockSchema.type }
    );

    if (!element.ID) {
      return null;
    }

    const elementClassNames = classNames(
      'element-editor__element',
      {
        'element-editor__element--expandable': element.InlineEditable,
      },
      this.getVersionedStateClassName()
    );


    return (
      <div
        className={elementClassNames}
        onClick={this.handleExpand}
        onKeyUp={this.handleKeyUp}
        role="button"
        tabIndex={0}
        title={linkTitle}
        key={element.ID}
      >
        <HeaderComponent
          id={element.ID}
          title={element.Title}
          version={element.Version}
          isLiveVersion={element.IsLiveVersion}
          isPublished={element.IsPublished}
          elementType={element.BlockSchema.type}
          fontIcon={element.BlockSchema.iconClass}
          link={link}
          pageId={pageId}
          editTabs={editTabs}
          previewExpanded={previewExpanded}
          expandable={element.InlineEditable}
          handleEditTabsClick={this.handleTabClick}
          activeTab={activeTab}
        />
        <ContentComponent
          id={element.ID}
          fileUrl={element.BlockSchema.fileURL}
          fileTitle={element.BlockSchema.fileTitle}
          content={element.BlockSchema.content}
          previewExpanded={previewExpanded}
          activeTab={activeTab}
          onFormInit={() => this.updateFormTab(activeTab)}
        />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const elementName = loadElementFormStateName(ownProps.element.ID).split('.')[1];

  // InlineEditForm will neither have been rendered nor wrapped in redux-form
  if (!state.form.formState.element || !state.form.formState.element[elementName]) {
    return {};
  }

  const elementId = ownProps.element.ID;
  const elementFormSchema = loadElementSchemaValue('schemaUrl', elementId);

  const stateValue = state.form.formState.element[elementName].values.Root;

  // Search out a default value for the active tab if it is not already in the state.
  // {@see Tabs.getDefaultActiveKey}
  const filterFieldsForTabs = (field) => field.component === 'Tabs';

  let defaultValue;
  if (
    state.form.formSchemas &&
    state.form.formSchemas[elementFormSchema] &&
    state.form.formSchemas[elementFormSchema].schema
  ) {
    defaultValue = state.form.formSchemas[elementFormSchema].schema.fields
      .find(filterFieldsForTabs).children[0].name;
  }
  const activeTab = stateValue || defaultValue;
  return { activeTab };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      reduxForm: bindActionCreators({ change }, dispatch),
    },
  };
}


Element.propTypes = {
  element: elementType,
  link: PropTypes.string.isRequired,
  editTabs: PropTypes.arrayOf(PropTypes.object),
};

Element.defaultProps = {
  element: null,
};

export { Element as Component };

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  inject(
    ['ElementHeader', 'ElementContent'],
    (HeaderComponent, ContentComponent) => ({
      HeaderComponent, ContentComponent,
    }),
    () => 'ElementEditor.ElementList.Element'
  )
)(Element);
