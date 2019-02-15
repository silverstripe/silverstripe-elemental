import deepFreeze from 'deep-freeze-strict';
import ACTION_TYPES from './ElementActionTypes';

const initialState = deepFreeze({ openElements: [] });

export default function elementReducer(state = initialState, action = null) {
  switch (action.type) {
    case ACTION_TYPES.SET_ELEMENT_OPEN: {
      const { id } = action.payload;
      let { open } = action.payload;

      // Default to toggling the open state
      if (open === null) {
        open = !state.openElements.includes(id);
      }

      // Add the element if it's not already present
      if (open && !state.openElements.includes(id)) {
        return deepFreeze({ openElements: [...state.openElements, id] });
      } else if (!open && state.openElements.includes(id)) {
        return deepFreeze({ openElements: state.openElements.filter(i => i !== id) });
      }

      return state;
    }

    default:
      return state;
  }
}
