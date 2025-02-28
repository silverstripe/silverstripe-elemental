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
    this.resetState = this.resetState.bind(this);
    this.handleBeforeSubmitForm = this.handleBeforeSubmitForm.bind(this);
    this.handleAfterSubmitResponse = this.handleAfterSubmitResponse.bind(this);
    this.state = {
      // saveAllElements will be set to true in entwine.js in the 'onbeforesubmitform' "hook"
      // which is triggered by LeftAndMain submitForm()
      saveAllElements: false,
      // increment is also set in entwine.js in the 'onbeforesubmitform' "hook"
      increment: 0,
      hasUnsavedChangesBlockIDs: {},
      validBlockIDs: {},
    };
    // Update the sharedObject so that setState() can be called from entwine.js
    this.props.sharedObject.setState = this.setState.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    // Scenario: save/publish buttons clicked before the elemental area is rendered
    if (!this.props.blocks && !prevProps.blocks) {
      return;
    }
    // Scenario: blocks props just changed after a graphql query response updated it
    if (this.props.blocks !== prevProps.blocks) {
      this.resetState(prevState, false);
      return;
    }
    // Scenario we've just clicked "save" or "submit" on the form
    if (this.state.saveAllElements && !prevState.saveAllElements) {
      // Reset the validation state of all blocks.
      // This mirrors handleBeforeSubmitForm() for individual blocks.
      this.resetState(prevState, false);
      return;
    }
    // Scenario Saving all elements and state has just updated because of a formSchema response from
    // an inline save - see Element.js handleFormSchemaSubmitResponse()
    if (this.state.saveAllElements) {
      const unsavedChangesBlockIDs = this.props.blocks
        .map(block => parseInt(block.id, 10))
        .filter(blockID => this.state.hasUnsavedChangesBlockIDs[blockID]);
      const allValidated = unsavedChangesBlockIDs.every(blockID => this.state.validBlockIDs[blockID] !== null);
      if (allValidated) {
        const allValid = unsavedChangesBlockIDs.every(blockID => this.state.validBlockIDs[blockID]);
        // entwineResolve is bound in entwine.js
        const result = {
          success: allValid,
          reason: allValid ? '' : 'invalid',
        };
        this.props.sharedObject.entwineResolve(result);
        this.resetState(prevState, allValid);
        this.setState({ saveAllElements: false });
      }
    }
  }

  resetState(prevState, resetHasUnsavedChangesBlockIDs) {
    // hasUnsavedChangesBlockIDs is the block dirty state and uses a boolean
    const hasUnsavedChangesBlockIDs = {};
    // validBlockIDs is the block validation state and uses a tri-state
    // - null: not saved
    // - true: saved, valid
    // - false: attempted save, invalid
    const validBlockIDs = {};
    const blocks = this.props.blocks || [];
    blocks.forEach(block => {
      const blockID = parseInt(block.id, 10);
      if (resetHasUnsavedChangesBlockIDs) {
        hasUnsavedChangesBlockIDs[blockID] = false;
      } else if (prevState.hasUnsavedChangesBlockIDs.hasOwnProperty(blockID)) {
        hasUnsavedChangesBlockIDs[blockID] = prevState.hasUnsavedChangesBlockIDs[blockID];
      } else {
        hasUnsavedChangesBlockIDs[blockID] = false;
      }
      validBlockIDs[blockID] = null;
    });
    this.setState({ hasUnsavedChangesBlockIDs, validBlockIDs });
  }

  handleChangeHasUnsavedChanges(elementID, hasUnsavedChanges) {
    this.setState(prevState => ({
      hasUnsavedChangesBlockIDs: {
        ...prevState.hasUnsavedChangesBlockIDs,
        [elementID]: hasUnsavedChanges,
      },
    }));
  }

  handleBeforeSubmitForm(elementID) {
    this.setState(prevState => ({
      validBlockIDs: {
        ...prevState.validBlockIDs,
        [elementID]: null,
      },
    }));
  }

  handleAfterSubmitResponse(elementID, valid) {
    this.setState(prevState => ({
      hasUnsavedChangesBlockIDs: {
        ...prevState.hasUnsavedChangesBlockIDs,
        [elementID]: !valid,
      },
      validBlockIDs: {
        ...prevState.validBlockIDs,
        [elementID]: valid,
      },
    }));
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
      blocks,
      allowedElementTypes,
      elementTypes,
      areaId,
      onDragEnd,
      onDragOver,
      onDragStart,
      isDraggingOver,
    } = this.props;

    // Blocks can be either null or an empty array
    if (!blocks) {
      return null;
    }

    if (blocks && !blocks.length) {
      return <div>{i18n._t('ElementList.ADD_BLOCKS', 'Add blocks to place your content')}</div>;
    }

    let output = blocks.map(element => {
      const saveElement = this.state.saveAllElements && this.state.hasUnsavedChangesBlockIDs[element.id];
      return <div key={element.id}>
        <ElementComponent
          element={element}
          areaId={areaId}
          type={getElementTypeConfig(element, elementTypes)}
          link={element.blockSchema.actions.edit}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
          saveElement={saveElement}
          onChangeHasUnsavedChanges={(hasUnsavedChanges) => this.handleChangeHasUnsavedChanges(element.id, hasUnsavedChanges)}
          onBeforeSubmitForm={() => this.handleBeforeSubmitForm(element.id)}
          onAfterSubmitResponse={(valid) => this.handleAfterSubmitResponse(element.id, valid)}
          increment={this.state.increment}
        />
        {isDraggingOver || <HoverBarComponent
          key={`create-after-${element.id}`}
          areaId={areaId}
          elementId={element.id}
          elementTypes={allowedElementTypes}
        />}
      </div>;
    });

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

    if (loading) {
      return <LoadingComponent />;
    }
    return null;
  }

  render() {
    const { blocks } = this.props;
    const listClassNames = classNames(
      'elemental-editor-list',
      { 'elemental-editor-list--empty': !blocks || !blocks.length }
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
  blocks: PropTypes.arrayOf(elementType),
  elementTypes: PropTypes.arrayOf(elementTypeType).isRequired,
  allowedElementTypes: PropTypes.arrayOf(elementTypeType).isRequired,
  loading: PropTypes.bool,
  areaId: PropTypes.number.isRequired,
  dragTargetElementId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onDragOver: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  sharedObject: PropTypes.object.isRequired,
};

ElementList.defaultProps = {
  blocks: [],
  loading: false,
  sharedObject: {
    entwineResolve: () => {},
    setState: null,
  },
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
