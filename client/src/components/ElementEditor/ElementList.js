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

  componentDidMount() {
    this.resetState({}, true);
  }

  componentDidUpdate(prevProps, prevState) {
    // Don't do anything if elements have not yet been recieved from xhr request
    if (!this.props.elements) {
      return;
    }
    // Scenario: elements props just changed after an xhr response updated it
    if (this.props.elements !== prevProps.elements) {
      this.resetState(prevState, false);
      return;
    }
    // Scenario Saving all elements and state has just updated because of a formSchema response from
    // an inline save - see Element.js handleFormSchemaSubmitResponse()
    if (this.state.saveAllElements) {
      const unsavedChangesBlockIDs = this.props.elements
        .map(block => parseInt(block.id, 10))
        .filter(blockID => this.state.hasUnsavedChangesBlockIDs[blockID]);
      // const allValidated = unsavedChangesBlockIDs.every(blockID => this.state.validBlockIDs[blockID] !== null);
      let allValidated = true;
      for (let i = 0; i < unsavedChangesBlockIDs.length; i++) {
        const blockID = unsavedChangesBlockIDs[i];
        if (this.state.validBlockIDs[blockID] === null) {
          allValidated = false;
          break;
        }
      }
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
    const elements = this.props.elements || [];
    elements.forEach(element => {
      const blockID = parseInt(element.id, 10);
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
    const { dragTargetElementId, draggedItem, elements, dragSpot } = this.props;
    return getDragIndicatorIndex(
      elements.map(element => element.id),
      dragTargetElementId,
      draggedItem && draggedItem.id,
      dragSpot
    );
  }

  /**
   * Renders a list of Element components, each with an elementType object
   * of data mapped into it.
   */
  renderBlocks() {
    const {
      ElementComponent,
      HoverBarComponent,
      DragIndicatorComponent,
      elements,
      allowedElementTypes,
      elementTypes,
      areaId,
      onDragEnd,
      onDragOver,
      onDragStart,
      isDraggingOver,
    } = this.props;

    if (elements.length === 0) {
      return <div>{i18n._t('ElementList.ADD_BLOCKS', 'Add blocks to place your content')}</div>;
    }

    let output = elements.map(element => {
      const saveElement = this.state.saveAllElements
        && this.state.hasUnsavedChangesBlockIDs[element.id]
        && this.state.validBlockIDs[element.id] === null;
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
    const {
      isLoading,
      LoadingComponent
    } = this.props;

    if (isLoading) {
      return <LoadingComponent />;
    }
    return null;
  }

  render() {
    const { elements } = this.props;

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
  elements: PropTypes.arrayOf(elementType).isRequired,
  elementTypes: PropTypes.arrayOf(elementTypeType).isRequired,
  allowedElementTypes: PropTypes.arrayOf(elementTypeType).isRequired,
  areaId: PropTypes.number.isRequired,
  dragTargetElementId: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  onDragOver: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  sharedObject: PropTypes.object.isRequired,
};

ElementList.defaultProps = {
  sharedObject: {
    entwineResolve: () => {},
    setState: null,
  },
  elements: [],
  isLoading: false,
};

export { ElementList as Component };

const elementListTarget = {
  drop(props, monitor) {
    const { elements } = props;
    const elementTargetDropResult = monitor.getDropResult();

    if (!elementTargetDropResult) {
      return {};
    }

    const dropIndex = getDragIndicatorIndex(
      elements.map(element => element.id),
      elementTargetDropResult.target,
      monitor.getItem(),
      elementTargetDropResult.dropSpot,
    );
    const dropAfterID = elements[dropIndex - 1] ? elements[dropIndex - 1].id : '0';

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
