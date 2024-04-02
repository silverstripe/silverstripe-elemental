import ACTION_TYPES from './ElementActionTypes';

export function changeVersionState(id, payload) {
  return {
    type: ACTION_TYPES.UPDATE_VERSION_STATE,
    payload: { [id]: payload }
  };
}
