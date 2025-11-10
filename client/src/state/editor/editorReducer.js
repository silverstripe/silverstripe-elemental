import deepFreeze from 'deep-freeze-strict';
import ACTION_TYPES from './editorActionTypes';

const initialState = {
  forceRefetchElements: {},
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case ACTION_TYPES.FORCE_RELOAD: {
      return deepFreeze({
        ...state,
        forceRefetchElements: {
          ...state.forceRefetchElements,
          [payload.elementEditorId]: true,
        }
      });
    }

    case ACTION_TYPES.RELOAD_COMPLETE: {
      return deepFreeze({
        ...state,
        forceRefetchElements: {
          ...state.forceRefetchElements,
          [payload.elementEditorId]: false,
        }
      });
    }

    default: {
      return state;
    }
  }
}

export default reducer;
