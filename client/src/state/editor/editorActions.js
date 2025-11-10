import ACTION_TYPES from './editorActionTypes';

export function forceReload(elementEditorId) {
  return {
    type: ACTION_TYPES.FORCE_RELOAD,
    payload: { elementEditorId },
  };
}

export function reloadComplete(elementEditorId) {
  return {
    type: ACTION_TYPES.RELOAD_COMPLETE,
    payload: { elementEditorId },
  };
}
