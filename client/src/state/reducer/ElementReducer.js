/* global window */
import deepFreeze from 'deep-freeze-strict';
import ACTION_TYPES from './ElementActionTypes';

const initialState = {};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_VERSION_STATE:
      return deepFreeze(Object.assign({}, state, action.payload));
    default:
      return state;
  }
}

export default reducer;
