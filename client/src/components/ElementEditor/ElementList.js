import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'types/elementType';
import { elementTypeType } from 'types/elementTypeType';
import { compose } from 'redux';
import { inject } from 'lib/Injector';
import classNames from 'classnames';
import i18n from 'i18n';
import { DropTarget } from 'react-dnd';
import { getDragIndicatorIndex } from 'lib/dragHelpers';
import { getElementTypeConfig } from 'state/editor/elementConfig';

class ElementList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      contentBlocks: [],
    };
  }

  // #RPC
  // it should make an ajax call to the server and do the equivalent of readBlocksForAreaQuery
  // it should the call this.setState `contentBlocks` with the result
  // this will cause a re-render of the component
  // this callback should be passed to other components via context and get called after doing mutations
  fetchContentBlocks() {
    const globalUseGraphQL = false;
    if (globalUseGraphQL) {
      return;
    }
    // TODO: implement
  }

  getDragIndicatorIndex() {
    const { dragTargetElementId, draggedItem, blocks, dragSpot } = this.props;
    return getDragIndicatorIndex(
      blocks.map(element => element.id),
      dragTargetElementId,
      draggedItem && draggedItem.id,
      dragSpot
    );
  }

  /**
   * Renders a list of Element components, each with an elementType object
   * of data mapped into it. The data is provided by a GraphQL HOC registered
   * in registerTransforms.js.
   */
  renderBlocks() {
    const {
      ElementComponent,
      HoverBarComponent,
      DragIndicatorComponent,
      blocks, // graphql - comes from readBlocksForAreaQuery
      allowedElementTypes,
      elementTypes,
      areaId,
      onDragEnd,
      onDragOver,
      onDragStart,
      isDraggingOver,
    } = this.props;

    const globalUseGraphQL = false;
    const contentBlocks = globalUseGraphQL ? blocks : this.state.contentBlocks;

    // Blocks can be either null or an empty array
    if (!contentBlocks) {
      return null;
    }

    if (contentBlocks && !contentBlocks.length) {
      return <div>{i18n._t('ElementList.ADD_BLOCKS', 'Add blocks to place your content')}</div>;
    }

    let output = contentBlocks.map((element) => (
      <div key={element.id}>
        <ElementComponent
          element={element}
          areaId={areaId}
          type={getElementTypeConfig(element, elementTypes)}
          link={element.blockSchema.actions.edit}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
        />
        {isDraggingOver || <HoverBarComponent
          key={`create-after-${element.id}`}
          areaId={areaId}
          elementId={element.id}
          elementTypes={allowedElementTypes}
        />}
      </div>
    ));

    // Add a insert point above the first block for consistency
    if (!isDraggingOver) {
      output = [
        <HoverBarComponent
          key={0}
          areaId={areaId}
          elementId={0}
          elementTypes={allowedElementTypes}
        />
      ].concat(output);
    }

    const dragIndicatorIndex = this.getDragIndicatorIndex();
    if (isDraggingOver && dragIndicatorIndex !== null) {
      output.splice(dragIndicatorIndex, 0, <DragIndicatorComponent key="DropIndicator" />);
    }

    return output;
  }

  /**
   * Renders a loading component
   *
   * @returns {LoadingComponent|null}
   */
  renderLoading() {
    const { loading, LoadingComponent } = this.props;
    const globalUseGraphQL = false;
    const isLoading = globalUseGraphQL ? loading : this.state.isLoading;

    if (isLoading) {
      return <LoadingComponent />;
    }
    return null;
  }

  render() {
    const { blocks } = this.props;
    const globalUseGraphQL = false;
    const contentBlocks = globalUseGraphQL ? blocks : this.state.contentBlocks;

    const listClassNames = classNames(
      'elemental-editor-list',
      { 'elemental-editor-list--empty': !contentBlocks || !contentBlocks.length }
    );

    return this.props.connectDropTarget(
      <div className={listClassNames}>
        {this.renderLoading()}
        {this.renderBlocks()}
      </div>
    );
  }
}

ElementList.propTypes = {
  // blocks and loading come from readBlocksForAreaQuery
  blocks: PropTypes.arrayOf(elementType),
  loading: PropTypes.bool,
  //
  elementTypes: PropTypes.arrayOf(elementTypeType).isRequired,
  allowedElementTypes: PropTypes.arrayOf(elementTypeType).isRequired,
  areaId: PropTypes.number.isRequired,
  dragTargetElementId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onDragOver: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
};

ElementList.defaultProps = {
  blocks: [],
  loading: false,
};

export { ElementList as Component };

const elementListTarget = {
  drop(props, monitor) {
    const { blocks } = props;
    const elementTargetDropResult = monitor.getDropResult();

    if (!elementTargetDropResult) {
      return {};
    }

    const dropIndex = getDragIndicatorIndex(
      blocks.map(element => element.id),
      elementTargetDropResult.target,
      monitor.getItem(),
      elementTargetDropResult.dropSpot,
    );
    const dropAfterID = blocks[dropIndex - 1] ? blocks[dropIndex - 1].id : '0';

    return {
      ...elementTargetDropResult,
      dropAfterID,
    };
  },
};

export default compose(
  DropTarget('element', elementListTarget, (connector, monitor) => ({
    connectDropTarget: connector.dropTarget(),
    draggedItem: monitor.getItem(),
  })),
  inject(
    ['Element', 'Loading', 'HoverBar', 'DragPositionIndicator'],
    (ElementComponent, LoadingComponent, HoverBarComponent, DragIndicatorComponent) => ({
      ElementComponent,
      LoadingComponent,
      HoverBarComponent,
      DragIndicatorComponent,
    }),
    () => 'ElementEditor.ElementList'
  )
)(ElementList);
