/* global window */

import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'types/elementType';
import { elementTypeType } from 'types/elementTypeType';
import { bindActionCreators, compose } from 'redux';
import { inject } from 'lib/Injector';
import i18n from 'i18n';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { loadElementFormStateName } from 'state/editor/loadElementFormStateName';
import { loadElementSchemaValue } from 'state/editor/loadElementSchemaValue';
import * as TabsActions from 'state/tabs/TabsActions';
import { DragSource, DropTarget } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { elementDragSource, isOverTop } from 'lib/dragHelpers';
import * as toastsActions from 'state/toasts/ToastsActions';
import { addFormChanged, removeFormChanged } from 'state/unsavedForms/UnsavedFormsActions';

export const ElementContext = createContext(null);

/**
 * The Element component used in the context of an ElementEditor shows the summary
 * of an element's details when used in the CMS, including ID, Title and Summary.
 */
class Element extends Component {
  static getDerivedStateFromError() {
    return { childRenderingError: true };
  }

  constructor(props) {
    super(props);

    this.showSavedElementToast = this.showSavedElementToast.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleLoadingError = this.handleLoadingError.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
    this.updateFormTab = this.updateFormTab.bind(this);
    this.handleFormSchemaSubmitResponse = this.handleFormSchemaSubmitResponse.bind(this);
    this.handleFormInit = this.handleFormInit.bind(this);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.handlePublishButtonClick = this.handlePublishButtonClick.bind(this);
    this.handleAfterSave = this.handleAfterSave.bind(this);
    this.handleAfterPublish = this.handleAfterPublish.bind(this);
    this.refetchElementalArea = this.refetchElementalArea.bind(this);

    this.state = {
      previewExpanded: false,
      initialTab: '',
      loadingError: false,
      childRenderingError: false,
      newTitle: this.props.element.title,
      justClickedPublishButton: false,
      doSaveElement: false,
      doPublishElement: false,
      doPublishElementAfterSave: false,
      ensureFormRendered: false,
      formHasRendered: false,
      doDispatchAddFormChanged: false,
    };
  }

  componentDidMount() {
    const { connectDragPreview } = this.props;
    if (connectDragPreview) {
      // Use empty image as a drag preview so browsers don't draw it
      // and we can draw whatever we want on the custom drag layer instead.
      connectDragPreview(getEmptyImage(), {
        // IE fallback: specify that we'd rather screenshot the node
        // when it already knows it's being dragged so we can hide it with CSS.
        captureDraggingState: true,
      });
    }
    // Check if formSchema state has already been loaded before opening a block
    // This can happen if there was a validation error on a block after performing a Page save
    if (this.props.formStateExists) {
      this.setState({
        formHasRendered: true
      });
    }
  }

  componentDidUpdate() {
    const newState = {};
    if (this.state.justClickedPublishButton && this.state.formHasRendered) {
      newState.justClickedPublishButton = false;
      if (this.props.formDirty) {
        // Save the element first before publishing, which may trigger validation errors
        this.props.submitForm();
        newState.doPublishElementAfterSave = true;
      } else {
        // Just publish the element straight away without saving first
        newState.doPublishElement = true;
      }
    }
    if (this.state.doDispatchAddFormChanged) {
      newState.doDispatchAddFormChanged = false;
      this.props.dispatchAddFormChanged();
    }
    if (Object.keys(newState).length > 0) {
      this.setState(newState);
    }
  }

  showSavedElementToast(newTitle) {
    const title = newTitle || this.getNoTitle();
    const message = i18n.inject(
      i18n._t('ElementSaveAction.SUCCESS_NOTIFICATION', 'Saved \'{title}\' successfully'),
      { title }
    );
    this.props.actions.toasts.success(message);
  }

  showPublishedElementToast(wasError) {
    const title = this.state.newTitle || this.getNoTitle();
    if (wasError) {
      const message = i18n.inject(
        i18n._t('ElementPublishAction.ERROR_NOTIFICATION', 'Error publishing \'{title}\''),
        { title }
      );
      this.props.actions.toasts.error(message);
    } else {
      const message = i18n.inject(
        i18n._t('ElementPublishAction.SUCCESS_NOTIFICATION', 'Published \'{title}\' successfully'),
        { title }
      );
      this.props.actions.toasts.success(message);
    }
  }

  getNoTitle() {
    return i18n.inject(
      i18n._t('ElementHeader.NOTITLE', 'Untitled {type} block'),
      { type: this.props.type.title }
    );
  }

  /**
   * Returns the applicable versioned state class names for the element
   *
   * @returns {string}
   */
  getVersionedStateClassName() {
    const { element } = this.props;

    const baseClassName = 'element-editor__element';

    if (!element.isPublished) {
      return `${baseClassName}--draft`;
    }

    if (element.isPublished && !element.isLiveVersion) {
      return `${baseClassName}--modified`;
    }

    return `${baseClassName}--published`;
  }

  /**
   * Returns the link title for this element
   *
   * @param {Object} type
   * @returns {string}
   */
  getLinkTitle(type) {
    if (type.broken) {
      return i18n._t('ElementalElement.ARCHIVE_BROKEN', 'Archive this block');
    }
    return i18n.inject(
      i18n._t('ElementalElement.TITLE', 'Edit this {type} block'),
      { type: type.title }
    );
  }

  /**
   * Returns the summary for this elemen
   *
   * @param {Object} element
   * @param {Object} type
   * @returns {string|JSX.Element}
   */
  getSummary(element, type) {
    if (type.broken) {
      // Return a message about the broken block.
      return element.title ? i18n.inject(
        i18n._t(
          'ElementalElement.BROKEN_DESCRIPTION_TITLE',
          'This block had the title "{title}". It is broken and will not display on the front-end. You can archive it to remove it from this elemental area.'
        ),
        { title: element.title }
      ) : i18n._t(
        'ElementalElement.BROKEN_DESCRIPTION',
        'This block is broken and will not display on the front-end. You can archive it to remove it from this elemental area.'
      );
    }
    // Return the configured summary for this block.
    return element.blockSchema.content;
  }

  /**
   * Prevents the Element from being expanded in case a loading error occurred.
   * This gets triggered from the InlineEditForm component.
   */
  handleLoadingError() {
    this.setState({
      loadingError: true
    });
  }

  /**
   * Dispatcher to Tabs redux store for this element's tabset
   *
   * @param {string} activeTab Name prop of the active tab
   */
  updateFormTab(activeTab) {
    const { tabSetName, onActivateTab } = this.props;
    const { initialTab } = this.state;

    if (!initialTab) {
      this.setState({
        initialTab: activeTab
      });
    }

    if (activeTab || initialTab) {
      onActivateTab(tabSetName, activeTab || initialTab);
    } else {
      const defaultFirstTab = 'Main';
      onActivateTab(tabSetName, defaultFirstTab);
    }
  }

  /**
   * Update the active tab on tab actions menu button click event. Is passed down to InlineEditForm.
   *
   * @param {string} toBeActiveTab
   */
  handleTabClick(toBeActiveTab) {
    const { activeTab } = this.props;
    const { loadingError } = this.state;

    if (toBeActiveTab !== activeTab && !loadingError) {
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
    const { type, link } = this.props;
    const { loadingError } = this.state;

    if (type.broken) {
      return;
    }

    if (event.target.type === 'button') {
      // Stop bubbling if the click target was a button within this container
      event.stopPropagation();
      return;
    }

    if (type.inlineEditable && !loadingError) {
      this.setState((prevState) => ({
        previewExpanded: !prevState.previewExpanded
      }));
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

    if (
      (event.key === ' ' || event.key === 'Enter')
      // Ignore presses while focusing inputs and textareas
      && !['input', 'textarea'].includes(nodeName.toLowerCase())
    ) {
      this.handleExpand(event);
    }
  }

  handleSaveButtonClick() {
    this.setState({
      ensureFormRendered: true,
      doSaveElement: true,
    });
  }

  handlePublishButtonClick() {
    this.setState({
      justClickedPublishButton: true,
      ensureFormRendered: true,
    });
  }

  handleAfterSave() {
    this.setState({
      doSaveElement: false,
    });
  }

  handleAfterPublish(wasError) {
    this.showPublishedElementToast(wasError);
    this.setState({
      doPublishElement: false,
      doPublishElementAfterSave: false,
    });
    // Ensure that formDirty becomes falsey after publishing
    // We need to call at a later render rather than straight away or redux-form may override this
    // and set the form state to dirty under certain conditions
    // setTimeout is a hackish way to do this, though I'm not sure how else we can do this
    // The core issue is that redux-form will detect changes when a form is hydrated for the first
    // time under certain conditions, specifically during a behat test when trying to publish a closed
    // block when presumably the apollo cache is empty (or something like that). This happens late and
    // there are no hooks/callbacks available after this happens the input onchange handlers are fired
    setTimeout(() => {
      this.props.dispatchRemoveFormChanged();
    }, 500);
    this.refetchElementalArea();
  }

  handleFormInit(activeTab) {
    this.updateFormTab(activeTab);
    this.setState({
      formHasRendered: true,
    });
  }

  handleFormSchemaSubmitResponse(formSchema, title) {
    // Slightly annoyingly, on validation error formSchema at this point will not have an errors node
    // Instead it will have the original formSchema id used for the GET request to get the formSchema i.e.
    // admin/elemental-area/schema/<ItemID>
    // Instead of the one used by the POST submission i.e.
    // admin/elemental-area/elementForm/<LinkID>
    const hasValidationErrors = formSchema.id.match(/\/schema\/elemental-area\/([0-9]+)/);
    if (hasValidationErrors) {
      const newState = {};
      if (this.props.type.inlineEditable) {
        newState.previewExpanded = true;
      }
      // Ensure that formDirty remains truthy
      // Note we need to call this.props.dispatchAddFormChanged() on the next render rather than straight away
      // or it will get unset by code somewhere else, probably redux-form
      newState.doDispatchAddFormChanged = true;
      // Don't accidentally auto publish the element once validation errors are fixed
      if (this.state.doPublishElementAfterSave) {
        newState.doPublishElementAfterSave = false;
      }
      this.setState(newState);
      return;
    }
    const newState = {};
    // Form is valid
    newState.newTitle = title;
    if (this.state.doPublishElementAfterSave) {
      newState.doPublishElementAfterSave = false;
      newState.doPublishElement = true;
    }
    if (!this.state.doPublishElement && !this.state.doPublishElementAfterSave) {
      this.showSavedElementToast(title);
    }
    this.refetchElementalArea();
    this.setState(newState);
  }

  refetchElementalArea() {
    // This will trigger a graphql readOneElementalArea request that will cause this
    // element to re-render including any updated title and versioned badge
    window.ss.apolloClient.queryManager.reFetchObservableQueries();
  }

  render() {
    const {
      element,
      type,
      areaId,
      HeaderComponent,
      ContentComponent,
      link,
      activeTab,
      connectDragSource,
      connectDropTarget,
      isDragging,
      isOver,
      onDragEnd,
      submitForm,
      formDirty,
    } = this.props;

    const { childRenderingError, previewExpanded } = this.state;

    if (!element.id) {
      return null;
    }

    const elementClassNames = classNames(
      'element-editor__element',
      {
        'element-editor__element--broken': type.broken,
        'element-editor__element--expandable': type.inlineEditable && !type.broken,
        'element-editor__element--dragging': isDragging,
        'element-editor__element--dragged-over': isOver,
      },
      this.getVersionedStateClassName()
    );

    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const providerValue = {
      formDirty,
      formHasRendered: this.state.formHasRendered,
      onPublishButtonClick: this.handlePublishButtonClick,
      doPublishElement: this.state.doPublishElement,
      onSaveButtonClick: this.handleSaveButtonClick,
      doSaveElement: this.state.doSaveElement,
      onAfterSave: this.handleAfterSave,
      onAfterPublish: this.handleAfterPublish,
      submitForm,
    };

    const content = connectDropTarget(<div
      className={elementClassNames}
      onClick={this.handleExpand}
      onKeyUp={this.handleKeyUp}
      role="button"
      tabIndex={0}
      title={this.getLinkTitle(type)}
      key={element.id}
    >
      <ElementContext.Provider value={providerValue}>
        <HeaderComponent
          element={element}
          type={type}
          areaId={areaId}
          expandable={type.inlineEditable}
          link={link}
          previewExpanded={previewExpanded && !childRenderingError}
          handleEditTabsClick={this.handleTabClick}
          activeTab={activeTab}
          disableTooltip={isDragging}
          onDragEnd={onDragEnd}
        />

        {
          !childRenderingError &&
          <ContentComponent
            id={element.id}
            fileUrl={element.blockSchema.fileURL}
            fileTitle={element.blockSchema.fileTitle}
            content={this.getSummary(element, type)}
            previewExpanded={previewExpanded && !isDragging}
            ensureFormRendered={this.state.ensureFormRendered}
            formHasRendered={this.state.formHasRendered}
            activeTab={activeTab}
            handleLoadingError={this.handleLoadingError}
            broken={type.broken}
            onFormSchemaSubmitResponse={this.handleFormSchemaSubmitResponse}
            onFormInit={() => this.handleFormInit(activeTab)}
          />
        }

        {
          childRenderingError &&
          <div className="alert alert-danger mt-2">
            {i18n._t('ElementalElement.CHILD_RENDERING_ERROR', 'Something went wrong with this block. Please try saving and refreshing the CMS.')}
          </div>
        }
      </ElementContext.Provider>
    </div>);

    if (!previewExpanded) {
      return connectDragSource(content);
    }

    return content;
  }
}

function mapStateToProps(state, ownProps) {
  const elementId = ownProps.element.id;
  const elementName = loadElementFormStateName(elementId);
  const elementFormSchema = loadElementSchemaValue('schemaUrl', elementId);
  const filterFieldsForTabs = (field) => field.component === 'Tabs';

  // Find name of the first Tabs component in the form
  // Only defined - and needed - once the form is loaded
  const tabSet =
    state.form &&
    state.form.formSchemas[elementFormSchema] &&
    state.form.formSchemas[elementFormSchema].schema &&
    state.form.formSchemas[elementFormSchema].schema.fields.find(filterFieldsForTabs);

  const tabSetName = tabSet && tabSet.id;
  const uniqueFieldId = `element.${elementName}__${tabSetName}`;
  const formDirty = state.unsavedForms.find((unsaved) => unsaved.name === `element.${elementName}`);
  const formStateExists = state.form
    && state.form.formState
    && state.form.formState.element
    && state.form.formState.element.hasOwnProperty(elementName);

  // Find name of the active tab in the tab set
  // Only defined once an element form is expanded for the first time
  const activeTab =
    state.tabs &&
    state.tabs.fields &&
    state.tabs.fields[uniqueFieldId] &&
    state.tabs.fields[uniqueFieldId].activeTab;
  return {
    tabSetName,
    activeTab,
    formDirty,
    formStateExists,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const elementName = loadElementFormStateName(ownProps.element.id);

  return {
    onActivateTab(tabSetName, activeTabName) {
      dispatch(TabsActions.activateTab(`element.${elementName}__${tabSetName}`, activeTabName));
    },
    submitForm() {
      // Perform a redux-form remote-submit
      dispatch(submit(`element.${elementName}`));
    },
    dispatchAddFormChanged() {
      // Ensures the form identifier is in unsavedForms in the global redux state
      // This is used to derive the formDirty prop in mapStateToProps
      dispatch(addFormChanged(`element.${elementName}`));
    },
    dispatchRemoveFormChanged() {
      // Removes the form identifier from unsavedForms in the global redux store
      // Opposite of beheaviour of dispatchAddFormChanged()
      dispatch(removeFormChanged(`element.${elementName}`));
    },
    actions: {
      toasts: bindActionCreators(toastsActions, dispatch),
    },
  };
}

Element.propTypes = {
  element: elementType,
  type: elementTypeType.isRequired,
  areaId: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
  // Redux mapped props:
  activeTab: PropTypes.string,
  tabSetName: PropTypes.string,
  onActivateTab: PropTypes.func,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired,
  onDragOver: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  onDragEnd: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  onDragStart: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
};

Element.defaultProps = {
  element: null,
};

export { Element as Component };

const elementTarget = {
  drop(props, monitor, component) {
    const { element } = props;

    return {
      target: element.id,
      dropSpot: isOverTop(monitor, component) ? 'top' : 'bottom',
    };
  },

  hover(props, monitor, component) {
    const { element, onDragOver } = props;

    if (onDragOver) {
      onDragOver(element, isOverTop(monitor, component));
    }
  },
};

export default compose(
  DropTarget('element', elementTarget, (connector, monitor) => ({
    connectDropTarget: connector.dropTarget(),
    isOver: monitor.isOver(),
  })),
  DragSource('element', elementDragSource, (connector, monitor) => ({
    connectDragSource: connector.dragSource(),
    connectDragPreview: connector.dragPreview(),
    isDragging: monitor.isDragging(),
  })),
  connect(mapStateToProps, mapDispatchToProps),
  inject(
    ['ElementHeader', 'ElementContent'],
    (HeaderComponent, ContentComponent) => ({
      HeaderComponent, ContentComponent,
    }),
    () => 'ElementEditor.ElementList.Element'
  )
)(Element);
