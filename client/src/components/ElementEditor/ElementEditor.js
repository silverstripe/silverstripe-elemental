/* global window */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'lib/Injector';
import { compose } from 'redux';
import { elementTypeType } from 'types/elementTypeType';
import { connect } from 'react-redux';
import { loadElementFormStateName } from 'state/editor/loadElementFormStateName';
import { DropTarget } from 'react-dnd';
import sortBlockMutation from 'state/editor/sortBlockMutation';
import ElementDragPreview from 'components/ElementEditor/ElementDragPreview';
import withDragDropContext from 'lib/withDragDropContext';
import { createSelector } from 'reselect';

/**
 * The ElementEditor is used in the CMS to manage a list or nested lists of
 * elements for a page or other DataObject.
 */
class ElementEditor extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dragTargetElementId: null,
      dragSpot: null,
    };

    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  /**
   * Hook for ReactDND triggered by hovering over a drag _target_.
   *
   * This tracks the current hover target and whether it's above the top half of the target
   * or the bottom half.
   *
   * @param element
   * @param isOverTop
   */
  handleDragOver(element = null, isOverTop = null) {
    const id = element ? element.id : false;

    this.setState({
      dragTargetElementId: id,
      dragSpot: isOverTop === false ? 'bottom' : 'top',
    });
  }

  /**
   * Hook for ReactDND triggered when a drag source is dropped onto a drag target.
   *
   * This will fire the GraphQL mutation for sorting and reset any state updates
   *
   * @param sourceId
   * @param afterId
   */
  handleDragEnd(sourceId, afterId) {
    const { actions: { handleSortBlock }, areaId } = this.props;

    handleSortBlock(sourceId, afterId, areaId).then(() => {
      const preview = window.jQuery('.cms-preview');
      preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));
    });

    this.setState({
      dragTargetElementId: null,
      dragSpot: null,
    });
  }

  render() {
    const {
      fieldName,
      formState,
      ToolbarComponent,
      ListComponent,
      areaId,
      elementTypes,
      isDraggingOver,
      connectDropTarget,
      allowedElements,
    } = this.props;
    const { dragTargetElementId, dragSpot } = this.state;

    // Map the allowed elements because we want to retain the sort order provided by that array.
    const allowedElementTypes = allowedElements.map(className =>
      elementTypes.find(type => type.class === className)
    );

    return connectDropTarget(
      <div className="element-editor">
        <ToolbarComponent
          elementTypes={allowedElementTypes}
          areaId={areaId}
          onDragOver={this.handleDragOver}
        />
        <ListComponent
          allowedElementTypes={allowedElementTypes}
          elementTypes={elementTypes}
          areaId={areaId}
          onDragOver={this.handleDragOver}
          onDragStart={this.handleDragStart}
          onDragEnd={this.handleDragEnd}
          dragSpot={dragSpot}
          isDraggingOver={isDraggingOver}
          dragTargetElementId={dragTargetElementId}
        />
        <ElementDragPreview elementTypes={elementTypes} />
        <input
          name={fieldName}
          type="hidden"
          value={JSON.stringify(formState) || ''}
          className="no-change-track"
        />
      </div>
    );
  }
}

ElementEditor.propTypes = {
  fieldName: PropTypes.string,
  elementTypes: PropTypes.arrayOf(elementTypeType).isRequired,
  allowedElements: PropTypes.arrayOf(PropTypes.string).isRequired,
  areaId: PropTypes.number.isRequired,
  actions: PropTypes.shape({
    handleSortBlock: PropTypes.func,
  }),
};

const defaultElementFormState = {};

// Use a memoization to prevent mapStateToProps() re-rendering on formstate changes
// Any formstate change, including unrelated ones such as from another FormBuilderLoader component
// will trigger the ElementalEditor to re-render
const elementFormSelector = createSelector([
  (state) => {
    const elementFormState = state.form.formState.element;

    if (!elementFormState) {
      // This needs to a reference to the defaultElementFormState variable rather than a new object
      // or redux will think the state has changed and cause the component to re-render
      return defaultElementFormState;
    }

    return elementFormState;
  }], (elementFormState) => {
  const formNamePattern = loadElementFormStateName('[0-9]+');

  const filteredElementFormState = Object.keys(elementFormState)
    .filter(key => key.match(formNamePattern))
    .reduce((accumulator, key) => ({
      ...accumulator,
      [key]: elementFormState[key].values
    }), {});

  return filteredElementFormState;
});

function mapStateToProps(state) {
  // Memoize form state and value changes
  const formState = elementFormSelector(state);

  return { formState };
}

export { ElementEditor as Component };
export default compose(
  withDragDropContext,
  DropTarget('element', {}, (connector, monitor) => ({
    connectDropTarget: connector.dropTarget(),
    isDraggingOver: monitor.isOver(), // isDragging is not available on DropTargetMonitor
  })),
  connect(mapStateToProps),
  inject(
    ['ElementToolbar', 'ElementList'],
    (ToolbarComponent, ListComponent) => ({
      ToolbarComponent,
      ListComponent,
    }),
    () => 'ElementEditor'
  ),
  sortBlockMutation
)(ElementEditor);
