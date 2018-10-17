import React, { PureComponent, PropTypes } from 'react';
import { inject } from 'lib/Injector';
import { compose } from 'redux';
import { elementTypeType } from 'types/elementTypeType';
import { connect } from 'react-redux';
import { loadElementFormStateName } from 'state/editor/loadElementFormStateName';
import { DragDropContext, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import classnames from 'classnames';
import sortBlockMutation from 'state/editor/sortBlockMutation';
import ElementDragPreview from 'components/ElementEditor/ElementDragPreview';

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

  handleDragOver(element = null, isOverTop = null) {
    const id = element ? element.ID : false;

    this.setState({
      dragTargetElementId: id,
      dragSpot: isOverTop === false ? 'bottom' : 'top',
    });
  }

  handleDragEnd(sourceId, afterId) {
    const { actions: { handleSortBlock }, pageId } = this.props;

    handleSortBlock(sourceId, afterId, pageId);

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
      pageId,
      elementalAreaId,
      elementTypes,
      isDraggingOver,
      connectDropTarget,
    } = this.props;
    const { dragTargetElementId, dragSpot } = this.state;

    const classNames = classnames('element-editor', {
      // 'element-editor--dragging': isDragging,
    });

    return connectDropTarget(
      <div className={classNames}>
        <ToolbarComponent
          elementTypes={elementTypes}
          elementalAreaId={elementalAreaId}
          onDragOver={this.handleDragOver}
        />
        <ListComponent
          elementTypes={elementTypes}
          pageId={pageId}
          elementalAreaId={elementalAreaId}
          onDragOver={this.handleDragOver}
          onDragStart={this.handleDragStart}
          onDragEnd={this.handleDragEnd}
          dragSpot={dragSpot}
          isDraggingOver={isDraggingOver}
          dragTargetElementId={dragTargetElementId}
        />
        <ElementDragPreview />
        <input name={fieldName} type="hidden" value={JSON.stringify(formState)} />
      </div>
    );
  }
}

ElementEditor.propTypes = {
  fieldName: PropTypes.string,
  elementTypes: PropTypes.arrayOf(elementTypeType).isRequired,
  pageId: PropTypes.number.isRequired,
  elementalAreaId: PropTypes.number.isRequired,
  actions: PropTypes.shape({
    handleSortBlock: PropTypes.func,
  }),
};

ElementEditor.defaultProps = {};

function mapStateToProps(state) {
  const formNamePattern = loadElementFormStateName('[0-9]+');
  const elementFormState = state.form.formState.element;

  if (!elementFormState) {
    return {};
  }

  const formState = Object.keys(elementFormState)
    .filter(key => key.match(formNamePattern))
    .reduce((accumulator, key) => ({
        ...accumulator,
        [key]: elementFormState[key].values
    }), {});

  return { formState };
}

export { ElementEditor as Component };
export default compose(
  DragDropContext(HTML5Backend),
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
