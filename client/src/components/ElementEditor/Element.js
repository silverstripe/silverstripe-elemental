/* global window */

import React, { useState, useEffect, useContext, createContext } from 'react';
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
import { ElementEditorContext } from 'components/ElementEditor/ElementEditor';
import { getConfig } from 'state/editor/elementConfig';
import backend from 'lib/Backend';
import Config from 'lib/Config';

export const ElementContext = createContext(null);

/**
 * The Element component used in the context of an ElementEditor shows the summary
 * of an element's details when used in the CMS, including ID, Title and Summary.
 */
const Element = (props) => {
  const [previewExpanded, setPreviewExpanded] = useState(false);
  const [initialTab, setInitialTab] = useState('');
  const [loadingError, setLoadingError] = useState(false);
  const [newTitle, setNewTitle] = useState(props.element.title);
  const [justClickedPublishButton, setJustClickedPublishButton] = useState(false);
  const [doSaveElement, setDoSaveElement] = useState(false);
  const [doPublishElement, setDoPublishElement] = useState(false);
  const [doPublishElementAfterSave, setDoPublishElementAfterSave] = useState(false);
  const [ensureFormRendered, setEnsureFormRendered] = useState(false);
  const [formHasRendered, setFormHasRendered] = useState(false);
  const [doDispatchAddFormChanged, setDoDispatchAddFormChanged] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { fetchElements } = useContext(ElementEditorContext);

  useEffect(() => {
    // Note that formDirty from redux can be set to undefined after failed validation
    // which is confusing as the block still has unsaved changes, hence why we create
    // this state variable to track this instead
    // props.formDirty is either undefined (when pristine) or an object (when dirty)
    const formDirty = typeof props.formDirty !== 'undefined';
    if (formDirty && !hasUnsavedChanges) {
      setHasUnsavedChanges(true);
    }
  }, [props.formDirty]);

  useEffect(() => {
    props.onChangeHasUnsavedChanges(hasUnsavedChanges);
  }, [hasUnsavedChanges]);

  useEffect(() => {
    if (props.saveElement && hasUnsavedChanges && !doSaveElement) {
      setDoSaveElement(true);
    }
  }, [props.saveElement, hasUnsavedChanges, props.increment]);

  useEffect(() => {
    if (props.connectDragPreview) {
      // Use empty image as a drag preview so browsers don't draw it
      // and we can draw whatever we want on the custom drag layer instead.
      props.connectDragPreview(getEmptyImage(), {
        // IE fallback: specify that we'd rather screenshot the node
        // when it already knows it's being dragged so we can hide it with CSS.
        captureDraggingState: true,
      });
    }
  }, []);

  useEffect(() => {
    if (justClickedPublishButton && formHasRendered) {
      setJustClickedPublishButton(false);
      if (hasUnsavedChanges) {
        // Save the element first before publishing, which may trigger validation errors
        props.submitForm();
        setDoPublishElementAfterSave(true);
      } else {
        // Just publish the element straight away without saving first
        setDoPublishElement(true);
      }
    }
  }, [justClickedPublishButton, formHasRendered]);

  useEffect(() => {
    if (doDispatchAddFormChanged) {
      setDoDispatchAddFormChanged(false);
      props.dispatchAddFormChanged();
    }
  }, [doDispatchAddFormChanged]);

  const getNoTitle = () => i18n.inject(
    i18n._t('ElementHeader.NOTITLE', 'Untitled {type} block'),
    { type: props.type.title }
  );

  const showSavedElementToast = (elementTitle) => {
    const title = elementTitle || getNoTitle();
    const message = i18n.inject(
      i18n._t('ElementSaveAction.SUCCESS_NOTIFICATION', 'Saved \'{title}\' successfully'),
      { title }
    );
    props.actions.toasts.success(message);
  };

  const showPublishedElementToast = (wasError) => {
    const title = newTitle || getNoTitle();
    if (wasError) {
      const message = i18n.inject(
        i18n._t('ElementPublishAction.ERROR_NOTIFICATION', 'Error publishing \'{title}\''),
        { title }
      );
      props.actions.toasts.error(message);
    } else {
      const message = i18n.inject(
        i18n._t('ElementPublishAction.SUCCESS_NOTIFICATION', 'Published \'{title}\' successfully'),
        { title }
      );
      props.actions.toasts.success(message);
    }
  };

  const handleAfterPublish = (wasError) => {
    showPublishedElementToast(wasError);
    setDoPublishElement(false);
    setDoPublishElementAfterSave(false);
    fetchElements()
      .then(() => {
        // Ensure that formDirty becomes falsey after publishing
        // We need to call at a later render rather than straight away or redux-form may override this
        // and set the form state to dirty under certain conditions
        // setTimeout is a hackish way to do this, though I'm not sure how else we can do this
        // The core issue is that redux-form will detect changes when a form is hydrated for the first
        // time under certain conditions, specifically during a behat test when trying to publish a closed
        // block when presumably the old apollo cache was empty (or something like that). This happens late and
        // there are no hooks/callbacks available after this happens the input onchange handlers are fired
        setTimeout(() => props.dispatchRemoveFormChanged(), 250);
      });
  };

  // Save action
  useEffect(() => {
    if (formHasRendered && doSaveElement) {
      props.submitForm();
      setDoSaveElement(false);
    }
  }, [formHasRendered, doSaveElement]);

  // Publish action
  useEffect(() => {
    if (formHasRendered && doPublishElement) {
      const url = `${getConfig().controllerLink.replace(/\/$/, '')}/api/publish`;
      backend.post(url, {
        id: props.element.id,
      }, {
        'X-SecurityID': Config.get('SecurityID')
      })
        .then(() => handleAfterPublish(false))
        .catch(() => handleAfterPublish(true));
    }
  }, [formHasRendered, doPublishElement]);

  /**
   * Returns the applicable versioned state class names for the element
   *
   * @returns {string}
   */
  const getVersionedStateClassName = () => {
    const { element } = props;
    const baseClassName = 'element-editor__element';
    if (!element.isPublished) {
      return `${baseClassName}--draft`;
    }
    if (element.isPublished && !element.isLiveVersion) {
      return `${baseClassName}--modified`;
    }
    return `${baseClassName}--published`;
  };

  /**
   * Returns the link title for this element
   *
   * @param {Object} type
   * @returns {string}
   */
  const getLinkTitle = (type) => {
    if (type.broken) {
      return i18n._t('ElementalElement.ARCHIVE_BROKEN', 'Archive this block');
    }
    return i18n.inject(
      i18n._t('ElementalElement.TITLE', 'Edit this {type} block'),
      { type: type.title }
    );
  };

  /**
   * Returns the summary for this element
   *
   * @param {Object} element
   * @param {Object} type
   * @returns {string|JSX.Element}
   */
  const getSummary = (element, type) => {
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
  };

  /**
   * Prevents the Element from being expanded in case a loading error occurred.
   * This gets triggered from the InlineEditForm component.
   */
  const handleLoadingError = () => {
    setLoadingError(true);
  };

  /**
   * Dispatcher to Tabs redux store for this element's tabset
   *
   * @param {string} activeTab Name prop of the active tab
   */
  const updateFormTab = (activeTab) => {
    const { tabSetName, onActivateTab } = props;
    if (!initialTab) {
      setInitialTab(activeTab);
    }
    if (activeTab || initialTab) {
      onActivateTab(tabSetName, activeTab || initialTab);
    } else {
      const defaultFirstTab = 'Main';
      onActivateTab(tabSetName, defaultFirstTab);
    }
  };

  /**
   * Update the active tab on tab actions menu button click event. Is passed down to InlineEditForm.
   *
   * @param {string} toBeActiveTab
   */
  const handleTabClick = (toBeActiveTab) => {
    const { activeTab } = props;
    if (toBeActiveTab !== activeTab && !loadingError) {
      setPreviewExpanded(true);
      updateFormTab(toBeActiveTab);
    }
  };

  /**
   * Expand the element to show the  preview
   * If the element is not inline-editable, take user to the GridFieldDetailForm to edit the record
   */
  const handleExpand = (event) => {
    const { type, link } = props;
    if (type.broken) {
      return;
    }
    if (event.target.type === 'button') {
      // Stop bubbling if the click target was a button within this container
      event.stopPropagation();
      return;
    }
    if (type.inlineEditable && !loadingError) {
      setPreviewExpanded(!previewExpanded);
      return;
    }
    // If inline editing is disabled for this element, send them to the standalone
    // edit form
    window.location = link;
  };

  /**
   * If pressing enter or space key, treat it like a mouse click
   *
   * @param {Object} event
   */
  const handleKeyUp = (event) => {
    const { nodeName } = event.target;
    if ((event.key === ' ' || event.key === 'Enter')
      // Ignore presses while focusing inputs and textareas
      && !['input', 'textarea'].includes(nodeName.toLowerCase())
    ) {
      handleExpand(event);
    }
  };

  const handleSaveButtonClick = () => {
    setEnsureFormRendered(true);
    setDoSaveElement(true);
  };

  const handlePublishButtonClick = () => {
    setJustClickedPublishButton(true);
    setEnsureFormRendered(true);
  };

  const handleFormInit = (activeTab) => {
    updateFormTab(activeTab);
    setFormHasRendered(true);
  };

  const handleFormSchemaSubmitResponse = (formSchema, title) => {
    // Slightly annoyingly, on validation error formSchema at this point will not have an errors node
    // Instead it will have the original formSchema id used for the GET request to get the formSchema i.e.
    // admin/elemental-area/schema/<ItemID>
    // Instead of the one used by the POST submission i.e.
    // admin/elemental-area/elementForm/<LinkID>
    const hasValidationErrors = formSchema.id.match(/\/schema\/elemental-area\/([0-9]+)/);
    if (hasValidationErrors) {
      if (props.type.inlineEditable) {
        setPreviewExpanded(true);
      }
      // Ensure that formDirty remains truthy
      // Note we need to call props.dispatchAddFormChanged() on the next render rather than straight away
      // or it will get unset by code somewhere else, probably redux-form
      setDoDispatchAddFormChanged(true);
      // Don't accidentally auto publish the element once validation errors are fixed
      if (doPublishElementAfterSave) {
        setDoPublishElementAfterSave(false);
      }
      props.onAfterSubmitResponse(false);
      return;
    }
    // Form is valid
    setHasUnsavedChanges(false);
    setNewTitle(title);
    if (doPublishElementAfterSave) {
      setDoPublishElementAfterSave(false);
      setDoPublishElement(true);
    }
    if (!doPublishElement && !doPublishElementAfterSave) {
      showSavedElementToast(title);
    }
    props.onAfterSubmitResponse(true);
    fetchElements();
  };

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
    formDirty,
  } = props;

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
    getVersionedStateClassName()
  );

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const providerValue = {
    formDirty,
    onPublishButtonClick: handlePublishButtonClick,
    onSaveButtonClick: handleSaveButtonClick,
  };

  const content = connectDropTarget(<div
    className={elementClassNames}
    onClick={handleExpand}
    onKeyUp={handleKeyUp}
    role="button"
    tabIndex={0}
    title={getLinkTitle(type)}
    key={element.id}
  >
    <ElementContext.Provider value={providerValue}>
      <HeaderComponent
        element={element}
        type={type}
        areaId={areaId}
        expandable={type.inlineEditable}
        link={link}
        previewExpanded={previewExpanded}
        handleEditTabsClick={handleTabClick}
        activeTab={activeTab}
        disableTooltip={isDragging}
        onDragEnd={onDragEnd}
      />
      <ContentComponent
        id={element.id}
        fileUrl={element.blockSchema.fileURL}
        fileTitle={element.blockSchema.fileTitle}
        content={getSummary(element, type)}
        previewExpanded={previewExpanded && !isDragging}
        ensureFormRendered={ensureFormRendered}
        formHasRendered={formHasRendered}
        activeTab={activeTab}
        handleLoadingError={handleLoadingError}
        broken={type.broken}
        onFormSchemaSubmitResponse={handleFormSchemaSubmitResponse}
        onFormInit={() => handleFormInit(activeTab)}
      />
    </ElementContext.Provider>
  </div>);

  if (!previewExpanded) {
    return connectDragSource(content);
  }

  return content;
};

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
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const elementName = loadElementFormStateName(ownProps.element.id);

  return {
    onActivateTab(tabSetName, activeTabName) {
      dispatch(TabsActions.activateTab(`element.${elementName}__${tabSetName}`, activeTabName));
    },
    submitForm() {
      ownProps.onBeforeSubmitForm(ownProps.element.id);
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
  saveElement: PropTypes.bool.isRequired,
  onBeforeSubmitForm: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  onAfterSubmitResponse: PropTypes.func.isRequired,
  // Used to ensure form gets re-rendered on submission so it can be submitted again if there are validation errors
  increment: PropTypes.number.isRequired,
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
