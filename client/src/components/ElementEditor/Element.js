/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'types/elementType';
import { elementTypeType } from 'types/elementTypeType';
import { compose } from 'redux';
import { inject } from 'lib/Injector';
import i18n from 'i18n';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { loadElementFormStateName } from 'state/editor/loadElementFormStateName';
import { loadElementSchemaValue } from 'state/editor/loadElementSchemaValue';
import * as TabsActions from 'state/tabs/TabsActions';
import { DragSource, DropTarget } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { isOverTop } from 'lib/dragHelpers';

/**
 * The Element component used in the context of an ElementEditor shows the summary
 * of an element's details when used in the CMS, including ID, Title and Summary.
 */
class Element extends Component {
  constructor(props) {
    super(props);

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleLoadingError = this.handleLoadingError.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
    this.updateFormTab = this.updateFormTab.bind(this);

    this.state = {
      previewExpanded: false,
      initialTab: '',
      loadingError: false,
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

    if (event.target.type === 'button') {
      // Stop bubbling if the click target was a button within this container
      event.stopPropagation();
      return;
    }

    if (type.inlineEditable && !loadingError) {
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
    } = this.props;

    const { previewExpanded } = this.state;

    const linkTitle = i18n.inject(
      i18n._t('ElementalElement.TITLE', 'Edit this {type} block'),
      { type: type.title }
    );

    if (!element.ID) {
      return null;
    }

    const elementClassNames = classNames(
      'element-editor__element',
      {
        'element-editor__element--expandable': type.inlineEditable,
        'element-editor__element--dragging': isDragging,
        'element-editor__element--dragged-over': isOver,
      },
      this.getVersionedStateClassName()
    );

    return connectDropTarget(connectDragSource(
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
          element={element}
          type={type}
          areaId={areaId}
          expandable={type.inlineEditable}
          link={link}
          previewExpanded={previewExpanded}
          handleEditTabsClick={this.handleTabClick}
          activeTab={activeTab}
          disableTooltip={isDragging}
        />
        <ContentComponent
          id={element.ID}
          fileUrl={element.BlockSchema.fileURL}
          fileTitle={element.BlockSchema.fileTitle}
          content={element.BlockSchema.content}
          previewExpanded={previewExpanded && !isDragging}
          activeTab={activeTab}
          onFormInit={() => this.updateFormTab(activeTab)}
          handleLoadingError={this.handleLoadingError}
        />
      </div>
    ));
  }
}

function mapStateToProps(state, ownProps) {
  const elementId = ownProps.element.ID;
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

  // Find name of the active tab in the tab set
  // Only defined once an element form is expanded for the first time
  const activeTab =
    state.tabs &&
    state.tabs.fields &&
    state.tabs.fields[uniqueFieldId] &&
    state.tabs.fields[uniqueFieldId].activeTab
  ;

  return {
    tabSetName,
    activeTab,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const elementName = loadElementFormStateName(ownProps.element.ID);

  return {
    onActivateTab(tabSetName, activeTabName) {
      dispatch(TabsActions.activateTab(`element.${elementName}__${tabSetName}`, activeTabName));
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

const elementSource = {
  beginDrag(props) {
    return props.element;
  },

  endDrag(props, monitor) {
    const { onDragEnd } = props;

    if (!onDragEnd || !monitor.getDropResult()) {
      return;
    }

    onDragEnd(monitor.getItem().ID, monitor.getDropResult().dropAfterID);
  }
};

const elementTarget = {
  drop(props, monitor, component) {
    const { element } = props;

    return {
      target: element.ID,
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
  DragSource('element', elementSource, (connector, monitor) => ({
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
