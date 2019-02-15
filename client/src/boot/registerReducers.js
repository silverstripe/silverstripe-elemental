import Injector from 'lib/Injector';
import { combineReducers } from 'redux';
import ElementReducer from 'state/element/ElementReducer';

export default (extra = {}) => {
  const ElementalReducer = combineReducers({
    elements: ElementReducer,
  });

  Injector.reducer.registerMany({
    elemental: ElementalReducer,
    ...extra
  });
};
