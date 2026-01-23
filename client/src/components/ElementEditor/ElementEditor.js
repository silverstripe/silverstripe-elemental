/* global window */
import React, { memo, useState, useEffect, useMemo, createContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { inject } from 'lib/Injector';
import { bindActionCreators, compose } from 'redux';
import { elementTypeType } from 'types/elementTypeType';
import backend from 'lib/Backend';
import Config from 'lib/Config';
import { getConfig } from 'state/editor/elementConfig';
import * as toastsActions from 'state/toasts/ToastsActions';
import * as editorActions from 'state/editor/editorActions';
import getJsonErrorMessage from 'lib/getJsonErrorMessage';
import { arrayMove } from '@dnd-kit/sortable';

export const ElementEditorContext = createContext(null);

/**
 * The ElementEditor is used in the CMS to manage a list or nested lists of
 * elements for a page or other DataObject.
 */
const ElementEditor = ({
  ToolbarComponent,
  ListComponent,
  areaId,
  elementTypes,
  allowedElements,
  sharedObject,
  actions,
  forceRefetchElements,
}) => {
  const [dragging, setDragging] = useState(false);
  const [elements, setElements] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);

  /**
   * Make an API call to read all elements endpoint (areaID)
   */
  const fetchElements = (doSetLoadingState = true) => {
    if (doSetLoadingState) {
      setLoading(true);
    }
    const url = `${getConfig().controllerLink.replace(/\/$/, '')}/api/readElements/${areaId}`;
    return backend.get(url)
      .then(async (response) => {
        const responseJson = await response.json();
        setElements(responseJson);
        setLoading(false);
        // refresh preview
        const preview = window.jQuery('.cms-preview');
        if (preview) {
          preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));
        }
        actions.editor.reloadComplete(areaId);
      })
      .catch(async (err) => {
        setElements([]);
        setLoading(false);
        const message = await getJsonErrorMessage(err);
        actions.toasts.error(message);
        actions.editor.reloadComplete(areaId);
      });
  };

  /**
   * Hook triggered when a draggable is picked up.
   */
  const handleDragStart = (event) => {
    const { active } = event;
    setDragging(active.id);
  };

  /**
   * Hook triggered when a draggable is dropped onto a drop target.
   */
  const handleDragEnd = (event) => {
    const { active, over } = event;

    // This happens if letting go of the draggable where it started.
    if (active.id === over.id) {
      setDragging(false);
      return;
    }

    const elementIDs = elements.map(e => e.id);
    const fromIndex = elementIDs.indexOf(active.id);
    const toIndex = elementIDs.indexOf(over.id);
    const sortedElements = arrayMove(elements, fromIndex, toIndex);
    const afterBlockID = toIndex > 0 ? sortedElements[toIndex - 1].id : 0;

    const url = `${getConfig().controllerLink.replace(/\/$/, '')}/api/sort`;
    backend.post(url, {
      id: active.id,
      afterBlockID,
    }, {
      'X-SecurityID': Config.get('SecurityID')
    })
      .then(() => fetchElements())
      .catch(async (err) => {
        const message = await getJsonErrorMessage(err);
        actions.toasts.error(message);
      });

    setDragging(false);
    // Setting elements ensures there is no "pop" between dropping the element and reloading
    // the list with fetchElements above, as the elements will already be rendered in the new order.
    setElements(sortedElements);
  };

  /**
   * Delay loading indicator to prevent FOUT
   */
  useEffect(() => {
    let timeoutId;
    if (!loading) {
      setShowLoadingIndicator(false);
    } else {
      timeoutId = setTimeout(() => {
        setShowLoadingIndicator(true);
      }, 300);
    }
    // Cleanup timeout - this will run on unmount, and whenever dependency changes, i.e. loading state changes
    //
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [loading]);

  /**
   * Fetch elements if null or forcing a refetch, e.g. moving a block from one elemental area to another
   * in the same parent DataObject record.
   */
  useEffect(() => {
    if (forceRefetchElements || elements === null) {
      fetchElements();
    }
  }, [forceRefetchElements, elements]);

  // Memoize provider value to avoid unnecessary re-renders
  const providerValue = useMemo(() => ({
    fetchElements,
    actions,
    // fetchElements will be recreated each time areraId changes, so
    // it's needed in the dep array, otherwise fetchElements will be stale
  }), [fetchElements, actions]);

  if (elements === null) {
    return null;
  }

  // Map the allowed elements because we want to retain the sort order provided by that array.
  const allowedElementTypes = allowedElements.map(className =>
    elementTypes.find(type => type.class === className)
  );

  return <div className="element-editor">
    <ElementEditorContext.Provider value={providerValue}>
      <ToolbarComponent
        elementTypes={allowedElementTypes}
        areaId={areaId}
      />
      <ListComponent
        allowedElementTypes={allowedElementTypes}
        elementTypes={elementTypes}
        areaId={areaId}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        dragging={dragging}
        sharedObject={sharedObject}
        elements={elements}
        isLoading={showLoadingIndicator}
      />
    </ElementEditorContext.Provider>
  </div>;
};

ElementEditor.propTypes = {
  elementTypes: PropTypes.arrayOf(elementTypeType).isRequired,
  allowedElements: PropTypes.arrayOf(PropTypes.string).isRequired,
  areaId: PropTypes.number.isRequired,
  actions: PropTypes.shape({
    handleSortBlock: PropTypes.func,
  }),
};

// Wrapping export in React.memo() because the old class component extended React.PureComponent
const MemoizedElementEditor = memo(ElementEditor);

export { MemoizedElementEditor as Component };

const params = [
  inject(
    ['ElementToolbar', 'ElementList'],
    (ToolbarComponent, ListComponent) => ({
      ToolbarComponent,
      ListComponent,
    }),
    () => 'ElementEditor'
  )
];

function mapStateToProps(state, ownProps) {
  const forceRefetch = state.elemental.editor.forceRefetchElements[ownProps.areaId] || false;
  return { forceRefetchElements: forceRefetch };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      toasts: bindActionCreators(toastsActions, dispatch),
      editor: bindActionCreators(editorActions, dispatch)
    },
  };
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  ...params,
)(MemoizedElementEditor);
