/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/src/boot/index.js":
/*!**********************************!*\
  !*** ./client/src/boot/index.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {



var _registerComponents = _interopRequireDefault(__webpack_require__(/*! boot/registerComponents */ "./client/src/boot/registerComponents.js"));
var _registerTransforms = _interopRequireDefault(__webpack_require__(/*! boot/registerTransforms */ "./client/src/boot/registerTransforms.js"));
var _registerReducers = _interopRequireDefault(__webpack_require__(/*! boot/registerReducers */ "./client/src/boot/registerReducers.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
window.document.addEventListener('DOMContentLoaded', () => {
  (0, _registerComponents.default)();
  (0, _registerTransforms.default)();
  (0, _registerReducers.default)();
});

/***/ }),

/***/ "./client/src/boot/registerComponents.js":
/*!***********************************************!*\
  !*** ./client/src/boot/registerComponents.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _Injector = _interopRequireDefault(__webpack_require__(/*! lib/Injector */ "lib/Injector"));
var _Element = _interopRequireDefault(__webpack_require__(/*! components/ElementEditor/Element */ "./client/src/components/ElementEditor/Element.js"));
var _ElementActions = _interopRequireDefault(__webpack_require__(/*! components/ElementEditor/ElementActions */ "./client/src/components/ElementEditor/ElementActions.js"));
var _ElementEditor = _interopRequireDefault(__webpack_require__(/*! components/ElementEditor/ElementEditor */ "./client/src/components/ElementEditor/ElementEditor.js"));
var _ElementList = _interopRequireDefault(__webpack_require__(/*! components/ElementEditor/ElementList */ "./client/src/components/ElementEditor/ElementList.js"));
var _Toolbar = _interopRequireDefault(__webpack_require__(/*! components/ElementEditor/Toolbar */ "./client/src/components/ElementEditor/Toolbar.js"));
var _AddNewButton = _interopRequireDefault(__webpack_require__(/*! components/ElementEditor/AddNewButton */ "./client/src/components/ElementEditor/AddNewButton.js"));
var _Header = _interopRequireDefault(__webpack_require__(/*! components/ElementEditor/Header */ "./client/src/components/ElementEditor/Header.js"));
var _Content = _interopRequireDefault(__webpack_require__(/*! components/ElementEditor/Content */ "./client/src/components/ElementEditor/Content.js"));
var _Summary = _interopRequireDefault(__webpack_require__(/*! components/ElementEditor/Summary */ "./client/src/components/ElementEditor/Summary.js"));
var _InlineEditForm = _interopRequireDefault(__webpack_require__(/*! components/ElementEditor/InlineEditForm */ "./client/src/components/ElementEditor/InlineEditForm.js"));
var _AddElementPopover = _interopRequireDefault(__webpack_require__(/*! components/ElementEditor/AddElementPopover */ "./client/src/components/ElementEditor/AddElementPopover.js"));
var _HoverBar = _interopRequireDefault(__webpack_require__(/*! components/ElementEditor/HoverBar */ "./client/src/components/ElementEditor/HoverBar.js"));
var _DragPositionIndicator = _interopRequireDefault(__webpack_require__(/*! components/ElementEditor/DragPositionIndicator */ "./client/src/components/ElementEditor/DragPositionIndicator.js"));
var _TextCheckboxGroupField = _interopRequireDefault(__webpack_require__(/*! components/TextCheckboxGroupField/TextCheckboxGroupField */ "./client/src/components/TextCheckboxGroupField/TextCheckboxGroupField.js"));
var _MoveModal = _interopRequireDefault(__webpack_require__(/*! components/MoveModal/MoveModal */ "./client/src/components/MoveModal/MoveModal.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = () => {
  _Injector.default.component.registerMany({
    ElementEditor: _ElementEditor.default,
    ElementToolbar: _Toolbar.default,
    ElementAddNewButton: _AddNewButton.default,
    ElementList: _ElementList.default,
    Element: _Element.default,
    ElementActions: _ElementActions.default,
    ElementHeader: _Header.default,
    ElementContent: _Content.default,
    ElementSummary: _Summary.default,
    ElementInlineEditForm: _InlineEditForm.default,
    AddElementPopover: _AddElementPopover.default,
    HoverBar: _HoverBar.default,
    DragPositionIndicator: _DragPositionIndicator.default,
    TextCheckboxGroupField: _TextCheckboxGroupField.default,
    'ElementMoveModal.FormBuilderModal': _MoveModal.default
  });
};
exports["default"] = _default;

/***/ }),

/***/ "./client/src/boot/registerReducers.js":
/*!*********************************************!*\
  !*** ./client/src/boot/registerReducers.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _Injector = _interopRequireDefault(__webpack_require__(/*! lib/Injector */ "lib/Injector"));
var _redux = __webpack_require__(/*! redux */ "redux");
var _editorReducer = _interopRequireDefault(__webpack_require__(/*! state/editor/editorReducer */ "./client/src/state/editor/editorReducer.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = () => {
  _Injector.default.reducer.register('elemental', (0, _redux.combineReducers)({
    editor: _editorReducer.default
  }));
};
exports["default"] = _default;

/***/ }),

/***/ "./client/src/boot/registerTransforms.js":
/*!***********************************************!*\
  !*** ./client/src/boot/registerTransforms.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _Injector = _interopRequireDefault(__webpack_require__(/*! lib/Injector */ "lib/Injector"));
var _HistoricElementView = _interopRequireDefault(__webpack_require__(/*! components/HistoricElementView/HistoricElementView */ "./client/src/components/HistoricElementView/HistoricElementView.js"));
var _revertToBlockVersionRequest = _interopRequireDefault(__webpack_require__(/*! state/history/revertToBlockVersionRequest */ "./client/src/state/history/revertToBlockVersionRequest.js"));
var _ArchiveAction = _interopRequireDefault(__webpack_require__(/*! components/ElementActions/ArchiveAction */ "./client/src/components/ElementActions/ArchiveAction.js"));
var _DuplicateAction = _interopRequireDefault(__webpack_require__(/*! components/ElementActions/DuplicateAction */ "./client/src/components/ElementActions/DuplicateAction.js"));
var _MoveAction = _interopRequireDefault(__webpack_require__(/*! components/ElementActions/MoveAction */ "./client/src/components/ElementActions/MoveAction.js"));
var _SaveAction = _interopRequireDefault(__webpack_require__(/*! components/ElementActions/SaveAction */ "./client/src/components/ElementActions/SaveAction.js"));
var _PublishAction = _interopRequireDefault(__webpack_require__(/*! components/ElementActions/PublishAction */ "./client/src/components/ElementActions/PublishAction.js"));
var _UnpublishAction = _interopRequireDefault(__webpack_require__(/*! components/ElementActions/UnpublishAction */ "./client/src/components/ElementActions/UnpublishAction.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = () => {
  _Injector.default.transform('elemental-fieldgroup', updater => {
    updater.component('FieldGroup.HistoryViewer.VersionDetail', _HistoricElementView.default, 'HistoricElement');
  }, {
    after: 'field-holders'
  });
  _Injector.default.transform('blocks-history-revert', updater => {
    updater.component('HistoryViewerToolbar.VersionedAdmin.HistoryViewer.Element.HistoryViewerVersionDetail', _revertToBlockVersionRequest.default, 'BlockRevertRequest');
  });
  _Injector.default.transform('element-actions', updater => {
    updater.component('ElementActions', _SaveAction.default, 'ElementActionsWithSave');
    updater.component('ElementActions', _PublishAction.default, 'ElementActionsWithPublish');
    updater.component('ElementActions', _UnpublishAction.default, 'ElementActionsWithUnpublish');
    updater.component('ElementActions', _DuplicateAction.default, 'ElementActionsWithDuplicate');
    updater.component('ElementActions', _ArchiveAction.default, 'ElementActionsWithArchive');
    updater.component('ElementActions', _MoveAction.default, 'ElementActionsWithMove');
  });
};
exports["default"] = _default;

/***/ }),

/***/ "./client/src/components/ElementActions/AbstractAction.js":
/*!****************************************************************!*\
  !*** ./client/src/components/ElementActions/AbstractAction.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));
var _reactstrap = __webpack_require__(/*! reactstrap */ "reactstrap");
var _elementTypeType = __webpack_require__(/*! types/elementTypeType */ "./client/src/types/elementTypeType.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const AbstractAction = ({
  disabled = false,
  className,
  title,
  label,
  ...props
}) => {
  const itemProps = {
    className: (0, _classnames.default)(className, 'dropdown-item'),
    disabled,
    title,
    label,
    ...props
  };
  return _react.default.createElement(_reactstrap.DropdownItem, itemProps, label || title);
};
AbstractAction.propTypes = {
  disabled: _propTypes.default.bool,
  className: _propTypes.default.string,
  onClick: _propTypes.default.func,
  title: _propTypes.default.string,
  name: _propTypes.default.string,
  type: _elementTypeType.elementTypeType,
  active: _propTypes.default.bool,
  label: _propTypes.default.string
};
var _default = exports["default"] = AbstractAction;

/***/ }),

/***/ "./client/src/components/ElementActions/ArchiveAction.js":
/*!***************************************************************!*\
  !*** ./client/src/components/ElementActions/ArchiveAction.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.Component = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _AbstractAction = _interopRequireDefault(__webpack_require__(/*! components/ElementActions/AbstractAction */ "./client/src/components/ElementActions/AbstractAction.js"));
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _ElementEditor = __webpack_require__(/*! components/ElementEditor/ElementEditor */ "./client/src/components/ElementEditor/ElementEditor.js");
var _Backend = _interopRequireDefault(__webpack_require__(/*! lib/Backend */ "lib/Backend"));
var _Config = _interopRequireDefault(__webpack_require__(/*! lib/Config */ "lib/Config"));
var _elementConfig = __webpack_require__(/*! state/editor/elementConfig */ "./client/src/state/editor/elementConfig.js");
var _getJsonErrorMessage = _interopRequireDefault(__webpack_require__(/*! lib/getJsonErrorMessage */ "lib/getJsonErrorMessage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ArchiveAction = MenuComponent => props => {
  const {
    fetchElements
  } = (0, _react.useContext)(_ElementEditor.ElementEditorContext);
  const handleClick = event => {
    event.stopPropagation();
    const isPublished = props.element.isPublished;
    let archiveMessage = _i18n.default._t('ElementArchiveAction.CONFIRM_DELETE', 'Are you sure you want to send this block to the archive?');
    if (isPublished) {
      archiveMessage = _i18n.default._t('ElementArchiveAction.CONFIRM_DELETE_AND_UNPUBLISH', 'Warning: This block will be unpublished before being sent to the archive. Are you sure you want to proceed?');
    }
    if (!window.confirm(archiveMessage)) {
      return;
    }
    const id = props.element.id;
    const url = `${(0, _elementConfig.getConfig)().controllerLink.replace(/\/$/, '')}/api/delete`;
    _Backend.default.post(url, {
      id
    }, {
      'X-SecurityID': _Config.default.get('SecurityID')
    }).then(() => fetchElements()).catch(async err => {
      const message = await (0, _getJsonErrorMessage.default)(err);
      window.jQuery.noticeAdd({
        text: message,
        stay: true,
        type: 'error'
      });
    });
  };
  const disabled = props.element.canDelete !== undefined && !props.element.canDelete;
  const label = _i18n.default._t('ElementArchiveAction.ARCHIVE', 'Archive');
  const title = disabled ? _i18n.default._t('ElementArchiveAction.ARCHIVE_PERMISSION_DENY', 'Archive, insufficient permissions') : label;
  const newProps = {
    label,
    title,
    disabled,
    className: 'element-editor__actions-archive',
    onClick: handleClick,
    toggle: props.toggle
  };
  return _react.default.createElement(MenuComponent, props, props.children, _react.default.createElement(_AbstractAction.default, newProps));
};
exports.Component = ArchiveAction;
var _default = exports["default"] = ArchiveAction;

/***/ }),

/***/ "./client/src/components/ElementActions/DuplicateAction.js":
/*!*****************************************************************!*\
  !*** ./client/src/components/ElementActions/DuplicateAction.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.Component = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _AbstractAction = _interopRequireDefault(__webpack_require__(/*! components/ElementActions/AbstractAction */ "./client/src/components/ElementActions/AbstractAction.js"));
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _ElementEditor = __webpack_require__(/*! components/ElementEditor/ElementEditor */ "./client/src/components/ElementEditor/ElementEditor.js");
var _Backend = _interopRequireDefault(__webpack_require__(/*! lib/Backend */ "lib/Backend"));
var _Config = _interopRequireDefault(__webpack_require__(/*! lib/Config */ "lib/Config"));
var _elementConfig = __webpack_require__(/*! state/editor/elementConfig */ "./client/src/state/editor/elementConfig.js");
var _getJsonErrorMessage = _interopRequireDefault(__webpack_require__(/*! lib/getJsonErrorMessage */ "lib/getJsonErrorMessage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const DuplicateAction = MenuComponent => props => {
  const {
    fetchElements
  } = (0, _react.useContext)(_ElementEditor.ElementEditorContext);
  if (props.type.broken) {
    return _react.default.createElement(MenuComponent, props);
  }
  const handleClick = event => {
    event.stopPropagation();
    const id = props.element.id;
    const url = `${(0, _elementConfig.getConfig)().controllerLink.replace(/\/$/, '')}/api/duplicate`;
    _Backend.default.post(url, {
      id
    }, {
      'X-SecurityID': _Config.default.get('SecurityID')
    }).then(() => fetchElements()).catch(async err => {
      const message = await (0, _getJsonErrorMessage.default)(err);
      window.jQuery.noticeAdd({
        text: message,
        stay: true,
        type: 'error'
      });
    });
  };
  const disabled = props.element.canCreate !== undefined && !props.element.canCreate;
  const label = _i18n.default._t('ElementArchiveAction.DUPLICATE', 'Duplicate');
  const title = disabled ? _i18n.default._t('ElementArchiveAction.DUPLICATE_PERMISSION_DENY', 'Duplicate, insufficient permissions') : label;
  const newProps = {
    label,
    title,
    disabled,
    className: 'element-editor__actions-duplicate',
    onClick: handleClick,
    toggle: props.toggle
  };
  return _react.default.createElement(MenuComponent, props, props.children, _react.default.createElement(_AbstractAction.default, newProps));
};
exports.Component = DuplicateAction;
var _default = exports["default"] = DuplicateAction;

/***/ }),

/***/ "./client/src/components/ElementActions/MoveAction.js":
/*!************************************************************!*\
  !*** ./client/src/components/ElementActions/MoveAction.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.Component = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _AbstractAction = _interopRequireDefault(__webpack_require__(/*! components/ElementActions/AbstractAction */ "./client/src/components/ElementActions/AbstractAction.js"));
var _ElementEditor = __webpack_require__(/*! components/ElementEditor/ElementEditor */ "./client/src/components/ElementEditor/ElementEditor.js");
var _Element = __webpack_require__(/*! components/ElementEditor/Element */ "./client/src/components/ElementEditor/Element.js");
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const MoveAction = MenuComponent => props => {
  const [modalIsOpen, setModalIsOpen] = (0, _react.useState)(false);
  const {
    fetchElements,
    actions
  } = (0, _react.useContext)(_ElementEditor.ElementEditorContext);
  const {
    formDirty
  } = (0, _react.useContext)(_Element.ElementContext);
  if (props.type.broken) {
    return _react.default.createElement(MenuComponent, props);
  }
  const handleClick = event => {
    event.stopPropagation();
    setModalIsOpen(true);
  };
  const handleSuccess = ({
    elementalAreaId,
    newEditLink
  }) => {
    setModalIsOpen(false);
    fetchElements();
    if (elementalAreaId) {
      actions.editor.forceReload(elementalAreaId);
    }
    const elementTitle = props.element.title ?? _i18n.default.inject(_i18n.default._t('ElementHeader.NOTITLE', 'Untitled {type} block'), {
      type: props.type.title
    });
    const successMessage = _i18n.default.inject(_i18n.default._t('ElementMoveAction.SUCCESS', 'Moved block "{title}" successfully'), {
      title: elementTitle
    });
    if (newEditLink) {
      actions.toasts.display({
        text: successMessage,
        type: 'success',
        actions: [{
          label: _i18n.default._t('ElementMoveAction.EDIT_LINK', 'Go to edit form for new block parent'),
          href: newEditLink
        }]
      });
    } else {
      actions.toasts.success(successMessage);
    }
  };
  const disabled = formDirty;
  const label = _i18n.default._t('ElementMoveAction.MOVE', 'Move');
  const title = disabled ? _i18n.default._t('ElementMoveAction.MOVE_DIRTY', 'Move, cannot move with unsaved changes') : label;
  const newProps = {
    label,
    title,
    disabled,
    className: 'element-editor__actions-move',
    onClick: handleClick,
    toggle: true
  };
  const MoveModal = (0, _react.useMemo)(() => (0, _Injector.loadComponent)('ElementMoveModal.FormBuilderModal'), []);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(MenuComponent, props, props.children, _react.default.createElement(_AbstractAction.default, newProps)), modalIsOpen && _react.default.createElement(MoveModal, {
    element: props.element,
    type: props.type,
    isOpen: modalIsOpen,
    onSuccess: handleSuccess,
    onClosed: () => setModalIsOpen(false)
  }));
};
exports.Component = MoveAction;
var _default = exports["default"] = MoveAction;

/***/ }),

/***/ "./client/src/components/ElementActions/PublishAction.js":
/*!***************************************************************!*\
  !*** ./client/src/components/ElementActions/PublishAction.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.Component = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _AbstractAction = _interopRequireDefault(__webpack_require__(/*! components/ElementActions/AbstractAction */ "./client/src/components/ElementActions/AbstractAction.js"));
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _Element = __webpack_require__(/*! components/ElementEditor/Element */ "./client/src/components/ElementEditor/Element.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const PublishAction = MenuComponent => props => {
  const {
    formDirty,
    onPublishButtonClick
  } = (0, _react.useContext)(_Element.ElementContext);
  const {
    element
  } = props;
  const handleClick = event => {
    event.stopPropagation();
    onPublishButtonClick();
  };
  const disabled = props.element.canPublish !== undefined && !props.element.canPublish;
  const label = _i18n.default._t('ElementArchiveAction.PUBLISH', 'Publish');
  const title = disabled ? _i18n.default._t('ElementArchiveAction.PUBLISH_PERMISSION_DENY', 'Publish, insufficient permissions') : label;
  const newProps = {
    label,
    title,
    disabled,
    className: 'element-editor__actions-publish',
    onClick: handleClick,
    toggle: props.toggle
  };
  if (props.type.broken) {
    return _react.default.createElement(MenuComponent, props);
  }
  return _react.default.createElement(MenuComponent, props, props.children, (formDirty || !element.isLiveVersion) && _react.default.createElement(_AbstractAction.default, newProps));
};
exports.Component = PublishAction;
var _default = exports["default"] = PublishAction;

/***/ }),

/***/ "./client/src/components/ElementActions/SaveAction.js":
/*!************************************************************!*\
  !*** ./client/src/components/ElementActions/SaveAction.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.Component = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _AbstractAction = _interopRequireDefault(__webpack_require__(/*! components/ElementActions/AbstractAction */ "./client/src/components/ElementActions/AbstractAction.js"));
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _Element = __webpack_require__(/*! components/ElementEditor/Element */ "./client/src/components/ElementEditor/Element.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const SaveAction = MenuComponent => props => {
  const {
    onSaveButtonClick,
    formDirty
  } = (0, _react.useContext)(_Element.ElementContext);
  const handleClick = event => {
    event.stopPropagation();
    onSaveButtonClick();
  };
  const newProps = {
    title: _i18n.default._t('ElementSaveAction.SAVE', 'Save'),
    className: 'element-editor__actions-save',
    onClick: handleClick,
    toggle: props.toggle
  };
  if (!props.expandable || props.type.broken) {
    return _react.default.createElement(MenuComponent, props);
  }
  return _react.default.createElement(MenuComponent, props, props.children, formDirty && _react.default.createElement(_AbstractAction.default, newProps));
};
exports.Component = SaveAction;
var _default = exports["default"] = SaveAction;

/***/ }),

/***/ "./client/src/components/ElementActions/UnpublishAction.js":
/*!*****************************************************************!*\
  !*** ./client/src/components/ElementActions/UnpublishAction.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.Component = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _AbstractAction = _interopRequireDefault(__webpack_require__(/*! components/ElementActions/AbstractAction */ "./client/src/components/ElementActions/AbstractAction.js"));
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _Backend = _interopRequireDefault(__webpack_require__(/*! lib/Backend */ "lib/Backend"));
var _ElementEditor = __webpack_require__(/*! components/ElementEditor/ElementEditor */ "./client/src/components/ElementEditor/ElementEditor.js");
var _Config = _interopRequireDefault(__webpack_require__(/*! lib/Config */ "lib/Config"));
var _elementConfig = __webpack_require__(/*! state/editor/elementConfig */ "./client/src/state/editor/elementConfig.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const UnpublishAction = MenuComponent => props => {
  const {
    fetchElements
  } = (0, _react.useContext)(_ElementEditor.ElementEditorContext);
  if (props.type.broken) {
    return _react.default.createElement(MenuComponent, props);
  }
  const reportUnpublicationStatus = (type, title, success) => {
    const noTitle = _i18n.default.inject(_i18n.default._t('ElementHeader.NOTITLE', 'Untitled {type} block'), {
      type
    });
    const successMessage = _i18n.default.inject(_i18n.default._t('ElementUnpublishAction.SUCCESS_NOTIFICATION', 'Removed \'{title}\' from the published page'), {
      title: title || noTitle
    });
    const errorMessage = _i18n.default.inject(_i18n.default._t('ElementUnpublishAction.ERROR_NOTIFICATION', 'Error unpublishing \'{title}\''), {
      title: title || noTitle
    });
    window.jQuery.noticeAdd({
      text: success ? successMessage : errorMessage,
      stay: false,
      type: success ? 'success' : 'error'
    });
  };
  const unpublishElement = () => {
    const id = props.element.id;
    const url = `${(0, _elementConfig.getConfig)().controllerLink.replace(/\/$/, '')}/api/unpublish`;
    return _Backend.default.post(url, {
      id
    }, {
      'X-SecurityID': _Config.default.get('SecurityID')
    }).then(() => fetchElements()).then(() => reportUnpublicationStatus(props.type.title, props.element.title, true)).catch(() => reportUnpublicationStatus(props.type.title, props.element.title, false));
  };
  const handleClick = event => {
    event.stopPropagation();
    unpublishElement();
  };
  const disabled = props.element.canUnpublish !== undefined && !props.element.canUnpublish;
  const label = _i18n.default._t('ElementArchiveAction.UNPUBLISH', 'Unpublish');
  const title = disabled ? _i18n.default._t('ElementArchiveAction.UNPUBLISH_PERMISSION_DENY', 'Unpublish, insufficient permissions') : label;
  const newProps = {
    label,
    title,
    disabled,
    className: 'element-editor__actions-unpublish',
    onClick: handleClick,
    toggle: props.toggle
  };
  return _react.default.createElement(MenuComponent, props, props.children, props.element.isPublished && _react.default.createElement(_AbstractAction.default, newProps));
};
exports.Component = UnpublishAction;
var _default = exports["default"] = UnpublishAction;

/***/ }),

/***/ "./client/src/components/ElementEditor/AddElementPopover.js":
/*!******************************************************************!*\
  !*** ./client/src/components/ElementEditor/AddElementPopover.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.Component = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");
var _redux = __webpack_require__(/*! redux */ "redux");
var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));
var toastsActions = _interopRequireWildcard(__webpack_require__(/*! state/toasts/ToastsActions */ "state/toasts/ToastsActions"));
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
var _elementTypeType = __webpack_require__(/*! types/elementTypeType */ "./client/src/types/elementTypeType.js");
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _Backend = _interopRequireDefault(__webpack_require__(/*! lib/Backend */ "lib/Backend"));
var _Config = _interopRequireDefault(__webpack_require__(/*! lib/Config */ "lib/Config"));
var _ElementEditor = __webpack_require__(/*! components/ElementEditor/ElementEditor */ "./client/src/components/ElementEditor/ElementEditor.js");
var _getJsonErrorMessage = _interopRequireDefault(__webpack_require__(/*! lib/getJsonErrorMessage */ "lib/getJsonErrorMessage"));
var _ElementOptionButton = _interopRequireDefault(__webpack_require__(/*! ./ElementOptionButton */ "./client/src/components/ElementEditor/ElementOptionButton.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const AddElementPopover = ({
  PopoverOptionSetComponent,
  elementTypes,
  container,
  extraClass,
  isOpen,
  placement,
  target,
  toggle,
  areaId,
  insertAfterElement,
  actions
}) => {
  const context = (0, _react.useContext)(_ElementEditor.ElementEditorContext);
  const handleToggle = () => {
    toggle();
  };
  const getElementButtonClickHandler = elementType => event => {
    event.preventDefault();
    const sectionConfigKey = 'DNADesign\\Elemental\\Controllers\\ElementalAreaController';
    const url = `${_Config.default.getSection(sectionConfigKey).controllerLink}/api/create`;
    _Backend.default.post(url, {
      elementClass: elementType.class,
      elementalAreaID: areaId,
      insertAfterElementID: insertAfterElement
    }, {
      'X-SecurityID': _Config.default.get('SecurityID')
    }).then(() => {
      const {
        fetchElements
      } = context;
      return fetchElements();
    }).then(() => {
      const preview = window.jQuery('.cms-preview');
      preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));
    }).catch(async err => {
      const message = await (0, _getJsonErrorMessage.default)(err);
      actions.toasts.error(message);
    });
    handleToggle();
  };
  const popoverClassNames = (0, _classnames.default)('element-editor-add-element', extraClass);
  const buttons = elementTypes.map(elementType => ({
    content: _react.default.createElement("span", {
      className: "btn__title"
    }, elementType.title),
    key: elementType.name,
    className: (0, _classnames.default)('btn--icon-xl', 'element-editor-add-element__button'),
    icon: elementType.icon,
    onClick: getElementButtonClickHandler(elementType)
  }));
  return _react.default.createElement(PopoverOptionSetComponent, {
    buttons: buttons,
    searchPlaceholder: _i18n.default._t('ElementAddElementPopover.SEARCH_BLOCKS', 'Search blocks'),
    extraClass: popoverClassNames,
    container: container,
    isOpen: isOpen,
    placement: placement,
    target: target,
    toggle: handleToggle,
    ButtonComponent: _ElementOptionButton.default
  });
};
exports.Component = AddElementPopover;
AddElementPopover.propTypes = {
  container: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func, _propTypes.default.object]),
  elementTypes: _propTypes.default.arrayOf(_elementTypeType.elementTypeType).isRequired,
  extraClass: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array, _propTypes.default.object]),
  isOpen: _propTypes.default.bool.isRequired,
  placement: _propTypes.default.string,
  target: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func, _propTypes.default.object]).isRequired,
  toggle: _propTypes.default.func.isRequired,
  areaId: _propTypes.default.number.isRequired,
  insertAfterElement: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
};
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      toasts: (0, _redux.bindActionCreators)(toastsActions, dispatch)
    }
  };
}
const InjectedComponent = (0, _Injector.inject)(['PopoverOptionSet'], PopoverOptionSetComponent => ({
  PopoverOptionSetComponent
}), () => 'ElementEditor')(AddElementPopover);
var _default = exports["default"] = (0, _redux.compose)((0, _reactRedux.connect)(null, mapDispatchToProps))(InjectedComponent);

/***/ }),

/***/ "./client/src/components/ElementEditor/AddNewButton.js":
/*!*************************************************************!*\
  !*** ./client/src/components/ElementEditor/AddNewButton.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.Component = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _Button = _interopRequireDefault(__webpack_require__(/*! components/Button/Button */ "components/Button/Button"));
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _elementTypeType = __webpack_require__(/*! types/elementTypeType */ "./client/src/types/elementTypeType.js");
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const AddNewButton = ({
  AddElementPopoverComponent,
  elementTypes,
  areaId
}) => {
  const [popoverOpen, setPopoverOpen] = (0, _react.useState)(false);
  const toggle = () => {
    setPopoverOpen(prevState => !prevState);
  };
  const buttonAttributes = {
    id: `ElementalArea${areaId}_AddButton`,
    color: 'primary',
    onClick: toggle,
    icon: 'plus'
  };
  return _react.default.createElement("div", null, _react.default.createElement(_Button.default, buttonAttributes, _i18n.default._t('ElementAddNewButton.ADD_NEW_BLOCK', 'Add new block')), _react.default.createElement(AddElementPopoverComponent, {
    placement: "bottom-start",
    target: buttonAttributes.id,
    isOpen: popoverOpen,
    elementTypes: elementTypes,
    toggle: toggle,
    areaId: areaId,
    insertAfterElement: 0
  }));
};
exports.Component = AddNewButton;
AddNewButton.propTypes = {
  elementTypes: _propTypes.default.arrayOf(_elementTypeType.elementTypeType).isRequired,
  areaId: _propTypes.default.number.isRequired
};
var _default = exports["default"] = (0, _Injector.inject)(['AddElementPopover'], AddElementPopoverComponent => ({
  AddElementPopoverComponent
}), () => 'ElementEditor.ElementList.AddNewButton')(AddNewButton);

/***/ }),

/***/ "./client/src/components/ElementEditor/Content.js":
/*!********************************************************!*\
  !*** ./client/src/components/ElementEditor/Content.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.Component = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
var _redux = __webpack_require__(/*! redux */ "redux");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const Content = ({
  id,
  fileUrl,
  fileTitle,
  content,
  previewExpanded,
  InlineEditFormComponent,
  SummaryComponent,
  activeTab,
  onFormInit,
  handleLoadingError,
  formDirty,
  broken,
  onFormSchemaSubmitResponse,
  ensureFormRendered,
  formHasRendered
}) => {
  const notVisible = !previewExpanded && (ensureFormRendered || formHasRendered);
  const extraClass = {
    'element-editor-editform--collapsed': !previewExpanded,
    'element-editor-editform--rendered-not-visible': notVisible
  };
  return _react.default.createElement("div", {
    className: "element-editor-content"
  }, !previewExpanded && _react.default.createElement(SummaryComponent, {
    content: content,
    fileUrl: fileUrl,
    fileTitle: fileTitle,
    broken: broken
  }), (previewExpanded || ensureFormRendered || formHasRendered) && _react.default.createElement("div", {
    onPointerDown: evt => evt.stopPropagation()
  }, _react.default.createElement(InlineEditFormComponent, {
    extraClass: extraClass,
    onClick: event => event.stopPropagation(),
    elementId: id,
    activeTab: activeTab,
    onFormInit: onFormInit,
    handleLoadingError: handleLoadingError,
    onFormSchemaSubmitResponse: onFormSchemaSubmitResponse,
    notVisible: notVisible
  })), formDirty && _react.default.createElement("input", {
    type: "hidden",
    name: "change-tracker",
    className: "element-form-dirty-state",
    value: "1"
  }));
};
Content.propTypes = {
  id: _propTypes.default.number,
  content: _propTypes.default.string,
  fileUrl: _propTypes.default.string,
  fileTitle: _propTypes.default.string,
  previewExpanded: _propTypes.default.bool,
  SummaryComponent: _propTypes.default.elementType,
  InlineEditFormComponent: _propTypes.default.elementType,
  handleLoadingError: _propTypes.default.func,
  broken: _propTypes.default.bool,
  onFormSchemaSubmitResponse: _propTypes.default.func,
  onFormInit: _propTypes.default.func,
  ensureFormRendered: _propTypes.default.bool,
  formHasRendered: _propTypes.default.bool,
  formDirty: _propTypes.default.object
};
const MemoizedContent = exports.Component = (0, _react.memo)(Content);
var _default = exports["default"] = (0, _redux.compose)((0, _Injector.inject)(['ElementSummary', 'ElementInlineEditForm'], (SummaryComponent, InlineEditFormComponent) => ({
  SummaryComponent,
  InlineEditFormComponent
}), () => 'ElementEditor.ElementList.Element'))(MemoizedContent);

/***/ }),

/***/ "./client/src/components/ElementEditor/DragPositionIndicator.js":
/*!**********************************************************************!*\
  !*** ./client/src/components/ElementEditor/DragPositionIndicator.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const DragPositionIndicator = () => _react.default.createElement("div", {
  className: "elemental-editor-drag-indicator"
}, _react.default.createElement("div", {
  className: "elemental-editor-drag-indicator__ball"
}));
var _default = exports["default"] = (0, _react.memo)(DragPositionIndicator);

/***/ }),

/***/ "./client/src/components/ElementEditor/Element.js":
/*!********************************************************!*\
  !*** ./client/src/components/ElementEditor/Element.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.ElementContext = exports.Component = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _elementType = __webpack_require__(/*! types/elementType */ "./client/src/types/elementType.js");
var _elementTypeType = __webpack_require__(/*! types/elementTypeType */ "./client/src/types/elementTypeType.js");
var _redux = __webpack_require__(/*! redux */ "redux");
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));
var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");
var _reduxForm = __webpack_require__(/*! redux-form */ "redux-form");
var _loadElementFormStateName = __webpack_require__(/*! state/editor/loadElementFormStateName */ "./client/src/state/editor/loadElementFormStateName.js");
var _loadElementSchemaValue = __webpack_require__(/*! state/editor/loadElementSchemaValue */ "./client/src/state/editor/loadElementSchemaValue.js");
var TabsActions = _interopRequireWildcard(__webpack_require__(/*! state/tabs/TabsActions */ "state/tabs/TabsActions"));
var _sortable = __webpack_require__(/*! @dnd-kit/sortable */ "./node_modules/@dnd-kit/sortable/dist/sortable.esm.js");
var _utilities = __webpack_require__(/*! @dnd-kit/utilities */ "./node_modules/@dnd-kit/utilities/dist/utilities.esm.js");
var toastsActions = _interopRequireWildcard(__webpack_require__(/*! state/toasts/ToastsActions */ "state/toasts/ToastsActions"));
var _ElementEditor = __webpack_require__(/*! components/ElementEditor/ElementEditor */ "./client/src/components/ElementEditor/ElementEditor.js");
var _elementConfig = __webpack_require__(/*! state/editor/elementConfig */ "./client/src/state/editor/elementConfig.js");
var _Backend = _interopRequireDefault(__webpack_require__(/*! lib/Backend */ "lib/Backend"));
var _Config = _interopRequireDefault(__webpack_require__(/*! lib/Config */ "lib/Config"));
var _getFormState = _interopRequireDefault(__webpack_require__(/*! lib/getFormState */ "lib/getFormState"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ElementContext = exports.ElementContext = (0, _react.createContext)(null);
const Element = props => {
  const [previewExpanded, setPreviewExpanded] = (0, _react.useState)(false);
  const [initialTab, setInitialTab] = (0, _react.useState)('');
  const [loadingError, setLoadingError] = (0, _react.useState)(false);
  const [newTitle, setNewTitle] = (0, _react.useState)(props.element.title);
  const [justClickedPublishButton, setJustClickedPublishButton] = (0, _react.useState)(false);
  const [doSaveElement, setDoSaveElement] = (0, _react.useState)(false);
  const [doPublishElement, setDoPublishElement] = (0, _react.useState)(false);
  const [doPublishElementAfterSave, setDoPublishElementAfterSave] = (0, _react.useState)(false);
  const [ensureFormRendered, setEnsureFormRendered] = (0, _react.useState)(false);
  const [formHasRendered, setFormHasRendered] = (0, _react.useState)(false);
  const [formActiveTab, setFormActiveTab] = (0, _react.useState)(null);
  const {
    fetchElements
  } = (0, _react.useContext)(_ElementEditor.ElementEditorContext);
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
    isOver
  } = (0, _sortable.useSortable)({
    id: props.element.id
  });
  const style = {
    transform: _utilities.CSS.Transform.toString(transform),
    transition
  };
  const sortableListeners = listeners || {};
  const keyboardListeners = {};
  const pointerListeners = {};
  Object.entries(sortableListeners).forEach(([key, value]) => {
    if (key.startsWith('onKey')) {
      keyboardListeners[key] = value;
      return;
    }
    pointerListeners[key] = value;
  });
  const formRenderedIfNeeded = formHasRendered || !props.type.inlineEditable;
  (0, _react.useEffect)(() => {
    props.onChangeHasUnsavedChanges(props.formDirty);
  }, [props.formDirty]);
  (0, _react.useEffect)(() => {
    if (props.saveElement && props.formDirty && !doSaveElement) {
      setDoSaveElement(true);
    }
  }, [props.saveElement, props.formDirty, props.increment]);
  (0, _react.useEffect)(() => {
    if (justClickedPublishButton && formRenderedIfNeeded) {
      setJustClickedPublishButton(false);
      if (props.formDirty) {
        props.submitForm();
        setDoPublishElementAfterSave(true);
      } else {
        setDoPublishElement(true);
      }
    }
  }, [justClickedPublishButton, formRenderedIfNeeded]);
  (0, _react.useEffect)(() => {
    if (!formHasRendered) {
      return;
    }
    const {
      tabSetName,
      onActivateTab
    } = props;
    if (!initialTab) {
      setInitialTab(formActiveTab);
    }
    if (formActiveTab || initialTab) {
      onActivateTab(tabSetName, formActiveTab || initialTab);
    } else {
      const defaultFirstTab = 'Main';
      onActivateTab(tabSetName, defaultFirstTab);
    }
  }, [formActiveTab, formHasRendered]);
  const getNoTitle = () => _i18n.default.inject(_i18n.default._t('ElementHeader.NOTITLE', 'Untitled {type} block'), {
    type: props.type.title
  });
  const showSavedElementToast = elementTitle => {
    const title = elementTitle || getNoTitle();
    const message = _i18n.default.inject(_i18n.default._t('ElementSaveAction.SUCCESS_NOTIFICATION', 'Saved \'{title}\' successfully'), {
      title
    });
    props.actions.toasts.success(message);
  };
  const showPublishedElementToast = wasError => {
    const title = newTitle || getNoTitle();
    if (wasError) {
      const message = _i18n.default.inject(_i18n.default._t('ElementPublishAction.ERROR_NOTIFICATION', 'Error publishing \'{title}\''), {
        title
      });
      props.actions.toasts.error(message);
    } else {
      const message = _i18n.default.inject(_i18n.default._t('ElementPublishAction.SUCCESS_NOTIFICATION', 'Published \'{title}\' successfully'), {
        title
      });
      props.actions.toasts.success(message);
    }
  };
  const handleAfterPublish = wasError => {
    showPublishedElementToast(wasError);
    setDoPublishElement(false);
    setDoPublishElementAfterSave(false);
    fetchElements();
  };
  (0, _react.useEffect)(() => {
    if (formHasRendered && doSaveElement) {
      props.submitForm();
      setDoSaveElement(false);
    }
  }, [formHasRendered, doSaveElement]);
  (0, _react.useEffect)(() => {
    if (doPublishElement && formRenderedIfNeeded) {
      const url = `${(0, _elementConfig.getConfig)().controllerLink.replace(/\/$/, '')}/api/publish`;
      _Backend.default.post(url, {
        id: props.element.id
      }, {
        'X-SecurityID': _Config.default.get('SecurityID')
      }).then(() => handleAfterPublish(false)).catch(() => handleAfterPublish(true));
    }
  }, [doPublishElement, formHasRendered]);
  const getVersionedStateClassName = () => {
    const {
      element
    } = props;
    const baseClassName = 'element-editor__element';
    if (!element.isPublished) {
      return `${baseClassName}--draft`;
    }
    if (element.isPublished && !element.isLiveVersion) {
      return `${baseClassName}--modified`;
    }
    return `${baseClassName}--published`;
  };
  const getLinkTitle = type => {
    if (type.broken) {
      return _i18n.default._t('ElementalElement.ARCHIVE_BROKEN', 'Archive this block');
    }
    return _i18n.default.inject(_i18n.default._t('ElementalElement.TITLE', 'Edit this {type} block'), {
      type: type.title
    });
  };
  const getSummary = (element, type) => {
    if (type.broken) {
      return element.title ? _i18n.default.inject(_i18n.default._t('ElementalElement.BROKEN_DESCRIPTION_TITLE', 'This block had the title "{title}". It is broken and will not display on the front-end. You can archive it to remove it from this elemental area.'), {
        title: element.title
      }) : _i18n.default._t('ElementalElement.BROKEN_DESCRIPTION', 'This block is broken and will not display on the front-end. You can archive it to remove it from this elemental area.');
    }
    return element.blockSchema.content;
  };
  const handleLoadingError = () => {
    setLoadingError(true);
  };
  const handleTabClick = toBeActiveTab => {
    const {
      activeTab
    } = props;
    if (toBeActiveTab !== activeTab && !loadingError) {
      setPreviewExpanded(true);
      setFormActiveTab(toBeActiveTab);
    }
  };
  const handleExpand = event => {
    const {
      type,
      link
    } = props;
    if (type.broken) {
      return;
    }
    const dragHandle = event.target.closest ? event.target.closest('.element-editor-header__drag-handle') : null;
    if (dragHandle) {
      event.stopPropagation();
      return;
    }
    if (event.target.type === 'button') {
      event.stopPropagation();
      return;
    }
    if (type.inlineEditable && !loadingError) {
      setPreviewExpanded(!previewExpanded);
      return;
    }
    window.location = link;
  };
  const handleKeyUp = event => {
    const {
      nodeName
    } = event.target;
    const dragHandle = event.target.closest ? event.target.closest('.element-editor-header__drag-handle') : null;
    if ((event.key === ' ' || event.key === 'Enter') && !['input', 'textarea'].includes(nodeName.toLowerCase()) && !dragHandle) {
      handleExpand(event);
    }
  };
  const handleSaveButtonClick = () => {
    setEnsureFormRendered(true);
    setDoSaveElement(true);
  };
  const handlePublishButtonClick = () => {
    setJustClickedPublishButton(true);
    if (props.type.inlineEditable) {
      setEnsureFormRendered(true);
    }
  };
  const handleFormInit = activeTab => {
    if (activeTab) {
      setFormActiveTab(activeTab);
    }
    setFormHasRendered(true);
  };
  const handleFormSchemaSubmitResponse = (formSchema, title) => {
    const hasValidationErrors = formSchema.id.match(/\/schema\/elemental-area\/([0-9]+)/);
    if (hasValidationErrors) {
      if (props.type.inlineEditable) {
        setPreviewExpanded(true);
      }
      if (doPublishElementAfterSave) {
        setDoPublishElementAfterSave(false);
      }
      props.onAfterSubmitResponse(false);
      return;
    }
    setNewTitle(title);
    if (doPublishElementAfterSave) {
      setDoPublishElementAfterSave(false);
      setDoPublishElement(true);
    }
    if (!doPublishElement && !doPublishElementAfterSave) {
      showSavedElementToast(title);
    }
    props.onAfterSubmitResponse(true);
    fetchElements();
  };
  const {
    element,
    type,
    areaId,
    HeaderComponent,
    ContentComponent,
    link,
    activeTab,
    formDirty
  } = props;
  if (!element.id) {
    return null;
  }
  const elementDomId = `element-${element.id}`;
  const elementClassNames = (0, _classnames.default)('element-editor__element', {
    'element-editor__element--broken': type.broken,
    'element-editor__element--expandable': type.inlineEditable && !type.broken,
    'element-editor__element--dragging': isDragging,
    'element-editor__element--dragged-over': isOver
  }, getVersionedStateClassName());
  const providerValue = {
    formDirty,
    onPublishButtonClick: handlePublishButtonClick,
    onSaveButtonClick: handleSaveButtonClick
  };
  const content = _react.default.createElement("div", _extends({
    id: elementDomId,
    className: elementClassNames,
    onClick: handleExpand,
    onKeyUp: handleKeyUp,
    role: "button",
    tabIndex: 0,
    title: getLinkTitle(type),
    key: element.id,
    ref: setNodeRef
  }, pointerListeners, {
    style: style
  }), _react.default.createElement(ElementContext.Provider, {
    value: providerValue
  }, _react.default.createElement(HeaderComponent, {
    element: element,
    type: type,
    areaId: areaId,
    expandable: type.inlineEditable,
    link: link,
    previewExpanded: previewExpanded,
    handleEditTabsClick: handleTabClick,
    activeTab: activeTab,
    disableTooltip: isDragging,
    sortableListeners: keyboardListeners,
    sortableAttributes: attributes,
    sortableActivatorRef: setActivatorNodeRef,
    elementId: elementDomId
  }), _react.default.createElement(ContentComponent, {
    id: element.id,
    fileUrl: element.blockSchema.fileURL,
    fileTitle: element.blockSchema.fileTitle,
    content: getSummary(element, type),
    previewExpanded: previewExpanded && !isDragging,
    ensureFormRendered: ensureFormRendered,
    formHasRendered: formHasRendered,
    activeTab: activeTab,
    handleLoadingError: handleLoadingError,
    broken: type.broken,
    onFormSchemaSubmitResponse: handleFormSchemaSubmitResponse,
    onFormInit: () => handleFormInit(activeTab),
    formDirty: formDirty
  })));
  return content;
};
exports.Component = Element;
function mapStateToProps(state, ownProps) {
  const elementId = ownProps.element.id;
  const elementName = (0, _loadElementFormStateName.loadElementFormStateName)(elementId);
  const elementFormSchema = (0, _loadElementSchemaValue.loadElementSchemaValue)('schemaUrl', elementId);
  const filterFieldsForTabs = field => field.component === 'Tabs';
  const tabSet = state.form && state.form.formSchemas[elementFormSchema] && state.form.formSchemas[elementFormSchema].schema && state.form.formSchemas[elementFormSchema].schema.fields.find(filterFieldsForTabs);
  const tabSetName = tabSet && tabSet.id;
  const uniqueFieldId = `element.${elementName}__${tabSetName}`;
  const formName = (0, _loadElementFormStateName.loadElementFormStateName)(ownProps.element.id);
  const formDirty = (0, _reduxForm.isDirty)(`element.${formName}`, _getFormState.default)(state);
  const activeTab = state.tabs && state.tabs.fields && state.tabs.fields[uniqueFieldId] && state.tabs.fields[uniqueFieldId].activeTab;
  return {
    tabSetName,
    activeTab,
    formDirty
  };
}
function mapDispatchToProps(dispatch, ownProps) {
  const elementName = (0, _loadElementFormStateName.loadElementFormStateName)(ownProps.element.id);
  return {
    onActivateTab(tabSetName, activeTabName) {
      dispatch(TabsActions.activateTab(`element.${elementName}__${tabSetName}`, activeTabName));
    },
    submitForm() {
      ownProps.onBeforeSubmitForm(ownProps.element.id);
      dispatch((0, _reduxForm.submit)(`element.${elementName}`));
    },
    actions: {
      toasts: (0, _redux.bindActionCreators)(toastsActions, dispatch)
    }
  };
}
Element.propTypes = {
  element: _elementType.elementType,
  type: _elementTypeType.elementTypeType.isRequired,
  areaId: _propTypes.default.number.isRequired,
  link: _propTypes.default.string.isRequired,
  activeTab: _propTypes.default.string,
  tabSetName: _propTypes.default.string,
  onActivateTab: _propTypes.default.func,
  onChangeHasUnsavedChanges: _propTypes.default.func.isRequired,
  saveElement: _propTypes.default.bool.isRequired,
  onBeforeSubmitForm: _propTypes.default.func.isRequired,
  onAfterSubmitResponse: _propTypes.default.func.isRequired,
  increment: _propTypes.default.number.isRequired
};
var _default = exports["default"] = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _Injector.inject)(['ElementHeader', 'ElementContent'], (HeaderComponent, ContentComponent) => ({
  HeaderComponent,
  ContentComponent
}), () => 'ElementEditor.ElementList.Element'))(Element);

/***/ }),

/***/ "./client/src/components/ElementEditor/ElementActions.js":
/*!***************************************************************!*\
  !*** ./client/src/components/ElementEditor/ElementActions.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.Component = void 0;
var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _redux = __webpack_require__(/*! redux */ "redux");
var _reactstrap = __webpack_require__(/*! reactstrap */ "reactstrap");
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
var _elementType = __webpack_require__(/*! types/elementType */ "./client/src/types/elementType.js");
var _elementTypeType = __webpack_require__(/*! types/elementTypeType */ "./client/src/types/elementTypeType.js");
var _AbstractAction = _interopRequireDefault(__webpack_require__(/*! components/ElementActions/AbstractAction */ "./client/src/components/ElementActions/AbstractAction.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ElementActions = ({
  children,
  type,
  id,
  activeTab,
  editTabs = [],
  handleEditTabsClick,
  expandable = true,
  ActionMenuComponent
}) => {
  const handleEditTabsClickFn = event => {
    handleEditTabsClick(event.target.name);
  };
  const renderEditTabs = () => {
    if (type.broken || !expandable || !editTabs || !editTabs.length) {
      return null;
    }
    return editTabs.map(({
      name,
      title
    }) => _react.default.createElement(_AbstractAction.default, {
      key: name,
      name: name,
      title: title,
      type: type,
      onClick: handleEditTabsClickFn,
      active: name === activeTab
    }));
  };
  const renderDivider = () => {
    if (!expandable || !editTabs || !editTabs.length || _react.default.Children.count(children) === 0) {
      return null;
    }
    return _react.default.createElement(_reactstrap.DropdownItem, {
      divider: true,
      role: "separator"
    });
  };
  const dropdownToggleClassNames = ['element-editor-header__actions-toggle', 'btn', 'btn-sm', 'btn--no-text'];
  return _react.default.createElement(ActionMenuComponent, {
    id: `element-editor-actions-${id}`,
    className: "element-editor-header__actions-dropdown",
    dropdownMenuProps: {
      right: true
    },
    dropdownToggleClassNames: dropdownToggleClassNames
  }, renderEditTabs(), renderDivider(), children);
};
exports.Component = ElementActions;
ElementActions.propTypes = {
  element: _elementType.elementType,
  type: _elementTypeType.elementTypeType.isRequired,
  areaId: _propTypes.default.number.isRequired,
  activeTab: _propTypes.default.string,
  editTabs: _propTypes.default.arrayOf(_propTypes.default.shape({
    title: _propTypes.default.string,
    name: _propTypes.default.string
  })),
  handleEditTabsClick: _propTypes.default.func.isRequired,
  expandable: _propTypes.default.bool,
  children: _propTypes.default.node,
  ActionMenuComponent: _propTypes.default.elementType.isRequired
};
var _default = exports["default"] = (0, _redux.compose)((0, _Injector.inject)(['ActionMenu'], ActionMenuComponent => ({
  ActionMenuComponent
}), () => 'ElementEditor.ElementList.Element'))(ElementActions);

/***/ }),

/***/ "./client/src/components/ElementEditor/ElementEditor.js":
/*!**************************************************************!*\
  !*** ./client/src/components/ElementEditor/ElementEditor.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.ElementEditorContext = exports.Component = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
var _redux = __webpack_require__(/*! redux */ "redux");
var _elementTypeType = __webpack_require__(/*! types/elementTypeType */ "./client/src/types/elementTypeType.js");
var _Backend = _interopRequireDefault(__webpack_require__(/*! lib/Backend */ "lib/Backend"));
var _Config = _interopRequireDefault(__webpack_require__(/*! lib/Config */ "lib/Config"));
var _elementConfig = __webpack_require__(/*! state/editor/elementConfig */ "./client/src/state/editor/elementConfig.js");
var toastsActions = _interopRequireWildcard(__webpack_require__(/*! state/toasts/ToastsActions */ "state/toasts/ToastsActions"));
var editorActions = _interopRequireWildcard(__webpack_require__(/*! state/editor/editorActions */ "./client/src/state/editor/editorActions.js"));
var _getJsonErrorMessage = _interopRequireDefault(__webpack_require__(/*! lib/getJsonErrorMessage */ "lib/getJsonErrorMessage"));
var _sortable = __webpack_require__(/*! @dnd-kit/sortable */ "./node_modules/@dnd-kit/sortable/dist/sortable.esm.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ElementEditorContext = exports.ElementEditorContext = (0, _react.createContext)(null);
const ElementEditor = ({
  ToolbarComponent,
  ListComponent,
  areaId,
  elementTypes,
  allowedElements,
  sharedObject,
  actions,
  forceRefetchElements
}) => {
  const [dragging, setDragging] = (0, _react.useState)(false);
  const [elements, setElements] = (0, _react.useState)(null);
  const [loading, setLoading] = (0, _react.useState)(true);
  const [showLoadingIndicator, setShowLoadingIndicator] = (0, _react.useState)(false);
  const fetchElements = (doSetLoadingState = true) => {
    if (doSetLoadingState) {
      setLoading(true);
    }
    const url = `${(0, _elementConfig.getConfig)().controllerLink.replace(/\/$/, '')}/api/readElements/${areaId}`;
    return _Backend.default.get(url).then(async response => {
      const responseJson = await response.json();
      setElements(responseJson);
      setLoading(false);
      const preview = window.jQuery('.cms-preview');
      if (preview) {
        preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));
      }
      actions.editor.reloadComplete(areaId);
    }).catch(async err => {
      setElements([]);
      setLoading(false);
      const message = await (0, _getJsonErrorMessage.default)(err);
      actions.toasts.error(message);
      actions.editor.reloadComplete(areaId);
    });
  };
  const handleDragStart = event => {
    const {
      active
    } = event;
    setDragging(active.id);
  };
  const handleDragEnd = event => {
    const {
      active,
      over
    } = event;
    if (active.id === over.id) {
      setDragging(false);
      return;
    }
    const elementIDs = elements.map(e => e.id);
    const fromIndex = elementIDs.indexOf(active.id);
    const toIndex = elementIDs.indexOf(over.id);
    const sortedElements = (0, _sortable.arrayMove)(elements, fromIndex, toIndex);
    const afterBlockID = toIndex > 0 ? sortedElements[toIndex - 1].id : 0;
    const url = `${(0, _elementConfig.getConfig)().controllerLink.replace(/\/$/, '')}/api/sort`;
    _Backend.default.post(url, {
      id: active.id,
      afterBlockID
    }, {
      'X-SecurityID': _Config.default.get('SecurityID')
    }).then(() => fetchElements()).catch(async err => {
      const message = await (0, _getJsonErrorMessage.default)(err);
      actions.toasts.error(message);
    });
    setDragging(false);
    setElements(sortedElements);
  };
  (0, _react.useEffect)(() => {
    let timeoutId;
    if (!loading) {
      setShowLoadingIndicator(false);
    } else {
      timeoutId = setTimeout(() => {
        setShowLoadingIndicator(true);
      }, 300);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [loading]);
  (0, _react.useEffect)(() => {
    if (forceRefetchElements || elements === null) {
      fetchElements();
    }
  }, [forceRefetchElements, elements]);
  const providerValue = (0, _react.useMemo)(() => ({
    fetchElements,
    actions
  }), [fetchElements, actions]);
  if (elements === null) {
    return null;
  }
  const allowedElementTypes = allowedElements.map(className => elementTypes.find(type => type.class === className));
  return _react.default.createElement("div", {
    className: "element-editor"
  }, _react.default.createElement(ElementEditorContext.Provider, {
    value: providerValue
  }, _react.default.createElement(ToolbarComponent, {
    elementTypes: allowedElementTypes,
    areaId: areaId
  }), _react.default.createElement(ListComponent, {
    allowedElementTypes: allowedElementTypes,
    elementTypes: elementTypes,
    areaId: areaId,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    dragging: dragging,
    sharedObject: sharedObject,
    elements: elements,
    isLoading: showLoadingIndicator
  })));
};
ElementEditor.propTypes = {
  elementTypes: _propTypes.default.arrayOf(_elementTypeType.elementTypeType).isRequired,
  allowedElements: _propTypes.default.arrayOf(_propTypes.default.string).isRequired,
  areaId: _propTypes.default.number.isRequired,
  actions: _propTypes.default.shape({
    handleSortBlock: _propTypes.default.func
  })
};
const MemoizedElementEditor = exports.Component = (0, _react.memo)(ElementEditor);
const params = [(0, _Injector.inject)(['ElementToolbar', 'ElementList'], (ToolbarComponent, ListComponent) => ({
  ToolbarComponent,
  ListComponent
}), () => 'ElementEditor')];
function mapStateToProps(state, ownProps) {
  const forceRefetch = state.elemental.editor.forceRefetchElements[ownProps.areaId] || false;
  return {
    forceRefetchElements: forceRefetch
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      toasts: (0, _redux.bindActionCreators)(toastsActions, dispatch),
      editor: (0, _redux.bindActionCreators)(editorActions, dispatch)
    }
  };
}
var _default = exports["default"] = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), ...params)(MemoizedElementEditor);

/***/ }),

/***/ "./client/src/components/ElementEditor/ElementList.js":
/*!************************************************************!*\
  !*** ./client/src/components/ElementEditor/ElementList.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Component = ElementList;
exports.keyboardCoordinateGetter = exports["default"] = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _elementType = __webpack_require__(/*! types/elementType */ "./client/src/types/elementType.js");
var _elementTypeType = __webpack_require__(/*! types/elementTypeType */ "./client/src/types/elementTypeType.js");
var _redux = __webpack_require__(/*! redux */ "redux");
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _core = __webpack_require__(/*! @dnd-kit/core */ "./node_modules/@dnd-kit/core/dist/core.esm.js");
var _sortable = __webpack_require__(/*! @dnd-kit/sortable */ "./node_modules/@dnd-kit/sortable/dist/sortable.esm.js");
var _modifiers = __webpack_require__(/*! @dnd-kit/modifiers */ "./node_modules/@dnd-kit/modifiers/dist/modifiers.esm.js");
var _elementConfig = __webpack_require__(/*! state/editor/elementConfig */ "./client/src/state/editor/elementConfig.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const keyboardCoordinateGetter = (event, args) => {
  event.preventDefault();
  const {
    active,
    over,
    droppableContainers
  } = args.context;
  if (!droppableContainers) {
    return undefined;
  }
  if (!active || !active.data || !active.data.current) {
    return undefined;
  }
  const {
    sortable
  } = active.data.current;
  if (!sortable || !Array.isArray(sortable.items)) {
    return undefined;
  }
  const items = sortable.items;
  const overId = over ? over.id : active.id;
  const overIndex = items.indexOf(overId);
  const activeIndex = items.indexOf(active.id);
  if (overIndex === -1 || activeIndex === -1) {
    return undefined;
  }
  const directionUp = -1;
  const directionDown = 1;
  let nextIndex = overIndex;
  let direction = directionDown;
  switch (event.code) {
    case _core.KeyboardCode.Down:
    case _core.KeyboardCode.Right:
      nextIndex = Math.min(overIndex + 1, items.length - 1);
      break;
    case _core.KeyboardCode.Up:
    case _core.KeyboardCode.Left:
      nextIndex = Math.max(0, overIndex - 1);
      direction = directionUp;
      break;
    default:
      return undefined;
  }
  if (overIndex === nextIndex) {
    return undefined;
  }
  const sortedItems = (0, _sortable.arrayMove)(items, activeIndex, overIndex);
  const currentNodeIdAtNextIndex = sortedItems[nextIndex];
  if (!droppableContainers.has(currentNodeIdAtNextIndex)) {
    return undefined;
  }
  if (!droppableContainers.has(active.id)) {
    return undefined;
  }
  const activeNode = droppableContainers.get(active.id).node?.current;
  if (!activeNode) {
    return undefined;
  }
  const newNode = droppableContainers.get(currentNodeIdAtNextIndex).node?.current;
  if (!newNode) {
    return undefined;
  }
  const activeRect = activeNode.getBoundingClientRect();
  const newRect = newNode.getBoundingClientRect();
  const offset = direction === directionDown ? newRect.top - activeRect.bottom : activeRect.top - newRect.bottom;
  return {
    x: 0,
    y: activeRect.top + direction * (newRect.height + offset)
  };
};
exports.keyboardCoordinateGetter = keyboardCoordinateGetter;
function ElementList({
  elements = [],
  sharedObject = {
    entwineResolve: () => {},
    setState: null
  },
  ElementComponent,
  HoverBarComponent,
  allowedElementTypes,
  elementTypes,
  areaId,
  onDragEnd,
  onDragStart,
  dragging,
  isLoading = false,
  LoadingComponent
}) {
  const [saveAllElements, setSaveAllElements] = (0, _react.useState)(false);
  const [increment, setIncrement] = (0, _react.useState)(0);
  const [hasUnsavedChangesBlockIDs, setHasUnsavedChangesBlockIDs] = (0, _react.useState)({});
  const [validBlockIDs, setValidBlockIDs] = (0, _react.useState)({});
  sharedObject.setIncrement = setIncrement;
  sharedObject.setSaveAllElements = setSaveAllElements;
  const resetState = (oldHasUnsavedChangesBlockIDs, resetHasUnsavedChangesBlockIDs) => {
    const newHasUnsavedChangesBlockIDs = {};
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
  (0, _react.useEffect)(() => {
    resetState({}, true);
  }, []);
  (0, _react.useEffect)(() => {
    resetState(hasUnsavedChangesBlockIDs, false);
  }, [elements]);
  let skipRemainingEffects = false;
  (0, _react.useEffect)(() => {
    if (saveAllElements) {
      resetState(hasUnsavedChangesBlockIDs, false);
      skipRemainingEffects = true;
    }
  }, [saveAllElements]);
  (0, _react.useEffect)(() => {
    if (skipRemainingEffects) {
      return;
    }
    if (!elements) {
      return;
    }
    if (!saveAllElements) {
      return;
    }
    const unsavedChangesBlockIDs = elements.map(block => parseInt(block.id, 10)).filter(blockID => hasUnsavedChangesBlockIDs[blockID]);
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
    const result = {
      success: allValid,
      reason: allValid ? '' : 'invalid'
    };
    sharedObject.entwineResolve(result);
    resetState(hasUnsavedChangesBlockIDs, allValid);
    setSaveAllElements(false);
  }, [saveAllElements, hasUnsavedChangesBlockIDs]);
  const sensors = (0, _core.useSensors)((0, _core.useSensor)(_core.PointerSensor, {
    activationConstraint: {
      distance: 10
    }
  }), (0, _core.useSensor)(_core.KeyboardSensor, {
    coordinateGetter: keyboardCoordinateGetter
  }));
  const handleDragStart = event => {
    if (onDragStart) {
      onDragStart(event);
    }
  };
  const handleDragEnd = event => {
    if (onDragEnd) {
      onDragEnd(event);
    }
  };
  const handleChangeHasUnsavedChanges = (elementID, hasUnsavedChanges) => {
    setHasUnsavedChangesBlockIDs({
      ...hasUnsavedChangesBlockIDs,
      [elementID]: hasUnsavedChanges
    });
  };
  const handleBeforeSubmitForm = elementID => {
    setValidBlockIDs({
      ...validBlockIDs,
      [elementID]: null
    });
  };
  const handleAfterSubmitResponse = (elementID, valid) => {
    setHasUnsavedChangesBlockIDs({
      ...hasUnsavedChangesBlockIDs,
      [elementID]: !valid
    });
    setValidBlockIDs({
      ...validBlockIDs,
      [elementID]: valid
    });
  };
  const renderBlocks = () => {
    if (elements.length === 0) {
      return _react.default.createElement("div", null, _i18n.default._t('ElementList.ADD_BLOCKS', 'Add blocks to place your content'));
    }
    let output = elements.map(element => {
      const saveElement = saveAllElements && hasUnsavedChangesBlockIDs[element.id];
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(ElementComponent, {
        key: element.id,
        element: element,
        areaId: areaId,
        type: (0, _elementConfig.getElementTypeConfig)(element, elementTypes),
        link: element.blockSchema.actions.edit,
        saveElement: saveElement,
        onChangeHasUnsavedChanges: hasUnsavedChanges => handleChangeHasUnsavedChanges(element.id, hasUnsavedChanges),
        onBeforeSubmitForm: () => handleBeforeSubmitForm(element.id),
        onAfterSubmitResponse: valid => handleAfterSubmitResponse(element.id, valid),
        increment: increment
      }), dragging === false && _react.default.createElement(HoverBarComponent, {
        key: `create-after-${element.id}`,
        areaId: areaId,
        elementId: element.id,
        elementTypes: allowedElementTypes
      }));
    });
    if (dragging === false) {
      output = [_react.default.createElement(HoverBarComponent, {
        key: 0,
        areaId: areaId,
        elementId: 0,
        elementTypes: allowedElementTypes
      })].concat(output);
    }
    return _react.default.createElement(_core.DndContext, {
      modifiers: [_modifiers.restrictToVerticalAxis, _modifiers.restrictToParentElement],
      sensors: sensors,
      collisionDetection: _core.closestCenter,
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd
    }, _react.default.createElement(_sortable.SortableContext, {
      items: elements.map(element => element.id),
      strategy: _sortable.verticalListSortingStrategy
    }, output));
  };
  const renderLoading = () => {
    if (isLoading) {
      return _react.default.createElement(LoadingComponent, null);
    }
    return null;
  };
  const listClassNames = (0, _classnames.default)('elemental-editor-list', {
    'elemental-editor-list--empty': !elements || !elements.length
  });
  return _react.default.createElement("div", {
    className: listClassNames
  }, renderLoading(), renderBlocks());
}
ElementList.propTypes = {
  elements: _propTypes.default.arrayOf(_elementType.elementType).isRequired,
  elementTypes: _propTypes.default.arrayOf(_elementTypeType.elementTypeType).isRequired,
  allowedElementTypes: _propTypes.default.arrayOf(_elementTypeType.elementTypeType).isRequired,
  areaId: _propTypes.default.number.isRequired,
  onDragStart: _propTypes.default.func,
  onDragEnd: _propTypes.default.func,
  dragging: _propTypes.default.oneOf([_propTypes.default.bool, _propTypes.default.number]),
  sharedObject: _propTypes.default.object.isRequired
};
var _default = exports["default"] = (0, _redux.compose)((0, _Injector.inject)(['Element', 'Loading', 'HoverBar', 'DragPositionIndicator'], (ElementComponent, LoadingComponent, HoverBarComponent, DragIndicatorComponent) => ({
  ElementComponent,
  LoadingComponent,
  HoverBarComponent,
  DragIndicatorComponent
}), () => 'ElementEditor.ElementList'))(ElementList);

/***/ }),

/***/ "./client/src/components/ElementEditor/ElementOptionButton.js":
/*!********************************************************************!*\
  !*** ./client/src/components/ElementEditor/ElementOptionButton.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));
var _reactstrap = __webpack_require__(/*! reactstrap */ "reactstrap");
var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ElementOptionButton = ({
  icon,
  className,
  noText = false,
  children,
  ...props
}) => _react.default.createElement(_reactstrap.Button, _extends({
  className: (0, _classnames.default)(className, {
    'btn--no-text': noText
  }),
  "aria-label": noText ? children : undefined
}, props), icon && _react.default.createElement("span", {
  className: `btn__icon ${icon}`,
  "aria-hidden": "true"
}), noText ? undefined : children);
ElementOptionButton.propTypes = {
  ..._reactstrap.Button.propTypes,
  noText: _propTypes.default.bool,
  icon: _propTypes.default.string
};
ElementOptionButton.defaultProps = {
  ..._reactstrap.Button.defaultProps,
  noText: false
};
var _default = exports["default"] = ElementOptionButton;

/***/ }),

/***/ "./client/src/components/ElementEditor/Header.js":
/*!*******************************************************!*\
  !*** ./client/src/components/ElementEditor/Header.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.Component = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _reactstrap = __webpack_require__(/*! reactstrap */ "reactstrap");
var _elementType = __webpack_require__(/*! types/elementType */ "./client/src/types/elementType.js");
var _elementTypeType = __webpack_require__(/*! types/elementTypeType */ "./client/src/types/elementTypeType.js");
var _redux = __webpack_require__(/*! redux */ "redux");
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Header = ({
  element,
  type,
  areaId,
  previewExpanded,
  simple,
  disableTooltip,
  activeTab,
  expandable = true,
  ElementActionsComponent,
  handleEditTabsClick,
  sortableListeners,
  sortableAttributes,
  sortableActivatorRef,
  elementId
}) => {
  const [tooltipOpen, setTooltipOpen] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    if (tooltipOpen && disableTooltip) {
      setTooltipOpen(false);
    }
  }, [tooltipOpen, disableTooltip]);
  const getBlockTitle = (elementParam, typeParam) => {
    if (typeParam.broken) {
      return _i18n.default.inject(_i18n.default._t('ElementHeader.BROKEN', 'This element is of obsolete type {type}.'), {
        type: typeParam.obsoleteClassName
      });
    }
    if (elementParam.title) {
      return elementParam.title;
    }
    return _i18n.default.inject(_i18n.default._t('ElementHeader.NOTITLE', 'Untitled {type} block'), {
      type: typeParam.title
    });
  };
  const toggle = () => {
    setTooltipOpen(prevState => !prevState);
  };
  const renderVersionedStateMessage = () => {
    const {
      isLiveVersion,
      isPublished
    } = element;
    if (isPublished && isLiveVersion) {
      return null;
    }
    let versionStateButtonTitle = '';
    const stateClassNames = ['element-editor-header__version-state'];
    if (!isPublished) {
      versionStateButtonTitle = _i18n.default._t('ElementHeader.STATE_DRAFT', 'Item has not been published yet');
      stateClassNames.push('element-editor-header__version-state--draft');
    } else if (!isLiveVersion) {
      versionStateButtonTitle = _i18n.default._t('ElementHeader.STATE_MODIFIED', 'Item has unpublished changes');
      stateClassNames.push('element-editor-header__version-state--modified');
    }
    return _react.default.createElement("span", {
      className: (0, _classnames.default)(stateClassNames),
      title: versionStateButtonTitle
    });
  };
  const renderStatusFlagBadges = () => {
    const statusFlags = element.statusFlags;
    if (!statusFlags) {
      return null;
    }
    const badges = [];
    for (let [cssClasses, data] of Object.entries(statusFlags)) {
      cssClasses = `badge status-${cssClasses}`;
      if (typeof data === 'string') {
        data = {
          text: data
        };
      }
      if (!data.title) {
        data.title = '';
      }
      badges.push(_react.default.createElement("span", {
        key: cssClasses,
        className: cssClasses,
        title: data.title
      }, data.text));
    }
    return badges;
  };
  const title = getBlockTitle(element, type);
  const titleClasses = (0, _classnames.default)({
    'element-editor-header__title': true,
    'element-editor-header__title--none': !element.title
  });
  const expandTitle = _i18n.default._t('ElementHeader.EXPAND', 'Show editable fields');
  const containerClasses = (0, _classnames.default)('element-editor-header', {
    'element-editor-header--simple': simple
  });
  const iconContainerClasses = (0, _classnames.default)('element-editor-header__icon-container', {
    'element-editor-header__icon-container--broken': type.broken
  });
  const expandCaretClasses = (0, _classnames.default)('element-editor-header__expand', {
    'font-icon-right-open-big': !expandable,
    'font-icon-up-open-big': expandable && previewExpanded,
    'font-icon-down-open-big': expandable && !previewExpanded
  });
  const blockIconId = `element-icon-${element.id}`;
  const dragHandleLabel = _i18n.default._t('ElementHeader.DRAG_HANDLE', 'Reorder block');
  return _react.default.createElement("div", {
    className: containerClasses
  }, _react.default.createElement("div", _extends({
    className: "element-editor-header__drag-handle",
    ref: sortableActivatorRef
  }, sortableListeners, sortableAttributes, {
    tabIndex: 0,
    role: "button",
    "aria-label": dragHandleLabel,
    "aria-controls": elementId
  }), _react.default.createElement("span", {
    className: "font-icon-drag-handle",
    "aria-hidden": "true"
  })), _react.default.createElement("div", {
    className: "element-editor-header__info"
  }, _react.default.createElement("div", {
    className: iconContainerClasses
  }, _react.default.createElement("span", {
    className: type.icon,
    id: blockIconId,
    "aria-hidden": "true"
  }), renderVersionedStateMessage(), !type.broken && !simple && _react.default.createElement(_reactstrap.Tooltip, {
    placement: "top",
    isOpen: tooltipOpen && !disableTooltip,
    target: blockIconId,
    toggle: toggle
  }, type.title)), _react.default.createElement("h3", {
    className: titleClasses
  }, title), renderStatusFlagBadges()), !simple && _react.default.createElement("div", {
    className: "element-editor-header__actions"
  }, _react.default.createElement("div", {
    role: "none",
    onClick: event => event.stopPropagation(),
    onPointerDown: evt => evt.stopPropagation()
  }, _react.default.createElement(ElementActionsComponent, {
    element: element,
    type: type,
    areaId: areaId,
    activeTab: activeTab,
    editTabs: type.editTabs,
    handleEditTabsClick: handleEditTabsClick,
    expandable: expandable
  })), !type.broken && _react.default.createElement("span", {
    className: expandCaretClasses,
    "aria-label": expandTitle,
    title: expandTitle
  })));
};
exports.Component = Header;
Header.propTypes = {
  element: _elementType.elementType.isRequired,
  type: _elementTypeType.elementTypeType.isRequired,
  areaId: _propTypes.default.number,
  activeTab: _propTypes.default.string,
  simple: _propTypes.default.bool,
  ElementActionsComponent: _propTypes.default.elementType,
  previewExpanded: _propTypes.default.bool,
  disableTooltip: _propTypes.default.bool,
  sortableListeners: _propTypes.default.object,
  sortableAttributes: _propTypes.default.object,
  sortableActivatorRef: _propTypes.default.func,
  elementId: _propTypes.default.string,
  expandable: _propTypes.default.bool,
  handleEditTabsClick: _propTypes.default.func
};
var _default = exports["default"] = (0, _redux.compose)((0, _Injector.inject)(['ElementActions'], ElementActionsComponent => ({
  ElementActionsComponent
}), () => 'ElementEditor.ElementList.Element'))(Header);

/***/ }),

/***/ "./client/src/components/ElementEditor/HoverBar.js":
/*!*********************************************************!*\
  !*** ./client/src/components/ElementEditor/HoverBar.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.Component = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
var _elementTypeType = __webpack_require__(/*! types/elementTypeType */ "./client/src/types/elementTypeType.js");
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _prefixClassNames = _interopRequireDefault(__webpack_require__(/*! ../../lib/prefixClassNames */ "./client/src/lib/prefixClassNames.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const classNames = (0, _prefixClassNames.default)('element-editor__hover-bar');
const StatelessHoverBar = ({
  AddElementPopoverComponent,
  elementTypes,
  elementId,
  areaId,
  popoverOpen,
  onToggle
}) => {
  const lineClasses = `${classNames('-line')} font-icon-plus-circled`;
  const label = _i18n.default._t('ElementAddNewButton.ADD_NEW_BLOCK', 'Add new block');
  const btnProps = {
    className: classNames('-area', {
      '-area--focus': popoverOpen
    }),
    onClick: onToggle,
    'aria-label': label,
    title: label,
    id: `AddBlockHoverBarArea_${areaId}_${elementId}`
  };
  return _react.default.createElement("div", {
    className: classNames(''),
    id: `AddBlockHoverBar_${areaId}_${elementId}`
  }, _react.default.createElement("button", btnProps, _react.default.createElement("span", {
    className: classNames('-area-inner')
  }, _react.default.createElement("span", {
    className: lineClasses,
    "aria-hidden": "true"
  }))), _react.default.createElement(AddElementPopoverComponent, {
    placement: "bottom",
    target: `AddBlockHoverBarArea_${areaId}_${elementId}`,
    isOpen: popoverOpen,
    elementTypes: elementTypes,
    toggle: onToggle,
    container: `#AddBlockHoverBar_${areaId}_${elementId}`,
    areaId: areaId,
    insertAfterElement: elementId
  }));
};
const HoverBar = props => {
  const [popoverOpen, setPopoverOpen] = (0, _react.useState)(false);
  const toggle = () => {
    setPopoverOpen(prevPopoverOpen => !prevPopoverOpen);
  };
  const newProps = {
    ...props,
    popoverOpen,
    onToggle: toggle
  };
  return _react.default.createElement(StatelessHoverBar, newProps);
};
exports.Component = HoverBar;
HoverBar.propTypes = {
  elementTypes: _propTypes.default.arrayOf(_elementTypeType.elementTypeType).isRequired,
  elementId: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]).isRequired,
  areaId: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired
};
var _default = exports["default"] = (0, _Injector.inject)(['AddElementPopover'], AddElementPopoverComponent => ({
  AddElementPopoverComponent
}), () => 'ElementEditor.ElementList.HoverBar')(HoverBar);

/***/ }),

/***/ "./client/src/components/ElementEditor/InlineEditForm.js":
/*!***************************************************************!*\
  !*** ./client/src/components/ElementEditor/InlineEditForm.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.Component = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));
var _FormBuilderLoader = _interopRequireDefault(__webpack_require__(/*! containers/FormBuilderLoader/FormBuilderLoader */ "containers/FormBuilderLoader/FormBuilderLoader"));
var _loadElementSchemaValue = __webpack_require__(/*! state/editor/loadElementSchemaValue */ "./client/src/state/editor/loadElementSchemaValue.js");
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _loadElementFormStateName = __webpack_require__(/*! state/editor/loadElementFormStateName */ "./client/src/state/editor/loadElementFormStateName.js");
var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const InlineEditForm = ({
  elementId,
  extraClass,
  onClick,
  onFormInit,
  formHasState,
  notVisible,
  handleLoadingError,
  onFormSchemaSubmitResponse
}) => {
  const [loadingError, setLoadingError] = (0, _react.useState)(null);
  const onFormSchemaSubmitResponseRef = (0, _react.useRef)(onFormSchemaSubmitResponse);
  (0, _react.useEffect)(() => {
    onFormSchemaSubmitResponseRef.current = onFormSchemaSubmitResponse;
  }, [onFormSchemaSubmitResponse]);
  const handleLoadingErrorFn = () => {
    const {
      jQuery: $
    } = window;
    setLoadingError(true);
    $.noticeAdd({
      text: _i18n.default.inject(_i18n.default._t('ElementEditForm.ERROR_NOTIFICATION', 'Error displaying the edit form for this block')),
      stay: true,
      type: 'notice'
    });
    handleLoadingError();
  };
  const handleSubmit = (0, _react.useCallback)((data, action, submitFn) => {
    let title = '';
    Object.keys(data).forEach(key => {
      if (key.match(/PageElements_[0-9]+_Title/)) {
        title = data[key];
      }
    });
    return submitFn().then(formSchema => onFormSchemaSubmitResponseRef.current(formSchema, title));
  }, []);
  const classNames = (0, _classnames.default)('element-editor-editform', extraClass);
  const schemaUrl = (0, _loadElementSchemaValue.loadElementSchemaValue)('schemaUrl', elementId);
  const formTag = 'form';
  const formProps = {
    formTag,
    schemaUrl,
    identifier: 'element',
    refetchSchemaOnMount: !formHasState,
    onLoadingError: handleLoadingErrorFn,
    onSubmit: handleSubmit
  };
  if (loadingError) {
    formProps.loading = false;
  }
  if (typeof onFormInit === 'function') {
    formProps.onReduxFormInit = onFormInit;
  }
  const extraAttrs = {};
  if (notVisible) {
    extraAttrs['aria-hidden'] = 'true';
    extraAttrs.inert = 'inert';
  }
  return _react.default.createElement("div", _extends({
    className: classNames,
    onClick: onClick,
    role: "presentation"
  }, extraAttrs), _react.default.createElement(_FormBuilderLoader.default, formProps));
};
exports.Component = InlineEditForm;
InlineEditForm.propTypes = {
  extraClass: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  onClick: _propTypes.default.func,
  elementId: _propTypes.default.string,
  handleLoadingError: _propTypes.default.func,
  onFormSchemaSubmitResponse: _propTypes.default.func,
  notVisible: _propTypes.default.bool
};
function mapStateToProps(state, ownProps) {
  const formName = (0, _loadElementFormStateName.loadElementFormStateName)(ownProps.elementId);
  return {
    formHasState: state.form.formState && state.form.formState.element && !!state.form.formState.element[formName]
  };
}
var _default = exports["default"] = (0, _reactRedux.connect)(mapStateToProps)(InlineEditForm);

/***/ }),

/***/ "./client/src/components/ElementEditor/Summary.js":
/*!********************************************************!*\
  !*** ./client/src/components/ElementEditor/Summary.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const Summary = ({
  fileUrl,
  fileTitle,
  content,
  broken
}) => {
  const noContent = _i18n.default._t('ElementSummary.NO_PREVIEW', 'No preview available');
  const summaryClassNames = (0, _classnames.default)('element-editor-summary__content', {
    'element-editor-summary__content--broken': broken
  });
  return _react.default.createElement("div", {
    className: "element-editor-summary"
  }, fileUrl && _react.default.createElement("img", {
    className: "element-editor-summary__thumbnail-image",
    src: fileUrl,
    alt: fileTitle
  }), (content || !fileUrl) && _react.default.createElement("p", {
    className: summaryClassNames
  }, content || noContent));
};
Summary.propTypes = {
  content: _propTypes.default.string,
  fileUrl: _propTypes.default.string,
  fileTitle: _propTypes.default.string,
  broken: _propTypes.default.bool
};
var _default = exports["default"] = (0, _react.memo)(Summary);

/***/ }),

/***/ "./client/src/components/ElementEditor/Toolbar.js":
/*!********************************************************!*\
  !*** ./client/src/components/ElementEditor/Toolbar.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
var _elementTypeType = __webpack_require__(/*! types/elementTypeType */ "./client/src/types/elementTypeType.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const Toolbar = ({
  AddNewButtonComponent,
  elementTypes,
  areaId
}) => _react.default.createElement("div", {
  className: "element-editor__toolbar"
}, _react.default.createElement(AddNewButtonComponent, {
  elementTypes: elementTypes,
  areaId: areaId
}));
Toolbar.propTypes = {
  elementTypes: _propTypes.default.arrayOf(_elementTypeType.elementTypeType).isRequired,
  areaId: _propTypes.default.number.isRequired,
  AddNewButtonComponent: _propTypes.default.elementType.isRequired,
  onDragDrop: _propTypes.default.func
};
const MemoizedToolbar = (0, _react.memo)(Toolbar);
var _default = exports["default"] = (0, _Injector.inject)(['ElementAddNewButton'], AddNewButtonComponent => ({
  AddNewButtonComponent
}), () => 'ElementEditor.ElementToolbar')(MemoizedToolbar);

/***/ }),

/***/ "./client/src/components/HistoricElementView/HistoricElementView.js":
/*!**************************************************************************!*\
  !*** ./client/src/components/HistoricElementView/HistoricElementView.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ElementalAreaHistoryFactory = FieldGroup => class HistoricElementView extends FieldGroup {
  getClassName() {
    const classlist = [super.getClassName()];
    if (this.props.data.ElementID) {
      classlist.unshift('elemental-area__element--historic-inner');
    }
    return (0, _classnames.default)(classlist);
  }
  render() {
    const legend = this.getLegend();
    const Tag = this.props.data.tag || 'div';
    const classNames = this.getClassName();
    const {
      data
    } = this.props;
    if (!data.ElementID) {
      return super.render();
    }
    return _react.default.createElement(Tag, {
      className: classNames
    }, legend, _react.default.createElement("div", {
      className: "elemental-preview elemental-preview--historic"
    }, data.ElementEditLink && _react.default.createElement("a", {
      className: "elemental-preview__link",
      href: data.ElementEditLink
    }, _react.default.createElement("span", {
      className: "elemental-preview__link-text"
    }, _i18n.default._t('HistoricElementView.VIEW_BLOCK_HISTORY', 'Block history')), _react.default.createElement("span", {
      className: "font-icon-angle-right btn--icon-lg elemental-preview__link-caret",
      "aria-hidden": "true"
    })), _react.default.createElement("div", {
      className: "elemental-preview__icon"
    }, _react.default.createElement("span", {
      className: data.ElementIcon,
      "aria-hidden": "true"
    })), _react.default.createElement("div", {
      className: "elemental-preview__detail"
    }, _react.default.createElement("h3", null, data.ElementTitle, " ", _react.default.createElement("small", null, data.ElementType)))), this.props.children);
  }
};
var _default = exports["default"] = ElementalAreaHistoryFactory;

/***/ }),

/***/ "./client/src/components/MoveModal/MoveModal.js":
/*!******************************************************!*\
  !*** ./client/src/components/MoveModal/MoveModal.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.Component = void 0;
var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));
var _redux = __webpack_require__(/*! redux */ "redux");
var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _FormBuilderModal = _interopRequireDefault(__webpack_require__(/*! components/FormBuilderModal/FormBuilderModal */ "components/FormBuilderModal/FormBuilderModal"));
var _elementConfig = __webpack_require__(/*! state/editor/elementConfig */ "./client/src/state/editor/elementConfig.js");
var toastsActions = _interopRequireWildcard(__webpack_require__(/*! state/toasts/ToastsActions */ "state/toasts/ToastsActions"));
var _elementType = __webpack_require__(/*! types/elementType */ "./client/src/types/elementType.js");
var _urls = __webpack_require__(/*! lib/urls */ "lib/urls");
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MoveModal = ({
  actions,
  element,
  isOpen,
  onSuccess,
  onClosed,
  type
}) => {
  const onSubmit = async (modalData, action, submitFn) => {
    let formSchema = null;
    try {
      formSchema = await submitFn();
    } catch (error) {
      console.error(error);
      actions.toasts.error(_i18n.default._t('ElementMoveAction.FAILED', 'Failed to move element'));
      return Promise.resolve();
    }
    const hasValidationErrors = formSchema.id.match(/\/schema\/elemental-area\/([0-9]+)/);
    if (hasValidationErrors) {
      actions.toasts.error(_i18n.default._t('Admin.VALIDATIONERROR', 'Validation Error'));
    } else {
      onSuccess({
        elementalAreaId: formSchema.state.fields.find(field => field.name === 'ElementalAreaID')?.value,
        newEditLink: formSchema.state.fields.find(field => field.name === 'NewEditLink')?.value
      });
    }
    return Promise.resolve();
  };
  const elementTitle = element.title ?? _i18n.default.inject(_i18n.default._t('ElementHeader.NOTITLE', 'Untitled {type} block'), {
    type: type.title
  });
  const title = _i18n.default.inject(_i18n.default._t('ElementMoveAction.MODAL_TITLE', 'Move block {title}'), {
    title: elementTitle
  });
  const schemaUrl = (0, _urls.joinUrlPaths)((0, _elementConfig.getConfig)().form.moveElementForm.schemaUrl, element.id.toString());
  return _react.default.createElement(_FormBuilderModal.default, {
    title: title,
    isOpen: isOpen,
    schemaUrl: schemaUrl,
    identifier: "Elemental.MovingElement",
    onSubmit: onSubmit,
    onClosed: onClosed,
    autoFocus: true
  });
};
exports.Component = MoveModal;
MoveModal.propTypes = {
  element: _elementType.elementType,
  isOpen: _propTypes.default.bool.isRequired,
  onSuccess: _propTypes.default.func.isRequired,
  onClosed: _propTypes.default.func.isRequired
};
const mapDispatchToProps = dispatch => ({
  actions: {
    toasts: (0, _redux.bindActionCreators)(toastsActions, dispatch)
  }
});
var _default = exports["default"] = (0, _redux.compose)((0, _reactRedux.connect)(null, mapDispatchToProps))(MoveModal);

/***/ }),

/***/ "./client/src/components/TextCheckboxGroupField/TextCheckboxGroupField.js":
/*!********************************************************************************!*\
  !*** ./client/src/components/TextCheckboxGroupField/TextCheckboxGroupField.js ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));
var _reactstrap = __webpack_require__(/*! reactstrap */ "reactstrap");
var _FieldHolder = _interopRequireDefault(__webpack_require__(/*! components/FieldHolder/FieldHolder */ "components/FieldHolder/FieldHolder"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const TextCheckboxGroupField = props => {
  const {
    children
  } = props;
  const childrenWithProps = _react.default.Children.toArray(_react.default.Children.map(children, (child, index) => {
    const additionalProps = {};
    if (index === 0) {
      additionalProps.id = props.id;
      additionalProps.title = null;
    } else if (index === 1) {
      additionalProps.noHolder = true;
    }
    return _react.default.cloneElement(child, additionalProps);
  }));
  if (props.readOnly) {
    return _react.default.createElement("div", {
      className: "text-checkbox-group-field--read-only"
    }, childrenWithProps);
  }
  if (childrenWithProps.length === 1) {
    return childrenWithProps[0];
  }
  return _react.default.createElement(_reactstrap.InputGroup, {
    className: "text-checkbox-group-field"
  }, childrenWithProps[0], _react.default.createElement(_reactstrap.InputGroupText, null, childrenWithProps[1]));
};
var _default = exports["default"] = (0, _FieldHolder.default)(TextCheckboxGroupField);

/***/ }),

/***/ "./client/src/legacy/ElementEditor/entwine.js":
/*!****************************************************!*\
  !*** ./client/src/legacy/ElementEditor/entwine.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {



var _jquery = _interopRequireDefault(__webpack_require__(/*! jquery */ "jquery"));
var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));
var _client = __webpack_require__(/*! react-dom/client */ "react-dom/client");
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
var _elementConfig = __webpack_require__(/*! state/editor/elementConfig */ "./client/src/state/editor/elementConfig.js");
var _reduxForm = __webpack_require__(/*! redux-form */ "redux-form");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const resetStores = () => {
  setTimeout(() => {
    const {
      store
    } = window.ss;
    if (!store) {
      return;
    }
    store.dispatch((0, _reduxForm.destroy)(...Object.keys(store.getState().form.formState.element || {}).map(name => `element.${name}`)));
  }, 0);
};
_jquery.default.entwine('ss', $ => {
  $('.js-injector-boot .element-editor__container').entwine({
    ReactRoot: null,
    AreaIDsSharedObject: {},
    Increment: 0,
    onmatch() {
      const context = {};
      const ElementEditorComponent = (0, _Injector.loadComponent)('ElementEditor', context);
      const schemaData = this.data('schema');
      const elementTypes = (0, _elementConfig.getConfig)().elementTypes;
      const areaID = schemaData['elemental-area-id'];
      const areaIDsSharedObject = this.getAreaIDsSharedObject();
      if (!areaIDsSharedObject.hasOwnProperty(areaID)) {
        areaIDsSharedObject[areaID] = {
          entwineResolve: null,
          setIncrement: null,
          setSaveAllElements: null
        };
      }
      const props = {
        areaId: areaID,
        allowedElements: schemaData['allowed-elements'],
        elementTypes,
        sharedObject: areaIDsSharedObject[areaID]
      };
      let root = this.getReactRoot();
      if (!root) {
        root = (0, _client.createRoot)(this[0]);
        this.setReactRoot(root);
      }
      root.render(_react.default.createElement(ElementEditorComponent, props));
    },
    onunmatch() {
      if (!$('.cms-edit-form').data('hasValidationErrors')) {
        resetStores();
      }
      this.unmountComponent();
    },
    unmountComponent() {
      const root = this.getReactRoot();
      if (root) {
        root.unmount();
        this.setReactRoot(null);
      }
    },
    'from .cms-edit-form': {
      onbeforesubmitform(event, data) {
        if (!data || this.is('.elemental-area--read-only')) {
          return;
        }
        let entwineResolve;
        const entwinePromise = new Promise(resolve => {
          entwineResolve = resolve;
        });
        data.promises.push(entwinePromise);
        data.onAjaxSuccessCallbacks.push(this.unmountComponent.bind(this));
        const areaID = this.data('schema')['elemental-area-id'];
        const areaIDsSharedObject = this.getAreaIDsSharedObject();
        const sharedObject = areaIDsSharedObject[areaID];
        const increment = this.getIncrement() + 1;
        this.setIncrement(increment);
        sharedObject.entwineResolve = entwineResolve;
        sharedObject.setIncrement(increment);
        sharedObject.setSaveAllElements(true);
      },
      onaftersubmitform(event, data) {
        const validationResultPjax = JSON.parse(data.xhr.responseText).ValidationResult;
        const validationResult = JSON.parse(validationResultPjax.replace(/<\/?script[^>]*?>/g, ''));
        if (validationResult.isValid) {
          $('.cms-edit-form').data('hasValidationErrors', false);
          resetStores();
        } else {
          $('.cms-edit-form').data('hasValidationErrors', true);
        }
      }
    }
  });
  $('.js-injector-boot .element-editor__container .element-form-dirty-state').entwine({
    onmatch() {
      $('.cms-edit-form').trigger('change');
    },
    onunmatch() {
      $('.cms-edit-form').trigger('change');
    }
  });
  $('.cms-edit-form').entwine({
    getChangeTrackerOptions() {
      const isDefault = this.entwineData('ChangeTrackerOptions') === undefined;
      let opts = this._super();
      if (isDefault) {
        opts = $.extend({}, opts);
        opts.ignoreFieldSelector += ', .elementalarea :input:not(.element-form-dirty-state)';
        this.setChangeTrackerOptions(opts);
      }
      return opts;
    }
  });
});

/***/ }),

/***/ "./client/src/lib/prefixClassNames.js":
/*!********************************************!*\
  !*** ./client/src/lib/prefixClassNames.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const prefixClassNames = cssPrefix => (...args) => {
  const prefix = str => `${cssPrefix}${str}`;
  const prefixArgs = args.map(arg => {
    if (!arg && arg !== '') {
      return false;
    }
    if (typeof arg === 'object') {
      return Array.isArray(arg) ? arg.map(prefix) : Object.entries(arg).reduce((accumulator, [key, value]) => Object.assign({}, accumulator, {
        [prefix(key)]: value
      }), {});
    }
    return prefix(arg);
  });
  return (0, _classnames.default)(...prefixArgs);
};
var _default = exports["default"] = prefixClassNames;

/***/ }),

/***/ "./client/src/state/editor/editorActionTypes.js":
/*!******************************************************!*\
  !*** ./client/src/state/editor/editorActionTypes.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = exports["default"] = {
  FORCE_RELOAD: 'FORCE_RELOAD',
  RELOAD_COMPLETE: 'RELOAD_COMPLETE'
};

/***/ }),

/***/ "./client/src/state/editor/editorActions.js":
/*!**************************************************!*\
  !*** ./client/src/state/editor/editorActions.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.forceReload = forceReload;
exports.reloadComplete = reloadComplete;
var _editorActionTypes = _interopRequireDefault(__webpack_require__(/*! ./editorActionTypes */ "./client/src/state/editor/editorActionTypes.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function forceReload(elementEditorId) {
  return {
    type: _editorActionTypes.default.FORCE_RELOAD,
    payload: {
      elementEditorId
    }
  };
}
function reloadComplete(elementEditorId) {
  return {
    type: _editorActionTypes.default.RELOAD_COMPLETE,
    payload: {
      elementEditorId
    }
  };
}

/***/ }),

/***/ "./client/src/state/editor/editorReducer.js":
/*!**************************************************!*\
  !*** ./client/src/state/editor/editorReducer.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _deepFreezeStrict = _interopRequireDefault(__webpack_require__(/*! deep-freeze-strict */ "deep-freeze-strict"));
var _editorActionTypes = _interopRequireDefault(__webpack_require__(/*! ./editorActionTypes */ "./client/src/state/editor/editorActionTypes.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const initialState = {
  forceRefetchElements: {}
};
function reducer(state = initialState, {
  type,
  payload
}) {
  switch (type) {
    case _editorActionTypes.default.FORCE_RELOAD:
      {
        return (0, _deepFreezeStrict.default)({
          ...state,
          forceRefetchElements: {
            ...state.forceRefetchElements,
            [payload.elementEditorId]: true
          }
        });
      }
    case _editorActionTypes.default.RELOAD_COMPLETE:
      {
        return (0, _deepFreezeStrict.default)({
          ...state,
          forceRefetchElements: {
            ...state.forceRefetchElements,
            [payload.elementEditorId]: false
          }
        });
      }
    default:
      {
        return state;
      }
  }
}
var _default = exports["default"] = reducer;

/***/ }),

/***/ "./client/src/state/editor/elementConfig.js":
/*!**************************************************!*\
  !*** ./client/src/state/editor/elementConfig.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getElementTypeConfig = exports.getConfig = void 0;
var _Config = _interopRequireDefault(__webpack_require__(/*! lib/Config */ "lib/Config"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const getConfig = () => _Config.default.getSection('DNADesign\\Elemental\\Controllers\\ElementalAreaController');
exports.getConfig = getConfig;
const getElementTypeConfig = (element, typeConfig = null) => {
  const elementType = element.blockSchema.typeName;
  const types = Array.isArray(typeConfig) ? typeConfig : getConfig().elementTypes;
  let type = types.find(value => value.class === elementType || value.name === elementType);
  if (element.obsoleteClassName) {
    type = Object.assign({
      obsoleteClassName: element.obsoleteClassName
    }, type);
    Object.preventExtensions(type);
  }
  return type;
};
exports.getElementTypeConfig = getElementTypeConfig;

/***/ }),

/***/ "./client/src/state/editor/loadElementFormStateName.js":
/*!*************************************************************!*\
  !*** ./client/src/state/editor/loadElementFormStateName.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.loadElementFormStateName = void 0;
var _Config = _interopRequireDefault(__webpack_require__(/*! lib/Config */ "lib/Config"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const loadElementFormStateName = (elementId = null) => {
  const sectionKey = 'DNADesign\\Elemental\\Controllers\\ElementalAreaController';
  const section = _Config.default.getSection(sectionKey);
  const formNameTemplate = section.form.elementForm.formNameTemplate;
  if (elementId) {
    return formNameTemplate.replace('{id}', elementId);
  }
  return formNameTemplate;
};
exports.loadElementFormStateName = loadElementFormStateName;

/***/ }),

/***/ "./client/src/state/editor/loadElementSchemaValue.js":
/*!***********************************************************!*\
  !*** ./client/src/state/editor/loadElementSchemaValue.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.loadElementSchemaValue = void 0;
var _Config = _interopRequireDefault(__webpack_require__(/*! lib/Config */ "lib/Config"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const loadElementSchemaValue = (key, elementId = null) => {
  const sectionKey = 'DNADesign\\Elemental\\Controllers\\ElementalAreaController';
  const section = _Config.default.getSection(sectionKey);
  const schemaValue = section.form.elementForm[key] || '';
  if (elementId) {
    return `${schemaValue}/${elementId}`;
  }
  return schemaValue;
};
exports.loadElementSchemaValue = loadElementSchemaValue;

/***/ }),

/***/ "./client/src/state/history/revertToBlockVersionRequest.js":
/*!*****************************************************************!*\
  !*** ./client/src/state/history/revertToBlockVersionRequest.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));
var _Backend = _interopRequireDefault(__webpack_require__(/*! lib/Backend */ "lib/Backend"));
var _elementConfig = __webpack_require__(/*! state/editor/elementConfig */ "./client/src/state/editor/elementConfig.js");
var _Config = _interopRequireDefault(__webpack_require__(/*! lib/Config */ "lib/Config"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const revertToBlockVersionRequest = HistoryViewerVersionDetailComponent => props => {
  const newProps = {
    ...props
  };
  if (!newProps.hasOwnProperty('actions')) {
    newProps.actions = {};
  }
  newProps.actions.revertToVersion = (id, fromVersion, fromStage, toStage) => {
    const url = `${(0, _elementConfig.getConfig)().controllerLink.replace(/\/$/, '')}/api/revert`;
    return _Backend.default.post(url, {
      id,
      fromVersion,
      fromStage,
      toStage
    }, {
      'X-SecurityID': _Config.default.get('SecurityID')
    });
  };
  return _react.default.createElement(HistoryViewerVersionDetailComponent, newProps);
};
var _default = exports["default"] = revertToBlockVersionRequest;

/***/ }),

/***/ "./client/src/types/elementType.js":
/*!*****************************************!*\
  !*** ./client/src/types/elementType.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.elementType = void 0;
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const elementType = exports.elementType = _propTypes.default.shape({
  id: _propTypes.default.number,
  title: _propTypes.default.string,
  blockSchema: _propTypes.default.object,
  inlineEditable: _propTypes.default.bool,
  published: _propTypes.default.bool,
  liveVersion: _propTypes.default.bool,
  version: _propTypes.default.number
});

/***/ }),

/***/ "./client/src/types/elementTypeType.js":
/*!*********************************************!*\
  !*** ./client/src/types/elementTypeType.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.elementTypeType = void 0;
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const elementTypeType = exports.elementTypeType = _propTypes.default.shape({
  name: _propTypes.default.string,
  title: _propTypes.default.string,
  icon: _propTypes.default.string,
  inlineEditable: _propTypes.default.bool,
  editTabs: _propTypes.default.arrayOf(_propTypes.default.shape({
    title: _propTypes.default.string,
    name: _propTypes.default.string
  })),
  config: _propTypes.default.object
});

/***/ }),

/***/ "./node_modules/@dnd-kit/accessibility/dist/accessibility.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@dnd-kit/accessibility/dist/accessibility.esm.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HiddenText: function() { return /* binding */ HiddenText; },
/* harmony export */   LiveRegion: function() { return /* binding */ LiveRegion; },
/* harmony export */   useAnnouncement: function() { return /* binding */ useAnnouncement; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const hiddenStyles = {
  display: 'none'
};
function HiddenText(_ref) {
  let {
    id,
    value
  } = _ref;
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    id: id,
    style: hiddenStyles
  }, value);
}

function LiveRegion(_ref) {
  let {
    id,
    announcement,
    ariaLiveType = "assertive"
  } = _ref;
  // Hide element visually but keep it readable by screen readers
  const visuallyHidden = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: 1,
    height: 1,
    margin: -1,
    border: 0,
    padding: 0,
    overflow: 'hidden',
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(100%)',
    whiteSpace: 'nowrap'
  };
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    id: id,
    style: visuallyHidden,
    role: "status",
    "aria-live": ariaLiveType,
    "aria-atomic": true
  }, announcement);
}

function useAnnouncement() {
  const [announcement, setAnnouncement] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const announce = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(value => {
    if (value != null) {
      setAnnouncement(value);
    }
  }, []);
  return {
    announce,
    announcement
  };
}


//# sourceMappingURL=accessibility.esm.js.map


/***/ }),

/***/ "./node_modules/@dnd-kit/core/dist/core.esm.js":
/*!*****************************************************!*\
  !*** ./node_modules/@dnd-kit/core/dist/core.esm.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutoScrollActivator: function() { return /* binding */ AutoScrollActivator; },
/* harmony export */   DndContext: function() { return /* binding */ DndContext; },
/* harmony export */   DragOverlay: function() { return /* binding */ DragOverlay; },
/* harmony export */   KeyboardCode: function() { return /* binding */ KeyboardCode; },
/* harmony export */   KeyboardSensor: function() { return /* binding */ KeyboardSensor; },
/* harmony export */   MeasuringFrequency: function() { return /* binding */ MeasuringFrequency; },
/* harmony export */   MeasuringStrategy: function() { return /* binding */ MeasuringStrategy; },
/* harmony export */   MouseSensor: function() { return /* binding */ MouseSensor; },
/* harmony export */   PointerSensor: function() { return /* binding */ PointerSensor; },
/* harmony export */   TouchSensor: function() { return /* binding */ TouchSensor; },
/* harmony export */   TraversalOrder: function() { return /* binding */ TraversalOrder; },
/* harmony export */   applyModifiers: function() { return /* binding */ applyModifiers; },
/* harmony export */   closestCenter: function() { return /* binding */ closestCenter; },
/* harmony export */   closestCorners: function() { return /* binding */ closestCorners; },
/* harmony export */   defaultAnnouncements: function() { return /* binding */ defaultAnnouncements; },
/* harmony export */   defaultCoordinates: function() { return /* binding */ defaultCoordinates; },
/* harmony export */   defaultDropAnimation: function() { return /* binding */ defaultDropAnimationConfiguration; },
/* harmony export */   defaultDropAnimationSideEffects: function() { return /* binding */ defaultDropAnimationSideEffects; },
/* harmony export */   defaultKeyboardCoordinateGetter: function() { return /* binding */ defaultKeyboardCoordinateGetter; },
/* harmony export */   defaultScreenReaderInstructions: function() { return /* binding */ defaultScreenReaderInstructions; },
/* harmony export */   getClientRect: function() { return /* binding */ getClientRect; },
/* harmony export */   getFirstCollision: function() { return /* binding */ getFirstCollision; },
/* harmony export */   getScrollableAncestors: function() { return /* binding */ getScrollableAncestors; },
/* harmony export */   pointerWithin: function() { return /* binding */ pointerWithin; },
/* harmony export */   rectIntersection: function() { return /* binding */ rectIntersection; },
/* harmony export */   useDndContext: function() { return /* binding */ useDndContext; },
/* harmony export */   useDndMonitor: function() { return /* binding */ useDndMonitor; },
/* harmony export */   useDraggable: function() { return /* binding */ useDraggable; },
/* harmony export */   useDroppable: function() { return /* binding */ useDroppable; },
/* harmony export */   useSensor: function() { return /* binding */ useSensor; },
/* harmony export */   useSensors: function() { return /* binding */ useSensors; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dnd-kit/utilities */ "./node_modules/@dnd-kit/utilities/dist/utilities.esm.js");
/* harmony import */ var _dnd_kit_accessibility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @dnd-kit/accessibility */ "./node_modules/@dnd-kit/accessibility/dist/accessibility.esm.js");





const DndMonitorContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);

function useDndMonitor(listener) {
  const registerListener = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(DndMonitorContext);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!registerListener) {
      throw new Error('useDndMonitor must be used within a children of <DndContext>');
    }

    const unsubscribe = registerListener(listener);
    return unsubscribe;
  }, [listener, registerListener]);
}

function useDndMonitorProvider() {
  const [listeners] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => new Set());
  const registerListener = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(listener => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, [listeners]);
  const dispatch = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(_ref => {
    let {
      type,
      event
    } = _ref;
    listeners.forEach(listener => {
      var _listener$type;

      return (_listener$type = listener[type]) == null ? void 0 : _listener$type.call(listener, event);
    });
  }, [listeners]);
  return [dispatch, registerListener];
}

const defaultScreenReaderInstructions = {
  draggable: "\n    To pick up a draggable item, press the space bar.\n    While dragging, use the arrow keys to move the item.\n    Press space again to drop the item in its new position, or press escape to cancel.\n  "
};
const defaultAnnouncements = {
  onDragStart(_ref) {
    let {
      active
    } = _ref;
    return "Picked up draggable item " + active.id + ".";
  },

  onDragOver(_ref2) {
    let {
      active,
      over
    } = _ref2;

    if (over) {
      return "Draggable item " + active.id + " was moved over droppable area " + over.id + ".";
    }

    return "Draggable item " + active.id + " is no longer over a droppable area.";
  },

  onDragEnd(_ref3) {
    let {
      active,
      over
    } = _ref3;

    if (over) {
      return "Draggable item " + active.id + " was dropped over droppable area " + over.id;
    }

    return "Draggable item " + active.id + " was dropped.";
  },

  onDragCancel(_ref4) {
    let {
      active
    } = _ref4;
    return "Dragging was cancelled. Draggable item " + active.id + " was dropped.";
  }

};

function Accessibility(_ref) {
  let {
    announcements = defaultAnnouncements,
    container,
    hiddenTextDescribedById,
    screenReaderInstructions = defaultScreenReaderInstructions
  } = _ref;
  const {
    announce,
    announcement
  } = (0,_dnd_kit_accessibility__WEBPACK_IMPORTED_MODULE_3__.useAnnouncement)();
  const liveRegionId = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useUniqueId)("DndLiveRegion");
  const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setMounted(true);
  }, []);
  useDndMonitor((0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    onDragStart(_ref2) {
      let {
        active
      } = _ref2;
      announce(announcements.onDragStart({
        active
      }));
    },

    onDragMove(_ref3) {
      let {
        active,
        over
      } = _ref3;

      if (announcements.onDragMove) {
        announce(announcements.onDragMove({
          active,
          over
        }));
      }
    },

    onDragOver(_ref4) {
      let {
        active,
        over
      } = _ref4;
      announce(announcements.onDragOver({
        active,
        over
      }));
    },

    onDragEnd(_ref5) {
      let {
        active,
        over
      } = _ref5;
      announce(announcements.onDragEnd({
        active,
        over
      }));
    },

    onDragCancel(_ref6) {
      let {
        active,
        over
      } = _ref6;
      announce(announcements.onDragCancel({
        active,
        over
      }));
    }

  }), [announce, announcements]));

  if (!mounted) {
    return null;
  }

  const markup = react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_dnd_kit_accessibility__WEBPACK_IMPORTED_MODULE_3__.HiddenText, {
    id: hiddenTextDescribedById,
    value: screenReaderInstructions.draggable
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_dnd_kit_accessibility__WEBPACK_IMPORTED_MODULE_3__.LiveRegion, {
    id: liveRegionId,
    announcement: announcement
  }));
  return container ? (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal)(markup, container) : markup;
}

var Action;

(function (Action) {
  Action["DragStart"] = "dragStart";
  Action["DragMove"] = "dragMove";
  Action["DragEnd"] = "dragEnd";
  Action["DragCancel"] = "dragCancel";
  Action["DragOver"] = "dragOver";
  Action["RegisterDroppable"] = "registerDroppable";
  Action["SetDroppableDisabled"] = "setDroppableDisabled";
  Action["UnregisterDroppable"] = "unregisterDroppable";
})(Action || (Action = {}));

function noop() {}

function useSensor(sensor, options) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    sensor,
    options: options != null ? options : {}
  }), // eslint-disable-next-line react-hooks/exhaustive-deps
  [sensor, options]);
}

function useSensors() {
  for (var _len = arguments.length, sensors = new Array(_len), _key = 0; _key < _len; _key++) {
    sensors[_key] = arguments[_key];
  }

  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => [...sensors].filter(sensor => sensor != null), // eslint-disable-next-line react-hooks/exhaustive-deps
  [...sensors]);
}

const defaultCoordinates = /*#__PURE__*/Object.freeze({
  x: 0,
  y: 0
});

/**
 * Returns the distance between two points
 */
function distanceBetween(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function getRelativeTransformOrigin(event, rect) {
  const eventCoordinates = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getEventCoordinates)(event);

  if (!eventCoordinates) {
    return '0 0';
  }

  const transformOrigin = {
    x: (eventCoordinates.x - rect.left) / rect.width * 100,
    y: (eventCoordinates.y - rect.top) / rect.height * 100
  };
  return transformOrigin.x + "% " + transformOrigin.y + "%";
}

/**
 * Sort collisions from smallest to greatest value
 */
function sortCollisionsAsc(_ref, _ref2) {
  let {
    data: {
      value: a
    }
  } = _ref;
  let {
    data: {
      value: b
    }
  } = _ref2;
  return a - b;
}
/**
 * Sort collisions from greatest to smallest value
 */

function sortCollisionsDesc(_ref3, _ref4) {
  let {
    data: {
      value: a
    }
  } = _ref3;
  let {
    data: {
      value: b
    }
  } = _ref4;
  return b - a;
}
/**
 * Returns the coordinates of the corners of a given rectangle:
 * [TopLeft {x, y}, TopRight {x, y}, BottomLeft {x, y}, BottomRight {x, y}]
 */

function cornersOfRectangle(_ref5) {
  let {
    left,
    top,
    height,
    width
  } = _ref5;
  return [{
    x: left,
    y: top
  }, {
    x: left + width,
    y: top
  }, {
    x: left,
    y: top + height
  }, {
    x: left + width,
    y: top + height
  }];
}
function getFirstCollision(collisions, property) {
  if (!collisions || collisions.length === 0) {
    return null;
  }

  const [firstCollision] = collisions;
  return property ? firstCollision[property] : firstCollision;
}

/**
 * Returns the coordinates of the center of a given ClientRect
 */

function centerOfRectangle(rect, left, top) {
  if (left === void 0) {
    left = rect.left;
  }

  if (top === void 0) {
    top = rect.top;
  }

  return {
    x: left + rect.width * 0.5,
    y: top + rect.height * 0.5
  };
}
/**
 * Returns the closest rectangles from an array of rectangles to the center of a given
 * rectangle.
 */


const closestCenter = _ref => {
  let {
    collisionRect,
    droppableRects,
    droppableContainers
  } = _ref;
  const centerRect = centerOfRectangle(collisionRect, collisionRect.left, collisionRect.top);
  const collisions = [];

  for (const droppableContainer of droppableContainers) {
    const {
      id
    } = droppableContainer;
    const rect = droppableRects.get(id);

    if (rect) {
      const distBetween = distanceBetween(centerOfRectangle(rect), centerRect);
      collisions.push({
        id,
        data: {
          droppableContainer,
          value: distBetween
        }
      });
    }
  }

  return collisions.sort(sortCollisionsAsc);
};

/**
 * Returns the closest rectangles from an array of rectangles to the corners of
 * another rectangle.
 */

const closestCorners = _ref => {
  let {
    collisionRect,
    droppableRects,
    droppableContainers
  } = _ref;
  const corners = cornersOfRectangle(collisionRect);
  const collisions = [];

  for (const droppableContainer of droppableContainers) {
    const {
      id
    } = droppableContainer;
    const rect = droppableRects.get(id);

    if (rect) {
      const rectCorners = cornersOfRectangle(rect);
      const distances = corners.reduce((accumulator, corner, index) => {
        return accumulator + distanceBetween(rectCorners[index], corner);
      }, 0);
      const effectiveDistance = Number((distances / 4).toFixed(4));
      collisions.push({
        id,
        data: {
          droppableContainer,
          value: effectiveDistance
        }
      });
    }
  }

  return collisions.sort(sortCollisionsAsc);
};

/**
 * Returns the intersecting rectangle area between two rectangles
 */

function getIntersectionRatio(entry, target) {
  const top = Math.max(target.top, entry.top);
  const left = Math.max(target.left, entry.left);
  const right = Math.min(target.left + target.width, entry.left + entry.width);
  const bottom = Math.min(target.top + target.height, entry.top + entry.height);
  const width = right - left;
  const height = bottom - top;

  if (left < right && top < bottom) {
    const targetArea = target.width * target.height;
    const entryArea = entry.width * entry.height;
    const intersectionArea = width * height;
    const intersectionRatio = intersectionArea / (targetArea + entryArea - intersectionArea);
    return Number(intersectionRatio.toFixed(4));
  } // Rectangles do not overlap, or overlap has an area of zero (edge/corner overlap)


  return 0;
}
/**
 * Returns the rectangles that has the greatest intersection area with a given
 * rectangle in an array of rectangles.
 */

const rectIntersection = _ref => {
  let {
    collisionRect,
    droppableRects,
    droppableContainers
  } = _ref;
  const collisions = [];

  for (const droppableContainer of droppableContainers) {
    const {
      id
    } = droppableContainer;
    const rect = droppableRects.get(id);

    if (rect) {
      const intersectionRatio = getIntersectionRatio(rect, collisionRect);

      if (intersectionRatio > 0) {
        collisions.push({
          id,
          data: {
            droppableContainer,
            value: intersectionRatio
          }
        });
      }
    }
  }

  return collisions.sort(sortCollisionsDesc);
};

/**
 * Check if a given point is contained within a bounding rectangle
 */

function isPointWithinRect(point, rect) {
  const {
    top,
    left,
    bottom,
    right
  } = rect;
  return top <= point.y && point.y <= bottom && left <= point.x && point.x <= right;
}
/**
 * Returns the rectangles that the pointer is hovering over
 */


const pointerWithin = _ref => {
  let {
    droppableContainers,
    droppableRects,
    pointerCoordinates
  } = _ref;

  if (!pointerCoordinates) {
    return [];
  }

  const collisions = [];

  for (const droppableContainer of droppableContainers) {
    const {
      id
    } = droppableContainer;
    const rect = droppableRects.get(id);

    if (rect && isPointWithinRect(pointerCoordinates, rect)) {
      /* There may be more than a single rectangle intersecting
       * with the pointer coordinates. In order to sort the
       * colliding rectangles, we measure the distance between
       * the pointer and the corners of the intersecting rectangle
       */
      const corners = cornersOfRectangle(rect);
      const distances = corners.reduce((accumulator, corner) => {
        return accumulator + distanceBetween(pointerCoordinates, corner);
      }, 0);
      const effectiveDistance = Number((distances / 4).toFixed(4));
      collisions.push({
        id,
        data: {
          droppableContainer,
          value: effectiveDistance
        }
      });
    }
  }

  return collisions.sort(sortCollisionsAsc);
};

function adjustScale(transform, rect1, rect2) {
  return { ...transform,
    scaleX: rect1 && rect2 ? rect1.width / rect2.width : 1,
    scaleY: rect1 && rect2 ? rect1.height / rect2.height : 1
  };
}

function getRectDelta(rect1, rect2) {
  return rect1 && rect2 ? {
    x: rect1.left - rect2.left,
    y: rect1.top - rect2.top
  } : defaultCoordinates;
}

function createRectAdjustmentFn(modifier) {
  return function adjustClientRect(rect) {
    for (var _len = arguments.length, adjustments = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      adjustments[_key - 1] = arguments[_key];
    }

    return adjustments.reduce((acc, adjustment) => ({ ...acc,
      top: acc.top + modifier * adjustment.y,
      bottom: acc.bottom + modifier * adjustment.y,
      left: acc.left + modifier * adjustment.x,
      right: acc.right + modifier * adjustment.x
    }), { ...rect
    });
  };
}
const getAdjustedRect = /*#__PURE__*/createRectAdjustmentFn(1);

function parseTransform(transform) {
  if (transform.startsWith('matrix3d(')) {
    const transformArray = transform.slice(9, -1).split(/, /);
    return {
      x: +transformArray[12],
      y: +transformArray[13],
      scaleX: +transformArray[0],
      scaleY: +transformArray[5]
    };
  } else if (transform.startsWith('matrix(')) {
    const transformArray = transform.slice(7, -1).split(/, /);
    return {
      x: +transformArray[4],
      y: +transformArray[5],
      scaleX: +transformArray[0],
      scaleY: +transformArray[3]
    };
  }

  return null;
}

function inverseTransform(rect, transform, transformOrigin) {
  const parsedTransform = parseTransform(transform);

  if (!parsedTransform) {
    return rect;
  }

  const {
    scaleX,
    scaleY,
    x: translateX,
    y: translateY
  } = parsedTransform;
  const x = rect.left - translateX - (1 - scaleX) * parseFloat(transformOrigin);
  const y = rect.top - translateY - (1 - scaleY) * parseFloat(transformOrigin.slice(transformOrigin.indexOf(' ') + 1));
  const w = scaleX ? rect.width / scaleX : rect.width;
  const h = scaleY ? rect.height / scaleY : rect.height;
  return {
    width: w,
    height: h,
    top: y,
    right: x + w,
    bottom: y + h,
    left: x
  };
}

const defaultOptions = {
  ignoreTransform: false
};
/**
 * Returns the bounding client rect of an element relative to the viewport.
 */

function getClientRect(element, options) {
  if (options === void 0) {
    options = defaultOptions;
  }

  let rect = element.getBoundingClientRect();

  if (options.ignoreTransform) {
    const {
      transform,
      transformOrigin
    } = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getWindow)(element).getComputedStyle(element);

    if (transform) {
      rect = inverseTransform(rect, transform, transformOrigin);
    }
  }

  const {
    top,
    left,
    width,
    height,
    bottom,
    right
  } = rect;
  return {
    top,
    left,
    width,
    height,
    bottom,
    right
  };
}
/**
 * Returns the bounding client rect of an element relative to the viewport.
 *
 * @remarks
 * The ClientRect returned by this method does not take into account transforms
 * applied to the element it measures.
 *
 */

function getTransformAgnosticClientRect(element) {
  return getClientRect(element, {
    ignoreTransform: true
  });
}

function getWindowClientRect(element) {
  const width = element.innerWidth;
  const height = element.innerHeight;
  return {
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width,
    height
  };
}

function isFixed(node, computedStyle) {
  if (computedStyle === void 0) {
    computedStyle = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getWindow)(node).getComputedStyle(node);
  }

  return computedStyle.position === 'fixed';
}

function isScrollable(element, computedStyle) {
  if (computedStyle === void 0) {
    computedStyle = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getWindow)(element).getComputedStyle(element);
  }

  const overflowRegex = /(auto|scroll|overlay)/;
  const properties = ['overflow', 'overflowX', 'overflowY'];
  return properties.some(property => {
    const value = computedStyle[property];
    return typeof value === 'string' ? overflowRegex.test(value) : false;
  });
}

function getScrollableAncestors(element, limit) {
  const scrollParents = [];

  function findScrollableAncestors(node) {
    if (limit != null && scrollParents.length >= limit) {
      return scrollParents;
    }

    if (!node) {
      return scrollParents;
    }

    if ((0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isDocument)(node) && node.scrollingElement != null && !scrollParents.includes(node.scrollingElement)) {
      scrollParents.push(node.scrollingElement);
      return scrollParents;
    }

    if (!(0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(node) || (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isSVGElement)(node)) {
      return scrollParents;
    }

    if (scrollParents.includes(node)) {
      return scrollParents;
    }

    const computedStyle = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getWindow)(element).getComputedStyle(node);

    if (node !== element) {
      if (isScrollable(node, computedStyle)) {
        scrollParents.push(node);
      }
    }

    if (isFixed(node, computedStyle)) {
      return scrollParents;
    }

    return findScrollableAncestors(node.parentNode);
  }

  if (!element) {
    return scrollParents;
  }

  return findScrollableAncestors(element);
}
function getFirstScrollableAncestor(node) {
  const [firstScrollableAncestor] = getScrollableAncestors(node, 1);
  return firstScrollableAncestor != null ? firstScrollableAncestor : null;
}

function getScrollableElement(element) {
  if (!_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.canUseDOM || !element) {
    return null;
  }

  if ((0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isWindow)(element)) {
    return element;
  }

  if (!(0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isNode)(element)) {
    return null;
  }

  if ((0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isDocument)(element) || element === (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getOwnerDocument)(element).scrollingElement) {
    return window;
  }

  if ((0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(element)) {
    return element;
  }

  return null;
}

function getScrollXCoordinate(element) {
  if ((0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isWindow)(element)) {
    return element.scrollX;
  }

  return element.scrollLeft;
}
function getScrollYCoordinate(element) {
  if ((0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isWindow)(element)) {
    return element.scrollY;
  }

  return element.scrollTop;
}
function getScrollCoordinates(element) {
  return {
    x: getScrollXCoordinate(element),
    y: getScrollYCoordinate(element)
  };
}

var Direction;

(function (Direction) {
  Direction[Direction["Forward"] = 1] = "Forward";
  Direction[Direction["Backward"] = -1] = "Backward";
})(Direction || (Direction = {}));

function isDocumentScrollingElement(element) {
  if (!_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.canUseDOM || !element) {
    return false;
  }

  return element === document.scrollingElement;
}

function getScrollPosition(scrollingContainer) {
  const minScroll = {
    x: 0,
    y: 0
  };
  const dimensions = isDocumentScrollingElement(scrollingContainer) ? {
    height: window.innerHeight,
    width: window.innerWidth
  } : {
    height: scrollingContainer.clientHeight,
    width: scrollingContainer.clientWidth
  };
  const maxScroll = {
    x: scrollingContainer.scrollWidth - dimensions.width,
    y: scrollingContainer.scrollHeight - dimensions.height
  };
  const isTop = scrollingContainer.scrollTop <= minScroll.y;
  const isLeft = scrollingContainer.scrollLeft <= minScroll.x;
  const isBottom = scrollingContainer.scrollTop >= maxScroll.y;
  const isRight = scrollingContainer.scrollLeft >= maxScroll.x;
  return {
    isTop,
    isLeft,
    isBottom,
    isRight,
    maxScroll,
    minScroll
  };
}

const defaultThreshold = {
  x: 0.2,
  y: 0.2
};
function getScrollDirectionAndSpeed(scrollContainer, scrollContainerRect, _ref, acceleration, thresholdPercentage) {
  let {
    top,
    left,
    right,
    bottom
  } = _ref;

  if (acceleration === void 0) {
    acceleration = 10;
  }

  if (thresholdPercentage === void 0) {
    thresholdPercentage = defaultThreshold;
  }

  const {
    isTop,
    isBottom,
    isLeft,
    isRight
  } = getScrollPosition(scrollContainer);
  const direction = {
    x: 0,
    y: 0
  };
  const speed = {
    x: 0,
    y: 0
  };
  const threshold = {
    height: scrollContainerRect.height * thresholdPercentage.y,
    width: scrollContainerRect.width * thresholdPercentage.x
  };

  if (!isTop && top <= scrollContainerRect.top + threshold.height) {
    // Scroll Up
    direction.y = Direction.Backward;
    speed.y = acceleration * Math.abs((scrollContainerRect.top + threshold.height - top) / threshold.height);
  } else if (!isBottom && bottom >= scrollContainerRect.bottom - threshold.height) {
    // Scroll Down
    direction.y = Direction.Forward;
    speed.y = acceleration * Math.abs((scrollContainerRect.bottom - threshold.height - bottom) / threshold.height);
  }

  if (!isRight && right >= scrollContainerRect.right - threshold.width) {
    // Scroll Right
    direction.x = Direction.Forward;
    speed.x = acceleration * Math.abs((scrollContainerRect.right - threshold.width - right) / threshold.width);
  } else if (!isLeft && left <= scrollContainerRect.left + threshold.width) {
    // Scroll Left
    direction.x = Direction.Backward;
    speed.x = acceleration * Math.abs((scrollContainerRect.left + threshold.width - left) / threshold.width);
  }

  return {
    direction,
    speed
  };
}

function getScrollElementRect(element) {
  if (element === document.scrollingElement) {
    const {
      innerWidth,
      innerHeight
    } = window;
    return {
      top: 0,
      left: 0,
      right: innerWidth,
      bottom: innerHeight,
      width: innerWidth,
      height: innerHeight
    };
  }

  const {
    top,
    left,
    right,
    bottom
  } = element.getBoundingClientRect();
  return {
    top,
    left,
    right,
    bottom,
    width: element.clientWidth,
    height: element.clientHeight
  };
}

function getScrollOffsets(scrollableAncestors) {
  return scrollableAncestors.reduce((acc, node) => {
    return (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.add)(acc, getScrollCoordinates(node));
  }, defaultCoordinates);
}
function getScrollXOffset(scrollableAncestors) {
  return scrollableAncestors.reduce((acc, node) => {
    return acc + getScrollXCoordinate(node);
  }, 0);
}
function getScrollYOffset(scrollableAncestors) {
  return scrollableAncestors.reduce((acc, node) => {
    return acc + getScrollYCoordinate(node);
  }, 0);
}

function scrollIntoViewIfNeeded(element, measure) {
  if (measure === void 0) {
    measure = getClientRect;
  }

  if (!element) {
    return;
  }

  const {
    top,
    left,
    bottom,
    right
  } = measure(element);
  const firstScrollableAncestor = getFirstScrollableAncestor(element);

  if (!firstScrollableAncestor) {
    return;
  }

  if (bottom <= 0 || right <= 0 || top >= window.innerHeight || left >= window.innerWidth) {
    element.scrollIntoView({
      block: 'center',
      inline: 'center'
    });
  }
}

const properties = [['x', ['left', 'right'], getScrollXOffset], ['y', ['top', 'bottom'], getScrollYOffset]];
class Rect {
  constructor(rect, element) {
    this.rect = void 0;
    this.width = void 0;
    this.height = void 0;
    this.top = void 0;
    this.bottom = void 0;
    this.right = void 0;
    this.left = void 0;
    const scrollableAncestors = getScrollableAncestors(element);
    const scrollOffsets = getScrollOffsets(scrollableAncestors);
    this.rect = { ...rect
    };
    this.width = rect.width;
    this.height = rect.height;

    for (const [axis, keys, getScrollOffset] of properties) {
      for (const key of keys) {
        Object.defineProperty(this, key, {
          get: () => {
            const currentOffsets = getScrollOffset(scrollableAncestors);
            const scrollOffsetsDeltla = scrollOffsets[axis] - currentOffsets;
            return this.rect[key] + scrollOffsetsDeltla;
          },
          enumerable: true
        });
      }
    }

    Object.defineProperty(this, 'rect', {
      enumerable: false
    });
  }

}

class Listeners {
  constructor(target) {
    this.target = void 0;
    this.listeners = [];

    this.removeAll = () => {
      this.listeners.forEach(listener => {
        var _this$target;

        return (_this$target = this.target) == null ? void 0 : _this$target.removeEventListener(...listener);
      });
    };

    this.target = target;
  }

  add(eventName, handler, options) {
    var _this$target2;

    (_this$target2 = this.target) == null ? void 0 : _this$target2.addEventListener(eventName, handler, options);
    this.listeners.push([eventName, handler, options]);
  }

}

function getEventListenerTarget(target) {
  // If the `event.target` element is removed from the document events will still be targeted
  // at it, and hence won't always bubble up to the window or document anymore.
  // If there is any risk of an element being removed while it is being dragged,
  // the best practice is to attach the event listeners directly to the target.
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
  const {
    EventTarget
  } = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getWindow)(target);
  return target instanceof EventTarget ? target : (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getOwnerDocument)(target);
}

function hasExceededDistance(delta, measurement) {
  const dx = Math.abs(delta.x);
  const dy = Math.abs(delta.y);

  if (typeof measurement === 'number') {
    return Math.sqrt(dx ** 2 + dy ** 2) > measurement;
  }

  if ('x' in measurement && 'y' in measurement) {
    return dx > measurement.x && dy > measurement.y;
  }

  if ('x' in measurement) {
    return dx > measurement.x;
  }

  if ('y' in measurement) {
    return dy > measurement.y;
  }

  return false;
}

var EventName;

(function (EventName) {
  EventName["Click"] = "click";
  EventName["DragStart"] = "dragstart";
  EventName["Keydown"] = "keydown";
  EventName["ContextMenu"] = "contextmenu";
  EventName["Resize"] = "resize";
  EventName["SelectionChange"] = "selectionchange";
  EventName["VisibilityChange"] = "visibilitychange";
})(EventName || (EventName = {}));

function preventDefault(event) {
  event.preventDefault();
}
function stopPropagation(event) {
  event.stopPropagation();
}

var KeyboardCode;

(function (KeyboardCode) {
  KeyboardCode["Space"] = "Space";
  KeyboardCode["Down"] = "ArrowDown";
  KeyboardCode["Right"] = "ArrowRight";
  KeyboardCode["Left"] = "ArrowLeft";
  KeyboardCode["Up"] = "ArrowUp";
  KeyboardCode["Esc"] = "Escape";
  KeyboardCode["Enter"] = "Enter";
  KeyboardCode["Tab"] = "Tab";
})(KeyboardCode || (KeyboardCode = {}));

const defaultKeyboardCodes = {
  start: [KeyboardCode.Space, KeyboardCode.Enter],
  cancel: [KeyboardCode.Esc],
  end: [KeyboardCode.Space, KeyboardCode.Enter, KeyboardCode.Tab]
};
const defaultKeyboardCoordinateGetter = (event, _ref) => {
  let {
    currentCoordinates
  } = _ref;

  switch (event.code) {
    case KeyboardCode.Right:
      return { ...currentCoordinates,
        x: currentCoordinates.x + 25
      };

    case KeyboardCode.Left:
      return { ...currentCoordinates,
        x: currentCoordinates.x - 25
      };

    case KeyboardCode.Down:
      return { ...currentCoordinates,
        y: currentCoordinates.y + 25
      };

    case KeyboardCode.Up:
      return { ...currentCoordinates,
        y: currentCoordinates.y - 25
      };
  }

  return undefined;
};

class KeyboardSensor {
  constructor(props) {
    this.props = void 0;
    this.autoScrollEnabled = false;
    this.referenceCoordinates = void 0;
    this.listeners = void 0;
    this.windowListeners = void 0;
    this.props = props;
    const {
      event: {
        target
      }
    } = props;
    this.props = props;
    this.listeners = new Listeners((0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getOwnerDocument)(target));
    this.windowListeners = new Listeners((0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getWindow)(target));
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.attach();
  }

  attach() {
    this.handleStart();
    this.windowListeners.add(EventName.Resize, this.handleCancel);
    this.windowListeners.add(EventName.VisibilityChange, this.handleCancel);
    setTimeout(() => this.listeners.add(EventName.Keydown, this.handleKeyDown));
  }

  handleStart() {
    const {
      activeNode,
      onStart
    } = this.props;
    const node = activeNode.node.current;

    if (node) {
      scrollIntoViewIfNeeded(node);
    }

    onStart(defaultCoordinates);
  }

  handleKeyDown(event) {
    if ((0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isKeyboardEvent)(event)) {
      const {
        active,
        context,
        options
      } = this.props;
      const {
        keyboardCodes = defaultKeyboardCodes,
        coordinateGetter = defaultKeyboardCoordinateGetter,
        scrollBehavior = 'smooth'
      } = options;
      const {
        code
      } = event;

      if (keyboardCodes.end.includes(code)) {
        this.handleEnd(event);
        return;
      }

      if (keyboardCodes.cancel.includes(code)) {
        this.handleCancel(event);
        return;
      }

      const {
        collisionRect
      } = context.current;
      const currentCoordinates = collisionRect ? {
        x: collisionRect.left,
        y: collisionRect.top
      } : defaultCoordinates;

      if (!this.referenceCoordinates) {
        this.referenceCoordinates = currentCoordinates;
      }

      const newCoordinates = coordinateGetter(event, {
        active,
        context: context.current,
        currentCoordinates
      });

      if (newCoordinates) {
        const coordinatesDelta = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.subtract)(newCoordinates, currentCoordinates);
        const scrollDelta = {
          x: 0,
          y: 0
        };
        const {
          scrollableAncestors
        } = context.current;

        for (const scrollContainer of scrollableAncestors) {
          const direction = event.code;
          const {
            isTop,
            isRight,
            isLeft,
            isBottom,
            maxScroll,
            minScroll
          } = getScrollPosition(scrollContainer);
          const scrollElementRect = getScrollElementRect(scrollContainer);
          const clampedCoordinates = {
            x: Math.min(direction === KeyboardCode.Right ? scrollElementRect.right - scrollElementRect.width / 2 : scrollElementRect.right, Math.max(direction === KeyboardCode.Right ? scrollElementRect.left : scrollElementRect.left + scrollElementRect.width / 2, newCoordinates.x)),
            y: Math.min(direction === KeyboardCode.Down ? scrollElementRect.bottom - scrollElementRect.height / 2 : scrollElementRect.bottom, Math.max(direction === KeyboardCode.Down ? scrollElementRect.top : scrollElementRect.top + scrollElementRect.height / 2, newCoordinates.y))
          };
          const canScrollX = direction === KeyboardCode.Right && !isRight || direction === KeyboardCode.Left && !isLeft;
          const canScrollY = direction === KeyboardCode.Down && !isBottom || direction === KeyboardCode.Up && !isTop;

          if (canScrollX && clampedCoordinates.x !== newCoordinates.x) {
            const newScrollCoordinates = scrollContainer.scrollLeft + coordinatesDelta.x;
            const canScrollToNewCoordinates = direction === KeyboardCode.Right && newScrollCoordinates <= maxScroll.x || direction === KeyboardCode.Left && newScrollCoordinates >= minScroll.x;

            if (canScrollToNewCoordinates && !coordinatesDelta.y) {
              // We don't need to update coordinates, the scroll adjustment alone will trigger
              // logic to auto-detect the new container we are over
              scrollContainer.scrollTo({
                left: newScrollCoordinates,
                behavior: scrollBehavior
              });
              return;
            }

            if (canScrollToNewCoordinates) {
              scrollDelta.x = scrollContainer.scrollLeft - newScrollCoordinates;
            } else {
              scrollDelta.x = direction === KeyboardCode.Right ? scrollContainer.scrollLeft - maxScroll.x : scrollContainer.scrollLeft - minScroll.x;
            }

            if (scrollDelta.x) {
              scrollContainer.scrollBy({
                left: -scrollDelta.x,
                behavior: scrollBehavior
              });
            }

            break;
          } else if (canScrollY && clampedCoordinates.y !== newCoordinates.y) {
            const newScrollCoordinates = scrollContainer.scrollTop + coordinatesDelta.y;
            const canScrollToNewCoordinates = direction === KeyboardCode.Down && newScrollCoordinates <= maxScroll.y || direction === KeyboardCode.Up && newScrollCoordinates >= minScroll.y;

            if (canScrollToNewCoordinates && !coordinatesDelta.x) {
              // We don't need to update coordinates, the scroll adjustment alone will trigger
              // logic to auto-detect the new container we are over
              scrollContainer.scrollTo({
                top: newScrollCoordinates,
                behavior: scrollBehavior
              });
              return;
            }

            if (canScrollToNewCoordinates) {
              scrollDelta.y = scrollContainer.scrollTop - newScrollCoordinates;
            } else {
              scrollDelta.y = direction === KeyboardCode.Down ? scrollContainer.scrollTop - maxScroll.y : scrollContainer.scrollTop - minScroll.y;
            }

            if (scrollDelta.y) {
              scrollContainer.scrollBy({
                top: -scrollDelta.y,
                behavior: scrollBehavior
              });
            }

            break;
          }
        }

        this.handleMove(event, (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.add)((0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.subtract)(newCoordinates, this.referenceCoordinates), scrollDelta));
      }
    }
  }

  handleMove(event, coordinates) {
    const {
      onMove
    } = this.props;
    event.preventDefault();
    onMove(coordinates);
  }

  handleEnd(event) {
    const {
      onEnd
    } = this.props;
    event.preventDefault();
    this.detach();
    onEnd();
  }

  handleCancel(event) {
    const {
      onCancel
    } = this.props;
    event.preventDefault();
    this.detach();
    onCancel();
  }

  detach() {
    this.listeners.removeAll();
    this.windowListeners.removeAll();
  }

}
KeyboardSensor.activators = [{
  eventName: 'onKeyDown',
  handler: (event, _ref, _ref2) => {
    let {
      keyboardCodes = defaultKeyboardCodes,
      onActivation
    } = _ref;
    let {
      active
    } = _ref2;
    const {
      code
    } = event.nativeEvent;

    if (keyboardCodes.start.includes(code)) {
      const activator = active.activatorNode.current;

      if (activator && event.target !== activator) {
        return false;
      }

      event.preventDefault();
      onActivation == null ? void 0 : onActivation({
        event: event.nativeEvent
      });
      return true;
    }

    return false;
  }
}];

function isDistanceConstraint(constraint) {
  return Boolean(constraint && 'distance' in constraint);
}

function isDelayConstraint(constraint) {
  return Boolean(constraint && 'delay' in constraint);
}

class AbstractPointerSensor {
  constructor(props, events, listenerTarget) {
    var _getEventCoordinates;

    if (listenerTarget === void 0) {
      listenerTarget = getEventListenerTarget(props.event.target);
    }

    this.props = void 0;
    this.events = void 0;
    this.autoScrollEnabled = true;
    this.document = void 0;
    this.activated = false;
    this.initialCoordinates = void 0;
    this.timeoutId = null;
    this.listeners = void 0;
    this.documentListeners = void 0;
    this.windowListeners = void 0;
    this.props = props;
    this.events = events;
    const {
      event
    } = props;
    const {
      target
    } = event;
    this.props = props;
    this.events = events;
    this.document = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getOwnerDocument)(target);
    this.documentListeners = new Listeners(this.document);
    this.listeners = new Listeners(listenerTarget);
    this.windowListeners = new Listeners((0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getWindow)(target));
    this.initialCoordinates = (_getEventCoordinates = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getEventCoordinates)(event)) != null ? _getEventCoordinates : defaultCoordinates;
    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.removeTextSelection = this.removeTextSelection.bind(this);
    this.attach();
  }

  attach() {
    const {
      events,
      props: {
        options: {
          activationConstraint,
          bypassActivationConstraint
        }
      }
    } = this;
    this.listeners.add(events.move.name, this.handleMove, {
      passive: false
    });
    this.listeners.add(events.end.name, this.handleEnd);

    if (events.cancel) {
      this.listeners.add(events.cancel.name, this.handleCancel);
    }

    this.windowListeners.add(EventName.Resize, this.handleCancel);
    this.windowListeners.add(EventName.DragStart, preventDefault);
    this.windowListeners.add(EventName.VisibilityChange, this.handleCancel);
    this.windowListeners.add(EventName.ContextMenu, preventDefault);
    this.documentListeners.add(EventName.Keydown, this.handleKeydown);

    if (activationConstraint) {
      if (bypassActivationConstraint != null && bypassActivationConstraint({
        event: this.props.event,
        activeNode: this.props.activeNode,
        options: this.props.options
      })) {
        return this.handleStart();
      }

      if (isDelayConstraint(activationConstraint)) {
        this.timeoutId = setTimeout(this.handleStart, activationConstraint.delay);
        this.handlePending(activationConstraint);
        return;
      }

      if (isDistanceConstraint(activationConstraint)) {
        this.handlePending(activationConstraint);
        return;
      }
    }

    this.handleStart();
  }

  detach() {
    this.listeners.removeAll();
    this.windowListeners.removeAll(); // Wait until the next event loop before removing document listeners
    // This is necessary because we listen for `click` and `selection` events on the document

    setTimeout(this.documentListeners.removeAll, 50);

    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  handlePending(constraint, offset) {
    const {
      active,
      onPending
    } = this.props;
    onPending(active, constraint, this.initialCoordinates, offset);
  }

  handleStart() {
    const {
      initialCoordinates
    } = this;
    const {
      onStart
    } = this.props;

    if (initialCoordinates) {
      this.activated = true; // Stop propagation of click events once activation constraints are met

      this.documentListeners.add(EventName.Click, stopPropagation, {
        capture: true
      }); // Remove any text selection from the document

      this.removeTextSelection(); // Prevent further text selection while dragging

      this.documentListeners.add(EventName.SelectionChange, this.removeTextSelection);
      onStart(initialCoordinates);
    }
  }

  handleMove(event) {
    var _getEventCoordinates2;

    const {
      activated,
      initialCoordinates,
      props
    } = this;
    const {
      onMove,
      options: {
        activationConstraint
      }
    } = props;

    if (!initialCoordinates) {
      return;
    }

    const coordinates = (_getEventCoordinates2 = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getEventCoordinates)(event)) != null ? _getEventCoordinates2 : defaultCoordinates;
    const delta = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.subtract)(initialCoordinates, coordinates); // Constraint validation

    if (!activated && activationConstraint) {
      if (isDistanceConstraint(activationConstraint)) {
        if (activationConstraint.tolerance != null && hasExceededDistance(delta, activationConstraint.tolerance)) {
          return this.handleCancel();
        }

        if (hasExceededDistance(delta, activationConstraint.distance)) {
          return this.handleStart();
        }
      }

      if (isDelayConstraint(activationConstraint)) {
        if (hasExceededDistance(delta, activationConstraint.tolerance)) {
          return this.handleCancel();
        }
      }

      this.handlePending(activationConstraint, delta);
      return;
    }

    if (event.cancelable) {
      event.preventDefault();
    }

    onMove(coordinates);
  }

  handleEnd() {
    const {
      onAbort,
      onEnd
    } = this.props;
    this.detach();

    if (!this.activated) {
      onAbort(this.props.active);
    }

    onEnd();
  }

  handleCancel() {
    const {
      onAbort,
      onCancel
    } = this.props;
    this.detach();

    if (!this.activated) {
      onAbort(this.props.active);
    }

    onCancel();
  }

  handleKeydown(event) {
    if (event.code === KeyboardCode.Esc) {
      this.handleCancel();
    }
  }

  removeTextSelection() {
    var _this$document$getSel;

    (_this$document$getSel = this.document.getSelection()) == null ? void 0 : _this$document$getSel.removeAllRanges();
  }

}

const events = {
  cancel: {
    name: 'pointercancel'
  },
  move: {
    name: 'pointermove'
  },
  end: {
    name: 'pointerup'
  }
};
class PointerSensor extends AbstractPointerSensor {
  constructor(props) {
    const {
      event
    } = props; // Pointer events stop firing if the target is unmounted while dragging
    // Therefore we attach listeners to the owner document instead

    const listenerTarget = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getOwnerDocument)(event.target);
    super(props, events, listenerTarget);
  }

}
PointerSensor.activators = [{
  eventName: 'onPointerDown',
  handler: (_ref, _ref2) => {
    let {
      nativeEvent: event
    } = _ref;
    let {
      onActivation
    } = _ref2;

    if (!event.isPrimary || event.button !== 0) {
      return false;
    }

    onActivation == null ? void 0 : onActivation({
      event
    });
    return true;
  }
}];

const events$1 = {
  move: {
    name: 'mousemove'
  },
  end: {
    name: 'mouseup'
  }
};
var MouseButton;

(function (MouseButton) {
  MouseButton[MouseButton["RightClick"] = 2] = "RightClick";
})(MouseButton || (MouseButton = {}));

class MouseSensor extends AbstractPointerSensor {
  constructor(props) {
    super(props, events$1, (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getOwnerDocument)(props.event.target));
  }

}
MouseSensor.activators = [{
  eventName: 'onMouseDown',
  handler: (_ref, _ref2) => {
    let {
      nativeEvent: event
    } = _ref;
    let {
      onActivation
    } = _ref2;

    if (event.button === MouseButton.RightClick) {
      return false;
    }

    onActivation == null ? void 0 : onActivation({
      event
    });
    return true;
  }
}];

const events$2 = {
  cancel: {
    name: 'touchcancel'
  },
  move: {
    name: 'touchmove'
  },
  end: {
    name: 'touchend'
  }
};
class TouchSensor extends AbstractPointerSensor {
  constructor(props) {
    super(props, events$2);
  }

  static setup() {
    // Adding a non-capture and non-passive `touchmove` listener in order
    // to force `event.preventDefault()` calls to work in dynamically added
    // touchmove event handlers. This is required for iOS Safari.
    window.addEventListener(events$2.move.name, noop, {
      capture: false,
      passive: false
    });
    return function teardown() {
      window.removeEventListener(events$2.move.name, noop);
    }; // We create a new handler because the teardown function of another sensor
    // could remove our event listener if we use a referentially equal listener.

    function noop() {}
  }

}
TouchSensor.activators = [{
  eventName: 'onTouchStart',
  handler: (_ref, _ref2) => {
    let {
      nativeEvent: event
    } = _ref;
    let {
      onActivation
    } = _ref2;
    const {
      touches
    } = event;

    if (touches.length > 1) {
      return false;
    }

    onActivation == null ? void 0 : onActivation({
      event
    });
    return true;
  }
}];

var AutoScrollActivator;

(function (AutoScrollActivator) {
  AutoScrollActivator[AutoScrollActivator["Pointer"] = 0] = "Pointer";
  AutoScrollActivator[AutoScrollActivator["DraggableRect"] = 1] = "DraggableRect";
})(AutoScrollActivator || (AutoScrollActivator = {}));

var TraversalOrder;

(function (TraversalOrder) {
  TraversalOrder[TraversalOrder["TreeOrder"] = 0] = "TreeOrder";
  TraversalOrder[TraversalOrder["ReversedTreeOrder"] = 1] = "ReversedTreeOrder";
})(TraversalOrder || (TraversalOrder = {}));

function useAutoScroller(_ref) {
  let {
    acceleration,
    activator = AutoScrollActivator.Pointer,
    canScroll,
    draggingRect,
    enabled,
    interval = 5,
    order = TraversalOrder.TreeOrder,
    pointerCoordinates,
    scrollableAncestors,
    scrollableAncestorRects,
    delta,
    threshold
  } = _ref;
  const scrollIntent = useScrollIntent({
    delta,
    disabled: !enabled
  });
  const [setAutoScrollInterval, clearAutoScrollInterval] = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useInterval)();
  const scrollSpeed = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({
    x: 0,
    y: 0
  });
  const scrollDirection = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({
    x: 0,
    y: 0
  });
  const rect = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    switch (activator) {
      case AutoScrollActivator.Pointer:
        return pointerCoordinates ? {
          top: pointerCoordinates.y,
          bottom: pointerCoordinates.y,
          left: pointerCoordinates.x,
          right: pointerCoordinates.x
        } : null;

      case AutoScrollActivator.DraggableRect:
        return draggingRect;
    }
  }, [activator, draggingRect, pointerCoordinates]);
  const scrollContainerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const autoScroll = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) {
      return;
    }

    const scrollLeft = scrollSpeed.current.x * scrollDirection.current.x;
    const scrollTop = scrollSpeed.current.y * scrollDirection.current.y;
    scrollContainer.scrollBy(scrollLeft, scrollTop);
  }, []);
  const sortedScrollableAncestors = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => order === TraversalOrder.TreeOrder ? [...scrollableAncestors].reverse() : scrollableAncestors, [order, scrollableAncestors]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!enabled || !scrollableAncestors.length || !rect) {
      clearAutoScrollInterval();
      return;
    }

    for (const scrollContainer of sortedScrollableAncestors) {
      if ((canScroll == null ? void 0 : canScroll(scrollContainer)) === false) {
        continue;
      }

      const index = scrollableAncestors.indexOf(scrollContainer);
      const scrollContainerRect = scrollableAncestorRects[index];

      if (!scrollContainerRect) {
        continue;
      }

      const {
        direction,
        speed
      } = getScrollDirectionAndSpeed(scrollContainer, scrollContainerRect, rect, acceleration, threshold);

      for (const axis of ['x', 'y']) {
        if (!scrollIntent[axis][direction[axis]]) {
          speed[axis] = 0;
          direction[axis] = 0;
        }
      }

      if (speed.x > 0 || speed.y > 0) {
        clearAutoScrollInterval();
        scrollContainerRef.current = scrollContainer;
        setAutoScrollInterval(autoScroll, interval);
        scrollSpeed.current = speed;
        scrollDirection.current = direction;
        return;
      }
    }

    scrollSpeed.current = {
      x: 0,
      y: 0
    };
    scrollDirection.current = {
      x: 0,
      y: 0
    };
    clearAutoScrollInterval();
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [acceleration, autoScroll, canScroll, clearAutoScrollInterval, enabled, interval, // eslint-disable-next-line react-hooks/exhaustive-deps
  JSON.stringify(rect), // eslint-disable-next-line react-hooks/exhaustive-deps
  JSON.stringify(scrollIntent), setAutoScrollInterval, scrollableAncestors, sortedScrollableAncestors, scrollableAncestorRects, // eslint-disable-next-line react-hooks/exhaustive-deps
  JSON.stringify(threshold)]);
}
const defaultScrollIntent = {
  x: {
    [Direction.Backward]: false,
    [Direction.Forward]: false
  },
  y: {
    [Direction.Backward]: false,
    [Direction.Forward]: false
  }
};

function useScrollIntent(_ref2) {
  let {
    delta,
    disabled
  } = _ref2;
  const previousDelta = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.usePrevious)(delta);
  return (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useLazyMemo)(previousIntent => {
    if (disabled || !previousDelta || !previousIntent) {
      // Reset scroll intent tracking when auto-scrolling is disabled
      return defaultScrollIntent;
    }

    const direction = {
      x: Math.sign(delta.x - previousDelta.x),
      y: Math.sign(delta.y - previousDelta.y)
    }; // Keep track of the user intent to scroll in each direction for both axis

    return {
      x: {
        [Direction.Backward]: previousIntent.x[Direction.Backward] || direction.x === -1,
        [Direction.Forward]: previousIntent.x[Direction.Forward] || direction.x === 1
      },
      y: {
        [Direction.Backward]: previousIntent.y[Direction.Backward] || direction.y === -1,
        [Direction.Forward]: previousIntent.y[Direction.Forward] || direction.y === 1
      }
    };
  }, [disabled, delta, previousDelta]);
}

function useCachedNode(draggableNodes, id) {
  const draggableNode = id != null ? draggableNodes.get(id) : undefined;
  const node = draggableNode ? draggableNode.node.current : null;
  return (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useLazyMemo)(cachedNode => {
    var _ref;

    if (id == null) {
      return null;
    } // In some cases, the draggable node can unmount while dragging
    // This is the case for virtualized lists. In those situations,
    // we fall back to the last known value for that node.


    return (_ref = node != null ? node : cachedNode) != null ? _ref : null;
  }, [node, id]);
}

function useCombineActivators(sensors, getSyntheticHandler) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => sensors.reduce((accumulator, sensor) => {
    const {
      sensor: Sensor
    } = sensor;
    const sensorActivators = Sensor.activators.map(activator => ({
      eventName: activator.eventName,
      handler: getSyntheticHandler(activator.handler, sensor)
    }));
    return [...accumulator, ...sensorActivators];
  }, []), [sensors, getSyntheticHandler]);
}

var MeasuringStrategy;

(function (MeasuringStrategy) {
  MeasuringStrategy[MeasuringStrategy["Always"] = 0] = "Always";
  MeasuringStrategy[MeasuringStrategy["BeforeDragging"] = 1] = "BeforeDragging";
  MeasuringStrategy[MeasuringStrategy["WhileDragging"] = 2] = "WhileDragging";
})(MeasuringStrategy || (MeasuringStrategy = {}));

var MeasuringFrequency;

(function (MeasuringFrequency) {
  MeasuringFrequency["Optimized"] = "optimized";
})(MeasuringFrequency || (MeasuringFrequency = {}));

const defaultValue = /*#__PURE__*/new Map();
function useDroppableMeasuring(containers, _ref) {
  let {
    dragging,
    dependencies,
    config
  } = _ref;
  const [queue, setQueue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const {
    frequency,
    measure,
    strategy
  } = config;
  const containersRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(containers);
  const disabled = isDisabled();
  const disabledRef = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useLatestValue)(disabled);
  const measureDroppableContainers = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (ids) {
    if (ids === void 0) {
      ids = [];
    }

    if (disabledRef.current) {
      return;
    }

    setQueue(value => {
      if (value === null) {
        return ids;
      }

      return value.concat(ids.filter(id => !value.includes(id)));
    });
  }, [disabledRef]);
  const timeoutId = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const droppableRects = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useLazyMemo)(previousValue => {
    if (disabled && !dragging) {
      return defaultValue;
    }

    if (!previousValue || previousValue === defaultValue || containersRef.current !== containers || queue != null) {
      const map = new Map();

      for (let container of containers) {
        if (!container) {
          continue;
        }

        if (queue && queue.length > 0 && !queue.includes(container.id) && container.rect.current) {
          // This container does not need to be re-measured
          map.set(container.id, container.rect.current);
          continue;
        }

        const node = container.node.current;
        const rect = node ? new Rect(measure(node), node) : null;
        container.rect.current = rect;

        if (rect) {
          map.set(container.id, rect);
        }
      }

      return map;
    }

    return previousValue;
  }, [containers, queue, dragging, disabled, measure]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    containersRef.current = containers;
  }, [containers]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (disabled) {
      return;
    }

    measureDroppableContainers();
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [dragging, disabled]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (queue && queue.length > 0) {
      setQueue(null);
    }
  }, //eslint-disable-next-line react-hooks/exhaustive-deps
  [JSON.stringify(queue)]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (disabled || typeof frequency !== 'number' || timeoutId.current !== null) {
      return;
    }

    timeoutId.current = setTimeout(() => {
      measureDroppableContainers();
      timeoutId.current = null;
    }, frequency);
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [frequency, disabled, measureDroppableContainers, ...dependencies]);
  return {
    droppableRects,
    measureDroppableContainers,
    measuringScheduled: queue != null
  };

  function isDisabled() {
    switch (strategy) {
      case MeasuringStrategy.Always:
        return false;

      case MeasuringStrategy.BeforeDragging:
        return dragging;

      default:
        return !dragging;
    }
  }
}

function useInitialValue(value, computeFn) {
  return (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useLazyMemo)(previousValue => {
    if (!value) {
      return null;
    }

    if (previousValue) {
      return previousValue;
    }

    return typeof computeFn === 'function' ? computeFn(value) : value;
  }, [computeFn, value]);
}

function useInitialRect(node, measure) {
  return useInitialValue(node, measure);
}

/**
 * Returns a new MutationObserver instance.
 * If `MutationObserver` is undefined in the execution environment, returns `undefined`.
 */

function useMutationObserver(_ref) {
  let {
    callback,
    disabled
  } = _ref;
  const handleMutations = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useEvent)(callback);
  const mutationObserver = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (disabled || typeof window === 'undefined' || typeof window.MutationObserver === 'undefined') {
      return undefined;
    }

    const {
      MutationObserver
    } = window;
    return new MutationObserver(handleMutations);
  }, [handleMutations, disabled]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    return () => mutationObserver == null ? void 0 : mutationObserver.disconnect();
  }, [mutationObserver]);
  return mutationObserver;
}

/**
 * Returns a new ResizeObserver instance bound to the `onResize` callback.
 * If `ResizeObserver` is undefined in the execution environment, returns `undefined`.
 */

function useResizeObserver(_ref) {
  let {
    callback,
    disabled
  } = _ref;
  const handleResize = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useEvent)(callback);
  const resizeObserver = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (disabled || typeof window === 'undefined' || typeof window.ResizeObserver === 'undefined') {
      return undefined;
    }

    const {
      ResizeObserver
    } = window;
    return new ResizeObserver(handleResize);
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [disabled]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    return () => resizeObserver == null ? void 0 : resizeObserver.disconnect();
  }, [resizeObserver]);
  return resizeObserver;
}

function defaultMeasure(element) {
  return new Rect(getClientRect(element), element);
}

function useRect(element, measure, fallbackRect) {
  if (measure === void 0) {
    measure = defaultMeasure;
  }

  const [rect, setRect] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);

  function measureRect() {
    setRect(currentRect => {
      if (!element) {
        return null;
      }

      if (element.isConnected === false) {
        var _ref;

        // Fall back to last rect we measured if the element is
        // no longer connected to the DOM.
        return (_ref = currentRect != null ? currentRect : fallbackRect) != null ? _ref : null;
      }

      const newRect = measure(element);

      if (JSON.stringify(currentRect) === JSON.stringify(newRect)) {
        return currentRect;
      }

      return newRect;
    });
  }

  const mutationObserver = useMutationObserver({
    callback(records) {
      if (!element) {
        return;
      }

      for (const record of records) {
        const {
          type,
          target
        } = record;

        if (type === 'childList' && target instanceof HTMLElement && target.contains(element)) {
          measureRect();
          break;
        }
      }
    }

  });
  const resizeObserver = useResizeObserver({
    callback: measureRect
  });
  (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useIsomorphicLayoutEffect)(() => {
    measureRect();

    if (element) {
      resizeObserver == null ? void 0 : resizeObserver.observe(element);
      mutationObserver == null ? void 0 : mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    } else {
      resizeObserver == null ? void 0 : resizeObserver.disconnect();
      mutationObserver == null ? void 0 : mutationObserver.disconnect();
    }
  }, [element]);
  return rect;
}

function useRectDelta(rect) {
  const initialRect = useInitialValue(rect);
  return getRectDelta(rect, initialRect);
}

const defaultValue$1 = [];
function useScrollableAncestors(node) {
  const previousNode = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(node);
  const ancestors = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useLazyMemo)(previousValue => {
    if (!node) {
      return defaultValue$1;
    }

    if (previousValue && previousValue !== defaultValue$1 && node && previousNode.current && node.parentNode === previousNode.current.parentNode) {
      return previousValue;
    }

    return getScrollableAncestors(node);
  }, [node]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    previousNode.current = node;
  }, [node]);
  return ancestors;
}

function useScrollOffsets(elements) {
  const [scrollCoordinates, setScrollCoordinates] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const prevElements = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(elements); // To-do: Throttle the handleScroll callback

  const handleScroll = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(event => {
    const scrollingElement = getScrollableElement(event.target);

    if (!scrollingElement) {
      return;
    }

    setScrollCoordinates(scrollCoordinates => {
      if (!scrollCoordinates) {
        return null;
      }

      scrollCoordinates.set(scrollingElement, getScrollCoordinates(scrollingElement));
      return new Map(scrollCoordinates);
    });
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const previousElements = prevElements.current;

    if (elements !== previousElements) {
      cleanup(previousElements);
      const entries = elements.map(element => {
        const scrollableElement = getScrollableElement(element);

        if (scrollableElement) {
          scrollableElement.addEventListener('scroll', handleScroll, {
            passive: true
          });
          return [scrollableElement, getScrollCoordinates(scrollableElement)];
        }

        return null;
      }).filter(entry => entry != null);
      setScrollCoordinates(entries.length ? new Map(entries) : null);
      prevElements.current = elements;
    }

    return () => {
      cleanup(elements);
      cleanup(previousElements);
    };

    function cleanup(elements) {
      elements.forEach(element => {
        const scrollableElement = getScrollableElement(element);
        scrollableElement == null ? void 0 : scrollableElement.removeEventListener('scroll', handleScroll);
      });
    }
  }, [handleScroll, elements]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (elements.length) {
      return scrollCoordinates ? Array.from(scrollCoordinates.values()).reduce((acc, coordinates) => (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.add)(acc, coordinates), defaultCoordinates) : getScrollOffsets(elements);
    }

    return defaultCoordinates;
  }, [elements, scrollCoordinates]);
}

function useScrollOffsetsDelta(scrollOffsets, dependencies) {
  if (dependencies === void 0) {
    dependencies = [];
  }

  const initialScrollOffsets = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    initialScrollOffsets.current = null;
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  dependencies);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const hasScrollOffsets = scrollOffsets !== defaultCoordinates;

    if (hasScrollOffsets && !initialScrollOffsets.current) {
      initialScrollOffsets.current = scrollOffsets;
    }

    if (!hasScrollOffsets && initialScrollOffsets.current) {
      initialScrollOffsets.current = null;
    }
  }, [scrollOffsets]);
  return initialScrollOffsets.current ? (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.subtract)(scrollOffsets, initialScrollOffsets.current) : defaultCoordinates;
}

function useSensorSetup(sensors) {
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.canUseDOM) {
      return;
    }

    const teardownFns = sensors.map(_ref => {
      let {
        sensor
      } = _ref;
      return sensor.setup == null ? void 0 : sensor.setup();
    });
    return () => {
      for (const teardown of teardownFns) {
        teardown == null ? void 0 : teardown();
      }
    };
  }, // TO-DO: Sensors length could theoretically change which would not be a valid dependency
  // eslint-disable-next-line react-hooks/exhaustive-deps
  sensors.map(_ref2 => {
    let {
      sensor
    } = _ref2;
    return sensor;
  }));
}

function useSyntheticListeners(listeners, id) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return listeners.reduce((acc, _ref) => {
      let {
        eventName,
        handler
      } = _ref;

      acc[eventName] = event => {
        handler(event, id);
      };

      return acc;
    }, {});
  }, [listeners, id]);
}

function useWindowRect(element) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => element ? getWindowClientRect(element) : null, [element]);
}

const defaultValue$2 = [];
function useRects(elements, measure) {
  if (measure === void 0) {
    measure = getClientRect;
  }

  const [firstElement] = elements;
  const windowRect = useWindowRect(firstElement ? (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getWindow)(firstElement) : null);
  const [rects, setRects] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultValue$2);

  function measureRects() {
    setRects(() => {
      if (!elements.length) {
        return defaultValue$2;
      }

      return elements.map(element => isDocumentScrollingElement(element) ? windowRect : new Rect(measure(element), element));
    });
  }

  const resizeObserver = useResizeObserver({
    callback: measureRects
  });
  (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useIsomorphicLayoutEffect)(() => {
    resizeObserver == null ? void 0 : resizeObserver.disconnect();
    measureRects();
    elements.forEach(element => resizeObserver == null ? void 0 : resizeObserver.observe(element));
  }, [elements]);
  return rects;
}

function getMeasurableNode(node) {
  if (!node) {
    return null;
  }

  if (node.children.length > 1) {
    return node;
  }

  const firstChild = node.children[0];
  return (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(firstChild) ? firstChild : node;
}

function useDragOverlayMeasuring(_ref) {
  let {
    measure
  } = _ref;
  const [rect, setRect] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const handleResize = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(entries => {
    for (const {
      target
    } of entries) {
      if ((0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(target)) {
        setRect(rect => {
          const newRect = measure(target);
          return rect ? { ...rect,
            width: newRect.width,
            height: newRect.height
          } : newRect;
        });
        break;
      }
    }
  }, [measure]);
  const resizeObserver = useResizeObserver({
    callback: handleResize
  });
  const handleNodeChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(element => {
    const node = getMeasurableNode(element);
    resizeObserver == null ? void 0 : resizeObserver.disconnect();

    if (node) {
      resizeObserver == null ? void 0 : resizeObserver.observe(node);
    }

    setRect(node ? measure(node) : null);
  }, [measure, resizeObserver]);
  const [nodeRef, setRef] = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useNodeRef)(handleNodeChange);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    nodeRef,
    rect,
    setRef
  }), [rect, nodeRef, setRef]);
}

const defaultSensors = [{
  sensor: PointerSensor,
  options: {}
}, {
  sensor: KeyboardSensor,
  options: {}
}];
const defaultData = {
  current: {}
};
const defaultMeasuringConfiguration = {
  draggable: {
    measure: getTransformAgnosticClientRect
  },
  droppable: {
    measure: getTransformAgnosticClientRect,
    strategy: MeasuringStrategy.WhileDragging,
    frequency: MeasuringFrequency.Optimized
  },
  dragOverlay: {
    measure: getClientRect
  }
};

class DroppableContainersMap extends Map {
  get(id) {
    var _super$get;

    return id != null ? (_super$get = super.get(id)) != null ? _super$get : undefined : undefined;
  }

  toArray() {
    return Array.from(this.values());
  }

  getEnabled() {
    return this.toArray().filter(_ref => {
      let {
        disabled
      } = _ref;
      return !disabled;
    });
  }

  getNodeFor(id) {
    var _this$get$node$curren, _this$get;

    return (_this$get$node$curren = (_this$get = this.get(id)) == null ? void 0 : _this$get.node.current) != null ? _this$get$node$curren : undefined;
  }

}

const defaultPublicContext = {
  activatorEvent: null,
  active: null,
  activeNode: null,
  activeNodeRect: null,
  collisions: null,
  containerNodeRect: null,
  draggableNodes: /*#__PURE__*/new Map(),
  droppableRects: /*#__PURE__*/new Map(),
  droppableContainers: /*#__PURE__*/new DroppableContainersMap(),
  over: null,
  dragOverlay: {
    nodeRef: {
      current: null
    },
    rect: null,
    setRef: noop
  },
  scrollableAncestors: [],
  scrollableAncestorRects: [],
  measuringConfiguration: defaultMeasuringConfiguration,
  measureDroppableContainers: noop,
  windowRect: null,
  measuringScheduled: false
};
const defaultInternalContext = {
  activatorEvent: null,
  activators: [],
  active: null,
  activeNodeRect: null,
  ariaDescribedById: {
    draggable: ''
  },
  dispatch: noop,
  draggableNodes: /*#__PURE__*/new Map(),
  over: null,
  measureDroppableContainers: noop
};
const InternalContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(defaultInternalContext);
const PublicContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(defaultPublicContext);

function getInitialState() {
  return {
    draggable: {
      active: null,
      initialCoordinates: {
        x: 0,
        y: 0
      },
      nodes: new Map(),
      translate: {
        x: 0,
        y: 0
      }
    },
    droppable: {
      containers: new DroppableContainersMap()
    }
  };
}
function reducer(state, action) {
  switch (action.type) {
    case Action.DragStart:
      return { ...state,
        draggable: { ...state.draggable,
          initialCoordinates: action.initialCoordinates,
          active: action.active
        }
      };

    case Action.DragMove:
      if (state.draggable.active == null) {
        return state;
      }

      return { ...state,
        draggable: { ...state.draggable,
          translate: {
            x: action.coordinates.x - state.draggable.initialCoordinates.x,
            y: action.coordinates.y - state.draggable.initialCoordinates.y
          }
        }
      };

    case Action.DragEnd:
    case Action.DragCancel:
      return { ...state,
        draggable: { ...state.draggable,
          active: null,
          initialCoordinates: {
            x: 0,
            y: 0
          },
          translate: {
            x: 0,
            y: 0
          }
        }
      };

    case Action.RegisterDroppable:
      {
        const {
          element
        } = action;
        const {
          id
        } = element;
        const containers = new DroppableContainersMap(state.droppable.containers);
        containers.set(id, element);
        return { ...state,
          droppable: { ...state.droppable,
            containers
          }
        };
      }

    case Action.SetDroppableDisabled:
      {
        const {
          id,
          key,
          disabled
        } = action;
        const element = state.droppable.containers.get(id);

        if (!element || key !== element.key) {
          return state;
        }

        const containers = new DroppableContainersMap(state.droppable.containers);
        containers.set(id, { ...element,
          disabled
        });
        return { ...state,
          droppable: { ...state.droppable,
            containers
          }
        };
      }

    case Action.UnregisterDroppable:
      {
        const {
          id,
          key
        } = action;
        const element = state.droppable.containers.get(id);

        if (!element || key !== element.key) {
          return state;
        }

        const containers = new DroppableContainersMap(state.droppable.containers);
        containers.delete(id);
        return { ...state,
          droppable: { ...state.droppable,
            containers
          }
        };
      }

    default:
      {
        return state;
      }
  }
}

function RestoreFocus(_ref) {
  let {
    disabled
  } = _ref;
  const {
    active,
    activatorEvent,
    draggableNodes
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(InternalContext);
  const previousActivatorEvent = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.usePrevious)(activatorEvent);
  const previousActiveId = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.usePrevious)(active == null ? void 0 : active.id); // Restore keyboard focus on the activator node

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (disabled) {
      return;
    }

    if (!activatorEvent && previousActivatorEvent && previousActiveId != null) {
      if (!(0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isKeyboardEvent)(previousActivatorEvent)) {
        return;
      }

      if (document.activeElement === previousActivatorEvent.target) {
        // No need to restore focus
        return;
      }

      const draggableNode = draggableNodes.get(previousActiveId);

      if (!draggableNode) {
        return;
      }

      const {
        activatorNode,
        node
      } = draggableNode;

      if (!activatorNode.current && !node.current) {
        return;
      }

      requestAnimationFrame(() => {
        for (const element of [activatorNode.current, node.current]) {
          if (!element) {
            continue;
          }

          const focusableNode = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.findFirstFocusableNode)(element);

          if (focusableNode) {
            focusableNode.focus();
            break;
          }
        }
      });
    }
  }, [activatorEvent, disabled, draggableNodes, previousActiveId, previousActivatorEvent]);
  return null;
}

function applyModifiers(modifiers, _ref) {
  let {
    transform,
    ...args
  } = _ref;
  return modifiers != null && modifiers.length ? modifiers.reduce((accumulator, modifier) => {
    return modifier({
      transform: accumulator,
      ...args
    });
  }, transform) : transform;
}

function useMeasuringConfiguration(config) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    draggable: { ...defaultMeasuringConfiguration.draggable,
      ...(config == null ? void 0 : config.draggable)
    },
    droppable: { ...defaultMeasuringConfiguration.droppable,
      ...(config == null ? void 0 : config.droppable)
    },
    dragOverlay: { ...defaultMeasuringConfiguration.dragOverlay,
      ...(config == null ? void 0 : config.dragOverlay)
    }
  }), // eslint-disable-next-line react-hooks/exhaustive-deps
  [config == null ? void 0 : config.draggable, config == null ? void 0 : config.droppable, config == null ? void 0 : config.dragOverlay]);
}

function useLayoutShiftScrollCompensation(_ref) {
  let {
    activeNode,
    measure,
    initialRect,
    config = true
  } = _ref;
  const initialized = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const {
    x,
    y
  } = typeof config === 'boolean' ? {
    x: config,
    y: config
  } : config;
  (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useIsomorphicLayoutEffect)(() => {
    const disabled = !x && !y;

    if (disabled || !activeNode) {
      initialized.current = false;
      return;
    }

    if (initialized.current || !initialRect) {
      // Return early if layout shift scroll compensation was already attempted
      // or if there is no initialRect to compare to.
      return;
    } // Get the most up to date node ref for the active draggable


    const node = activeNode == null ? void 0 : activeNode.node.current;

    if (!node || node.isConnected === false) {
      // Return early if there is no attached node ref or if the node is
      // disconnected from the document.
      return;
    }

    const rect = measure(node);
    const rectDelta = getRectDelta(rect, initialRect);

    if (!x) {
      rectDelta.x = 0;
    }

    if (!y) {
      rectDelta.y = 0;
    } // Only perform layout shift scroll compensation once


    initialized.current = true;

    if (Math.abs(rectDelta.x) > 0 || Math.abs(rectDelta.y) > 0) {
      const firstScrollableAncestor = getFirstScrollableAncestor(node);

      if (firstScrollableAncestor) {
        firstScrollableAncestor.scrollBy({
          top: rectDelta.y,
          left: rectDelta.x
        });
      }
    }
  }, [activeNode, x, y, initialRect, measure]);
}

const ActiveDraggableContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({ ...defaultCoordinates,
  scaleX: 1,
  scaleY: 1
});
var Status;

(function (Status) {
  Status[Status["Uninitialized"] = 0] = "Uninitialized";
  Status[Status["Initializing"] = 1] = "Initializing";
  Status[Status["Initialized"] = 2] = "Initialized";
})(Status || (Status = {}));

const DndContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(function DndContext(_ref) {
  var _sensorContext$curren, _dragOverlay$nodeRef$, _dragOverlay$rect, _over$rect;

  let {
    id,
    accessibility,
    autoScroll = true,
    children,
    sensors = defaultSensors,
    collisionDetection = rectIntersection,
    measuring,
    modifiers,
    ...props
  } = _ref;
  const store = (0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(reducer, undefined, getInitialState);
  const [state, dispatch] = store;
  const [dispatchMonitorEvent, registerMonitorListener] = useDndMonitorProvider();
  const [status, setStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(Status.Uninitialized);
  const isInitialized = status === Status.Initialized;
  const {
    draggable: {
      active: activeId,
      nodes: draggableNodes,
      translate
    },
    droppable: {
      containers: droppableContainers
    }
  } = state;
  const node = activeId != null ? draggableNodes.get(activeId) : null;
  const activeRects = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({
    initial: null,
    translated: null
  });
  const active = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    var _node$data;

    return activeId != null ? {
      id: activeId,
      // It's possible for the active node to unmount while dragging
      data: (_node$data = node == null ? void 0 : node.data) != null ? _node$data : defaultData,
      rect: activeRects
    } : null;
  }, [activeId, node]);
  const activeRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [activeSensor, setActiveSensor] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [activatorEvent, setActivatorEvent] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const latestProps = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useLatestValue)(props, Object.values(props));
  const draggableDescribedById = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useUniqueId)("DndDescribedBy", id);
  const enabledDroppableContainers = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => droppableContainers.getEnabled(), [droppableContainers]);
  const measuringConfiguration = useMeasuringConfiguration(measuring);
  const {
    droppableRects,
    measureDroppableContainers,
    measuringScheduled
  } = useDroppableMeasuring(enabledDroppableContainers, {
    dragging: isInitialized,
    dependencies: [translate.x, translate.y],
    config: measuringConfiguration.droppable
  });
  const activeNode = useCachedNode(draggableNodes, activeId);
  const activationCoordinates = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => activatorEvent ? (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getEventCoordinates)(activatorEvent) : null, [activatorEvent]);
  const autoScrollOptions = getAutoScrollerOptions();
  const initialActiveNodeRect = useInitialRect(activeNode, measuringConfiguration.draggable.measure);
  useLayoutShiftScrollCompensation({
    activeNode: activeId != null ? draggableNodes.get(activeId) : null,
    config: autoScrollOptions.layoutShiftCompensation,
    initialRect: initialActiveNodeRect,
    measure: measuringConfiguration.draggable.measure
  });
  const activeNodeRect = useRect(activeNode, measuringConfiguration.draggable.measure, initialActiveNodeRect);
  const containerNodeRect = useRect(activeNode ? activeNode.parentElement : null);
  const sensorContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({
    activatorEvent: null,
    active: null,
    activeNode,
    collisionRect: null,
    collisions: null,
    droppableRects,
    draggableNodes,
    draggingNode: null,
    draggingNodeRect: null,
    droppableContainers,
    over: null,
    scrollableAncestors: [],
    scrollAdjustedTranslate: null
  });
  const overNode = droppableContainers.getNodeFor((_sensorContext$curren = sensorContext.current.over) == null ? void 0 : _sensorContext$curren.id);
  const dragOverlay = useDragOverlayMeasuring({
    measure: measuringConfiguration.dragOverlay.measure
  }); // Use the rect of the drag overlay if it is mounted

  const draggingNode = (_dragOverlay$nodeRef$ = dragOverlay.nodeRef.current) != null ? _dragOverlay$nodeRef$ : activeNode;
  const draggingNodeRect = isInitialized ? (_dragOverlay$rect = dragOverlay.rect) != null ? _dragOverlay$rect : activeNodeRect : null;
  const usesDragOverlay = Boolean(dragOverlay.nodeRef.current && dragOverlay.rect); // The delta between the previous and new position of the draggable node
  // is only relevant when there is no drag overlay

  const nodeRectDelta = useRectDelta(usesDragOverlay ? null : activeNodeRect); // Get the window rect of the dragging node

  const windowRect = useWindowRect(draggingNode ? (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getWindow)(draggingNode) : null); // Get scrollable ancestors of the dragging node

  const scrollableAncestors = useScrollableAncestors(isInitialized ? overNode != null ? overNode : activeNode : null);
  const scrollableAncestorRects = useRects(scrollableAncestors); // Apply modifiers

  const modifiedTranslate = applyModifiers(modifiers, {
    transform: {
      x: translate.x - nodeRectDelta.x,
      y: translate.y - nodeRectDelta.y,
      scaleX: 1,
      scaleY: 1
    },
    activatorEvent,
    active,
    activeNodeRect,
    containerNodeRect,
    draggingNodeRect,
    over: sensorContext.current.over,
    overlayNodeRect: dragOverlay.rect,
    scrollableAncestors,
    scrollableAncestorRects,
    windowRect
  });
  const pointerCoordinates = activationCoordinates ? (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.add)(activationCoordinates, translate) : null;
  const scrollOffsets = useScrollOffsets(scrollableAncestors); // Represents the scroll delta since dragging was initiated

  const scrollAdjustment = useScrollOffsetsDelta(scrollOffsets); // Represents the scroll delta since the last time the active node rect was measured

  const activeNodeScrollDelta = useScrollOffsetsDelta(scrollOffsets, [activeNodeRect]);
  const scrollAdjustedTranslate = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.add)(modifiedTranslate, scrollAdjustment);
  const collisionRect = draggingNodeRect ? getAdjustedRect(draggingNodeRect, modifiedTranslate) : null;
  const collisions = active && collisionRect ? collisionDetection({
    active,
    collisionRect,
    droppableRects,
    droppableContainers: enabledDroppableContainers,
    pointerCoordinates
  }) : null;
  const overId = getFirstCollision(collisions, 'id');
  const [over, setOver] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null); // When there is no drag overlay used, we need to account for the
  // window scroll delta

  const appliedTranslate = usesDragOverlay ? modifiedTranslate : (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.add)(modifiedTranslate, activeNodeScrollDelta);
  const transform = adjustScale(appliedTranslate, (_over$rect = over == null ? void 0 : over.rect) != null ? _over$rect : null, activeNodeRect);
  const activeSensorRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const instantiateSensor = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((event, _ref2) => {
    let {
      sensor: Sensor,
      options
    } = _ref2;

    if (activeRef.current == null) {
      return;
    }

    const activeNode = draggableNodes.get(activeRef.current);

    if (!activeNode) {
      return;
    }

    const activatorEvent = event.nativeEvent;
    const sensorInstance = new Sensor({
      active: activeRef.current,
      activeNode,
      event: activatorEvent,
      options,
      // Sensors need to be instantiated with refs for arguments that change over time
      // otherwise they are frozen in time with the stale arguments
      context: sensorContext,

      onAbort(id) {
        const draggableNode = draggableNodes.get(id);

        if (!draggableNode) {
          return;
        }

        const {
          onDragAbort
        } = latestProps.current;
        const event = {
          id
        };
        onDragAbort == null ? void 0 : onDragAbort(event);
        dispatchMonitorEvent({
          type: 'onDragAbort',
          event
        });
      },

      onPending(id, constraint, initialCoordinates, offset) {
        const draggableNode = draggableNodes.get(id);

        if (!draggableNode) {
          return;
        }

        const {
          onDragPending
        } = latestProps.current;
        const event = {
          id,
          constraint,
          initialCoordinates,
          offset
        };
        onDragPending == null ? void 0 : onDragPending(event);
        dispatchMonitorEvent({
          type: 'onDragPending',
          event
        });
      },

      onStart(initialCoordinates) {
        const id = activeRef.current;

        if (id == null) {
          return;
        }

        const draggableNode = draggableNodes.get(id);

        if (!draggableNode) {
          return;
        }

        const {
          onDragStart
        } = latestProps.current;
        const event = {
          activatorEvent,
          active: {
            id,
            data: draggableNode.data,
            rect: activeRects
          }
        };
        (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.unstable_batchedUpdates)(() => {
          onDragStart == null ? void 0 : onDragStart(event);
          setStatus(Status.Initializing);
          dispatch({
            type: Action.DragStart,
            initialCoordinates,
            active: id
          });
          dispatchMonitorEvent({
            type: 'onDragStart',
            event
          });
          setActiveSensor(activeSensorRef.current);
          setActivatorEvent(activatorEvent);
        });
      },

      onMove(coordinates) {
        dispatch({
          type: Action.DragMove,
          coordinates
        });
      },

      onEnd: createHandler(Action.DragEnd),
      onCancel: createHandler(Action.DragCancel)
    });
    activeSensorRef.current = sensorInstance;

    function createHandler(type) {
      return async function handler() {
        const {
          active,
          collisions,
          over,
          scrollAdjustedTranslate
        } = sensorContext.current;
        let event = null;

        if (active && scrollAdjustedTranslate) {
          const {
            cancelDrop
          } = latestProps.current;
          event = {
            activatorEvent,
            active: active,
            collisions,
            delta: scrollAdjustedTranslate,
            over
          };

          if (type === Action.DragEnd && typeof cancelDrop === 'function') {
            const shouldCancel = await Promise.resolve(cancelDrop(event));

            if (shouldCancel) {
              type = Action.DragCancel;
            }
          }
        }

        activeRef.current = null;
        (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.unstable_batchedUpdates)(() => {
          dispatch({
            type
          });
          setStatus(Status.Uninitialized);
          setOver(null);
          setActiveSensor(null);
          setActivatorEvent(null);
          activeSensorRef.current = null;
          const eventName = type === Action.DragEnd ? 'onDragEnd' : 'onDragCancel';

          if (event) {
            const handler = latestProps.current[eventName];
            handler == null ? void 0 : handler(event);
            dispatchMonitorEvent({
              type: eventName,
              event
            });
          }
        });
      };
    }
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [draggableNodes]);
  const bindActivatorToSensorInstantiator = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((handler, sensor) => {
    return (event, active) => {
      const nativeEvent = event.nativeEvent;
      const activeDraggableNode = draggableNodes.get(active);

      if ( // Another sensor is already instantiating
      activeRef.current !== null || // No active draggable
      !activeDraggableNode || // Event has already been captured
      nativeEvent.dndKit || nativeEvent.defaultPrevented) {
        return;
      }

      const activationContext = {
        active: activeDraggableNode
      };
      const shouldActivate = handler(event, sensor.options, activationContext);

      if (shouldActivate === true) {
        nativeEvent.dndKit = {
          capturedBy: sensor.sensor
        };
        activeRef.current = active;
        instantiateSensor(event, sensor);
      }
    };
  }, [draggableNodes, instantiateSensor]);
  const activators = useCombineActivators(sensors, bindActivatorToSensorInstantiator);
  useSensorSetup(sensors);
  (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useIsomorphicLayoutEffect)(() => {
    if (activeNodeRect && status === Status.Initializing) {
      setStatus(Status.Initialized);
    }
  }, [activeNodeRect, status]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      onDragMove
    } = latestProps.current;
    const {
      active,
      activatorEvent,
      collisions,
      over
    } = sensorContext.current;

    if (!active || !activatorEvent) {
      return;
    }

    const event = {
      active,
      activatorEvent,
      collisions,
      delta: {
        x: scrollAdjustedTranslate.x,
        y: scrollAdjustedTranslate.y
      },
      over
    };
    (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.unstable_batchedUpdates)(() => {
      onDragMove == null ? void 0 : onDragMove(event);
      dispatchMonitorEvent({
        type: 'onDragMove',
        event
      });
    });
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [scrollAdjustedTranslate.x, scrollAdjustedTranslate.y]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      active,
      activatorEvent,
      collisions,
      droppableContainers,
      scrollAdjustedTranslate
    } = sensorContext.current;

    if (!active || activeRef.current == null || !activatorEvent || !scrollAdjustedTranslate) {
      return;
    }

    const {
      onDragOver
    } = latestProps.current;
    const overContainer = droppableContainers.get(overId);
    const over = overContainer && overContainer.rect.current ? {
      id: overContainer.id,
      rect: overContainer.rect.current,
      data: overContainer.data,
      disabled: overContainer.disabled
    } : null;
    const event = {
      active,
      activatorEvent,
      collisions,
      delta: {
        x: scrollAdjustedTranslate.x,
        y: scrollAdjustedTranslate.y
      },
      over
    };
    (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.unstable_batchedUpdates)(() => {
      setOver(over);
      onDragOver == null ? void 0 : onDragOver(event);
      dispatchMonitorEvent({
        type: 'onDragOver',
        event
      });
    });
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [overId]);
  (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useIsomorphicLayoutEffect)(() => {
    sensorContext.current = {
      activatorEvent,
      active,
      activeNode,
      collisionRect,
      collisions,
      droppableRects,
      draggableNodes,
      draggingNode,
      draggingNodeRect,
      droppableContainers,
      over,
      scrollableAncestors,
      scrollAdjustedTranslate
    };
    activeRects.current = {
      initial: draggingNodeRect,
      translated: collisionRect
    };
  }, [active, activeNode, collisions, collisionRect, draggableNodes, draggingNode, draggingNodeRect, droppableRects, droppableContainers, over, scrollableAncestors, scrollAdjustedTranslate]);
  useAutoScroller({ ...autoScrollOptions,
    delta: translate,
    draggingRect: collisionRect,
    pointerCoordinates,
    scrollableAncestors,
    scrollableAncestorRects
  });
  const publicContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const context = {
      active,
      activeNode,
      activeNodeRect,
      activatorEvent,
      collisions,
      containerNodeRect,
      dragOverlay,
      draggableNodes,
      droppableContainers,
      droppableRects,
      over,
      measureDroppableContainers,
      scrollableAncestors,
      scrollableAncestorRects,
      measuringConfiguration,
      measuringScheduled,
      windowRect
    };
    return context;
  }, [active, activeNode, activeNodeRect, activatorEvent, collisions, containerNodeRect, dragOverlay, draggableNodes, droppableContainers, droppableRects, over, measureDroppableContainers, scrollableAncestors, scrollableAncestorRects, measuringConfiguration, measuringScheduled, windowRect]);
  const internalContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const context = {
      activatorEvent,
      activators,
      active,
      activeNodeRect,
      ariaDescribedById: {
        draggable: draggableDescribedById
      },
      dispatch,
      draggableNodes,
      over,
      measureDroppableContainers
    };
    return context;
  }, [activatorEvent, activators, active, activeNodeRect, dispatch, draggableDescribedById, draggableNodes, over, measureDroppableContainers]);
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(DndMonitorContext.Provider, {
    value: registerMonitorListener
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(InternalContext.Provider, {
    value: internalContext
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(PublicContext.Provider, {
    value: publicContext
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ActiveDraggableContext.Provider, {
    value: transform
  }, children)), react__WEBPACK_IMPORTED_MODULE_0___default().createElement(RestoreFocus, {
    disabled: (accessibility == null ? void 0 : accessibility.restoreFocus) === false
  })), react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Accessibility, { ...accessibility,
    hiddenTextDescribedById: draggableDescribedById
  }));

  function getAutoScrollerOptions() {
    const activeSensorDisablesAutoscroll = (activeSensor == null ? void 0 : activeSensor.autoScrollEnabled) === false;
    const autoScrollGloballyDisabled = typeof autoScroll === 'object' ? autoScroll.enabled === false : autoScroll === false;
    const enabled = isInitialized && !activeSensorDisablesAutoscroll && !autoScrollGloballyDisabled;

    if (typeof autoScroll === 'object') {
      return { ...autoScroll,
        enabled
      };
    }

    return {
      enabled
    };
  }
});

const NullContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
const defaultRole = 'button';
const ID_PREFIX = 'Draggable';
function useDraggable(_ref) {
  let {
    id,
    data,
    disabled = false,
    attributes
  } = _ref;
  const key = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useUniqueId)(ID_PREFIX);
  const {
    activators,
    activatorEvent,
    active,
    activeNodeRect,
    ariaDescribedById,
    draggableNodes,
    over
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(InternalContext);
  const {
    role = defaultRole,
    roleDescription = 'draggable',
    tabIndex = 0
  } = attributes != null ? attributes : {};
  const isDragging = (active == null ? void 0 : active.id) === id;
  const transform = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(isDragging ? ActiveDraggableContext : NullContext);
  const [node, setNodeRef] = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useNodeRef)();
  const [activatorNode, setActivatorNodeRef] = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useNodeRef)();
  const listeners = useSyntheticListeners(activators, id);
  const dataRef = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useLatestValue)(data);
  (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useIsomorphicLayoutEffect)(() => {
    draggableNodes.set(id, {
      id,
      key,
      node,
      activatorNode,
      data: dataRef
    });
    return () => {
      const node = draggableNodes.get(id);

      if (node && node.key === key) {
        draggableNodes.delete(id);
      }
    };
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [draggableNodes, id]);
  const memoizedAttributes = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    role,
    tabIndex,
    'aria-disabled': disabled,
    'aria-pressed': isDragging && role === defaultRole ? true : undefined,
    'aria-roledescription': roleDescription,
    'aria-describedby': ariaDescribedById.draggable
  }), [disabled, role, tabIndex, isDragging, roleDescription, ariaDescribedById.draggable]);
  return {
    active,
    activatorEvent,
    activeNodeRect,
    attributes: memoizedAttributes,
    isDragging,
    listeners: disabled ? undefined : listeners,
    node,
    over,
    setNodeRef,
    setActivatorNodeRef,
    transform
  };
}

function useDndContext() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(PublicContext);
}

const ID_PREFIX$1 = 'Droppable';
const defaultResizeObserverConfig = {
  timeout: 25
};
function useDroppable(_ref) {
  let {
    data,
    disabled = false,
    id,
    resizeObserverConfig
  } = _ref;
  const key = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useUniqueId)(ID_PREFIX$1);
  const {
    active,
    dispatch,
    over,
    measureDroppableContainers
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(InternalContext);
  const previous = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({
    disabled
  });
  const resizeObserverConnected = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const rect = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const callbackId = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const {
    disabled: resizeObserverDisabled,
    updateMeasurementsFor,
    timeout: resizeObserverTimeout
  } = { ...defaultResizeObserverConfig,
    ...resizeObserverConfig
  };
  const ids = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useLatestValue)(updateMeasurementsFor != null ? updateMeasurementsFor : id);
  const handleResize = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (!resizeObserverConnected.current) {
      // ResizeObserver invokes the `handleResize` callback as soon as `observe` is called,
      // assuming the element is rendered and displayed.
      resizeObserverConnected.current = true;
      return;
    }

    if (callbackId.current != null) {
      clearTimeout(callbackId.current);
    }

    callbackId.current = setTimeout(() => {
      measureDroppableContainers(Array.isArray(ids.current) ? ids.current : [ids.current]);
      callbackId.current = null;
    }, resizeObserverTimeout);
  }, //eslint-disable-next-line react-hooks/exhaustive-deps
  [resizeObserverTimeout]);
  const resizeObserver = useResizeObserver({
    callback: handleResize,
    disabled: resizeObserverDisabled || !active
  });
  const handleNodeChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((newElement, previousElement) => {
    if (!resizeObserver) {
      return;
    }

    if (previousElement) {
      resizeObserver.unobserve(previousElement);
      resizeObserverConnected.current = false;
    }

    if (newElement) {
      resizeObserver.observe(newElement);
    }
  }, [resizeObserver]);
  const [nodeRef, setNodeRef] = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useNodeRef)(handleNodeChange);
  const dataRef = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useLatestValue)(data);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!resizeObserver || !nodeRef.current) {
      return;
    }

    resizeObserver.disconnect();
    resizeObserverConnected.current = false;
    resizeObserver.observe(nodeRef.current);
  }, [nodeRef, resizeObserver]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    dispatch({
      type: Action.RegisterDroppable,
      element: {
        id,
        key,
        disabled,
        node: nodeRef,
        rect,
        data: dataRef
      }
    });
    return () => dispatch({
      type: Action.UnregisterDroppable,
      key,
      id
    });
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [id]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (disabled !== previous.current.disabled) {
      dispatch({
        type: Action.SetDroppableDisabled,
        id,
        key,
        disabled
      });
      previous.current.disabled = disabled;
    }
  }, [id, key, disabled, dispatch]);
  return {
    active,
    rect,
    isOver: (over == null ? void 0 : over.id) === id,
    node: nodeRef,
    over,
    setNodeRef
  };
}

function AnimationManager(_ref) {
  let {
    animation,
    children
  } = _ref;
  const [clonedChildren, setClonedChildren] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [element, setElement] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const previousChildren = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.usePrevious)(children);

  if (!children && !clonedChildren && previousChildren) {
    setClonedChildren(previousChildren);
  }

  (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useIsomorphicLayoutEffect)(() => {
    if (!element) {
      return;
    }

    const key = clonedChildren == null ? void 0 : clonedChildren.key;
    const id = clonedChildren == null ? void 0 : clonedChildren.props.id;

    if (key == null || id == null) {
      setClonedChildren(null);
      return;
    }

    Promise.resolve(animation(id, element)).then(() => {
      setClonedChildren(null);
    });
  }, [animation, clonedChildren, element]);
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, children, clonedChildren ? (0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(clonedChildren, {
    ref: setElement
  }) : null);
}

const defaultTransform = {
  x: 0,
  y: 0,
  scaleX: 1,
  scaleY: 1
};
function NullifiedContextProvider(_ref) {
  let {
    children
  } = _ref;
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(InternalContext.Provider, {
    value: defaultInternalContext
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ActiveDraggableContext.Provider, {
    value: defaultTransform
  }, children));
}

const baseStyles = {
  position: 'fixed',
  touchAction: 'none'
};

const defaultTransition = activatorEvent => {
  const isKeyboardActivator = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isKeyboardEvent)(activatorEvent);
  return isKeyboardActivator ? 'transform 250ms ease' : undefined;
};

const PositionedOverlay = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((_ref, ref) => {
  let {
    as,
    activatorEvent,
    adjustScale,
    children,
    className,
    rect,
    style,
    transform,
    transition = defaultTransition
  } = _ref;

  if (!rect) {
    return null;
  }

  const scaleAdjustedTransform = adjustScale ? transform : { ...transform,
    scaleX: 1,
    scaleY: 1
  };
  const styles = { ...baseStyles,
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left,
    transform: _dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.CSS.Transform.toString(scaleAdjustedTransform),
    transformOrigin: adjustScale && activatorEvent ? getRelativeTransformOrigin(activatorEvent, rect) : undefined,
    transition: typeof transition === 'function' ? transition(activatorEvent) : transition,
    ...style
  };
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(as, {
    className,
    style: styles,
    ref
  }, children);
});

const defaultDropAnimationSideEffects = options => _ref => {
  let {
    active,
    dragOverlay
  } = _ref;
  const originalStyles = {};
  const {
    styles,
    className
  } = options;

  if (styles != null && styles.active) {
    for (const [key, value] of Object.entries(styles.active)) {
      if (value === undefined) {
        continue;
      }

      originalStyles[key] = active.node.style.getPropertyValue(key);
      active.node.style.setProperty(key, value);
    }
  }

  if (styles != null && styles.dragOverlay) {
    for (const [key, value] of Object.entries(styles.dragOverlay)) {
      if (value === undefined) {
        continue;
      }

      dragOverlay.node.style.setProperty(key, value);
    }
  }

  if (className != null && className.active) {
    active.node.classList.add(className.active);
  }

  if (className != null && className.dragOverlay) {
    dragOverlay.node.classList.add(className.dragOverlay);
  }

  return function cleanup() {
    for (const [key, value] of Object.entries(originalStyles)) {
      active.node.style.setProperty(key, value);
    }

    if (className != null && className.active) {
      active.node.classList.remove(className.active);
    }
  };
};

const defaultKeyframeResolver = _ref2 => {
  let {
    transform: {
      initial,
      final
    }
  } = _ref2;
  return [{
    transform: _dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.CSS.Transform.toString(initial)
  }, {
    transform: _dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.CSS.Transform.toString(final)
  }];
};

const defaultDropAnimationConfiguration = {
  duration: 250,
  easing: 'ease',
  keyframes: defaultKeyframeResolver,
  sideEffects: /*#__PURE__*/defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0'
      }
    }
  })
};
function useDropAnimation(_ref3) {
  let {
    config,
    draggableNodes,
    droppableContainers,
    measuringConfiguration
  } = _ref3;
  return (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useEvent)((id, node) => {
    if (config === null) {
      return;
    }

    const activeDraggable = draggableNodes.get(id);

    if (!activeDraggable) {
      return;
    }

    const activeNode = activeDraggable.node.current;

    if (!activeNode) {
      return;
    }

    const measurableNode = getMeasurableNode(node);

    if (!measurableNode) {
      return;
    }

    const {
      transform
    } = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getWindow)(node).getComputedStyle(node);
    const parsedTransform = parseTransform(transform);

    if (!parsedTransform) {
      return;
    }

    const animation = typeof config === 'function' ? config : createDefaultDropAnimation(config);
    scrollIntoViewIfNeeded(activeNode, measuringConfiguration.draggable.measure);
    return animation({
      active: {
        id,
        data: activeDraggable.data,
        node: activeNode,
        rect: measuringConfiguration.draggable.measure(activeNode)
      },
      draggableNodes,
      dragOverlay: {
        node,
        rect: measuringConfiguration.dragOverlay.measure(measurableNode)
      },
      droppableContainers,
      measuringConfiguration,
      transform: parsedTransform
    });
  });
}

function createDefaultDropAnimation(options) {
  const {
    duration,
    easing,
    sideEffects,
    keyframes
  } = { ...defaultDropAnimationConfiguration,
    ...options
  };
  return _ref4 => {
    let {
      active,
      dragOverlay,
      transform,
      ...rest
    } = _ref4;

    if (!duration) {
      // Do not animate if animation duration is zero.
      return;
    }

    const delta = {
      x: dragOverlay.rect.left - active.rect.left,
      y: dragOverlay.rect.top - active.rect.top
    };
    const scale = {
      scaleX: transform.scaleX !== 1 ? active.rect.width * transform.scaleX / dragOverlay.rect.width : 1,
      scaleY: transform.scaleY !== 1 ? active.rect.height * transform.scaleY / dragOverlay.rect.height : 1
    };
    const finalTransform = {
      x: transform.x - delta.x,
      y: transform.y - delta.y,
      ...scale
    };
    const animationKeyframes = keyframes({ ...rest,
      active,
      dragOverlay,
      transform: {
        initial: transform,
        final: finalTransform
      }
    });
    const [firstKeyframe] = animationKeyframes;
    const lastKeyframe = animationKeyframes[animationKeyframes.length - 1];

    if (JSON.stringify(firstKeyframe) === JSON.stringify(lastKeyframe)) {
      // The start and end keyframes are the same, infer that there is no animation needed.
      return;
    }

    const cleanup = sideEffects == null ? void 0 : sideEffects({
      active,
      dragOverlay,
      ...rest
    });
    const animation = dragOverlay.node.animate(animationKeyframes, {
      duration,
      easing,
      fill: 'forwards'
    });
    return new Promise(resolve => {
      animation.onfinish = () => {
        cleanup == null ? void 0 : cleanup();
        resolve();
      };
    });
  };
}

let key = 0;
function useKey(id) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (id == null) {
      return;
    }

    key++;
    return key;
  }, [id]);
}

const DragOverlay = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(_ref => {
  let {
    adjustScale = false,
    children,
    dropAnimation: dropAnimationConfig,
    style,
    transition,
    modifiers,
    wrapperElement = 'div',
    className,
    zIndex = 999
  } = _ref;
  const {
    activatorEvent,
    active,
    activeNodeRect,
    containerNodeRect,
    draggableNodes,
    droppableContainers,
    dragOverlay,
    over,
    measuringConfiguration,
    scrollableAncestors,
    scrollableAncestorRects,
    windowRect
  } = useDndContext();
  const transform = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ActiveDraggableContext);
  const key = useKey(active == null ? void 0 : active.id);
  const modifiedTransform = applyModifiers(modifiers, {
    activatorEvent,
    active,
    activeNodeRect,
    containerNodeRect,
    draggingNodeRect: dragOverlay.rect,
    over,
    overlayNodeRect: dragOverlay.rect,
    scrollableAncestors,
    scrollableAncestorRects,
    transform,
    windowRect
  });
  const initialRect = useInitialValue(activeNodeRect);
  const dropAnimation = useDropAnimation({
    config: dropAnimationConfig,
    draggableNodes,
    droppableContainers,
    measuringConfiguration
  }); // We need to wait for the active node to be measured before connecting the drag overlay ref
  // otherwise collisions can be computed against a mispositioned drag overlay

  const ref = initialRect ? dragOverlay.setRef : undefined;
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(NullifiedContextProvider, null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(AnimationManager, {
    animation: dropAnimation
  }, active && key ? react__WEBPACK_IMPORTED_MODULE_0___default().createElement(PositionedOverlay, {
    key: key,
    id: active.id,
    ref: ref,
    as: wrapperElement,
    activatorEvent: activatorEvent,
    adjustScale: adjustScale,
    className: className,
    transition: transition,
    rect: initialRect,
    style: {
      zIndex,
      ...style
    },
    transform: modifiedTransform
  }, children) : null));
});


//# sourceMappingURL=core.esm.js.map


/***/ }),

/***/ "./node_modules/@dnd-kit/modifiers/dist/modifiers.esm.js":
/*!***************************************************************!*\
  !*** ./node_modules/@dnd-kit/modifiers/dist/modifiers.esm.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createSnapModifier: function() { return /* binding */ createSnapModifier; },
/* harmony export */   restrictToFirstScrollableAncestor: function() { return /* binding */ restrictToFirstScrollableAncestor; },
/* harmony export */   restrictToHorizontalAxis: function() { return /* binding */ restrictToHorizontalAxis; },
/* harmony export */   restrictToParentElement: function() { return /* binding */ restrictToParentElement; },
/* harmony export */   restrictToVerticalAxis: function() { return /* binding */ restrictToVerticalAxis; },
/* harmony export */   restrictToWindowEdges: function() { return /* binding */ restrictToWindowEdges; },
/* harmony export */   snapCenterToCursor: function() { return /* binding */ snapCenterToCursor; }
/* harmony export */ });
/* harmony import */ var _dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @dnd-kit/utilities */ "./node_modules/@dnd-kit/utilities/dist/utilities.esm.js");


function createSnapModifier(gridSize) {
  return _ref => {
    let {
      transform
    } = _ref;
    return { ...transform,
      x: Math.ceil(transform.x / gridSize) * gridSize,
      y: Math.ceil(transform.y / gridSize) * gridSize
    };
  };
}

const restrictToHorizontalAxis = _ref => {
  let {
    transform
  } = _ref;
  return { ...transform,
    y: 0
  };
};

function restrictToBoundingRect(transform, rect, boundingRect) {
  const value = { ...transform
  };

  if (rect.top + transform.y <= boundingRect.top) {
    value.y = boundingRect.top - rect.top;
  } else if (rect.bottom + transform.y >= boundingRect.top + boundingRect.height) {
    value.y = boundingRect.top + boundingRect.height - rect.bottom;
  }

  if (rect.left + transform.x <= boundingRect.left) {
    value.x = boundingRect.left - rect.left;
  } else if (rect.right + transform.x >= boundingRect.left + boundingRect.width) {
    value.x = boundingRect.left + boundingRect.width - rect.right;
  }

  return value;
}

const restrictToParentElement = _ref => {
  let {
    containerNodeRect,
    draggingNodeRect,
    transform
  } = _ref;

  if (!draggingNodeRect || !containerNodeRect) {
    return transform;
  }

  return restrictToBoundingRect(transform, draggingNodeRect, containerNodeRect);
};

const restrictToFirstScrollableAncestor = _ref => {
  let {
    draggingNodeRect,
    transform,
    scrollableAncestorRects
  } = _ref;
  const firstScrollableAncestorRect = scrollableAncestorRects[0];

  if (!draggingNodeRect || !firstScrollableAncestorRect) {
    return transform;
  }

  return restrictToBoundingRect(transform, draggingNodeRect, firstScrollableAncestorRect);
};

const restrictToVerticalAxis = _ref => {
  let {
    transform
  } = _ref;
  return { ...transform,
    x: 0
  };
};

const restrictToWindowEdges = _ref => {
  let {
    transform,
    draggingNodeRect,
    windowRect
  } = _ref;

  if (!draggingNodeRect || !windowRect) {
    return transform;
  }

  return restrictToBoundingRect(transform, draggingNodeRect, windowRect);
};

const snapCenterToCursor = _ref => {
  let {
    activatorEvent,
    draggingNodeRect,
    transform
  } = _ref;

  if (draggingNodeRect && activatorEvent) {
    const activatorCoordinates = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_0__.getEventCoordinates)(activatorEvent);

    if (!activatorCoordinates) {
      return transform;
    }

    const offsetX = activatorCoordinates.x - draggingNodeRect.left;
    const offsetY = activatorCoordinates.y - draggingNodeRect.top;
    return { ...transform,
      x: transform.x + offsetX - draggingNodeRect.width / 2,
      y: transform.y + offsetY - draggingNodeRect.height / 2
    };
  }

  return transform;
};


//# sourceMappingURL=modifiers.esm.js.map


/***/ }),

/***/ "./node_modules/@dnd-kit/sortable/dist/sortable.esm.js":
/*!*************************************************************!*\
  !*** ./node_modules/@dnd-kit/sortable/dist/sortable.esm.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SortableContext: function() { return /* binding */ SortableContext; },
/* harmony export */   arrayMove: function() { return /* binding */ arrayMove; },
/* harmony export */   arraySwap: function() { return /* binding */ arraySwap; },
/* harmony export */   defaultAnimateLayoutChanges: function() { return /* binding */ defaultAnimateLayoutChanges; },
/* harmony export */   defaultNewIndexGetter: function() { return /* binding */ defaultNewIndexGetter; },
/* harmony export */   hasSortableData: function() { return /* binding */ hasSortableData; },
/* harmony export */   horizontalListSortingStrategy: function() { return /* binding */ horizontalListSortingStrategy; },
/* harmony export */   rectSortingStrategy: function() { return /* binding */ rectSortingStrategy; },
/* harmony export */   rectSwappingStrategy: function() { return /* binding */ rectSwappingStrategy; },
/* harmony export */   sortableKeyboardCoordinates: function() { return /* binding */ sortableKeyboardCoordinates; },
/* harmony export */   useSortable: function() { return /* binding */ useSortable; },
/* harmony export */   verticalListSortingStrategy: function() { return /* binding */ verticalListSortingStrategy; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dnd-kit/core */ "./node_modules/@dnd-kit/core/dist/core.esm.js");
/* harmony import */ var _dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dnd-kit/utilities */ "./node_modules/@dnd-kit/utilities/dist/utilities.esm.js");




/**
 * Move an array item to a different position. Returns a new array with the item moved to the new position.
 */
function arrayMove(array, from, to) {
  const newArray = array.slice();
  newArray.splice(to < 0 ? newArray.length + to : to, 0, newArray.splice(from, 1)[0]);
  return newArray;
}

/**
 * Swap an array item to a different position. Returns a new array with the item swapped to the new position.
 */
function arraySwap(array, from, to) {
  const newArray = array.slice();
  newArray[from] = array[to];
  newArray[to] = array[from];
  return newArray;
}

function getSortedRects(items, rects) {
  return items.reduce((accumulator, id, index) => {
    const rect = rects.get(id);

    if (rect) {
      accumulator[index] = rect;
    }

    return accumulator;
  }, Array(items.length));
}

function isValidIndex(index) {
  return index !== null && index >= 0;
}

function itemsEqual(a, b) {
  if (a === b) {
    return true;
  }

  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}

function normalizeDisabled(disabled) {
  if (typeof disabled === 'boolean') {
    return {
      draggable: disabled,
      droppable: disabled
    };
  }

  return disabled;
}

// To-do: We should be calculating scale transformation
const defaultScale = {
  scaleX: 1,
  scaleY: 1
};
const horizontalListSortingStrategy = _ref => {
  var _rects$activeIndex;

  let {
    rects,
    activeNodeRect: fallbackActiveRect,
    activeIndex,
    overIndex,
    index
  } = _ref;
  const activeNodeRect = (_rects$activeIndex = rects[activeIndex]) != null ? _rects$activeIndex : fallbackActiveRect;

  if (!activeNodeRect) {
    return null;
  }

  const itemGap = getItemGap(rects, index, activeIndex);

  if (index === activeIndex) {
    const newIndexRect = rects[overIndex];

    if (!newIndexRect) {
      return null;
    }

    return {
      x: activeIndex < overIndex ? newIndexRect.left + newIndexRect.width - (activeNodeRect.left + activeNodeRect.width) : newIndexRect.left - activeNodeRect.left,
      y: 0,
      ...defaultScale
    };
  }

  if (index > activeIndex && index <= overIndex) {
    return {
      x: -activeNodeRect.width - itemGap,
      y: 0,
      ...defaultScale
    };
  }

  if (index < activeIndex && index >= overIndex) {
    return {
      x: activeNodeRect.width + itemGap,
      y: 0,
      ...defaultScale
    };
  }

  return {
    x: 0,
    y: 0,
    ...defaultScale
  };
};

function getItemGap(rects, index, activeIndex) {
  const currentRect = rects[index];
  const previousRect = rects[index - 1];
  const nextRect = rects[index + 1];

  if (!currentRect || !previousRect && !nextRect) {
    return 0;
  }

  if (activeIndex < index) {
    return previousRect ? currentRect.left - (previousRect.left + previousRect.width) : nextRect.left - (currentRect.left + currentRect.width);
  }

  return nextRect ? nextRect.left - (currentRect.left + currentRect.width) : currentRect.left - (previousRect.left + previousRect.width);
}

const rectSortingStrategy = _ref => {
  let {
    rects,
    activeIndex,
    overIndex,
    index
  } = _ref;
  const newRects = arrayMove(rects, overIndex, activeIndex);
  const oldRect = rects[index];
  const newRect = newRects[index];

  if (!newRect || !oldRect) {
    return null;
  }

  return {
    x: newRect.left - oldRect.left,
    y: newRect.top - oldRect.top,
    scaleX: newRect.width / oldRect.width,
    scaleY: newRect.height / oldRect.height
  };
};

const rectSwappingStrategy = _ref => {
  let {
    activeIndex,
    index,
    rects,
    overIndex
  } = _ref;
  let oldRect;
  let newRect;

  if (index === activeIndex) {
    oldRect = rects[index];
    newRect = rects[overIndex];
  }

  if (index === overIndex) {
    oldRect = rects[index];
    newRect = rects[activeIndex];
  }

  if (!newRect || !oldRect) {
    return null;
  }

  return {
    x: newRect.left - oldRect.left,
    y: newRect.top - oldRect.top,
    scaleX: newRect.width / oldRect.width,
    scaleY: newRect.height / oldRect.height
  };
};

// To-do: We should be calculating scale transformation
const defaultScale$1 = {
  scaleX: 1,
  scaleY: 1
};
const verticalListSortingStrategy = _ref => {
  var _rects$activeIndex;

  let {
    activeIndex,
    activeNodeRect: fallbackActiveRect,
    index,
    rects,
    overIndex
  } = _ref;
  const activeNodeRect = (_rects$activeIndex = rects[activeIndex]) != null ? _rects$activeIndex : fallbackActiveRect;

  if (!activeNodeRect) {
    return null;
  }

  if (index === activeIndex) {
    const overIndexRect = rects[overIndex];

    if (!overIndexRect) {
      return null;
    }

    return {
      x: 0,
      y: activeIndex < overIndex ? overIndexRect.top + overIndexRect.height - (activeNodeRect.top + activeNodeRect.height) : overIndexRect.top - activeNodeRect.top,
      ...defaultScale$1
    };
  }

  const itemGap = getItemGap$1(rects, index, activeIndex);

  if (index > activeIndex && index <= overIndex) {
    return {
      x: 0,
      y: -activeNodeRect.height - itemGap,
      ...defaultScale$1
    };
  }

  if (index < activeIndex && index >= overIndex) {
    return {
      x: 0,
      y: activeNodeRect.height + itemGap,
      ...defaultScale$1
    };
  }

  return {
    x: 0,
    y: 0,
    ...defaultScale$1
  };
};

function getItemGap$1(clientRects, index, activeIndex) {
  const currentRect = clientRects[index];
  const previousRect = clientRects[index - 1];
  const nextRect = clientRects[index + 1];

  if (!currentRect) {
    return 0;
  }

  if (activeIndex < index) {
    return previousRect ? currentRect.top - (previousRect.top + previousRect.height) : nextRect ? nextRect.top - (currentRect.top + currentRect.height) : 0;
  }

  return nextRect ? nextRect.top - (currentRect.top + currentRect.height) : previousRect ? currentRect.top - (previousRect.top + previousRect.height) : 0;
}

const ID_PREFIX = 'Sortable';
const Context = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext({
  activeIndex: -1,
  containerId: ID_PREFIX,
  disableTransforms: false,
  items: [],
  overIndex: -1,
  useDragOverlay: false,
  sortedRects: [],
  strategy: rectSortingStrategy,
  disabled: {
    draggable: false,
    droppable: false
  }
});
function SortableContext(_ref) {
  let {
    children,
    id,
    items: userDefinedItems,
    strategy = rectSortingStrategy,
    disabled: disabledProp = false
  } = _ref;
  const {
    active,
    dragOverlay,
    droppableRects,
    over,
    measureDroppableContainers
  } = (0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.useDndContext)();
  const containerId = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useUniqueId)(ID_PREFIX, id);
  const useDragOverlay = Boolean(dragOverlay.rect !== null);
  const items = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => userDefinedItems.map(item => typeof item === 'object' && 'id' in item ? item.id : item), [userDefinedItems]);
  const isDragging = active != null;
  const activeIndex = active ? items.indexOf(active.id) : -1;
  const overIndex = over ? items.indexOf(over.id) : -1;
  const previousItemsRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(items);
  const itemsHaveChanged = !itemsEqual(items, previousItemsRef.current);
  const disableTransforms = overIndex !== -1 && activeIndex === -1 || itemsHaveChanged;
  const disabled = normalizeDisabled(disabledProp);
  (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useIsomorphicLayoutEffect)(() => {
    if (itemsHaveChanged && isDragging) {
      measureDroppableContainers(items);
    }
  }, [itemsHaveChanged, items, isDragging, measureDroppableContainers]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    previousItemsRef.current = items;
  }, [items]);
  const contextValue = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    activeIndex,
    containerId,
    disabled,
    disableTransforms,
    items,
    overIndex,
    useDragOverlay,
    sortedRects: getSortedRects(items, droppableRects),
    strategy
  }), // eslint-disable-next-line react-hooks/exhaustive-deps
  [activeIndex, containerId, disabled.draggable, disabled.droppable, disableTransforms, items, overIndex, droppableRects, useDragOverlay, strategy]);
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Context.Provider, {
    value: contextValue
  }, children);
}

const defaultNewIndexGetter = _ref => {
  let {
    id,
    items,
    activeIndex,
    overIndex
  } = _ref;
  return arrayMove(items, activeIndex, overIndex).indexOf(id);
};
const defaultAnimateLayoutChanges = _ref2 => {
  let {
    containerId,
    isSorting,
    wasDragging,
    index,
    items,
    newIndex,
    previousItems,
    previousContainerId,
    transition
  } = _ref2;

  if (!transition || !wasDragging) {
    return false;
  }

  if (previousItems !== items && index === newIndex) {
    return false;
  }

  if (isSorting) {
    return true;
  }

  return newIndex !== index && containerId === previousContainerId;
};
const defaultTransition = {
  duration: 200,
  easing: 'ease'
};
const transitionProperty = 'transform';
const disabledTransition = /*#__PURE__*/_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.CSS.Transition.toString({
  property: transitionProperty,
  duration: 0,
  easing: 'linear'
});
const defaultAttributes = {
  roleDescription: 'sortable'
};

/*
 * When the index of an item changes while sorting,
 * we need to temporarily disable the transforms
 */

function useDerivedTransform(_ref) {
  let {
    disabled,
    index,
    node,
    rect
  } = _ref;
  const [derivedTransform, setDerivedtransform] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const previousIndex = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(index);
  (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useIsomorphicLayoutEffect)(() => {
    if (!disabled && index !== previousIndex.current && node.current) {
      const initial = rect.current;

      if (initial) {
        const current = (0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.getClientRect)(node.current, {
          ignoreTransform: true
        });
        const delta = {
          x: initial.left - current.left,
          y: initial.top - current.top,
          scaleX: initial.width / current.width,
          scaleY: initial.height / current.height
        };

        if (delta.x || delta.y) {
          setDerivedtransform(delta);
        }
      }
    }

    if (index !== previousIndex.current) {
      previousIndex.current = index;
    }
  }, [disabled, index, node, rect]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (derivedTransform) {
      setDerivedtransform(null);
    }
  }, [derivedTransform]);
  return derivedTransform;
}

function useSortable(_ref) {
  let {
    animateLayoutChanges = defaultAnimateLayoutChanges,
    attributes: userDefinedAttributes,
    disabled: localDisabled,
    data: customData,
    getNewIndex = defaultNewIndexGetter,
    id,
    strategy: localStrategy,
    resizeObserverConfig,
    transition = defaultTransition
  } = _ref;
  const {
    items,
    containerId,
    activeIndex,
    disabled: globalDisabled,
    disableTransforms,
    sortedRects,
    overIndex,
    useDragOverlay,
    strategy: globalStrategy
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(Context);
  const disabled = normalizeLocalDisabled(localDisabled, globalDisabled);
  const index = items.indexOf(id);
  const data = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    sortable: {
      containerId,
      index,
      items
    },
    ...customData
  }), [containerId, customData, index, items]);
  const itemsAfterCurrentSortable = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => items.slice(items.indexOf(id)), [items, id]);
  const {
    rect,
    node,
    isOver,
    setNodeRef: setDroppableNodeRef
  } = (0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.useDroppable)({
    id,
    data,
    disabled: disabled.droppable,
    resizeObserverConfig: {
      updateMeasurementsFor: itemsAfterCurrentSortable,
      ...resizeObserverConfig
    }
  });
  const {
    active,
    activatorEvent,
    activeNodeRect,
    attributes,
    setNodeRef: setDraggableNodeRef,
    listeners,
    isDragging,
    over,
    setActivatorNodeRef,
    transform
  } = (0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.useDraggable)({
    id,
    data,
    attributes: { ...defaultAttributes,
      ...userDefinedAttributes
    },
    disabled: disabled.draggable
  });
  const setNodeRef = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useCombinedRefs)(setDroppableNodeRef, setDraggableNodeRef);
  const isSorting = Boolean(active);
  const displaceItem = isSorting && !disableTransforms && isValidIndex(activeIndex) && isValidIndex(overIndex);
  const shouldDisplaceDragSource = !useDragOverlay && isDragging;
  const dragSourceDisplacement = shouldDisplaceDragSource && displaceItem ? transform : null;
  const strategy = localStrategy != null ? localStrategy : globalStrategy;
  const finalTransform = displaceItem ? dragSourceDisplacement != null ? dragSourceDisplacement : strategy({
    rects: sortedRects,
    activeNodeRect,
    activeIndex,
    overIndex,
    index
  }) : null;
  const newIndex = isValidIndex(activeIndex) && isValidIndex(overIndex) ? getNewIndex({
    id,
    items,
    activeIndex,
    overIndex
  }) : index;
  const activeId = active == null ? void 0 : active.id;
  const previous = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({
    activeId,
    items,
    newIndex,
    containerId
  });
  const itemsHaveChanged = items !== previous.current.items;
  const shouldAnimateLayoutChanges = animateLayoutChanges({
    active,
    containerId,
    isDragging,
    isSorting,
    id,
    index,
    items,
    newIndex: previous.current.newIndex,
    previousItems: previous.current.items,
    previousContainerId: previous.current.containerId,
    transition,
    wasDragging: previous.current.activeId != null
  });
  const derivedTransform = useDerivedTransform({
    disabled: !shouldAnimateLayoutChanges,
    index,
    node,
    rect
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isSorting && previous.current.newIndex !== newIndex) {
      previous.current.newIndex = newIndex;
    }

    if (containerId !== previous.current.containerId) {
      previous.current.containerId = containerId;
    }

    if (items !== previous.current.items) {
      previous.current.items = items;
    }
  }, [isSorting, newIndex, containerId, items]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (activeId === previous.current.activeId) {
      return;
    }

    if (activeId != null && previous.current.activeId == null) {
      previous.current.activeId = activeId;
      return;
    }

    const timeoutId = setTimeout(() => {
      previous.current.activeId = activeId;
    }, 50);
    return () => clearTimeout(timeoutId);
  }, [activeId]);
  return {
    active,
    activeIndex,
    attributes,
    data,
    rect,
    index,
    newIndex,
    items,
    isOver,
    isSorting,
    isDragging,
    listeners,
    node,
    overIndex,
    over,
    setNodeRef,
    setActivatorNodeRef,
    setDroppableNodeRef,
    setDraggableNodeRef,
    transform: derivedTransform != null ? derivedTransform : finalTransform,
    transition: getTransition()
  };

  function getTransition() {
    if ( // Temporarily disable transitions for a single frame to set up derived transforms
    derivedTransform || // Or to prevent items jumping to back to their "new" position when items change
    itemsHaveChanged && previous.current.newIndex === index) {
      return disabledTransition;
    }

    if (shouldDisplaceDragSource && !(0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isKeyboardEvent)(activatorEvent) || !transition) {
      return undefined;
    }

    if (isSorting || shouldAnimateLayoutChanges) {
      return _dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.CSS.Transition.toString({ ...transition,
        property: transitionProperty
      });
    }

    return undefined;
  }
}

function normalizeLocalDisabled(localDisabled, globalDisabled) {
  var _localDisabled$dragga, _localDisabled$droppa;

  if (typeof localDisabled === 'boolean') {
    return {
      draggable: localDisabled,
      // Backwards compatibility
      droppable: false
    };
  }

  return {
    draggable: (_localDisabled$dragga = localDisabled == null ? void 0 : localDisabled.draggable) != null ? _localDisabled$dragga : globalDisabled.draggable,
    droppable: (_localDisabled$droppa = localDisabled == null ? void 0 : localDisabled.droppable) != null ? _localDisabled$droppa : globalDisabled.droppable
  };
}

function hasSortableData(entry) {
  if (!entry) {
    return false;
  }

  const data = entry.data.current;

  if (data && 'sortable' in data && typeof data.sortable === 'object' && 'containerId' in data.sortable && 'items' in data.sortable && 'index' in data.sortable) {
    return true;
  }

  return false;
}

const directions = [_dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.KeyboardCode.Down, _dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.KeyboardCode.Right, _dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.KeyboardCode.Up, _dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.KeyboardCode.Left];
const sortableKeyboardCoordinates = (event, _ref) => {
  let {
    context: {
      active,
      collisionRect,
      droppableRects,
      droppableContainers,
      over,
      scrollableAncestors
    }
  } = _ref;

  if (directions.includes(event.code)) {
    event.preventDefault();

    if (!active || !collisionRect) {
      return;
    }

    const filteredContainers = [];
    droppableContainers.getEnabled().forEach(entry => {
      if (!entry || entry != null && entry.disabled) {
        return;
      }

      const rect = droppableRects.get(entry.id);

      if (!rect) {
        return;
      }

      switch (event.code) {
        case _dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.KeyboardCode.Down:
          if (collisionRect.top < rect.top) {
            filteredContainers.push(entry);
          }

          break;

        case _dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.KeyboardCode.Up:
          if (collisionRect.top > rect.top) {
            filteredContainers.push(entry);
          }

          break;

        case _dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.KeyboardCode.Left:
          if (collisionRect.left > rect.left) {
            filteredContainers.push(entry);
          }

          break;

        case _dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.KeyboardCode.Right:
          if (collisionRect.left < rect.left) {
            filteredContainers.push(entry);
          }

          break;
      }
    });
    const collisions = (0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.closestCorners)({
      active,
      collisionRect: collisionRect,
      droppableRects,
      droppableContainers: filteredContainers,
      pointerCoordinates: null
    });
    let closestId = (0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.getFirstCollision)(collisions, 'id');

    if (closestId === (over == null ? void 0 : over.id) && collisions.length > 1) {
      closestId = collisions[1].id;
    }

    if (closestId != null) {
      const activeDroppable = droppableContainers.get(active.id);
      const newDroppable = droppableContainers.get(closestId);
      const newRect = newDroppable ? droppableRects.get(newDroppable.id) : null;
      const newNode = newDroppable == null ? void 0 : newDroppable.node.current;

      if (newNode && newRect && activeDroppable && newDroppable) {
        const newScrollAncestors = (0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.getScrollableAncestors)(newNode);
        const hasDifferentScrollAncestors = newScrollAncestors.some((element, index) => scrollableAncestors[index] !== element);
        const hasSameContainer = isSameContainer(activeDroppable, newDroppable);
        const isAfterActive = isAfter(activeDroppable, newDroppable);
        const offset = hasDifferentScrollAncestors || !hasSameContainer ? {
          x: 0,
          y: 0
        } : {
          x: isAfterActive ? collisionRect.width - newRect.width : 0,
          y: isAfterActive ? collisionRect.height - newRect.height : 0
        };
        const rectCoordinates = {
          x: newRect.left,
          y: newRect.top
        };
        const newCoordinates = offset.x && offset.y ? rectCoordinates : (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.subtract)(rectCoordinates, offset);
        return newCoordinates;
      }
    }
  }

  return undefined;
};

function isSameContainer(a, b) {
  if (!hasSortableData(a) || !hasSortableData(b)) {
    return false;
  }

  return a.data.current.sortable.containerId === b.data.current.sortable.containerId;
}

function isAfter(a, b) {
  if (!hasSortableData(a) || !hasSortableData(b)) {
    return false;
  }

  if (!isSameContainer(a, b)) {
    return false;
  }

  return a.data.current.sortable.index < b.data.current.sortable.index;
}


//# sourceMappingURL=sortable.esm.js.map


/***/ }),

/***/ "./node_modules/@dnd-kit/utilities/dist/utilities.esm.js":
/*!***************************************************************!*\
  !*** ./node_modules/@dnd-kit/utilities/dist/utilities.esm.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CSS: function() { return /* binding */ CSS; },
/* harmony export */   add: function() { return /* binding */ add; },
/* harmony export */   canUseDOM: function() { return /* binding */ canUseDOM; },
/* harmony export */   findFirstFocusableNode: function() { return /* binding */ findFirstFocusableNode; },
/* harmony export */   getEventCoordinates: function() { return /* binding */ getEventCoordinates; },
/* harmony export */   getOwnerDocument: function() { return /* binding */ getOwnerDocument; },
/* harmony export */   getWindow: function() { return /* binding */ getWindow; },
/* harmony export */   hasViewportRelativeCoordinates: function() { return /* binding */ hasViewportRelativeCoordinates; },
/* harmony export */   isDocument: function() { return /* binding */ isDocument; },
/* harmony export */   isHTMLElement: function() { return /* binding */ isHTMLElement; },
/* harmony export */   isKeyboardEvent: function() { return /* binding */ isKeyboardEvent; },
/* harmony export */   isNode: function() { return /* binding */ isNode; },
/* harmony export */   isSVGElement: function() { return /* binding */ isSVGElement; },
/* harmony export */   isTouchEvent: function() { return /* binding */ isTouchEvent; },
/* harmony export */   isWindow: function() { return /* binding */ isWindow; },
/* harmony export */   subtract: function() { return /* binding */ subtract; },
/* harmony export */   useCombinedRefs: function() { return /* binding */ useCombinedRefs; },
/* harmony export */   useEvent: function() { return /* binding */ useEvent; },
/* harmony export */   useInterval: function() { return /* binding */ useInterval; },
/* harmony export */   useIsomorphicLayoutEffect: function() { return /* binding */ useIsomorphicLayoutEffect; },
/* harmony export */   useLatestValue: function() { return /* binding */ useLatestValue; },
/* harmony export */   useLazyMemo: function() { return /* binding */ useLazyMemo; },
/* harmony export */   useNodeRef: function() { return /* binding */ useNodeRef; },
/* harmony export */   usePrevious: function() { return /* binding */ usePrevious; },
/* harmony export */   useUniqueId: function() { return /* binding */ useUniqueId; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function useCombinedRefs() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
    refs[_key] = arguments[_key];
  }

  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => node => {
    refs.forEach(ref => ref(node));
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  refs);
}

// https://github.com/facebook/react/blob/master/packages/shared/ExecutionEnvironment.js
const canUseDOM = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined';

function isWindow(element) {
  const elementString = Object.prototype.toString.call(element);
  return elementString === '[object Window]' || // In Electron context the Window object serializes to [object global]
  elementString === '[object global]';
}

function isNode(node) {
  return 'nodeType' in node;
}

function getWindow(target) {
  var _target$ownerDocument, _target$ownerDocument2;

  if (!target) {
    return window;
  }

  if (isWindow(target)) {
    return target;
  }

  if (!isNode(target)) {
    return window;
  }

  return (_target$ownerDocument = (_target$ownerDocument2 = target.ownerDocument) == null ? void 0 : _target$ownerDocument2.defaultView) != null ? _target$ownerDocument : window;
}

function isDocument(node) {
  const {
    Document
  } = getWindow(node);
  return node instanceof Document;
}

function isHTMLElement(node) {
  if (isWindow(node)) {
    return false;
  }

  return node instanceof getWindow(node).HTMLElement;
}

function isSVGElement(node) {
  return node instanceof getWindow(node).SVGElement;
}

function getOwnerDocument(target) {
  if (!target) {
    return document;
  }

  if (isWindow(target)) {
    return target.document;
  }

  if (!isNode(target)) {
    return document;
  }

  if (isDocument(target)) {
    return target;
  }

  if (isHTMLElement(target) || isSVGElement(target)) {
    return target.ownerDocument;
  }

  return document;
}

/**
 * A hook that resolves to useEffect on the server and useLayoutEffect on the client
 * @param callback {function} Callback function that is invoked when the dependencies of the hook change
 */

const useIsomorphicLayoutEffect = canUseDOM ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;

function useEvent(handler) {
  const handlerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(handler);
  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  });
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return handlerRef.current == null ? void 0 : handlerRef.current(...args);
  }, []);
}

function useInterval() {
  const intervalRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const set = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((listener, duration) => {
    intervalRef.current = setInterval(listener, duration);
  }, []);
  const clear = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);
  return [set, clear];
}

function useLatestValue(value, dependencies) {
  if (dependencies === void 0) {
    dependencies = [value];
  }

  const valueRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(value);
  useIsomorphicLayoutEffect(() => {
    if (valueRef.current !== value) {
      valueRef.current = value;
    }
  }, dependencies);
  return valueRef;
}

function useLazyMemo(callback, dependencies) {
  const valueRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const newValue = callback(valueRef.current);
    valueRef.current = newValue;
    return newValue;
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [...dependencies]);
}

function useNodeRef(onChange) {
  const onChangeHandler = useEvent(onChange);
  const node = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const setNodeRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(element => {
    if (element !== node.current) {
      onChangeHandler == null ? void 0 : onChangeHandler(element, node.current);
    }

    node.current = element;
  }, //eslint-disable-next-line
  []);
  return [node, setNodeRef];
}

function usePrevious(value) {
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

let ids = {};
function useUniqueId(prefix, value) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (value) {
      return value;
    }

    const id = ids[prefix] == null ? 0 : ids[prefix] + 1;
    ids[prefix] = id;
    return prefix + "-" + id;
  }, [prefix, value]);
}

function createAdjustmentFn(modifier) {
  return function (object) {
    for (var _len = arguments.length, adjustments = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      adjustments[_key - 1] = arguments[_key];
    }

    return adjustments.reduce((accumulator, adjustment) => {
      const entries = Object.entries(adjustment);

      for (const [key, valueAdjustment] of entries) {
        const value = accumulator[key];

        if (value != null) {
          accumulator[key] = value + modifier * valueAdjustment;
        }
      }

      return accumulator;
    }, { ...object
    });
  };
}

const add = /*#__PURE__*/createAdjustmentFn(1);
const subtract = /*#__PURE__*/createAdjustmentFn(-1);

function hasViewportRelativeCoordinates(event) {
  return 'clientX' in event && 'clientY' in event;
}

function isKeyboardEvent(event) {
  if (!event) {
    return false;
  }

  const {
    KeyboardEvent
  } = getWindow(event.target);
  return KeyboardEvent && event instanceof KeyboardEvent;
}

function isTouchEvent(event) {
  if (!event) {
    return false;
  }

  const {
    TouchEvent
  } = getWindow(event.target);
  return TouchEvent && event instanceof TouchEvent;
}

/**
 * Returns the normalized x and y coordinates for mouse and touch events.
 */

function getEventCoordinates(event) {
  if (isTouchEvent(event)) {
    if (event.touches && event.touches.length) {
      const {
        clientX: x,
        clientY: y
      } = event.touches[0];
      return {
        x,
        y
      };
    } else if (event.changedTouches && event.changedTouches.length) {
      const {
        clientX: x,
        clientY: y
      } = event.changedTouches[0];
      return {
        x,
        y
      };
    }
  }

  if (hasViewportRelativeCoordinates(event)) {
    return {
      x: event.clientX,
      y: event.clientY
    };
  }

  return null;
}

const CSS = /*#__PURE__*/Object.freeze({
  Translate: {
    toString(transform) {
      if (!transform) {
        return;
      }

      const {
        x,
        y
      } = transform;
      return "translate3d(" + (x ? Math.round(x) : 0) + "px, " + (y ? Math.round(y) : 0) + "px, 0)";
    }

  },
  Scale: {
    toString(transform) {
      if (!transform) {
        return;
      }

      const {
        scaleX,
        scaleY
      } = transform;
      return "scaleX(" + scaleX + ") scaleY(" + scaleY + ")";
    }

  },
  Transform: {
    toString(transform) {
      if (!transform) {
        return;
      }

      return [CSS.Translate.toString(transform), CSS.Scale.toString(transform)].join(' ');
    }

  },
  Transition: {
    toString(_ref) {
      let {
        property,
        duration,
        easing
      } = _ref;
      return property + " " + duration + "ms " + easing;
    }

  }
});

const SELECTOR = 'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]';
function findFirstFocusableNode(element) {
  if (element.matches(SELECTOR)) {
    return element;
  }

  return element.querySelector(SELECTOR);
}


//# sourceMappingURL=utilities.esm.js.map


/***/ }),

/***/ "classnames":
/*!*****************************!*\
  !*** external "classnames" ***!
  \*****************************/
/***/ (function(module) {

module.exports = classnames;

/***/ }),

/***/ "components/Button/Button":
/*!*************************!*\
  !*** external "Button" ***!
  \*************************/
/***/ (function(module) {

module.exports = Button;

/***/ }),

/***/ "components/FieldHolder/FieldHolder":
/*!******************************!*\
  !*** external "FieldHolder" ***!
  \******************************/
/***/ (function(module) {

module.exports = FieldHolder;

/***/ }),

/***/ "components/FormBuilderModal/FormBuilderModal":
/*!***********************************!*\
  !*** external "FormBuilderModal" ***!
  \***********************************/
/***/ (function(module) {

module.exports = FormBuilderModal;

/***/ }),

/***/ "containers/FormBuilderLoader/FormBuilderLoader":
/*!************************************!*\
  !*** external "FormBuilderLoader" ***!
  \************************************/
/***/ (function(module) {

module.exports = FormBuilderLoader;

/***/ }),

/***/ "deep-freeze-strict":
/*!***********************************!*\
  !*** external "DeepFreezeStrict" ***!
  \***********************************/
/***/ (function(module) {

module.exports = DeepFreezeStrict;

/***/ }),

/***/ "i18n":
/*!***********************!*\
  !*** external "i18n" ***!
  \***********************/
/***/ (function(module) {

module.exports = i18n;

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ (function(module) {

module.exports = jQuery;

/***/ }),

/***/ "lib/Backend":
/*!**************************!*\
  !*** external "Backend" ***!
  \**************************/
/***/ (function(module) {

module.exports = Backend;

/***/ }),

/***/ "lib/Config":
/*!*************************!*\
  !*** external "Config" ***!
  \*************************/
/***/ (function(module) {

module.exports = Config;

/***/ }),

/***/ "lib/Injector":
/*!***************************!*\
  !*** external "Injector" ***!
  \***************************/
/***/ (function(module) {

module.exports = Injector;

/***/ }),

/***/ "lib/getFormState":
/*!*******************************!*\
  !*** external "getFormState" ***!
  \*******************************/
/***/ (function(module) {

module.exports = getFormState;

/***/ }),

/***/ "lib/getJsonErrorMessage":
/*!**************************************!*\
  !*** external "getJsonErrorMessage" ***!
  \**************************************/
/***/ (function(module) {

module.exports = getJsonErrorMessage;

/***/ }),

/***/ "lib/urls":
/*!***************************!*\
  !*** external "ssUrlLib" ***!
  \***************************/
/***/ (function(module) {

module.exports = ssUrlLib;

/***/ }),

/***/ "prop-types":
/*!****************************!*\
  !*** external "PropTypes" ***!
  \****************************/
/***/ (function(module) {

module.exports = PropTypes;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDom" ***!
  \***************************/
/***/ (function(module) {

module.exports = ReactDom;

/***/ }),

/***/ "react-dom/client":
/*!*********************************!*\
  !*** external "ReactDomClient" ***!
  \*********************************/
/***/ (function(module) {

module.exports = ReactDomClient;

/***/ }),

/***/ "react-redux":
/*!*****************************!*\
  !*** external "ReactRedux" ***!
  \*****************************/
/***/ (function(module) {

module.exports = ReactRedux;

/***/ }),

/***/ "reactstrap":
/*!*****************************!*\
  !*** external "Reactstrap" ***!
  \*****************************/
/***/ (function(module) {

module.exports = Reactstrap;

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "Redux" ***!
  \************************/
/***/ (function(module) {

module.exports = Redux;

/***/ }),

/***/ "redux-form":
/*!****************************!*\
  !*** external "ReduxForm" ***!
  \****************************/
/***/ (function(module) {

module.exports = ReduxForm;

/***/ }),

/***/ "state/tabs/TabsActions":
/*!******************************!*\
  !*** external "TabsActions" ***!
  \******************************/
/***/ (function(module) {

module.exports = TabsActions;

/***/ }),

/***/ "state/toasts/ToastsActions":
/*!********************************!*\
  !*** external "ToastsActions" ***!
  \********************************/
/***/ (function(module) {

module.exports = ToastsActions;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
!function() {
/*!**************************************!*\
  !*** ./client/src/bundles/bundle.js ***!
  \**************************************/


__webpack_require__(/*! legacy/ElementEditor/entwine */ "./client/src/legacy/ElementEditor/entwine.js");
__webpack_require__(/*! boot */ "./client/src/boot/index.js");
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map