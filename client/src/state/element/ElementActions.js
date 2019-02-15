import ACTION_TYPES from './ElementActionTypes';


export function toggleElementOpen(id, open = null) {
  return {
    type: ACTION_TYPES.SET_ELEMENT_OPEN,
    payload: { id, open },
  };
}
