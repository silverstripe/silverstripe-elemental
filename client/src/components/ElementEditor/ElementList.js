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
  }

  getDragIndicatorIndex() {
    const { dragTargetElementId, draggedItem, blocks, contentBlocks, dragSpot } = this.props;
    const globalUseGraphQL = false;
    const elements = globalUseGraphQL ? blocks : contentBlocks;
    return getDragIndicatorIndex(
      elements.map(element => element.id),
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
      contentBlocks, // rpc, passed in as prop from ElementEditor
      allowedElementTypes,
      elementTypes,
      areaId,
      onDragEnd,
      onDragOver,
      onDragStart,
      isDraggingOver,
    } = this.props;

    const globalUseGraphQL = false;
    const elements = globalUseGraphQL ? blocks : contentBlocks;

    // Blocks can be either null or an empty array
    if (!elements) {
      return null;
    }

    if (elements && !elements.length) {
      return <div>{i18n._t('ElementList.ADD_BLOCKS', 'Add blocks to place your content')}</div>;
    }

    let output = elements.map((element) => (
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
    const {
      loading, // graphql - see readBlocksForAreaQuery
      isLoading, // rpc - passed in from ElementEditor
      LoadingComponent
    } = this.props;
    const globalUseGraphQL = false;
    const loadingValue = globalUseGraphQL ? loading : isLoading;

    if (loadingValue) {
      return <LoadingComponent />;
    }
    return null;
  }

  render() {
    const { blocks, contentBlocks } = this.props;
    const globalUseGraphQL = false;
    const elements = globalUseGraphQL ? blocks : contentBlocks;

    const listClassNames = classNames(
      'elemental-editor-list',
      { 'elemental-editor-list--empty': !elements || !elements.length }
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
  // graphql
  // blocks and loading come from readBlocksForAreaQuery
  blocks: PropTypes.arrayOf(elementType),
  loading: PropTypes.bool,
  // rpc
  contentBlocks: PropTypes.arrayOf(elementType),
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
