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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
window.document.addEventListener('DOMContentLoaded', () => {
  (0, _registerComponents.default)();
  (0, _registerTransforms.default)();
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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
    TextCheckboxGroupField: _TextCheckboxGroupField.default
  });
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
var _readOneBlockQuery = _interopRequireDefault(__webpack_require__(/*! state/history/readOneBlockQuery */ "./client/src/state/history/readOneBlockQuery.js"));
var _HistoricElementView = _interopRequireDefault(__webpack_require__(/*! components/HistoricElementView/HistoricElementView */ "./client/src/components/HistoricElementView/HistoricElementView.js"));
var _revertToBlockVersionMutation = _interopRequireDefault(__webpack_require__(/*! state/history/revertToBlockVersionMutation */ "./client/src/state/history/revertToBlockVersionMutation.js"));
var _readBlocksForAreaQuery = _interopRequireDefault(__webpack_require__(/*! state/editor/readBlocksForAreaQuery */ "./client/src/state/editor/readBlocksForAreaQuery.js"));
var _addElementMutation = _interopRequireDefault(__webpack_require__(/*! state/editor/addElementMutation */ "./client/src/state/editor/addElementMutation.js"));
var _ArchiveAction = _interopRequireDefault(__webpack_require__(/*! components/ElementActions/ArchiveAction */ "./client/src/components/ElementActions/ArchiveAction.js"));
var _DuplicateAction = _interopRequireDefault(__webpack_require__(/*! components/ElementActions/DuplicateAction */ "./client/src/components/ElementActions/DuplicateAction.js"));
var _PublishAction = _interopRequireDefault(__webpack_require__(/*! components/ElementActions/PublishAction */ "./client/src/components/ElementActions/PublishAction.js"));
var _SaveAction = _interopRequireDefault(__webpack_require__(/*! components/ElementActions/SaveAction */ "./client/src/components/ElementActions/SaveAction.js"));
var _UnpublishAction = _interopRequireDefault(__webpack_require__(/*! components/ElementActions/UnpublishAction */ "./client/src/components/ElementActions/UnpublishAction.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = () => {
  _Injector.default.transform('elemental-fieldgroup', updater => {
    updater.component('FieldGroup.HistoryViewer.VersionDetail', _HistoricElementView.default, 'HistoricElement');
  }, {
    after: 'field-holders'
  });
  _Injector.default.transform('elements-history', updater => {
    updater.component('HistoryViewer.Form_ItemEditForm', _readOneBlockQuery.default, 'ElementHistoryViewer');
  });
  _Injector.default.transform('blocks-history-revert', updater => {
    updater.component('HistoryViewerToolbar.VersionedAdmin.HistoryViewer.Element.HistoryViewerVersionDetail', _revertToBlockVersionMutation.default, 'BlockRevertMutation');
  });
  _Injector.default.transform('cms-element-editor', updater => {
    updater.component('ElementList', _readBlocksForAreaQuery.default, 'PageElements');
  });
  _Injector.default.transform('cms-element-adder', updater => {
    updater.component('AddElementPopover', _addElementMutation.default, 'ElementAddButton');
  });
  _Injector.default.transform('element-actions', updater => {
    updater.component('ElementActions', _SaveAction.default, 'ElementActionsWithSave');
    updater.component('ElementActions', _PublishAction.default, 'ElementActionsWithPublish');
    updater.component('ElementActions', _UnpublishAction.default, 'ElementActionsWithUnpublish');
    updater.component('ElementActions', _DuplicateAction.default, 'ElementActionsWithDuplicate');
    updater.component('ElementActions', _ArchiveAction.default, 'ElementActionsWithArchive');
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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const AbstractAction = props => {
  const {
    className,
    title,
    label
  } = props;
  const itemProps = {
    className: (0, _classnames.default)(className, 'dropdown-item'),
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
AbstractAction.defaultProps = {
  disabled: false
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
var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));
var _redux = __webpack_require__(/*! redux */ "redux");
var _AbstractAction = _interopRequireDefault(__webpack_require__(/*! components/ElementActions/AbstractAction */ "./client/src/components/ElementActions/AbstractAction.js"));
var _archiveBlockMutation = _interopRequireDefault(__webpack_require__(/*! state/editor/archiveBlockMutation */ "./client/src/state/editor/archiveBlockMutation.js"));
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ArchiveAction = MenuComponent => props => {
  const handleClick = event => {
    event.stopPropagation();
    const {
      element: {
        id
      },
      isPublished,
      actions: {
        handleArchiveBlock
      }
    } = props;
    let archiveMessage = _i18n.default._t('ElementArchiveAction.CONFIRM_DELETE', 'Are you sure you want to send this block to the archive?');
    if (isPublished) {
      archiveMessage = _i18n.default._t('ElementArchiveAction.CONFIRM_DELETE_AND_UNPUBLISH', 'Warning: This block will be unpublished before being sent to the archive. Are you sure you want to proceed?');
    }
    if (handleArchiveBlock && window.confirm(archiveMessage)) {
      handleArchiveBlock(id).then(() => {
        const preview = window.jQuery('.cms-preview');
        if (preview && typeof preview.entwine === 'function') {
          preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));
        }
      });
    }
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
var _default = exports["default"] = (0, _redux.compose)(_archiveBlockMutation.default, ArchiveAction);

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
var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));
var _redux = __webpack_require__(/*! redux */ "redux");
var _AbstractAction = _interopRequireDefault(__webpack_require__(/*! components/ElementActions/AbstractAction */ "./client/src/components/ElementActions/AbstractAction.js"));
var _duplicateBlockMutation = _interopRequireDefault(__webpack_require__(/*! state/editor/duplicateBlockMutation */ "./client/src/state/editor/duplicateBlockMutation.js"));
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const DuplicateAction = MenuComponent => props => {
  if (props.type.broken) {
    return _react.default.createElement(MenuComponent, props);
  }
  const handleClick = event => {
    event.stopPropagation();
    const {
      element: {
        id
      },
      actions: {
        handleDuplicateBlock
      }
    } = props;
    if (handleDuplicateBlock) {
      handleDuplicateBlock(id).then(() => {
        const preview = window.jQuery('.cms-preview');
        preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));
      });
    }
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
var _default = exports["default"] = (0, _redux.compose)(_duplicateBlockMutation.default, DuplicateAction);

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
var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));
var _redux = __webpack_require__(/*! redux */ "redux");
var _AbstractAction = _interopRequireDefault(__webpack_require__(/*! components/ElementActions/AbstractAction */ "./client/src/components/ElementActions/AbstractAction.js"));
var _publishBlockMutation = _interopRequireDefault(__webpack_require__(/*! state/editor/publishBlockMutation */ "./client/src/state/editor/publishBlockMutation.js"));
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _Backend = _interopRequireDefault(__webpack_require__(/*! lib/Backend */ "lib/Backend"));
var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");
var _loadElementSchemaValue = __webpack_require__(/*! state/editor/loadElementSchemaValue */ "./client/src/state/editor/loadElementSchemaValue.js");
var _loadElementFormStateName = __webpack_require__(/*! state/editor/loadElementFormStateName */ "./client/src/state/editor/loadElementFormStateName.js");
var _reduxForm = __webpack_require__(/*! redux-form */ "redux-form");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const reportPublicationStatus = (type, title, success) => {
  const noTitle = _i18n.default.inject(_i18n.default._t('ElementHeader.NOTITLE', 'Untitled {type} block'), {
    type
  });
  const successMessage = _i18n.default.inject(_i18n.default._t('ElementPublishAction.SUCCESS_NOTIFICATION', 'Published \'{title}\' successfully'), {
    title: title || noTitle
  });
  const errorMessage = _i18n.default.inject(_i18n.default._t('ElementPublishAction.ERROR_NOTIFICATION', 'Error publishing \'{title}\''), {
    title: title || noTitle
  });
  window.jQuery.noticeAdd({
    text: success ? successMessage : errorMessage,
    stay: false,
    type: success ? 'success' : 'error'
  });
};
const performSaveForElementWithFormData = (id, formData, securityId) => {
  const saveEndpoint = _Backend.default.createEndpointFetcher({
    url: (0, _loadElementSchemaValue.loadElementSchemaValue)('saveUrl', id),
    method: (0, _loadElementSchemaValue.loadElementSchemaValue)('saveMethod'),
    payloadFormat: (0, _loadElementSchemaValue.loadElementSchemaValue)('payloadFormat'),
    defaultData: {
      SecurityID: securityId
    }
  });
  return saveEndpoint(formData).then(() => window.ss.apolloClient.queryManager.reFetchObservableQueries()).then(input => {
    const preview = window.jQuery('.cms-preview');
    preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));
    return input;
  }).then(newPageData => {
    const newElementData = newPageData[0] && newPageData[0].data.readOneElementalArea.elements.find(elementData => elementData.id === id);
    return newElementData && newElementData.version;
  });
};
const PublishAction = MenuComponent => props => {
  if (props.type.broken) {
    return _react.default.createElement(MenuComponent, props);
  }
  const {
    element,
    formDirty
  } = props;
  const handleClick = event => {
    event.stopPropagation();
    const {
      element: {
        id,
        title
      },
      type,
      securityId,
      formData,
      actions: {
        handlePublishBlock
      },
      reinitialiseForm
    } = props;
    let actionFlow = new Promise(resolve => resolve());
    if (formDirty) {
      actionFlow = performSaveForElementWithFormData(id, formData, securityId).then(passthrough => {
        reinitialiseForm(formData);
        return passthrough;
      });
    }
    actionFlow.then(() => handlePublishBlock(id)).then(() => reportPublicationStatus(type.title, title, true)).catch(() => reportPublicationStatus(type.title, title, false));
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
  return _react.default.createElement(MenuComponent, props, props.children, (formDirty || !element.isLiveVersion) && _react.default.createElement(_AbstractAction.default, newProps));
};
exports.Component = PublishAction;
function mapStateToProps(state, ownProps) {
  const formName = (0, _loadElementFormStateName.loadElementFormStateName)(ownProps.element.id);
  let formData = null;
  if (state.form.formState.element && state.form.formState.element[formName]) {
    formData = state.form.formState.element[formName].values;
  }
  return {
    formData,
    securityId: state.config.SecurityID,
    formDirty: state.unsavedForms.find(unsaved => unsaved.name === `element.${formName}`)
  };
}
function mapDispatchToProps(dispatch, ownProps) {
  const formName = (0, _loadElementFormStateName.loadElementFormStateName)(ownProps.element.id);
  return {
    reinitialiseForm(savedData) {
      dispatch((0, _reduxForm.initialize)(`element.${formName}`, savedData));
    }
  };
}
var _default = exports["default"] = (0, _redux.compose)(_publishBlockMutation.default, (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), PublishAction);

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
var _redux = __webpack_require__(/*! redux */ "redux");
var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");
var _AbstractAction = _interopRequireDefault(__webpack_require__(/*! components/ElementActions/AbstractAction */ "./client/src/components/ElementActions/AbstractAction.js"));
var _Backend = _interopRequireDefault(__webpack_require__(/*! lib/Backend */ "lib/Backend"));
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _loadElementSchemaValue = __webpack_require__(/*! state/editor/loadElementSchemaValue */ "./client/src/state/editor/loadElementSchemaValue.js");
var _loadElementFormStateName = __webpack_require__(/*! state/editor/loadElementFormStateName */ "./client/src/state/editor/loadElementFormStateName.js");
var _reduxForm = __webpack_require__(/*! redux-form */ "redux-form");
var _Element = __webpack_require__(/*! components/ElementEditor/Element */ "./client/src/components/ElementEditor/Element.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const SaveAction = MenuComponent => props => {
  const failureHandlers = (0, _react.useContext)(_Element.ElementContext);
  console.log(['SaveAction.props is', props]);
  if (!props.expandable || props.type.broken) {
    return _react.default.createElement(MenuComponent, props);
  }
  const handleClick = event => {
    event.stopPropagation();
    const {
      element,
      type,
      securityId,
      formData,
      reinitialiseForm,
      submitForm
    } = props;
    const {
      jQuery: $
    } = window;
    const noTitle = _i18n.default.inject(_i18n.default._t('ElementHeader.NOTITLE', 'Untitled {type} block'), {
      type: type.title
    });
    submitForm();
    return;
    const endpointSpec = {
      url: (0, _loadElementSchemaValue.loadElementSchemaValue)('saveUrl', element.id),
      method: (0, _loadElementSchemaValue.loadElementSchemaValue)('saveMethod'),
      payloadFormat: (0, _loadElementSchemaValue.loadElementSchemaValue)('payloadFormat'),
      defaultData: {
        SecurityID: securityId
      }
    };
    const endpoint = _Backend.default.createEndpointFetcher(endpointSpec);
    endpoint(formData).then(() => {
      const {
        apolloClient
      } = window.ss;
      apolloClient.queryManager.reFetchObservableQueries();
      reinitialiseForm(formData);
      const preview = $('.cms-preview');
      preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));
      const newTitle = formData ? formData[`PageElements_${element.id}_Title`] : null;
      $.noticeAdd({
        text: _i18n.default.inject(_i18n.default._t('ElementSaveAction.SUCCESS_NOTIFICATION', 'Saved \'{title}\' successfully'), {
          title: newTitle || noTitle
        }),
        stay: false,
        type: 'success'
      });
    }).catch(e => {
      $.noticeAdd({
        text: _i18n.default.inject(_i18n.default._t('ElementSaveAction.ERROR_NOTIFICATION', 'Error saving \'{title}\''), {
          title: element.Title || noTitle
        }),
        stay: false,
        type: 'error'
      });
      e.response.json().then(formSchema => {
        failureHandlers.onFailedSave(formSchema);
      });
    });
  };
  const newProps = {
    title: _i18n.default._t('ElementSaveAction.SAVE', 'Save'),
    className: 'element-editor__actions-save',
    onClick: handleClick
  };
  return _react.default.createElement(MenuComponent, props, props.children, _react.default.createElement(_AbstractAction.default, newProps));
};
exports.Component = SaveAction;
function mapStateToProps(state, ownProps) {
  const formName = (0, _loadElementFormStateName.loadElementFormStateName)(ownProps.element.id);
  let formData = null;
  if (state.form.formState.element && state.form.formState.element[formName]) {
    formData = state.form.formState.element[formName].values;
  }
  return {
    formData,
    securityId: state.config.SecurityID
  };
}
function mapDispatchToProps(dispatch, ownProps) {
  const formName = (0, _loadElementFormStateName.loadElementFormStateName)(ownProps.element.id);
  return {
    reinitialiseForm(savedData) {
      dispatch((0, _reduxForm.initialize)(`element.${formName}`, savedData));
    },
    submitForm() {
      console.log('submitting form for elmenet with ID 3 - THIS IS HARDCODED TO element #3');
      dispatch((0, _reduxForm.submit)('element.ElementForm_3'));
    }
  };
}
var _default = exports["default"] = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), SaveAction);

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
var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));
var _redux = __webpack_require__(/*! redux */ "redux");
var _AbstractAction = _interopRequireDefault(__webpack_require__(/*! components/ElementActions/AbstractAction */ "./client/src/components/ElementActions/AbstractAction.js"));
var _unpublishBlockMutation = _interopRequireDefault(__webpack_require__(/*! state/editor/unpublishBlockMutation */ "./client/src/state/editor/unpublishBlockMutation.js"));
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const UnpublishAction = MenuComponent => props => {
  if (props.type.broken) {
    return _react.default.createElement(MenuComponent, props);
  }
  const {
    element,
    type,
    actions: {
      handleUnpublishBlock
    }
  } = props;
  const handleClick = event => {
    event.stopPropagation();
    const {
      jQuery: $
    } = window;
    const noTitle = _i18n.default.inject(_i18n.default._t('ElementHeader.NOTITLE', 'Untitled {type} block'), {
      type: type.title
    });
    if (handleUnpublishBlock) {
      handleUnpublishBlock(element.id).then(() => {
        const preview = $('.cms-preview');
        preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));
        $.noticeAdd({
          text: _i18n.default.inject(_i18n.default._t('ElementUnpublishAction.SUCCESS_NOTIFICATION', 'Removed \'{title}\' from the published page'), {
            title: element.title || noTitle
          }),
          stay: false,
          type: 'success'
        });
      }).catch(() => {
        $.noticeAdd({
          text: _i18n.default.inject(_i18n.default._t('ElementUnpublishAction.ERROR_NOTIFICATION', 'Error unpublishing \'{title}\''), {
            title: element.title || noTitle
          }),
          stay: false,
          type: 'error'
        });
      });
    }
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
  return _react.default.createElement(MenuComponent, props, props.children, element.isPublished && _react.default.createElement(_AbstractAction.default, newProps));
};
exports.Component = UnpublishAction;
var _default = exports["default"] = (0, _redux.compose)(_unpublishBlockMutation.default, UnpublishAction);

/***/ }),

/***/ "./client/src/components/ElementEditor/AddElementPopover.js":
/*!******************************************************************!*\
  !*** ./client/src/components/ElementEditor/AddElementPopover.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
var _elementTypeType = __webpack_require__(/*! types/elementTypeType */ "./client/src/types/elementTypeType.js");
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class AddElementPopover extends _react.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
  }
  getElementButtonClickHandler(elementType) {
    return event => {
      const {
        actions: {
          handleAddElementToArea
        },
        insertAfterElement
      } = this.props;
      event.preventDefault();
      handleAddElementToArea(elementType.class, insertAfterElement).then(() => {
        const preview = window.jQuery('.cms-preview');
        preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));
      });
      this.handleToggle();
    };
  }
  handleToggle() {
    const {
      toggle
    } = this.props;
    toggle();
  }
  render() {
    const {
      PopoverOptionSetComponent,
      elementTypes,
      container,
      extraClass,
      isOpen,
      placement,
      target
    } = this.props;
    const popoverClassNames = (0, _classnames.default)('element-editor-add-element', extraClass);
    const buttons = elementTypes.map(elementType => ({
      content: elementType.title,
      key: elementType.name,
      className: (0, _classnames.default)(elementType.icon, 'btn--icon-xl', 'element-editor-add-element__button'),
      onClick: this.getElementButtonClickHandler(elementType)
    }));
    return _react.default.createElement(PopoverOptionSetComponent, {
      buttons: buttons,
      searchPlaceholder: _i18n.default._t('ElementAddElementPopover.SEARCH_BLOCKS', 'Search blocks'),
      extraClass: popoverClassNames,
      container: container,
      isOpen: isOpen,
      placement: placement,
      target: target,
      toggle: this.handleToggle
    });
  }
}
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
var _default = exports["default"] = (0, _Injector.inject)(['PopoverOptionSet'], PopoverOptionSetComponent => ({
  PopoverOptionSetComponent
}), () => 'ElementEditor')(AddElementPopover);

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
var _reactstrap = __webpack_require__(/*! reactstrap */ "reactstrap");
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _elementTypeType = __webpack_require__(/*! types/elementTypeType */ "./client/src/types/elementTypeType.js");
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class AddNewButton extends _react.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }
  toggle() {
    this.setState(prevState => ({
      popoverOpen: !prevState.popoverOpen
    }));
  }
  render() {
    const {
      AddElementPopoverComponent,
      elementTypes,
      areaId
    } = this.props;
    const buttonAttributes = {
      id: `ElementalArea${areaId}_AddButton`,
      color: 'primary',
      onClick: this.toggle,
      className: 'font-icon-plus'
    };
    return _react.default.createElement("div", null, _react.default.createElement(_reactstrap.Button, buttonAttributes, _i18n.default._t('ElementAddNewButton.ADD_BLOCK', 'Add block')), _react.default.createElement(AddElementPopoverComponent, {
      placement: "bottom-start",
      target: buttonAttributes.id,
      isOpen: this.state.popoverOpen,
      elementTypes: elementTypes,
      toggle: this.toggle,
      areaId: areaId,
      insertAfterElement: 0
    }));
  }
}
exports.Component = AddNewButton;
AddNewButton.defaultProps = {};
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
var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");
var _loadElementFormStateName = __webpack_require__(/*! state/editor/loadElementFormStateName */ "./client/src/state/editor/loadElementFormStateName.js");
var _reduxForm = __webpack_require__(/*! redux-form */ "redux-form");
var _getFormState = _interopRequireDefault(__webpack_require__(/*! lib/getFormState */ "lib/getFormState"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class Content extends _react.PureComponent {
  render() {
    const {
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
      formSchema
    } = this.props;
    return _react.default.createElement("div", {
      className: "element-editor-content"
    }, !previewExpanded && _react.default.createElement(SummaryComponent, {
      content: content,
      fileUrl: fileUrl,
      fileTitle: fileTitle,
      broken: broken
    }), previewExpanded && _react.default.createElement(InlineEditFormComponent, {
      extraClass: {
        'element-editor-editform--collapsed': !previewExpanded
      },
      onClick: event => event.stopPropagation(),
      elementId: id,
      activeTab: activeTab,
      onFormInit: onFormInit,
      handleLoadingError: handleLoadingError,
      formSchema: formSchema
    }), formDirty && _react.default.createElement("input", {
      type: "hidden",
      name: "change-tracker",
      className: "element-form-dirty-state",
      value: "1"
    }));
  }
}
exports.Component = Content;
Content.propTypes = {
  id: _propTypes.default.string,
  content: _propTypes.default.string,
  fileUrl: _propTypes.default.string,
  fileTitle: _propTypes.default.string,
  previewExpanded: _propTypes.default.bool,
  SummaryComponent: _propTypes.default.elementType,
  InlineEditFormComponent: _propTypes.default.elementType,
  handleLoadingError: _propTypes.default.func,
  broken: _propTypes.default.bool,
  formSchema: _propTypes.default.object
};
Content.defaultProps = {};
function mapStateToProps(state, ownProps) {
  const formName = (0, _loadElementFormStateName.loadElementFormStateName)(ownProps.id);
  return {
    formDirty: (0, _reduxForm.isDirty)(`element.${formName}`, _getFormState.default)(state)
  };
}
var _default = exports["default"] = (0, _redux.compose)((0, _Injector.inject)(['ElementSummary', 'ElementInlineEditForm'], (SummaryComponent, InlineEditFormComponent) => ({
  SummaryComponent,
  InlineEditFormComponent
}), () => 'ElementEditor.ElementList.Element'), (0, _reactRedux.connect)(mapStateToProps))(Content);

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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class DragPositionIndicator extends _react.PureComponent {
  render() {
    return _react.default.createElement("div", {
      className: "elemental-editor-drag-indicator"
    }, _react.default.createElement("div", {
      className: "elemental-editor-drag-indicator__ball"
    }));
  }
}
var _default = exports["default"] = DragPositionIndicator;

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
var _loadElementFormStateName = __webpack_require__(/*! state/editor/loadElementFormStateName */ "./client/src/state/editor/loadElementFormStateName.js");
var _loadElementSchemaValue = __webpack_require__(/*! state/editor/loadElementSchemaValue */ "./client/src/state/editor/loadElementSchemaValue.js");
var TabsActions = _interopRequireWildcard(__webpack_require__(/*! state/tabs/TabsActions */ "state/tabs/TabsActions"));
var _reactDnd = __webpack_require__(/*! react-dnd */ "react-dnd");
var _reactDndHtml5Backend = __webpack_require__(/*! react-dnd-html5-backend */ "react-dnd-html5-backend");
var _dragHelpers = __webpack_require__(/*! lib/dragHelpers */ "./client/src/lib/dragHelpers.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class Element extends _react.Component {
  static getDerivedStateFromError() {
    return {
      childRenderingError: true
    };
  }
  constructor(props) {
    super(props);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleLoadingError = this.handleLoadingError.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
    this.updateFormTab = this.updateFormTab.bind(this);
    this.state = {
      previewExpanded: false,
      initialTab: '',
      loadingError: false,
      childRenderingError: false,
      formSchema: {}
    };
  }
  componentDidMount() {
    const {
      connectDragPreview
    } = this.props;
    if (connectDragPreview) {
      connectDragPreview((0, _reactDndHtml5Backend.getEmptyImage)(), {
        captureDraggingState: true
      });
    }
  }
  getVersionedStateClassName() {
    const {
      element
    } = this.props;
    const baseClassName = 'element-editor__element';
    if (!element.isPublished) {
      return `${baseClassName}--draft`;
    }
    if (element.isPublished && !element.isLiveVersion) {
      return `${baseClassName}--modified`;
    }
    return `${baseClassName}--published`;
  }
  getLinkTitle(type) {
    if (type.broken) {
      return _i18n.default._t('ElementalElement.ARCHIVE_BROKEN', 'Archive this block');
    }
    return _i18n.default.inject(_i18n.default._t('ElementalElement.TITLE', 'Edit this {type} block'), {
      type: type.title
    });
  }
  getSummary(element, type) {
    if (type.broken) {
      return element.title ? _i18n.default.inject(_i18n.default._t('ElementalElement.BROKEN_DESCRIPTION_TITLE', 'This block had the title "{title}". It is broken and will not display on the front-end. You can archive it to remove it from this elemental area.'), {
        title: element.title
      }) : _i18n.default._t('ElementalElement.BROKEN_DESCRIPTION', 'This block is broken and will not display on the front-end. You can archive it to remove it from this elemental area.');
    }
    return element.blockSchema.content;
  }
  handleLoadingError() {
    this.setState({
      loadingError: true
    });
  }
  updateFormTab(activeTab) {
    const {
      tabSetName,
      onActivateTab
    } = this.props;
    const {
      initialTab
    } = this.state;
    if (!initialTab) {
      this.setState({
        initialTab: activeTab
      });
    }
    if (activeTab || initialTab) {
      onActivateTab(tabSetName, activeTab || initialTab);
    } else {
      const defaultFirstTab = 'Main';
      onActivateTab(tabSetName, defaultFirstTab);
    }
  }
  handleTabClick(toBeActiveTab) {
    const {
      activeTab
    } = this.props;
    const {
      loadingError
    } = this.state;
    if (toBeActiveTab !== activeTab && !loadingError) {
      this.setState({
        previewExpanded: true
      });
      this.updateFormTab(toBeActiveTab);
    }
  }
  handleExpand(event) {
    const {
      type,
      link
    } = this.props;
    const {
      loadingError
    } = this.state;
    if (type.broken) {
      return;
    }
    if (event.target.type === 'button') {
      event.stopPropagation();
      return;
    }
    if (type.inlineEditable && !loadingError) {
      this.setState(prevState => ({
        previewExpanded: !prevState.previewExpanded
      }));
      return;
    }
    window.location = link;
  }
  handleKeyUp(event) {
    const {
      nodeName
    } = event.target;
    if ((event.key === ' ' || event.key === 'Enter') && !['input', 'textarea'].includes(nodeName.toLowerCase())) {
      this.handleExpand(event);
    }
  }
  getFailureHandlers() {
    return {
      onFailedSave: formSchema => {
        this.setState({
          formSchema
        });
      }
    };
  }
  render() {
    const {
      element,
      type,
      areaId,
      HeaderComponent,
      ContentComponent,
      link,
      activeTab,
      connectDragSource,
      connectDropTarget,
      isDragging,
      isOver,
      onDragEnd
    } = this.props;
    const {
      childRenderingError,
      previewExpanded,
      formSchema
    } = this.state;
    if (!element.id) {
      return null;
    }
    const elementClassNames = (0, _classnames.default)('element-editor__element', {
      'element-editor__element--broken': type.broken,
      'element-editor__element--expandable': type.inlineEditable && !type.broken,
      'element-editor__element--dragging': isDragging,
      'element-editor__element--dragged-over': isOver
    }, this.getVersionedStateClassName());
    const failureHandlers = this.getFailureHandlers();
    const content = connectDropTarget(_react.default.createElement("div", {
      className: elementClassNames,
      onClick: this.handleExpand,
      onKeyUp: this.handleKeyUp,
      role: "button",
      tabIndex: 0,
      title: this.getLinkTitle(type),
      key: element.id
    }, _react.default.createElement(ElementContext.Provider, {
      value: failureHandlers
    }, _react.default.createElement(HeaderComponent, {
      element: element,
      type: type,
      areaId: areaId,
      expandable: type.inlineEditable,
      link: link,
      previewExpanded: previewExpanded && !childRenderingError,
      handleEditTabsClick: this.handleTabClick,
      activeTab: activeTab,
      disableTooltip: isDragging,
      onDragEnd: onDragEnd,
      failureHandlers: failureHandlers
    }), !childRenderingError && _react.default.createElement(ContentComponent, {
      id: element.id,
      fileUrl: element.blockSchema.fileURL,
      fileTitle: element.blockSchema.fileTitle,
      content: this.getSummary(element, type),
      previewExpanded: previewExpanded && !isDragging,
      activeTab: activeTab,
      onFormInit: () => this.updateFormTab(activeTab),
      handleLoadingError: this.handleLoadingError,
      broken: type.broken,
      formSchema: formSchema
    }), childRenderingError && _react.default.createElement("div", {
      className: "alert alert-danger mt-2"
    }, _i18n.default._t('ElementalElement.CHILD_RENDERING_ERROR', 'Something went wrong with this block. Please try saving and refreshing the CMS.')))));
    if (!previewExpanded) {
      return connectDragSource(content);
    }
    return content;
  }
}
exports.Component = Element;
function mapStateToProps(state, ownProps) {
  const elementId = ownProps.element.id;
  const elementName = (0, _loadElementFormStateName.loadElementFormStateName)(elementId);
  const elementFormSchema = (0, _loadElementSchemaValue.loadElementSchemaValue)('schemaUrl', elementId);
  const filterFieldsForTabs = field => field.component === 'Tabs';
  const tabSet = state.form && state.form.formSchemas[elementFormSchema] && state.form.formSchemas[elementFormSchema].schema && state.form.formSchemas[elementFormSchema].schema.fields.find(filterFieldsForTabs);
  const tabSetName = tabSet && tabSet.id;
  const uniqueFieldId = `element.${elementName}__${tabSetName}`;
  const activeTab = state.tabs && state.tabs.fields && state.tabs.fields[uniqueFieldId] && state.tabs.fields[uniqueFieldId].activeTab;
  return {
    tabSetName,
    activeTab
  };
}
function mapDispatchToProps(dispatch, ownProps) {
  const elementName = (0, _loadElementFormStateName.loadElementFormStateName)(ownProps.element.id);
  return {
    onActivateTab(tabSetName, activeTabName) {
      dispatch(TabsActions.activateTab(`element.${elementName}__${tabSetName}`, activeTabName));
    }
  };
}
const ElementContext = exports.ElementContext = (0, _react.createContext)({});
Element.propTypes = {
  element: _elementType.elementType,
  type: _elementTypeType.elementTypeType.isRequired,
  areaId: _propTypes.default.number.isRequired,
  link: _propTypes.default.string.isRequired,
  activeTab: _propTypes.default.string,
  tabSetName: _propTypes.default.string,
  onActivateTab: _propTypes.default.func,
  connectDragSource: _propTypes.default.func.isRequired,
  connectDragPreview: _propTypes.default.func.isRequired,
  connectDropTarget: _propTypes.default.func.isRequired,
  isDragging: _propTypes.default.bool.isRequired,
  isOver: _propTypes.default.bool.isRequired,
  onDragOver: _propTypes.default.func,
  onDragEnd: _propTypes.default.func,
  onDragStart: _propTypes.default.func
};
Element.defaultProps = {
  element: null
};
const elementTarget = {
  drop(props, monitor, component) {
    const {
      element
    } = props;
    return {
      target: element.id,
      dropSpot: (0, _dragHelpers.isOverTop)(monitor, component) ? 'top' : 'bottom'
    };
  },
  hover(props, monitor, component) {
    const {
      element,
      onDragOver
    } = props;
    if (onDragOver) {
      onDragOver(element, (0, _dragHelpers.isOverTop)(monitor, component));
    }
  }
};
var _default = exports["default"] = (0, _redux.compose)((0, _reactDnd.DropTarget)('element', elementTarget, (connector, monitor) => ({
  connectDropTarget: connector.dropTarget(),
  isOver: monitor.isOver()
})), (0, _reactDnd.DragSource)('element', _dragHelpers.elementDragSource, (connector, monitor) => ({
  connectDragSource: connector.dragSource(),
  connectDragPreview: connector.dragPreview(),
  isDragging: monitor.isDragging()
})), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _Injector.inject)(['ElementHeader', 'ElementContent'], (HeaderComponent, ContentComponent) => ({
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
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _redux = __webpack_require__(/*! redux */ "redux");
var _reactstrap = __webpack_require__(/*! reactstrap */ "reactstrap");
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
var _elementType = __webpack_require__(/*! types/elementType */ "./client/src/types/elementType.js");
var _elementTypeType = __webpack_require__(/*! types/elementTypeType */ "./client/src/types/elementTypeType.js");
var _AbstractAction = _interopRequireDefault(__webpack_require__(/*! components/ElementActions/AbstractAction */ "./client/src/components/ElementActions/AbstractAction.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class ElementActions extends _react.Component {
  constructor(props) {
    super(props);
    this.handleEditTabsClick = this.handleEditTabsClick.bind(this);
  }
  handleEditTabsClick(event) {
    const {
      handleEditTabsClick
    } = this.props;
    handleEditTabsClick(event.target.name);
  }
  renderEditTabs() {
    const {
      editTabs,
      activeTab,
      type,
      expandable
    } = this.props;
    if (type.broken || !expandable || !editTabs || !editTabs.length) {
      return null;
    }
    return editTabs.map(_ref => {
      let {
        name,
        title
      } = _ref;
      return _react.default.createElement(_AbstractAction.default, {
        key: name,
        name: name,
        title: title,
        type: type,
        onClick: this.handleEditTabsClick,
        active: name === activeTab
      });
    });
  }
  renderDivider() {
    const {
      children,
      editTabs,
      expandable
    } = this.props;
    if (!expandable || !editTabs || !editTabs.length || _react.default.Children.count(children) === 0) {
      return null;
    }
    return _react.default.createElement(_reactstrap.DropdownItem, {
      divider: true,
      role: "separator"
    });
  }
  render() {
    const {
      children,
      id,
      ActionMenuComponent
    } = this.props;
    const dropdownToggleClassNames = ['element-editor-header__actions-toggle', 'btn', 'btn-sm', 'btn--no-text', 'font-icon-dot-3'];
    return _react.default.createElement(ActionMenuComponent, {
      id: `element-editor-actions-${id}`,
      className: "element-editor-header__actions-dropdown",
      dropdownMenuProps: {
        right: true
      },
      dropdownToggleClassNames: dropdownToggleClassNames
    }, this.renderEditTabs(), this.renderDivider(), children);
  }
}
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
  expandable: _propTypes.default.bool
};
ElementActions.defaultProps = {
  editTabs: [],
  expandable: true
};
var _default = exports["default"] = (0, _redux.compose)((0, _Injector.inject)(['ActionMenu'], ActionMenuComponent => ({
  ActionMenuComponent
}), () => 'ElementEditor.ElementList.Element'))(ElementActions);

/***/ }),

/***/ "./client/src/components/ElementEditor/ElementDragPreview.js":
/*!*******************************************************************!*\
  !*** ./client/src/components/ElementEditor/ElementDragPreview.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _Header = _interopRequireDefault(__webpack_require__(/*! components/ElementEditor/Header */ "./client/src/components/ElementEditor/Header.js"));
var _reactDnd = __webpack_require__(/*! react-dnd */ "react-dnd");
var _elementType = __webpack_require__(/*! types/elementType */ "./client/src/types/elementType.js");
var _elementTypeType = __webpack_require__(/*! types/elementTypeType */ "./client/src/types/elementTypeType.js");
var _elementConfig = __webpack_require__(/*! state/editor/elementConfig */ "./client/src/state/editor/elementConfig.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class ElementDragPreview extends _react.Component {
  render() {
    const {
      isDragging,
      element,
      elementTypes,
      currentOffset
    } = this.props;
    if (!isDragging || !currentOffset) {
      return null;
    }
    const {
      x,
      y
    } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;
    const style = {
      transform,
      WebkitTransform: transform
    };
    const type = (0, _elementConfig.getElementTypeConfig)(element, elementTypes);
    return _react.default.createElement("div", {
      className: "element-editor-drag-preview",
      style: style
    }, _react.default.createElement(_Header.default, {
      element: element,
      type: type,
      simple: true
    }));
  }
}
ElementDragPreview.propTypes = {
  element: _elementType.elementType,
  elementTypes: _propTypes.default.arrayOf(_elementTypeType.elementTypeType),
  isDragging: _propTypes.default.bool,
  currentOffset: _propTypes.default.shape({
    x: _propTypes.default.number.isRequired,
    y: _propTypes.default.number.isRequired
  })
};
var _default = exports["default"] = (0, _reactDnd.DragLayer)(monitor => ({
  element: monitor.getItem(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
}))(ElementDragPreview);

/***/ }),

/***/ "./client/src/components/ElementEditor/ElementEditor.js":
/*!**************************************************************!*\
  !*** ./client/src/components/ElementEditor/ElementEditor.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.Component = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
var _redux = __webpack_require__(/*! redux */ "redux");
var _elementTypeType = __webpack_require__(/*! types/elementTypeType */ "./client/src/types/elementTypeType.js");
var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");
var _loadElementFormStateName = __webpack_require__(/*! state/editor/loadElementFormStateName */ "./client/src/state/editor/loadElementFormStateName.js");
var _reactDnd = __webpack_require__(/*! react-dnd */ "react-dnd");
var _sortBlockMutation = _interopRequireDefault(__webpack_require__(/*! state/editor/sortBlockMutation */ "./client/src/state/editor/sortBlockMutation.js"));
var _ElementDragPreview = _interopRequireDefault(__webpack_require__(/*! components/ElementEditor/ElementDragPreview */ "./client/src/components/ElementEditor/ElementDragPreview.js"));
var _withDragDropContext = _interopRequireDefault(__webpack_require__(/*! lib/withDragDropContext */ "lib/withDragDropContext"));
var _reselect = __webpack_require__(/*! reselect */ "./node_modules/reselect/es/index.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class ElementEditor extends _react.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dragTargetElementId: null,
      dragSpot: null
    };
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }
  handleDragOver() {
    let element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    let isOverTop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    const id = element ? element.id : false;
    this.setState({
      dragTargetElementId: id,
      dragSpot: isOverTop === false ? 'bottom' : 'top'
    });
  }
  handleDragEnd(sourceId, afterId) {
    const {
      actions: {
        handleSortBlock
      },
      areaId
    } = this.props;
    handleSortBlock(sourceId, afterId, areaId).then(() => {
      const preview = window.jQuery('.cms-preview');
      preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));
    });
    this.setState({
      dragTargetElementId: null,
      dragSpot: null
    });
  }
  render() {
    const {
      fieldName,
      formState,
      ToolbarComponent,
      ListComponent,
      areaId,
      elementTypes,
      isDraggingOver,
      connectDropTarget,
      allowedElements
    } = this.props;
    const {
      dragTargetElementId,
      dragSpot
    } = this.state;
    const allowedElementTypes = allowedElements.map(className => elementTypes.find(type => type.class === className));
    return connectDropTarget(_react.default.createElement("div", {
      className: "element-editor"
    }, _react.default.createElement(ToolbarComponent, {
      elementTypes: allowedElementTypes,
      areaId: areaId,
      onDragOver: this.handleDragOver
    }), _react.default.createElement(ListComponent, {
      allowedElementTypes: allowedElementTypes,
      elementTypes: elementTypes,
      areaId: areaId,
      onDragOver: this.handleDragOver,
      onDragStart: this.handleDragStart,
      onDragEnd: this.handleDragEnd,
      dragSpot: dragSpot,
      isDraggingOver: isDraggingOver,
      dragTargetElementId: dragTargetElementId
    }), _react.default.createElement(_ElementDragPreview.default, {
      elementTypes: elementTypes
    }), _react.default.createElement("input", {
      name: fieldName,
      type: "hidden",
      value: JSON.stringify(formState) || '',
      className: "no-change-track"
    })));
  }
}
exports.Component = ElementEditor;
ElementEditor.propTypes = {
  fieldName: _propTypes.default.string,
  elementTypes: _propTypes.default.arrayOf(_elementTypeType.elementTypeType).isRequired,
  allowedElements: _propTypes.default.arrayOf(_propTypes.default.string).isRequired,
  areaId: _propTypes.default.number.isRequired,
  actions: _propTypes.default.shape({
    handleSortBlock: _propTypes.default.func
  })
};
const elementFormSelector = (0, _reselect.createSelector)([state => {
  const elementFormState = state.form.formState.element;
  if (!elementFormState) {
    return {};
  }
  return elementFormState;
}], elementFormState => {
  const formNamePattern = (0, _loadElementFormStateName.loadElementFormStateName)('[0-9]+');
  return Object.keys(elementFormState).filter(key => key.match(formNamePattern)).reduce((accumulator, key) => ({
    ...accumulator,
    [key]: elementFormState[key].values
  }), {});
});
function mapStateToProps(state) {
  const formState = elementFormSelector(state);
  return {
    formState
  };
}
var _default = exports["default"] = (0, _redux.compose)(_withDragDropContext.default, (0, _reactDnd.DropTarget)('element', {}, (connector, monitor) => ({
  connectDropTarget: connector.dropTarget(),
  isDraggingOver: monitor.isOver()
})), (0, _reactRedux.connect)(mapStateToProps), (0, _Injector.inject)(['ElementToolbar', 'ElementList'], (ToolbarComponent, ListComponent) => ({
  ToolbarComponent,
  ListComponent
}), () => 'ElementEditor'), _sortBlockMutation.default)(ElementEditor);

/***/ }),

/***/ "./client/src/components/ElementEditor/ElementList.js":
/*!************************************************************!*\
  !*** ./client/src/components/ElementEditor/ElementList.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.Component = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _elementType = __webpack_require__(/*! types/elementType */ "./client/src/types/elementType.js");
var _elementTypeType = __webpack_require__(/*! types/elementTypeType */ "./client/src/types/elementTypeType.js");
var _redux = __webpack_require__(/*! redux */ "redux");
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _reactDnd = __webpack_require__(/*! react-dnd */ "react-dnd");
var _dragHelpers = __webpack_require__(/*! lib/dragHelpers */ "./client/src/lib/dragHelpers.js");
var _elementConfig = __webpack_require__(/*! state/editor/elementConfig */ "./client/src/state/editor/elementConfig.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class ElementList extends _react.Component {
  getDragIndicatorIndex() {
    const {
      dragTargetElementId,
      draggedItem,
      blocks,
      dragSpot
    } = this.props;
    return (0, _dragHelpers.getDragIndicatorIndex)(blocks.map(element => element.id), dragTargetElementId, draggedItem && draggedItem.id, dragSpot);
  }
  renderBlocks() {
    const {
      ElementComponent,
      HoverBarComponent,
      DragIndicatorComponent,
      blocks,
      allowedElementTypes,
      elementTypes,
      areaId,
      onDragEnd,
      onDragOver,
      onDragStart,
      isDraggingOver
    } = this.props;
    if (!blocks) {
      return null;
    }
    if (blocks && !blocks.length) {
      return _react.default.createElement("div", null, _i18n.default._t('ElementList.ADD_BLOCKS', 'Add blocks to place your content'));
    }
    let output = blocks.map(element => _react.default.createElement("div", {
      key: element.id
    }, _react.default.createElement(ElementComponent, {
      element: element,
      areaId: areaId,
      type: (0, _elementConfig.getElementTypeConfig)(element, elementTypes),
      link: element.blockSchema.actions.edit,
      onDragOver: onDragOver,
      onDragEnd: onDragEnd,
      onDragStart: onDragStart
    }), isDraggingOver || _react.default.createElement(HoverBarComponent, {
      key: `create-after-${element.id}`,
      areaId: areaId,
      elementId: element.id,
      elementTypes: allowedElementTypes
    })));
    if (!isDraggingOver) {
      output = [_react.default.createElement(HoverBarComponent, {
        key: 0,
        areaId: areaId,
        elementId: 0,
        elementTypes: allowedElementTypes
      })].concat(output);
    }
    const dragIndicatorIndex = this.getDragIndicatorIndex();
    if (isDraggingOver && dragIndicatorIndex !== null) {
      output.splice(dragIndicatorIndex, 0, _react.default.createElement(DragIndicatorComponent, {
        key: "DropIndicator"
      }));
    }
    return output;
  }
  renderLoading() {
    const {
      loading,
      LoadingComponent
    } = this.props;
    if (loading) {
      return _react.default.createElement(LoadingComponent, null);
    }
    return null;
  }
  render() {
    const {
      blocks
    } = this.props;
    const listClassNames = (0, _classnames.default)('elemental-editor-list', {
      'elemental-editor-list--empty': !blocks || !blocks.length
    });
    return this.props.connectDropTarget(_react.default.createElement("div", {
      className: listClassNames
    }, this.renderLoading(), this.renderBlocks()));
  }
}
exports.Component = ElementList;
ElementList.propTypes = {
  blocks: _propTypes.default.arrayOf(_elementType.elementType),
  elementTypes: _propTypes.default.arrayOf(_elementTypeType.elementTypeType).isRequired,
  allowedElementTypes: _propTypes.default.arrayOf(_elementTypeType.elementTypeType).isRequired,
  loading: _propTypes.default.bool,
  areaId: _propTypes.default.number.isRequired,
  dragTargetElementId: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool]),
  onDragOver: _propTypes.default.func,
  onDragStart: _propTypes.default.func,
  onDragEnd: _propTypes.default.func
};
ElementList.defaultProps = {
  blocks: [],
  loading: false
};
const elementListTarget = {
  drop(props, monitor) {
    const {
      blocks
    } = props;
    const elementTargetDropResult = monitor.getDropResult();
    if (!elementTargetDropResult) {
      return {};
    }
    const dropIndex = (0, _dragHelpers.getDragIndicatorIndex)(blocks.map(element => element.id), elementTargetDropResult.target, monitor.getItem(), elementTargetDropResult.dropSpot);
    const dropAfterID = blocks[dropIndex - 1] ? blocks[dropIndex - 1].id : '0';
    return {
      ...elementTargetDropResult,
      dropAfterID
    };
  }
};
var _default = exports["default"] = (0, _redux.compose)((0, _reactDnd.DropTarget)('element', elementListTarget, (connector, monitor) => ({
  connectDropTarget: connector.dropTarget(),
  draggedItem: monitor.getItem()
})), (0, _Injector.inject)(['Element', 'Loading', 'HoverBar', 'DragPositionIndicator'], (ElementComponent, LoadingComponent, HoverBarComponent, DragIndicatorComponent) => ({
  ElementComponent,
  LoadingComponent,
  HoverBarComponent,
  DragIndicatorComponent
}), () => 'ElementEditor.ElementList'))(ElementList);

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
var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));
var _loadElementFormStateName = __webpack_require__(/*! state/editor/loadElementFormStateName */ "./client/src/state/editor/loadElementFormStateName.js");
var _reduxForm = __webpack_require__(/*! redux-form */ "redux-form");
var _reactDnd = __webpack_require__(/*! react-dnd */ "react-dnd");
var _getFormState = _interopRequireDefault(__webpack_require__(/*! lib/getFormState */ "lib/getFormState"));
var _dragHelpers = __webpack_require__(/*! lib/dragHelpers */ "./client/src/lib/dragHelpers.js");
var _reactDndHtml5Backend = __webpack_require__(/*! react-dnd-html5-backend */ "react-dnd-html5-backend");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class Header extends _react.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false
    };
  }
  componentDidMount() {
    const {
      connectDragPreview
    } = this.props;
    if (connectDragPreview) {
      connectDragPreview((0, _reactDndHtml5Backend.getEmptyImage)(), {
        captureDraggingState: true
      });
    }
  }
  componentDidUpdate() {
    const {
      tooltipOpen
    } = this.state;
    const {
      disableTooltip
    } = this.props;
    if (tooltipOpen && disableTooltip) {
      this.setState({
        tooltipOpen: false
      });
    }
  }
  getBlockTitle(element, type) {
    if (type.broken) {
      return _i18n.default.inject(_i18n.default._t('ElementHeader.BROKEN', 'This element is of obsolete type {type}.'), {
        type: type.obsoleteClassName
      });
    }
    if (element.title) {
      return element.title;
    }
    return _i18n.default.inject(_i18n.default._t('ElementHeader.NOTITLE', 'Untitled {type} block'), {
      type: type.title
    });
  }
  toggle() {
    this.setState(prevState => ({
      tooltipOpen: !prevState.tooltipOpen
    }));
  }
  renderVersionedStateMessage() {
    const {
      element: {
        isLiveVersion,
        isPublished
      },
      formDirty
    } = this.props;
    if (!formDirty && isPublished && isLiveVersion) {
      return null;
    }
    let versionStateButtonTitle = '';
    const stateClassNames = ['element-editor-header__version-state'];
    if (formDirty) {
      versionStateButtonTitle = _i18n.default._t('ElementHeader.STATE_UNSAVED', 'Item has unsaved changes');
      stateClassNames.push('element-editor-header__version-state--unsaved');
    } else if (!isPublished) {
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
  }
  render() {
    const {
      connectDragSource,
      element,
      type,
      areaId,
      previewExpanded,
      simple,
      disableTooltip,
      activeTab,
      expandable,
      ElementActionsComponent,
      handleEditTabsClick
    } = this.props;
    const title = this.getBlockTitle(element, type);
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
    const content = _react.default.createElement("div", {
      className: containerClasses
    }, _react.default.createElement("div", {
      className: "element-editor-header__drag-handle"
    }, _react.default.createElement("i", {
      className: "font-icon-drag-handle"
    })), _react.default.createElement("div", {
      className: "element-editor-header__info"
    }, _react.default.createElement("div", {
      className: iconContainerClasses
    }, _react.default.createElement("i", {
      className: type.icon,
      id: blockIconId
    }), this.renderVersionedStateMessage(), !type.broken && !simple && _react.default.createElement(_reactstrap.Tooltip, {
      placement: "top",
      isOpen: this.state.tooltipOpen && !disableTooltip,
      target: blockIconId,
      toggle: this.toggle
    }, type.title)), _react.default.createElement("h3", {
      className: titleClasses
    }, title)), !simple && _react.default.createElement("div", {
      className: "element-editor-header__actions"
    }, _react.default.createElement("div", {
      role: "none",
      onClick: event => event.stopPropagation()
    }, _react.default.createElement(ElementActionsComponent, {
      element: element,
      type: type,
      areaId: areaId,
      activeTab: activeTab,
      editTabs: type.editTabs,
      handleEditTabsClick: handleEditTabsClick,
      expandable: expandable
    })), !type.broken && _react.default.createElement("i", {
      className: expandCaretClasses,
      title: expandTitle
    })));
    if (previewExpanded) {
      return connectDragSource(content);
    }
    return content;
  }
}
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
  formDirty: _propTypes.default.bool,
  connectDragSource: _propTypes.default.func.isRequired,
  connectDragPreview: _propTypes.default.func.isRequired,
  onDragEnd: _propTypes.default.func
};
Header.defaultProps = {
  expandable: true
};
function mapStateToProps(state, ownProps) {
  const formName = (0, _loadElementFormStateName.loadElementFormStateName)(ownProps.element.id);
  return {
    formDirty: (0, _reduxForm.isDirty)(`element.${formName}`, _getFormState.default)(state)
  };
}
var _default = exports["default"] = (0, _redux.compose)((0, _reactDnd.DragSource)('element', _dragHelpers.elementDragSource, connector => ({
  connectDragSource: connector.dragSource(),
  connectDragPreview: connector.dragPreview()
})), (0, _reactRedux.connect)(mapStateToProps), (0, _Injector.inject)(['ElementActions'], ElementActionsComponent => ({
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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const classNames = (0, _prefixClassNames.default)('element-editor__hover-bar');
function StatelessHoverBar(_ref) {
  let {
    AddElementPopoverComponent,
    elementTypes,
    elementId,
    areaId,
    popoverOpen,
    onToggle
  } = _ref;
  const lineClasses = `${classNames('-line')} font-icon-plus-circled`;
  const label = _i18n.default._t('ElementAddNewButton.ADD_BLOCK', 'Add block');
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
    className: lineClasses
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
}
class HoverBar extends _react.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }
  toggle() {
    this.setState(prevState => ({
      popoverOpen: !prevState.popoverOpen
    }));
  }
  render() {
    const props = {
      ...this.state,
      ...this.props,
      onToggle: this.toggle
    };
    return _react.default.createElement(StatelessHoverBar, props);
  }
}
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
exports["default"] = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));
var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));
var _FormBuilder = _interopRequireDefault(__webpack_require__(/*! components/FormBuilder/FormBuilder */ "components/FormBuilder/FormBuilder"));
var _FormBuilderLoader = _interopRequireDefault(__webpack_require__(/*! containers/FormBuilderLoader/FormBuilderLoader */ "containers/FormBuilderLoader/FormBuilderLoader"));
var _loadElementSchemaValue = __webpack_require__(/*! state/editor/loadElementSchemaValue */ "./client/src/state/editor/loadElementSchemaValue.js");
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _loadElementFormStateName = __webpack_require__(/*! state/editor/loadElementFormStateName */ "./client/src/state/editor/loadElementFormStateName.js");
var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class InlineEditForm extends _react.PureComponent {
  constructor(props) {
    super(props);
    this.handleLoadingError = this.handleLoadingError.bind(this);
    this.state = {
      loadingError: null
    };
  }
  handleLoadingError() {
    const {
      jQuery: $
    } = window;
    const {
      handleLoadingError
    } = this.props;
    this.setState({
      loadingError: true
    });
    $.noticeAdd({
      text: _i18n.default.inject(_i18n.default._t('ElementEditForm.ERROR_NOTIFICATION', 'Error displaying the edit form for this block')),
      stay: true,
      type: 'notice'
    });
    handleLoadingError();
  }
  render() {
    const {
      elementId,
      extraClass,
      onClick,
      onFormInit,
      formHasState,
      formSchema
    } = this.props;
    const {
      loadingError
    } = this.state;
    const classNames = (0, _classnames.default)('element-editor-editform', extraClass);
    const schemaUrl = (0, _loadElementSchemaValue.loadElementSchemaValue)('schemaUrl', elementId);
    const formProps = {
      formTag: 'div',
      schemaUrl,
      identifier: 'element',
      refetchSchemaOnMount: !formHasState,
      onLoadingError: this.handleLoadingError
    };
    console.log(['formSchema is', formSchema]);
    if (typeof formSchema !== 'undefined' && Object.keys(formSchema).length > 0) {
      formProps.schema = formSchema;
    }
    if (loadingError) {
      formProps.loading = false;
    }
    if (typeof onFormInit === 'function') {
      formProps.onReduxFormInit = onFormInit;
    }
    return _react.default.createElement("div", {
      className: classNames,
      onClick: onClick,
      role: "presentation"
    }, formProps.hasOwnProperty('schema') && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", null, "I HAVE A FORM SCHEMA"), _react.default.createElement(_FormBuilder.default, formProps)), !formProps.hasOwnProperty('schema') && _react.default.createElement(_FormBuilderLoader.default, formProps));
  }
}
InlineEditForm.propTypes = {
  extraClass: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  onClick: _propTypes.default.func,
  elementId: _propTypes.default.string,
  handleLoadingError: _propTypes.default.func,
  formSchema: _propTypes.default.object
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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class Summary extends _react.PureComponent {
  render() {
    const {
      fileUrl,
      fileTitle,
      content,
      broken
    } = this.props;
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
  }
}
Summary.defaultProps = {};
Summary.propTypes = {
  content: _propTypes.default.string,
  fileUrl: _propTypes.default.string,
  fileTitle: _propTypes.default.string,
  broken: _propTypes.default.bool
};
var _default = exports["default"] = Summary;

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
var _reactDnd = __webpack_require__(/*! react-dnd */ "react-dnd");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class Toolbar extends _react.PureComponent {
  render() {
    const {
      AddNewButtonComponent,
      elementTypes,
      areaId,
      connectDropTarget
    } = this.props;
    return connectDropTarget(_react.default.createElement("div", {
      className: "element-editor__toolbar"
    }, _react.default.createElement(AddNewButtonComponent, {
      elementTypes: elementTypes,
      areaId: areaId
    })));
  }
}
Toolbar.defaultProps = {};
Toolbar.propTypes = {
  elementTypes: _propTypes.default.arrayOf(_elementTypeType.elementTypeType).isRequired,
  areaId: _propTypes.default.number.isRequired,
  AddNewButtonComponent: _propTypes.default.elementType.isRequired,
  connectDropTarget: _propTypes.default.func.isRequired,
  onDragOver: _propTypes.default.func,
  onDragDrop: _propTypes.default.func
};
const toolbarTarget = {
  hover(props) {
    const {
      onDragOver
    } = props;
    if (onDragOver) {
      onDragOver();
    }
  }
};
var _default = exports["default"] = (0, _reactDnd.DropTarget)('element', toolbarTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))((0, _Injector.inject)(['ElementAddNewButton'], AddNewButtonComponent => ({
  AddNewButtonComponent
}), () => 'ElementEditor.ElementToolbar')(Toolbar));

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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
    }, _i18n.default._t('HistoricElementView.VIEW_BLOCK_HISTORY', 'Block history')), _react.default.createElement("i", {
      className: "font-icon-angle-right btn--icon-lg elemental-preview__link-caret"
    })), _react.default.createElement("div", {
      className: "elemental-preview__icon"
    }, _react.default.createElement("i", {
      className: data.ElementIcon
    })), _react.default.createElement("div", {
      className: "elemental-preview__detail"
    }, _react.default.createElement("h3", null, data.ElementTitle, " ", _react.default.createElement("small", null, data.ElementType)))), this.props.children);
  }
};
var _default = exports["default"] = ElementalAreaHistoryFactory;

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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const TextCheckboxGroupField = props => {
  const {
    children
  } = props;
  const childrenWithProps = _react.default.Children.toArray(_react.default.Children.map(children, (child, index) => {
    const additionalProps = {
      noHolder: true
    };
    if (index === 0) {
      additionalProps.id = props.id;
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
  }, childrenWithProps[0], _react.default.createElement(_reactstrap.InputGroupAddon, {
    addonType: "append"
  }, _react.default.createElement(_reactstrap.InputGroupText, null, childrenWithProps[1])));
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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const resetStores = () => {
  window.ss.apolloClient.resetStore();
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
    onmatch() {
      const context = {};
      const ElementEditorComponent = (0, _Injector.loadComponent)('ElementEditor', context);
      const schemaData = this.data('schema');
      const elementTypes = (0, _elementConfig.getConfig)().elementTypes;
      const props = {
        fieldName: this.attr('name'),
        areaId: schemaData['elemental-area-id'],
        allowedElements: schemaData['allowed-elements'],
        elementTypes
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
      const root = this.getReactRoot();
      if (root) {
        root.unmount();
        this.setReactRoot(null);
      }
    },
    'from .cms-edit-form': {
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

/***/ "./client/src/lib/dragHelpers.js":
/*!***************************************!*\
  !*** ./client/src/lib/dragHelpers.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isOverTop = exports.getDragIndicatorIndex = exports.elementDragSource = void 0;
var _reactDom = __webpack_require__(/*! react-dom */ "react-dom");
const isOverTop = (monitor, component) => {
  const clientOffset = monitor.getClientOffset();
  const componentRect = (0, _reactDom.findDOMNode)(component).getBoundingClientRect();
  return clientOffset.y < componentRect.y + componentRect.height / 2;
};
exports.isOverTop = isOverTop;
const getDragIndicatorIndex = (items, dragTarget, draggedItem, dragSpot) => {
  if (dragTarget === null || !draggedItem) {
    return null;
  }
  let targetIndex = dragTarget ? items.findIndex(element => element === dragTarget) : 0;
  const sourceIndex = items.findIndex(item => item === draggedItem);
  if (dragSpot === 'bottom') {
    targetIndex += 1;
  }
  if (sourceIndex === targetIndex || sourceIndex + 1 === targetIndex) {
    return null;
  }
  return targetIndex;
};
exports.getDragIndicatorIndex = getDragIndicatorIndex;
const elementDragSource = exports.elementDragSource = {
  beginDrag(props) {
    return props.element;
  },
  endDrag(props, monitor) {
    const {
      onDragEnd
    } = props;
    const dropResult = monitor.getDropResult();
    if (!onDragEnd || !dropResult || !dropResult.dropAfterID) {
      return;
    }
    const itemID = monitor.getItem().id;
    const {
      dropAfterID
    } = dropResult;
    if (itemID !== dropAfterID) {
      onDragEnd(itemID, dropAfterID);
    }
  }
};

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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const prefixClassNames = cssPrefix => function () {
  const prefix = str => `${cssPrefix}${str}`;
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  const prefixArgs = args.map(arg => {
    if (!arg && arg !== '') {
      return false;
    }
    if (typeof arg === 'object') {
      return Array.isArray(arg) ? arg.map(prefix) : Object.entries(arg).reduce((accumulator, _ref) => {
        let [key, value] = _ref;
        return Object.assign({}, accumulator, {
          [prefix(key)]: value
        });
      }, {});
    }
    return prefix(arg);
  });
  return (0, _classnames.default)(...prefixArgs);
};
var _default = exports["default"] = prefixClassNames;

/***/ }),

/***/ "./client/src/state/editor/addElementMutation.js":
/*!*******************************************************!*\
  !*** ./client/src/state/editor/addElementMutation.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.mutation = exports["default"] = exports.config = void 0;
var _hoc = __webpack_require__(/*! @apollo/client/react/hoc */ "@apollo/client/react/hoc");
var _graphqlTag = _interopRequireDefault(__webpack_require__(/*! graphql-tag */ "graphql-tag"));
var _readBlocksForAreaQuery = __webpack_require__(/*! ./readBlocksForAreaQuery */ "./client/src/state/editor/readBlocksForAreaQuery.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const mutation = exports.mutation = (0, _graphqlTag.default)`
mutation AddElementToArea($className: String!, $elementalAreaID: ID!, $afterElementID: ID) {
  addElementToArea(
    className: $className,
    elementalAreaID: $elementalAreaID,
    afterElementID: $afterElementID
  ) {
    id
  }
}
`;
const config = exports.config = {
  props: _ref => {
    let {
      mutate,
      ownProps: {
        actions,
        areaId
      }
    } = _ref;
    const handleAddElementToArea = (className, afterElementID) => mutate({
      variables: {
        className,
        elementalAreaID: areaId,
        afterElementID
      }
    });
    return {
      actions: {
        ...actions,
        handleAddElementToArea
      }
    };
  },
  options: _ref2 => {
    let {
      areaId
    } = _ref2;
    return {
      refetchQueries: [{
        query: _readBlocksForAreaQuery.query,
        variables: _readBlocksForAreaQuery.config.options({
          areaId
        }).variables
      }]
    };
  }
};
var _default = exports["default"] = (0, _hoc.graphql)(mutation, config);

/***/ }),

/***/ "./client/src/state/editor/archiveBlockMutation.js":
/*!*********************************************************!*\
  !*** ./client/src/state/editor/archiveBlockMutation.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.mutation = exports["default"] = exports.config = void 0;
var _hoc = __webpack_require__(/*! @apollo/client/react/hoc */ "@apollo/client/react/hoc");
var _graphqlTag = _interopRequireDefault(__webpack_require__(/*! graphql-tag */ "graphql-tag"));
var _readBlocksForAreaQuery = __webpack_require__(/*! ./readBlocksForAreaQuery */ "./client/src/state/editor/readBlocksForAreaQuery.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const mutation = exports.mutation = (0, _graphqlTag.default)`
mutation ArchiveBlock($blockId: ID!) {
  deleteBlocks(ids: [$blockId])
}
`;
const config = exports.config = {
  props: _ref => {
    let {
      mutate,
      ownProps: {
        actions
      }
    } = _ref;
    const handleArchiveBlock = blockId => mutate({
      variables: {
        blockId
      }
    });
    return {
      actions: {
        ...actions,
        handleArchiveBlock
      }
    };
  },
  options: _ref2 => {
    let {
      areaId
    } = _ref2;
    return {
      refetchQueries: [{
        query: _readBlocksForAreaQuery.query,
        variables: _readBlocksForAreaQuery.config.options({
          areaId
        }).variables
      }]
    };
  }
};
var _default = exports["default"] = (0, _hoc.graphql)(mutation, config);

/***/ }),

/***/ "./client/src/state/editor/duplicateBlockMutation.js":
/*!***********************************************************!*\
  !*** ./client/src/state/editor/duplicateBlockMutation.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.mutation = exports["default"] = exports.config = void 0;
var _hoc = __webpack_require__(/*! @apollo/client/react/hoc */ "@apollo/client/react/hoc");
var _graphqlTag = _interopRequireDefault(__webpack_require__(/*! graphql-tag */ "graphql-tag"));
var _readBlocksForAreaQuery = __webpack_require__(/*! ./readBlocksForAreaQuery */ "./client/src/state/editor/readBlocksForAreaQuery.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const mutation = exports.mutation = (0, _graphqlTag.default)`
mutation DuplicateBlock($blockId: ID!) {
  duplicateBlock(id: $blockId) {
    id
  }
}
`;
const config = exports.config = {
  props: _ref => {
    let {
      mutate,
      ownProps: {
        actions
      }
    } = _ref;
    const handleDuplicateBlock = blockId => mutate({
      variables: {
        blockId
      }
    });
    return {
      actions: {
        ...actions,
        handleDuplicateBlock
      }
    };
  },
  options: _ref2 => {
    let {
      areaId
    } = _ref2;
    return {
      refetchQueries: [{
        query: _readBlocksForAreaQuery.query,
        variables: _readBlocksForAreaQuery.config.options({
          areaId
        }).variables
      }]
    };
  }
};
var _default = exports["default"] = (0, _hoc.graphql)(mutation, config);

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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getConfig = () => _Config.default.getSection('DNADesign\\Elemental\\Controllers\\ElementalAreaController');
exports.getConfig = getConfig;
const getElementTypeConfig = function (element) {
  let typeConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const loadElementFormStateName = function () {
  let elementId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const loadElementSchemaValue = function (key) {
  let elementId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
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

/***/ "./client/src/state/editor/publishBlockMutation.js":
/*!*********************************************************!*\
  !*** ./client/src/state/editor/publishBlockMutation.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.mutation = exports["default"] = exports.config = void 0;
var _hoc = __webpack_require__(/*! @apollo/client/react/hoc */ "@apollo/client/react/hoc");
var _graphqlTag = _interopRequireDefault(__webpack_require__(/*! graphql-tag */ "graphql-tag"));
var _readBlocksForAreaQuery = __webpack_require__(/*! ./readBlocksForAreaQuery */ "./client/src/state/editor/readBlocksForAreaQuery.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const mutation = exports.mutation = (0, _graphqlTag.default)`
mutation PublishBlock($blockId:ID!) {
  publishBlock(id: $blockId) {
    id
  }
}
`;
const config = exports.config = {
  props: _ref => {
    let {
      mutate,
      ownProps: {
        actions
      }
    } = _ref;
    const handlePublishBlock = blockId => mutate({
      variables: {
        blockId
      }
    });
    return {
      actions: {
        ...actions,
        handlePublishBlock
      }
    };
  },
  options: _ref2 => {
    let {
      areaId
    } = _ref2;
    return {
      refetchQueries: [{
        query: _readBlocksForAreaQuery.query,
        variables: _readBlocksForAreaQuery.config.options({
          areaId
        }).variables
      }]
    };
  }
};
var _default = exports["default"] = (0, _hoc.graphql)(mutation, config);

/***/ }),

/***/ "./client/src/state/editor/readBlocksForAreaQuery.js":
/*!***********************************************************!*\
  !*** ./client/src/state/editor/readBlocksForAreaQuery.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.query = exports["default"] = exports.config = void 0;
var _hoc = __webpack_require__(/*! @apollo/client/react/hoc */ "@apollo/client/react/hoc");
var _graphqlTag = _interopRequireDefault(__webpack_require__(/*! graphql-tag */ "graphql-tag"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const query = exports.query = (0, _graphqlTag.default)`
query ReadBlocksForArea($id:ID!) {
  readOneElementalArea(filter: { id: { eq: $id } }, versioning: {
    mode: DRAFT
  }){
    elements {
      id
      title
      blockSchema
      obsoleteClassName
      isLiveVersion
      isPublished
      version
      canCreate
      canPublish
      canUnpublish
      canDelete
    }
  }
}
`;
const config = exports.config = {
  options(_ref) {
    let {
      areaId
    } = _ref;
    return {
      variables: {
        id: areaId
      }
    };
  },
  props(_ref2) {
    let {
      data: {
        error,
        readOneElementalArea,
        loading: networkLoading
      }
    } = _ref2;
    let blocks = null;
    if (readOneElementalArea) {
      blocks = readOneElementalArea.elements;
    }
    const errors = error && error.graphQLErrors && error.graphQLErrors.map(graphQLError => graphQLError.message);
    return {
      loading: networkLoading || !blocks,
      blocks,
      graphQLErrors: errors
    };
  }
};
var _default = exports["default"] = (0, _hoc.graphql)(query, config);

/***/ }),

/***/ "./client/src/state/editor/sortBlockMutation.js":
/*!******************************************************!*\
  !*** ./client/src/state/editor/sortBlockMutation.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.mutation = exports["default"] = exports.config = void 0;
var _hoc = __webpack_require__(/*! @apollo/client/react/hoc */ "@apollo/client/react/hoc");
var _graphqlTag = _interopRequireDefault(__webpack_require__(/*! graphql-tag */ "graphql-tag"));
var _readBlocksForAreaQuery = __webpack_require__(/*! ./readBlocksForAreaQuery */ "./client/src/state/editor/readBlocksForAreaQuery.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const mutation = exports.mutation = (0, _graphqlTag.default)`
mutation SortBlockMutation($blockId:ID!, $afterBlockId:ID!) {
  sortBlock(
    id: $blockId
    afterBlockID: $afterBlockId
  ) {
    id
    isLiveVersion
    isPublished
  }
}
`;
const config = exports.config = {
  props: _ref => {
    let {
      mutate,
      ownProps: {
        actions
      }
    } = _ref;
    const handleSortBlock = (blockId, afterBlockId, areaId) => mutate({
      variables: {
        blockId,
        afterBlockId
      },
      optimisticResponse: {
        sortBlock: {
          id: blockId,
          isLiveVersion: false,
          isPublished: false,
          __typename: 'Block'
        }
      },
      update: (store, _ref2) => {
        let {
          data: {
            sortBlock: updatedElementData
          }
        } = _ref2;
        const variables = _readBlocksForAreaQuery.config.options({
          areaId
        }).variables;
        const cachedData = store.readQuery({
          query: _readBlocksForAreaQuery.query,
          variables
        });
        const newData = JSON.parse(JSON.stringify(cachedData));
        let blocks = newData.readOneElementalArea.elements;
        const movedBlockIndex = blocks.findIndex(block => block.id === blockId);
        const movedBlock = blocks[movedBlockIndex];
        Object.entries(updatedElementData).forEach(_ref3 => {
          let [key, value] = _ref3;
          if (key === '__typename') {
            return;
          }
          movedBlock[key] = value;
        });
        blocks.splice(movedBlockIndex, 1);
        if (afterBlockId === '0') {
          blocks.unshift(movedBlock);
        } else {
          let targetBlockIndex = blocks.findIndex(block => block.id === afterBlockId);
          if (targetBlockIndex === -1) {
            targetBlockIndex = movedBlockIndex - 1;
          }
          const end = blocks.slice(targetBlockIndex + 1);
          blocks = blocks.slice(0, targetBlockIndex + 1);
          blocks.push(movedBlock);
          blocks = blocks.concat(end);
        }
        newData.readOneElementalArea.elements = blocks;
        store.writeQuery({
          query: _readBlocksForAreaQuery.query,
          data: newData,
          variables
        });
      }
    });
    return {
      actions: {
        ...actions,
        handleSortBlock
      }
    };
  }
};
var _default = exports["default"] = (0, _hoc.graphql)(mutation, config);

/***/ }),

/***/ "./client/src/state/editor/unpublishBlockMutation.js":
/*!***********************************************************!*\
  !*** ./client/src/state/editor/unpublishBlockMutation.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.mutation = exports["default"] = exports.config = void 0;
var _hoc = __webpack_require__(/*! @apollo/client/react/hoc */ "@apollo/client/react/hoc");
var _graphqlTag = _interopRequireDefault(__webpack_require__(/*! graphql-tag */ "graphql-tag"));
var _readBlocksForAreaQuery = __webpack_require__(/*! ./readBlocksForAreaQuery */ "./client/src/state/editor/readBlocksForAreaQuery.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const mutation = exports.mutation = (0, _graphqlTag.default)`
mutation UnpublishBlock($blockId:ID!) {
  unpublishBlock(
    id: $blockId
      ) {
    id
  }
}
`;
const config = exports.config = {
  props: _ref => {
    let {
      mutate,
      ownProps: {
        actions
      }
    } = _ref;
    const handleUnpublishBlock = (blockId, fromStage, toStage, fromVersion) => mutate({
      variables: {
        blockId,
        fromStage,
        toStage,
        fromVersion
      }
    });
    return {
      actions: {
        ...actions,
        handleUnpublishBlock
      }
    };
  },
  options: _ref2 => {
    let {
      areaId
    } = _ref2;
    return {
      refetchQueries: [{
        query: _readBlocksForAreaQuery.query,
        variables: _readBlocksForAreaQuery.config.options({
          areaId
        }).variables
      }]
    };
  }
};
var _default = exports["default"] = (0, _hoc.graphql)(mutation, config);

/***/ }),

/***/ "./client/src/state/history/readOneBlockQuery.js":
/*!*******************************************************!*\
  !*** ./client/src/state/history/readOneBlockQuery.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.query = exports["default"] = exports.config = void 0;
var _hoc = __webpack_require__(/*! @apollo/client/react/hoc */ "@apollo/client/react/hoc");
var _graphqlTag = _interopRequireDefault(__webpack_require__(/*! graphql-tag */ "graphql-tag"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const query = exports.query = (0, _graphqlTag.default)`
query ReadHistoryViewerBlock ($block_id: ID!, $limit: Int!, $offset: Int!) {
  readOneBlock(
    versioning: {
      mode: LATEST
    },
    filter: { id: { eq: $block_id } }
  ) {
    id
    versions (limit: $limit, offset: $offset, sort: { version: DESC }) {
      pageInfo {
        totalCount
      }
      nodes {
        version
        absoluteLink
        author {
          firstName
          surname
        }
        publisher {
          firstName
          surname
        }
        published
        liveVersion
        latestDraftVersion
        lastEdited
      }
    }
  }
}
`;
const config = exports.config = {
  options(_ref) {
    let {
      recordId,
      limit,
      page
    } = _ref;
    return {
      variables: {
        limit,
        offset: ((page || 1) - 1) * limit,
        block_id: recordId
      }
    };
  },
  props(_ref2) {
    let {
      data: {
        error,
        refetch,
        readOneBlock,
        loading: networkLoading
      },
      ownProps: {
        actions = {
          versions: {}
        },
        limit,
        recordId
      }
    } = _ref2;
    const versions = readOneBlock || null;
    const errors = error && error.graphQLErrors && error.graphQLErrors.map(graphQLError => graphQLError.message);
    return {
      loading: networkLoading || !versions,
      versions,
      graphQLErrors: errors,
      actions: {
        ...actions,
        versions: {
          ...versions,
          goToPage(page) {
            refetch({
              offset: ((page || 1) - 1) * limit,
              limit,
              block_id: recordId
            });
          }
        }
      }
    };
  }
};
var _default = exports["default"] = (0, _hoc.graphql)(query, config);

/***/ }),

/***/ "./client/src/state/history/revertToBlockVersionMutation.js":
/*!******************************************************************!*\
  !*** ./client/src/state/history/revertToBlockVersionMutation.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.mutation = exports["default"] = exports.config = void 0;
var _hoc = __webpack_require__(/*! @apollo/client/react/hoc */ "@apollo/client/react/hoc");
var _graphqlTag = _interopRequireDefault(__webpack_require__(/*! graphql-tag */ "graphql-tag"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const mutation = exports.mutation = (0, _graphqlTag.default)`
mutation revertBlockToVersion($id:ID!, $fromStage:VersionedStage!, $toStage:VersionedStage!, $fromVersion:Int!) {
  copyBlockToStage(input: {
    id: $id
    fromVersion: $fromVersion
    fromStage: $fromStage
    toStage: $toStage
  }) {
    id
  }
}
`;
const config = exports.config = {
  props: _ref => {
    let {
      mutate,
      ownProps: {
        actions
      }
    } = _ref;
    const revertToVersion = (id, fromVersion, fromStage, toStage) => mutate({
      variables: {
        id,
        fromVersion,
        fromStage,
        toStage
      }
    });
    return {
      actions: {
        ...actions,
        revertToVersion
      }
    };
  },
  options: {
    refetchQueries: ['ReadHistoryViewerBlock']
  }
};
var _default = exports["default"] = (0, _hoc.graphql)(mutation, config);

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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const elementType = exports.elementType = _propTypes.default.shape({
  id: _propTypes.default.string.isRequired,
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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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

/***/ "./node_modules/reselect/es/defaultMemoize.js":
/*!****************************************************!*\
  !*** ./node_modules/reselect/es/defaultMemoize.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCacheKeyComparator: function() { return /* binding */ createCacheKeyComparator; },
/* harmony export */   defaultEqualityCheck: function() { return /* binding */ defaultEqualityCheck; },
/* harmony export */   defaultMemoize: function() { return /* binding */ defaultMemoize; }
/* harmony export */ });
// Cache implementation based on Erik Rasmussen's `lru-memoize`:
// https://github.com/erikras/lru-memoize
var NOT_FOUND = 'NOT_FOUND';

function createSingletonCache(equals) {
  var entry;
  return {
    get: function get(key) {
      if (entry && equals(entry.key, key)) {
        return entry.value;
      }

      return NOT_FOUND;
    },
    put: function put(key, value) {
      entry = {
        key: key,
        value: value
      };
    },
    getEntries: function getEntries() {
      return entry ? [entry] : [];
    },
    clear: function clear() {
      entry = undefined;
    }
  };
}

function createLruCache(maxSize, equals) {
  var entries = [];

  function get(key) {
    var cacheIndex = entries.findIndex(function (entry) {
      return equals(key, entry.key);
    }); // We found a cached entry

    if (cacheIndex > -1) {
      var entry = entries[cacheIndex]; // Cached entry not at top of cache, move it to the top

      if (cacheIndex > 0) {
        entries.splice(cacheIndex, 1);
        entries.unshift(entry);
      }

      return entry.value;
    } // No entry found in cache, return sentinel


    return NOT_FOUND;
  }

  function put(key, value) {
    if (get(key) === NOT_FOUND) {
      // TODO Is unshift slow?
      entries.unshift({
        key: key,
        value: value
      });

      if (entries.length > maxSize) {
        entries.pop();
      }
    }
  }

  function getEntries() {
    return entries;
  }

  function clear() {
    entries = [];
  }

  return {
    get: get,
    put: put,
    getEntries: getEntries,
    clear: clear
  };
}

var defaultEqualityCheck = function defaultEqualityCheck(a, b) {
  return a === b;
};
function createCacheKeyComparator(equalityCheck) {
  return function areArgumentsShallowlyEqual(prev, next) {
    if (prev === null || next === null || prev.length !== next.length) {
      return false;
    } // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.


    var length = prev.length;

    for (var i = 0; i < length; i++) {
      if (!equalityCheck(prev[i], next[i])) {
        return false;
      }
    }

    return true;
  };
}
// defaultMemoize now supports a configurable cache size with LRU behavior,
// and optional comparison of the result value with existing values
function defaultMemoize(func, equalityCheckOrOptions) {
  var providedOptions = typeof equalityCheckOrOptions === 'object' ? equalityCheckOrOptions : {
    equalityCheck: equalityCheckOrOptions
  };
  var _providedOptions$equa = providedOptions.equalityCheck,
      equalityCheck = _providedOptions$equa === void 0 ? defaultEqualityCheck : _providedOptions$equa,
      _providedOptions$maxS = providedOptions.maxSize,
      maxSize = _providedOptions$maxS === void 0 ? 1 : _providedOptions$maxS,
      resultEqualityCheck = providedOptions.resultEqualityCheck;
  var comparator = createCacheKeyComparator(equalityCheck);
  var cache = maxSize === 1 ? createSingletonCache(comparator) : createLruCache(maxSize, comparator); // we reference arguments instead of spreading them for performance reasons

  function memoized() {
    var value = cache.get(arguments);

    if (value === NOT_FOUND) {
      // @ts-ignore
      value = func.apply(null, arguments);

      if (resultEqualityCheck) {
        var entries = cache.getEntries();
        var matchingEntry = entries.find(function (entry) {
          return resultEqualityCheck(entry.value, value);
        });

        if (matchingEntry) {
          value = matchingEntry.value;
        }
      }

      cache.put(arguments, value);
    }

    return value;
  }

  memoized.clearCache = function () {
    return cache.clear();
  };

  return memoized;
}

/***/ }),

/***/ "./node_modules/reselect/es/index.js":
/*!*******************************************!*\
  !*** ./node_modules/reselect/es/index.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createSelector: function() { return /* binding */ createSelector; },
/* harmony export */   createSelectorCreator: function() { return /* binding */ createSelectorCreator; },
/* harmony export */   createStructuredSelector: function() { return /* binding */ createStructuredSelector; },
/* harmony export */   defaultEqualityCheck: function() { return /* reexport safe */ _defaultMemoize__WEBPACK_IMPORTED_MODULE_0__.defaultEqualityCheck; },
/* harmony export */   defaultMemoize: function() { return /* reexport safe */ _defaultMemoize__WEBPACK_IMPORTED_MODULE_0__.defaultMemoize; }
/* harmony export */ });
/* harmony import */ var _defaultMemoize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaultMemoize */ "./node_modules/reselect/es/defaultMemoize.js");



function getDependencies(funcs) {
  var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;

  if (!dependencies.every(function (dep) {
    return typeof dep === 'function';
  })) {
    var dependencyTypes = dependencies.map(function (dep) {
      return typeof dep === 'function' ? "function " + (dep.name || 'unnamed') + "()" : typeof dep;
    }).join(', ');
    throw new Error("createSelector expects all input-selectors to be functions, but received the following types: [" + dependencyTypes + "]");
  }

  return dependencies;
}

function createSelectorCreator(memoize) {
  for (var _len = arguments.length, memoizeOptionsFromArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    memoizeOptionsFromArgs[_key - 1] = arguments[_key];
  }

  var createSelector = function createSelector() {
    for (var _len2 = arguments.length, funcs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      funcs[_key2] = arguments[_key2];
    }

    var _recomputations = 0;

    var _lastResult; // Due to the intricacies of rest params, we can't do an optional arg after `...funcs`.
    // So, start by declaring the default value here.
    // (And yes, the words 'memoize' and 'options' appear too many times in this next sequence.)


    var directlyPassedOptions = {
      memoizeOptions: undefined
    }; // Normally, the result func or "output selector" is the last arg

    var resultFunc = funcs.pop(); // If the result func is actually an _object_, assume it's our options object

    if (typeof resultFunc === 'object') {
      directlyPassedOptions = resultFunc; // and pop the real result func off

      resultFunc = funcs.pop();
    }

    if (typeof resultFunc !== 'function') {
      throw new Error("createSelector expects an output function after the inputs, but received: [" + typeof resultFunc + "]");
    } // Determine which set of options we're using. Prefer options passed directly,
    // but fall back to options given to createSelectorCreator.


    var _directlyPassedOption = directlyPassedOptions,
        _directlyPassedOption2 = _directlyPassedOption.memoizeOptions,
        memoizeOptions = _directlyPassedOption2 === void 0 ? memoizeOptionsFromArgs : _directlyPassedOption2; // Simplifying assumption: it's unlikely that the first options arg of the provided memoizer
    // is an array. In most libs I've looked at, it's an equality function or options object.
    // Based on that, if `memoizeOptions` _is_ an array, we assume it's a full
    // user-provided array of options. Otherwise, it must be just the _first_ arg, and so
    // we wrap it in an array so we can apply it.

    var finalMemoizeOptions = Array.isArray(memoizeOptions) ? memoizeOptions : [memoizeOptions];
    var dependencies = getDependencies(funcs);
    var memoizedResultFunc = memoize.apply(void 0, [function recomputationWrapper() {
      _recomputations++; // apply arguments instead of spreading for performance.

      return resultFunc.apply(null, arguments);
    }].concat(finalMemoizeOptions)); // If a selector is called with the exact same arguments we don't need to traverse our dependencies again.

    var selector = memoize(function dependenciesChecker() {
      var params = [];
      var length = dependencies.length;

      for (var i = 0; i < length; i++) {
        // apply arguments instead of spreading and mutate a local list of params for performance.
        // @ts-ignore
        params.push(dependencies[i].apply(null, arguments));
      } // apply arguments instead of spreading for performance.


      _lastResult = memoizedResultFunc.apply(null, params);
      return _lastResult;
    });
    Object.assign(selector, {
      resultFunc: resultFunc,
      memoizedResultFunc: memoizedResultFunc,
      dependencies: dependencies,
      lastResult: function lastResult() {
        return _lastResult;
      },
      recomputations: function recomputations() {
        return _recomputations;
      },
      resetRecomputations: function resetRecomputations() {
        return _recomputations = 0;
      }
    });
    return selector;
  }; // @ts-ignore


  return createSelector;
}
var createSelector = /* #__PURE__ */createSelectorCreator(_defaultMemoize__WEBPACK_IMPORTED_MODULE_0__.defaultMemoize);
// Manual definition of state and output arguments
var createStructuredSelector = function createStructuredSelector(selectors, selectorCreator) {
  if (selectorCreator === void 0) {
    selectorCreator = createSelector;
  }

  if (typeof selectors !== 'object') {
    throw new Error('createStructuredSelector expects first argument to be an object ' + ("where each property is a selector, instead received a " + typeof selectors));
  }

  var objectKeys = Object.keys(selectors);
  var resultSelector = selectorCreator( // @ts-ignore
  objectKeys.map(function (key) {
    return selectors[key];
  }), function () {
    for (var _len3 = arguments.length, values = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      values[_key3] = arguments[_key3];
    }

    return values.reduce(function (composition, value, index) {
      composition[objectKeys[index]] = value;
      return composition;
    }, {});
  });
  return resultSelector;
};

/***/ }),

/***/ "@apollo/client/react/hoc":
/*!***************************************!*\
  !*** external "ApolloClientReactHoc" ***!
  \***************************************/
/***/ (function(module) {

module.exports = ApolloClientReactHoc;

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

/***/ "components/FieldHolder/FieldHolder":
/*!******************************!*\
  !*** external "FieldHolder" ***!
  \******************************/
/***/ (function(module) {

module.exports = FieldHolder;

/***/ }),

/***/ "components/FormBuilder/FormBuilder":
/*!******************************!*\
  !*** external "FormBuilder" ***!
  \******************************/
/***/ (function(module) {

module.exports = FormBuilder;

/***/ }),

/***/ "containers/FormBuilderLoader/FormBuilderLoader":
/*!************************************!*\
  !*** external "FormBuilderLoader" ***!
  \************************************/
/***/ (function(module) {

module.exports = FormBuilderLoader;

/***/ }),

/***/ "graphql-tag":
/*!*****************************!*\
  !*** external "GraphQLTag" ***!
  \*****************************/
/***/ (function(module) {

module.exports = GraphQLTag;

/***/ }),

/***/ "lib/Injector":
/*!***************************!*\
  !*** external "Injector" ***!
  \***************************/
/***/ (function(module) {

module.exports = Injector;

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

/***/ "react-dnd":
/*!***************************!*\
  !*** external "ReactDND" ***!
  \***************************/
/***/ (function(module) {

module.exports = ReactDND;

/***/ }),

/***/ "react-dnd-html5-backend":
/*!***************************************!*\
  !*** external "ReactDNDHtml5Backend" ***!
  \***************************************/
/***/ (function(module) {

module.exports = ReactDNDHtml5Backend;

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

/***/ "classnames":
/*!*****************************!*\
  !*** external "classnames" ***!
  \*****************************/
/***/ (function(module) {

module.exports = classnames;

/***/ }),

/***/ "lib/getFormState":
/*!*******************************!*\
  !*** external "getFormState" ***!
  \*******************************/
/***/ (function(module) {

module.exports = getFormState;

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

/***/ "lib/withDragDropContext":
/*!**************************************!*\
  !*** external "withDragDropContext" ***!
  \**************************************/
/***/ (function(module) {

module.exports = withDragDropContext;

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
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