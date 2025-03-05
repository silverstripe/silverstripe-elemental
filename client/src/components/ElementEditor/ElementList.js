import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'types/elementType';
import { elementTypeType } from 'types/elementTypeType';
import { compose } from 'redux';
import { inject } from 'lib/Injector';
import classNames from 'classnames';
import i18n from 'i18n';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import { getElementTypeConfig } from 'state/editor/elementConfig';

function ElementList({
  elements,
  sharedObject,
  ElementComponent,
  HoverBarComponent,
  allowedElementTypes,
  elementTypes,
  areaId,
  onDragEnd,
  onDragStart,
  dragging,
  isLoading,
  LoadingComponent,
}) {
  // saveAllElements will be set to true in entwine.js in the 'onbeforesubmitform' "hook"
  // which is triggered by LeftAndMain submitForm()
  const [saveAllElements, setSaveAllElements] = useState(false);
  // increment is also set in entwine.js in the 'onbeforesubmitform' "hook"
  const [increment, setIncrement] = useState(0);
  const [hasUnsavedChangesBlockIDs, setHasUnsavedChangesBlockIDs] = useState({});
  const [validBlockIDs, setValidBlockIDs] = useState({});

  // Update the sharedObject so state can be set from entwine.js
  sharedObject.setIncrement = setIncrement;
  sharedObject.setSaveAllElements = setSaveAllElements;

  const resetState = (oldHasUnsavedChangesBlockIDs, resetHasUnsavedChangesBlockIDs) => {
    // hasUnsavedChangesBlockIDs is the block dirty state and uses a boolean
    const newHasUnsavedChangesBlockIDs = {};
    // validBlockIDs is the block validation state and uses a tri-state
    // - null: not saved
    // - true: saved, valid
    // - false: attempted save, invalid
    const newValidBlockIDs = {};
    const allElements = elements || [];
    allElements.forEach(element => {
      const blockID = parseInt(element.id, 10);
      if (resetHasUnsavedChangesBlockIDs) {
        newHasUnsavedChangesBlockIDs[blockID] = false;
      } else if (oldHasUnsavedChangesBlockIDs.hasOwnProperty(blockID)) {
        newHasUnsavedChangesBlockIDs[blockID] = oldHasUnsavedChangesBlockIDs[blockID];
      } else {
        newHasUnsavedChangesBlockIDs[blockID] = false;
      }
      newValidBlockIDs[blockID] = null;
    });
    setHasUnsavedChangesBlockIDs(newHasUnsavedChangesBlockIDs);
    setValidBlockIDs(newValidBlockIDs);
  };

  // Replaces componentDidMount
  useEffect(() => {
    resetState({}, true);
  }, []);

  // Replaces componentDidUpdate for changed elements
  useEffect(() => {
    // Scenario: elements props just changed after an xhr response updated it
    resetState(hasUnsavedChangesBlockIDs, false);
  }, [elements]);

  let skipRemainingEffects = false;
  useEffect(() => {
    // Scenario we've just clicked "save" or "submit" on the form
    if (saveAllElements) {
      // Reset the validation state of all blocks.
      // This mirrors handleBeforeSubmitForm() for individual blocks.
      resetState(hasUnsavedChangesBlockIDs, false);
      // We need the state change to take effect before continuing,
      // so skip remaining effects until the next event cycle.
      skipRemainingEffects = true;
    }
  }, [saveAllElements]);

  // Replaces componentDidUpdate for everything else
  useEffect(() => {
    if (skipRemainingEffects) {
      return;
    }

    // Don't do anything if elements have not yet been recieved from xhr request
    if (!elements) {
      return;
    }
    // Scenario Saving all elements and state has just updated because of a formSchema response from
    // an inline save - see Element.js handleFormSchemaSubmitResponse()
    if (!saveAllElements) {
      return;
    }

    const unsavedChangesBlockIDs = elements
      .map(block => parseInt(block.id, 10))
      .filter(blockID => hasUnsavedChangesBlockIDs[blockID]);
    let allValidated = true;
    for (let i = 0; i < unsavedChangesBlockIDs.length; i++) {
      const blockID = unsavedChangesBlockIDs[i];
      if (validBlockIDs[blockID] === null) {
        allValidated = false;
        break;
      }
    }

    if (!allValidated) {
      return;
    }

    const allValid = unsavedChangesBlockIDs.every(blockID => validBlockIDs[blockID]);
    // entwineResolve is bound in entwine.js
    const result = {
      success: allValid,
      reason: allValid ? '' : 'invalid',
    };
    sharedObject.entwineResolve(result);
    resetState(hasUnsavedChangesBlockIDs, allValid);
    setSaveAllElements(false);
  }, [saveAllElements, hasUnsavedChangesBlockIDs]);

  const sensors = useSensors(
    // Pointer sensor is for touch and mouse.
    // The activation constraint allows clicking and small twitches without starting a "drag".
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      }
    }),
  );

  const handleChangeHasUnsavedChanges = (elementID, hasUnsavedChanges) => {
    setHasUnsavedChangesBlockIDs({
      ...hasUnsavedChangesBlockIDs,
      [elementID]: hasUnsavedChanges,
    });
  };

  const handleBeforeSubmitForm = (elementID) => {
    setValidBlockIDs({
      ...validBlockIDs,
      [elementID]: null,
    });
  };

  const handleAfterSubmitResponse = (elementID, valid) => {
    setHasUnsavedChangesBlockIDs({
      ...hasUnsavedChangesBlockIDs,
      [elementID]: !valid,
    });
    setValidBlockIDs({
      ...validBlockIDs,
      [elementID]: valid,
    });
  };

  /**
   * Renders a list of Element components, each with an elementType object
   * of data mapped into it.
   */
  const renderBlocks = () => {
    if (elements.length === 0) {
      return <div>{i18n._t('ElementList.ADD_BLOCKS', 'Add blocks to place your content')}</div>;
    }

    let output = elements.map(element => {
      const saveElement = saveAllElements && hasUnsavedChangesBlockIDs[element.id];
      return <>
        <ElementComponent
          key={element.id}
          element={element}
          areaId={areaId}
          type={getElementTypeConfig(element, elementTypes)}
          link={element.blockSchema.actions.edit}
          saveElement={saveElement}
          onChangeHasUnsavedChanges={(hasUnsavedChanges) => handleChangeHasUnsavedChanges(element.id, hasUnsavedChanges)}
          onBeforeSubmitForm={() => handleBeforeSubmitForm(element.id)}
          onAfterSubmitResponse={(valid) => handleAfterSubmitResponse(element.id, valid)}
          increment={increment}
        />
        {dragging === false && <HoverBarComponent
          key={`create-after-${element.id}`}
          areaId={areaId}
          elementId={element.id}
          elementTypes={allowedElementTypes}
        />}
      </>;
    });

    // Add a insert point above the first block for consistency
    if (dragging === false) {
      output = [
        <HoverBarComponent
          key={0}
          areaId={areaId}
          elementId={0}
          elementTypes={allowedElementTypes}
        />
      ].concat(output);
    }

    return <DndContext
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={elements.map(element => element.id)}
        strategy={verticalListSortingStrategy}
      >
        {output}
      </SortableContext>
    </DndContext>;
  };

  /**
   * Renders a loading component
   *
   * @returns {LoadingComponent|null}
   */
  const renderLoading = () => {
    if (isLoading) {
      return <LoadingComponent />;
    }
    return null;
  };

  const listClassNames = classNames(
    'elemental-editor-list',
    { 'elemental-editor-list--empty': !elements || !elements.length }
  );

  return <div className={listClassNames}>
    {renderLoading()}
    {renderBlocks()}
  </div>;
}

ElementList.propTypes = {
  elements: PropTypes.arrayOf(elementType).isRequired,
  elementTypes: PropTypes.arrayOf(elementTypeType).isRequired,
  allowedElementTypes: PropTypes.arrayOf(elementTypeType).isRequired,
  areaId: PropTypes.number.isRequired,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  dragging: PropTypes.oneOf([PropTypes.bool, PropTypes.number]),
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

export default compose(
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
