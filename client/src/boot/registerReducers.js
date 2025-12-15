import Injector from 'lib/Injector';
import { combineReducers } from 'redux';
import editorReducer from 'state/editor/editorReducer';

export default () => {
  Injector.reducer.register('elemental', combineReducers({
    editor: editorReducer,
  }));
};
