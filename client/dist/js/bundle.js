/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/bundles/bundle.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/boot/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _registerComponents = __webpack_require__("./client/src/boot/registerComponents.js");

var _registerComponents2 = _interopRequireDefault(_registerComponents);

var _registerTransforms = __webpack_require__("./client/src/boot/registerTransforms.js");

var _registerTransforms2 = _interopRequireDefault(_registerTransforms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.document.addEventListener('DOMContentLoaded', function () {
  (0, _registerComponents2.default)();
  (0, _registerTransforms2.default)();
});

/***/ }),

/***/ "./client/src/boot/registerComponents.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Injector = __webpack_require__(3);

var _Injector2 = _interopRequireDefault(_Injector);

var _Element = __webpack_require__("./client/src/components/ElementEditor/Element.js");

var _Element2 = _interopRequireDefault(_Element);

var _ElementActions = __webpack_require__("./client/src/components/ElementEditor/ElementActions.js");

var _ElementActions2 = _interopRequireDefault(_ElementActions);

var _ElementEditor = __webpack_require__("./client/src/components/ElementEditor/ElementEditor.js");

var _ElementEditor2 = _interopRequireDefault(_ElementEditor);

var _ElementList = __webpack_require__("./client/src/components/ElementEditor/ElementList.js");

var _ElementList2 = _interopRequireDefault(_ElementList);

var _Toolbar = __webpack_require__("./client/src/components/ElementEditor/Toolbar.js");

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _AddNewButton = __webpack_require__("./client/src/components/ElementEditor/AddNewButton.js");

var _AddNewButton2 = _interopRequireDefault(_AddNewButton);

var _Header = __webpack_require__("./client/src/components/ElementEditor/Header.js");

var _Header2 = _interopRequireDefault(_Header);

var _Content = __webpack_require__("./client/src/components/ElementEditor/Content.js");

var _Content2 = _interopRequireDefault(_Content);

var _Summary = __webpack_require__("./client/src/components/ElementEditor/Summary.js");

var _Summary2 = _interopRequireDefault(_Summary);

var _InlineEditForm = __webpack_require__("./client/src/components/ElementEditor/InlineEditForm.js");

var _InlineEditForm2 = _interopRequireDefault(_InlineEditForm);

var _AddElementPopover = __webpack_require__("./client/src/components/ElementEditor/AddElementPopover.js");

var _AddElementPopover2 = _interopRequireDefault(_AddElementPopover);

var _HoverBar = __webpack_require__("./client/src/components/ElementEditor/HoverBar.js");

var _HoverBar2 = _interopRequireDefault(_HoverBar);

var _DragPositionIndicator = __webpack_require__("./client/src/components/ElementEditor/DragPositionIndicator.js");

var _DragPositionIndicator2 = _interopRequireDefault(_DragPositionIndicator);

var _TextCheckboxGroupField = __webpack_require__("./client/src/components/TextCheckboxGroupField/TextCheckboxGroupField.js");

var _TextCheckboxGroupField2 = _interopRequireDefault(_TextCheckboxGroupField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  _Injector2.default.component.registerMany({
    ElementEditor: _ElementEditor2.default,
    ElementToolbar: _Toolbar2.default,
    ElementAddNewButton: _AddNewButton2.default,
    ElementList: _ElementList2.default,
    Element: _Element2.default,
    ElementActions: _ElementActions2.default,
    ElementHeader: _Header2.default,
    ElementContent: _Content2.default,
    ElementSummary: _Summary2.default,
    ElementInlineEditForm: _InlineEditForm2.default,
    AddElementPopover: _AddElementPopover2.default,
    HoverBar: _HoverBar2.default,
    DragPositionIndicator: _DragPositionIndicator2.default,
    TextCheckboxGroupField: _TextCheckboxGroupField2.default
  });
};

/***/ }),

/***/ "./client/src/boot/registerTransforms.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Injector = __webpack_require__(3);

var _Injector2 = _interopRequireDefault(_Injector);

var _readOneBlockQuery = __webpack_require__("./client/src/state/history/readOneBlockQuery.js");

var _readOneBlockQuery2 = _interopRequireDefault(_readOneBlockQuery);

var _HistoricElementView = __webpack_require__("./client/src/components/HistoricElementView/HistoricElementView.js");

var _HistoricElementView2 = _interopRequireDefault(_HistoricElementView);

var _revertToBlockVersionMutation = __webpack_require__("./client/src/state/history/revertToBlockVersionMutation.js");

var _revertToBlockVersionMutation2 = _interopRequireDefault(_revertToBlockVersionMutation);

var _readBlocksForAreaQuery = __webpack_require__("./client/src/state/editor/readBlocksForAreaQuery.js");

var _readBlocksForAreaQuery2 = _interopRequireDefault(_readBlocksForAreaQuery);

var _addElementMutation = __webpack_require__("./client/src/state/editor/addElementMutation.js");

var _addElementMutation2 = _interopRequireDefault(_addElementMutation);

var _ArchiveAction = __webpack_require__("./client/src/components/ElementActions/ArchiveAction.js");

var _ArchiveAction2 = _interopRequireDefault(_ArchiveAction);

var _DuplicateAction = __webpack_require__("./client/src/components/ElementActions/DuplicateAction.js");

var _DuplicateAction2 = _interopRequireDefault(_DuplicateAction);

var _PublishAction = __webpack_require__("./client/src/components/ElementActions/PublishAction.js");

var _PublishAction2 = _interopRequireDefault(_PublishAction);

var _SaveAction = __webpack_require__("./client/src/components/ElementActions/SaveAction.js");

var _SaveAction2 = _interopRequireDefault(_SaveAction);

var _UnpublishAction = __webpack_require__("./client/src/components/ElementActions/UnpublishAction.js");

var _UnpublishAction2 = _interopRequireDefault(_UnpublishAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  _Injector2.default.transform('elemental-fieldgroup', function (updater) {
    updater.component('FieldGroup.HistoryViewer.VersionDetail', _HistoricElementView2.default, 'HistoricElement');
  }, {
    after: 'field-holders'
  });

  _Injector2.default.transform('elements-history', function (updater) {
    updater.component('HistoryViewer.Form_ItemEditForm', _readOneBlockQuery2.default, 'ElementHistoryViewer');
  });

  _Injector2.default.transform('blocks-history-revert', function (updater) {
    updater.component('HistoryViewerToolbar.VersionedAdmin.HistoryViewer.Element.HistoryViewerVersionDetail', _revertToBlockVersionMutation2.default, 'BlockRevertMutation');
  });

  var globalUseGraphqQL = false;
  if (globalUseGraphqQL) {
    _Injector2.default.transform('cms-element-editor', function (updater) {
      updater.component('ElementList', _readBlocksForAreaQuery2.default, 'PageElements');
    });
  }

  _Injector2.default.transform('cms-element-adder', function (updater) {
    updater.component('AddElementPopover', _addElementMutation2.default, 'ElementAddButton');
  });

  _Injector2.default.transform('element-actions', function (updater) {
    updater.component('ElementActions', _SaveAction2.default, 'ElementActionsWithSave');
    updater.component('ElementActions', _PublishAction2.default, 'ElementActionsWithPublish');
    updater.component('ElementActions', _UnpublishAction2.default, 'ElementActionsWithUnpublish');
    updater.component('ElementActions', _DuplicateAction2.default, 'ElementActionsWithDuplicate');
    updater.component('ElementActions', _ArchiveAction2.default, 'ElementActionsWithArchive');
  });
};

/***/ }),

/***/ "./client/src/bundles/bundle.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__("./client/src/legacy/ElementEditor/entwine.js");
__webpack_require__("./client/src/boot/index.js");

/***/ }),

/***/ "./client/src/components/ElementActions/AbstractAction.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(7);

var _classnames2 = _interopRequireDefault(_classnames);

var _reactstrap = __webpack_require__(10);

var _elementTypeType = __webpack_require__("./client/src/types/elementTypeType.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AbstractAction = function AbstractAction(props) {
  var className = props.className,
      title = props.title,
      label = props.label;


  var itemProps = _extends({
    className: (0, _classnames2.default)(className, 'dropdown-item')
  }, props);

  return _react2.default.createElement(
    _reactstrap.DropdownItem,
    itemProps,
    label || title
  );
};

AbstractAction.propTypes = {
  disabled: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  title: _propTypes2.default.string,
  name: _propTypes2.default.string,
  type: _elementTypeType.elementTypeType,
  active: _propTypes2.default.bool,
  label: _propTypes2.default.string
};

AbstractAction.defaultProps = {
  disabled: false
};

exports.default = AbstractAction;

/***/ }),

/***/ "./client/src/components/ElementActions/ArchiveAction.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(4);

var _AbstractAction = __webpack_require__("./client/src/components/ElementActions/AbstractAction.js");

var _AbstractAction2 = _interopRequireDefault(_AbstractAction);

var _archiveBlockMutation = __webpack_require__("./client/src/state/editor/archiveBlockMutation.js");

var _archiveBlockMutation2 = _interopRequireDefault(_archiveBlockMutation);

var _i18n = __webpack_require__(2);

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ArchiveAction = function ArchiveAction(MenuComponent) {
  return function (props) {
    var handleClick = function handleClick(event) {
      event.stopPropagation();

      var id = props.element.id,
          isPublished = props.isPublished,
          handleArchiveBlock = props.actions.handleArchiveBlock;


      var archiveMessage = _i18n2.default._t('ElementArchiveAction.CONFIRM_DELETE', 'Are you sure you want to send this block to the archive?');

      if (isPublished) {
        archiveMessage = _i18n2.default._t('ElementArchiveAction.CONFIRM_DELETE_AND_UNPUBLISH', 'Warning: This block will be unpublished before being sent to the archive. Are you sure you want to proceed?');
      }

      if (handleArchiveBlock && window.confirm(archiveMessage)) {
        handleArchiveBlock(id).then(function () {
          var preview = window.jQuery('.cms-preview');
          preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));
        });
      }
    };

    var disabled = props.element.canDelete !== undefined && !props.element.canDelete;
    var label = _i18n2.default._t('ElementArchiveAction.ARCHIVE', 'Archive');
    var title = disabled ? _i18n2.default._t('ElementArchiveAction.ARCHIVE_PERMISSION_DENY', 'Archive, insufficient permissions') : label;
    var newProps = {
      label: label,
      title: title,
      disabled: disabled,
      className: 'element-editor__actions-archive',
      onClick: handleClick,
      toggle: props.toggle
    };

    return _react2.default.createElement(
      MenuComponent,
      props,
      props.children,
      _react2.default.createElement(_AbstractAction2.default, newProps)
    );
  };
};

exports.Component = ArchiveAction;
exports.default = (0, _redux.compose)(_archiveBlockMutation2.default, ArchiveAction);

/***/ }),

/***/ "./client/src/components/ElementActions/DuplicateAction.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(4);

var _AbstractAction = __webpack_require__("./client/src/components/ElementActions/AbstractAction.js");

var _AbstractAction2 = _interopRequireDefault(_AbstractAction);

var _duplicateBlockMutation = __webpack_require__("./client/src/state/editor/duplicateBlockMutation.js");

var _duplicateBlockMutation2 = _interopRequireDefault(_duplicateBlockMutation);

var _i18n = __webpack_require__(2);

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DuplicateAction = function DuplicateAction(MenuComponent) {
  return function (props) {
    if (props.type.broken) {
      return _react2.default.createElement(MenuComponent, props);
    }

    var handleClick = function handleClick(event) {
      event.stopPropagation();

      var id = props.element.id,
          handleDuplicateBlock = props.actions.handleDuplicateBlock;


      if (handleDuplicateBlock) {
        handleDuplicateBlock(id).then(function () {
          var preview = window.jQuery('.cms-preview');
          preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));
        });
      }
    };

    var disabled = props.element.canCreate !== undefined && !props.element.canCreate;
    var label = _i18n2.default._t('ElementArchiveAction.DUPLICATE', 'Duplicate');
    var title = disabled ? _i18n2.default._t('ElementArchiveAction.DUPLICATE_PERMISSION_DENY', 'Duplicate, insufficient permissions') : label;
    var newProps = {
      label: label,
      title: title,
      disabled: disabled,
      className: 'element-editor__actions-duplicate',
      onClick: handleClick,
      toggle: props.toggle
    };

    return _react2.default.createElement(
      MenuComponent,
      props,
      props.children,
      _react2.default.createElement(_AbstractAction2.default, newProps)
    );
  };
};

exports.Component = DuplicateAction;
exports.default = (0, _redux.compose)(_duplicateBlockMutation2.default, DuplicateAction);

/***/ }),

/***/ "./client/src/components/ElementActions/PublishAction.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(4);

var _AbstractAction = __webpack_require__("./client/src/components/ElementActions/AbstractAction.js");

var _AbstractAction2 = _interopRequireDefault(_AbstractAction);

var _publishBlockMutation = __webpack_require__("./client/src/state/editor/publishBlockMutation.js");

var _publishBlockMutation2 = _interopRequireDefault(_publishBlockMutation);

var _i18n = __webpack_require__(2);

var _i18n2 = _interopRequireDefault(_i18n);

var _Backend = __webpack_require__(12);

var _Backend2 = _interopRequireDefault(_Backend);

var _reactRedux = __webpack_require__(8);

var _loadElementSchemaValue = __webpack_require__("./client/src/state/editor/loadElementSchemaValue.js");

var _loadElementFormStateName = __webpack_require__("./client/src/state/editor/loadElementFormStateName.js");

var _reduxForm = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reportPublicationStatus = function reportPublicationStatus(type, title, success) {
  var noTitle = _i18n2.default.inject(_i18n2.default._t('ElementHeader.NOTITLE', 'Untitled {type} block'), { type: type });
  var successMessage = _i18n2.default.inject(_i18n2.default._t('ElementPublishAction.SUCCESS_NOTIFICATION', 'Published \'{title}\' successfully'), { title: title || noTitle });
  var errorMessage = _i18n2.default.inject(_i18n2.default._t('ElementPublishAction.ERROR_NOTIFICATION', 'Error publishing \'{title}\''), { title: title || noTitle });
  window.jQuery.noticeAdd({
    text: success ? successMessage : errorMessage,
    stay: false,
    type: success ? 'success' : 'error'
  });
};

var performSaveForElementWithFormData = function performSaveForElementWithFormData(id, formData, securityId) {
  var saveEndpoint = _Backend2.default.createEndpointFetcher({
    url: (0, _loadElementSchemaValue.loadElementSchemaValue)('saveUrl', id),
    method: (0, _loadElementSchemaValue.loadElementSchemaValue)('saveMethod'),
    payloadFormat: (0, _loadElementSchemaValue.loadElementSchemaValue)('payloadFormat'),
    defaultData: {
      SecurityID: securityId
    }
  });

  return saveEndpoint(formData).then(function () {
    return window.ss.apolloClient.queryManager.reFetchObservableQueries();
  }).then(function (input) {
    var preview = window.jQuery('.cms-preview');
    preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));
    return input;
  }).then(function (newPageData) {
    var newElementData = newPageData[0] && newPageData[0].data.readOneElementalArea.elements.find(function (elementData) {
      return elementData.id === id;
    });
    return newElementData && newElementData.version;
  });
};

var PublishAction = function PublishAction(MenuComponent) {
  return function (props) {
    if (props.type.broken) {
      return _react2.default.createElement(MenuComponent, props);
    }

    var element = props.element,
        formDirty = props.formDirty;


    var handleClick = function handleClick(event) {
      event.stopPropagation();

      var _props$element = props.element,
          id = _props$element.id,
          title = _props$element.title,
          type = props.type,
          securityId = props.securityId,
          formData = props.formData,
          handlePublishBlock = props.actions.handlePublishBlock,
          reinitialiseForm = props.reinitialiseForm;


      var actionFlow = new Promise(function (resolve) {
        return resolve();
      });

      if (formDirty) {
        actionFlow = performSaveForElementWithFormData(id, formData, securityId).then(function (passthrough) {
          reinitialiseForm(formData);
          return passthrough;
        });
      }

      actionFlow.then(function () {
        return handlePublishBlock(id);
      }).then(function () {
        return reportPublicationStatus(type.title, title, true);
      }).catch(function () {
        return reportPublicationStatus(type.title, title, false);
      });
    };

    var disabled = props.element.canPublish !== undefined && !props.element.canPublish;
    var label = _i18n2.default._t('ElementArchiveAction.PUBLISH', 'Publish');
    var title = disabled ? _i18n2.default._t('ElementArchiveAction.PUBLISH_PERMISSION_DENY', 'Publish, insufficient permissions') : label;
    var newProps = {
      label: label,
      title: title,
      disabled: disabled,
      className: 'element-editor__actions-publish',
      onClick: handleClick,
      toggle: props.toggle
    };

    return _react2.default.createElement(
      MenuComponent,
      props,
      props.children,
      (formDirty || !element.isLiveVersion) && _react2.default.createElement(_AbstractAction2.default, newProps)
    );
  };
};

function mapStateToProps(state, ownProps) {
  var formName = (0, _loadElementFormStateName.loadElementFormStateName)(ownProps.element.id);

  var formData = null;

  if (state.form.formState.element && state.form.formState.element[formName]) {
    formData = state.form.formState.element[formName].values;
  }

  return {
    formData: formData,
    securityId: state.config.SecurityID,
    formDirty: state.unsavedForms.find(function (unsaved) {
      return unsaved.name === 'element.' + formName;
    })
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  var formName = (0, _loadElementFormStateName.loadElementFormStateName)(ownProps.element.id);

  return {
    reinitialiseForm: function reinitialiseForm(savedData) {
      dispatch((0, _reduxForm.initialize)('element.' + formName, savedData));
    }
  };
}

exports.Component = PublishAction;
exports.default = (0, _redux.compose)(_publishBlockMutation2.default, (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), PublishAction);

/***/ }),

/***/ "./client/src/components/ElementActions/SaveAction.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(4);

var _reactRedux = __webpack_require__(8);

var _AbstractAction = __webpack_require__("./client/src/components/ElementActions/AbstractAction.js");

var _AbstractAction2 = _interopRequireDefault(_AbstractAction);

var _Backend = __webpack_require__(12);

var _Backend2 = _interopRequireDefault(_Backend);

var _i18n = __webpack_require__(2);

var _i18n2 = _interopRequireDefault(_i18n);

var _loadElementSchemaValue = __webpack_require__("./client/src/state/editor/loadElementSchemaValue.js");

var _loadElementFormStateName = __webpack_require__("./client/src/state/editor/loadElementFormStateName.js");

var _reduxForm = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SaveAction = function SaveAction(MenuComponent) {
  return function (props) {
    if (!props.expandable || props.type.broken) {
      return _react2.default.createElement(MenuComponent, props);
    }

    var handleClick = function handleClick(event) {
      event.stopPropagation();

      var element = props.element,
          type = props.type,
          securityId = props.securityId,
          formData = props.formData,
          reinitialiseForm = props.reinitialiseForm;
      var _window = window,
          $ = _window.jQuery;

      var noTitle = _i18n2.default.inject(_i18n2.default._t('ElementHeader.NOTITLE', 'Untitled {type} block'), { type: type.title });

      var endpointSpec = {
        url: (0, _loadElementSchemaValue.loadElementSchemaValue)('saveUrl', element.id),
        method: (0, _loadElementSchemaValue.loadElementSchemaValue)('saveMethod'),
        payloadFormat: (0, _loadElementSchemaValue.loadElementSchemaValue)('payloadFormat'),
        defaultData: {
          SecurityID: securityId
        }
      };

      var endpoint = _Backend2.default.createEndpointFetcher(endpointSpec);
      endpoint(formData).then(function () {
        var apolloClient = window.ss.apolloClient;

        apolloClient.queryManager.reFetchObservableQueries();
        reinitialiseForm(formData);

        var preview = $('.cms-preview');
        preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));

        var newTitle = formData ? formData['PageElements_' + element.id + '_Title'] : null;
        $.noticeAdd({
          text: _i18n2.default.inject(_i18n2.default._t('ElementSaveAction.SUCCESS_NOTIFICATION', 'Saved \'{title}\' successfully'), { title: newTitle || noTitle }),
          stay: false,
          type: 'success'
        });
      }).catch(function () {
        $.noticeAdd({
          text: _i18n2.default.inject(_i18n2.default._t('ElementSaveAction.ERROR_NOTIFICATION', 'Error saving \'{title}\''), { title: element.Title || noTitle }),
          stay: false,
          type: 'error'
        });
      });
    };

    var newProps = {
      title: _i18n2.default._t('ElementSaveAction.SAVE', 'Save'),
      className: 'element-editor__actions-save',
      onClick: handleClick
    };

    return _react2.default.createElement(
      MenuComponent,
      props,
      props.children,
      _react2.default.createElement(_AbstractAction2.default, newProps)
    );
  };
};

function mapStateToProps(state, ownProps) {
  var formName = (0, _loadElementFormStateName.loadElementFormStateName)(ownProps.element.id);

  var formData = null;

  if (state.form.formState.element && state.form.formState.element[formName]) {
    formData = state.form.formState.element[formName].values;
  }

  return {
    formData: formData,
    securityId: state.config.SecurityID
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  var formName = (0, _loadElementFormStateName.loadElementFormStateName)(ownProps.element.id);

  return {
    reinitialiseForm: function reinitialiseForm(savedData) {
      dispatch((0, _reduxForm.initialize)('element.' + formName, savedData));
    }
  };
}

exports.Component = SaveAction;
exports.default = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), SaveAction);

/***/ }),

/***/ "./client/src/components/ElementActions/UnpublishAction.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(4);

var _AbstractAction = __webpack_require__("./client/src/components/ElementActions/AbstractAction.js");

var _AbstractAction2 = _interopRequireDefault(_AbstractAction);

var _unpublishBlockMutation = __webpack_require__("./client/src/state/editor/unpublishBlockMutation.js");

var _unpublishBlockMutation2 = _interopRequireDefault(_unpublishBlockMutation);

var _i18n = __webpack_require__(2);

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UnpublishAction = function UnpublishAction(MenuComponent) {
  return function (props) {
    if (props.type.broken) {
      return _react2.default.createElement(MenuComponent, props);
    }

    var element = props.element,
        type = props.type,
        handleUnpublishBlock = props.actions.handleUnpublishBlock;


    var handleClick = function handleClick(event) {
      event.stopPropagation();
      var _window = window,
          $ = _window.jQuery;

      var noTitle = _i18n2.default.inject(_i18n2.default._t('ElementHeader.NOTITLE', 'Untitled {type} block'), { type: type.title });

      if (handleUnpublishBlock) {
        handleUnpublishBlock(element.id).then(function () {
          var preview = $('.cms-preview');
          preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));

          $.noticeAdd({
            text: _i18n2.default.inject(_i18n2.default._t('ElementUnpublishAction.SUCCESS_NOTIFICATION', 'Removed \'{title}\' from the published page'), { title: element.title || noTitle }),
            stay: false,
            type: 'success'
          });
        }).catch(function () {
          $.noticeAdd({
            text: _i18n2.default.inject(_i18n2.default._t('ElementUnpublishAction.ERROR_NOTIFICATION', 'Error unpublishing \'{title}\''), { title: element.title || noTitle }),
            stay: false,
            type: 'error'
          });
        });
      }
    };

    var disabled = props.element.canUnpublish !== undefined && !props.element.canUnpublish;
    var label = _i18n2.default._t('ElementArchiveAction.UNPUBLISH', 'Unpublish');
    var title = disabled ? _i18n2.default._t('ElementArchiveAction.UNPUBLISH_PERMISSION_DENY', 'Unpublish, insufficient permissions') : label;
    var newProps = {
      label: label,
      title: title,
      disabled: disabled,
      className: 'element-editor__actions-unpublish',
      onClick: handleClick,
      toggle: props.toggle
    };

    return _react2.default.createElement(
      MenuComponent,
      props,
      props.children,
      element.isPublished && _react2.default.createElement(_AbstractAction2.default, newProps)
    );
  };
};

exports.Component = UnpublishAction;
exports.default = (0, _redux.compose)(_unpublishBlockMutation2.default, UnpublishAction);

/***/ }),

/***/ "./client/src/components/ElementEditor/AddElementPopover.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(7);

var _classnames2 = _interopRequireDefault(_classnames);

var _Injector = __webpack_require__(3);

var _elementTypeType = __webpack_require__("./client/src/types/elementTypeType.js");

var _i18n = __webpack_require__(2);

var _i18n2 = _interopRequireDefault(_i18n);

var _Backend = __webpack_require__(12);

var _Backend2 = _interopRequireDefault(_Backend);

var _ElementEditor = __webpack_require__("./client/src/components/ElementEditor/ElementEditor.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddElementPopover = function (_Component) {
  _inherits(AddElementPopover, _Component);

  function AddElementPopover(props) {
    _classCallCheck(this, AddElementPopover);

    var _this = _possibleConstructorReturn(this, (AddElementPopover.__proto__ || Object.getPrototypeOf(AddElementPopover)).call(this, props));

    _this.handleToggle = _this.handleToggle.bind(_this);
    AddElementPopover.contextType = _ElementEditor.ElementEditorContext;
    return _this;
  }

  _createClass(AddElementPopover, [{
    key: 'getGraphQLElementButtonClickHandler',
    value: function getGraphQLElementButtonClickHandler(elementType) {
      var _this2 = this;

      return function (event) {
        var _props = _this2.props,
            handleAddElementToArea = _props.actions.handleAddElementToArea,
            insertAfterElement = _props.insertAfterElement;


        event.preventDefault();
        handleAddElementToArea(elementType.class, insertAfterElement).then(function () {
          var preview = window.jQuery('.cms-preview');
          preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));
        });
        _this2.handleToggle();
      };
    }
  }, {
    key: 'getElementButtonClickHandler',
    value: function getElementButtonClickHandler(elementType) {
      var _this3 = this;

      return function (event) {
        event.preventDefault();
        _Backend2.default.post('/admin/elemental-area/add/', {
          elementClass: elementType.class,
          elementalAreaID: _this3.props.areaId,
          insertAfterElementID: _this3.props.insertAfterElement
        }).then(function () {
          var fetchBlocks = _this3.context.fetchBlocks;

          fetchBlocks();
        }).then(function () {
          var preview = window.jQuery('.cms-preview');
          preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));
        });
        _this3.handleToggle();
      };
    }
  }, {
    key: 'handleToggle',
    value: function handleToggle() {
      var toggle = this.props.toggle;


      toggle();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props2 = this.props,
          PopoverOptionSetComponent = _props2.PopoverOptionSetComponent,
          elementTypes = _props2.elementTypes,
          container = _props2.container,
          extraClass = _props2.extraClass,
          isOpen = _props2.isOpen,
          placement = _props2.placement,
          target = _props2.target;


      var popoverClassNames = (0, _classnames2.default)('element-editor-add-element', extraClass);

      var globalUseGraphQL = false;

      var buttons = elementTypes.map(function (elementType) {
        return {
          content: elementType.title,
          key: elementType.name,
          className: (0, _classnames2.default)(elementType.icon, 'btn--icon-xl', 'element-editor-add-element__button'),
          onClick: globalUseGraphQL ? _this4.getGraphQLElementButtonClickHandler(elementType) : _this4.getElementButtonClickHandler(elementType)
        };
      });

      return _react2.default.createElement(PopoverOptionSetComponent, {
        buttons: buttons,
        searchPlaceholder: _i18n2.default._t('ElementAddElementPopover.SEARCH_BLOCKS', 'Search blocks'),
        extraClass: popoverClassNames,
        container: container,
        isOpen: isOpen,
        placement: placement,
        target: target,
        toggle: this.handleToggle
      });
    }
  }]);

  return AddElementPopover;
}(_react.Component);

AddElementPopover.propTypes = {
  container: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func, _propTypes2.default.object]),
  elementTypes: _propTypes2.default.arrayOf(_elementTypeType.elementTypeType).isRequired,
  extraClass: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array, _propTypes2.default.object]),
  isOpen: _propTypes2.default.bool.isRequired,
  placement: _propTypes2.default.string,
  target: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func, _propTypes2.default.object]).isRequired,
  toggle: _propTypes2.default.func.isRequired,

  areaId: _propTypes2.default.number.isRequired,
  insertAfterElement: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
};

exports.default = (0, _Injector.inject)(['PopoverOptionSet'], function (PopoverOptionSetComponent) {
  return {
    PopoverOptionSetComponent: PopoverOptionSetComponent
  };
}, function () {
  return 'ElementEditor';
})(AddElementPopover);

/***/ }),

/***/ "./client/src/components/ElementEditor/AddNewButton.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactstrap = __webpack_require__(10);

var _i18n = __webpack_require__(2);

var _i18n2 = _interopRequireDefault(_i18n);

var _elementTypeType = __webpack_require__("./client/src/types/elementTypeType.js");

var _Injector = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddNewButton = function (_Component) {
  _inherits(AddNewButton, _Component);

  function AddNewButton(props) {
    _classCallCheck(this, AddNewButton);

    var _this = _possibleConstructorReturn(this, (AddNewButton.__proto__ || Object.getPrototypeOf(AddNewButton)).call(this, props));

    _this.toggle = _this.toggle.bind(_this);

    _this.state = {
      popoverOpen: false
    };
    return _this;
  }

  _createClass(AddNewButton, [{
    key: 'toggle',
    value: function toggle() {
      this.setState({
        popoverOpen: !this.state.popoverOpen
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          AddElementPopoverComponent = _props.AddElementPopoverComponent,
          elementTypes = _props.elementTypes,
          areaId = _props.areaId;

      var buttonAttributes = {
        id: 'ElementalArea' + areaId + '_AddButton',
        color: 'primary',
        onClick: this.toggle,
        className: 'font-icon-plus'
      };

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactstrap.Button,
          buttonAttributes,
          _i18n2.default._t('ElementAddNewButton.ADD_BLOCK', 'Add block')
        ),
        _react2.default.createElement(AddElementPopoverComponent, {
          placement: 'bottom-start',
          target: buttonAttributes.id,
          isOpen: this.state.popoverOpen,
          elementTypes: elementTypes,
          toggle: this.toggle,
          areaId: areaId,
          insertAfterElement: 0
        })
      );
    }
  }]);

  return AddNewButton;
}(_react.Component);

AddNewButton.defaultProps = {};
AddNewButton.propTypes = {
  elementTypes: _propTypes2.default.arrayOf(_elementTypeType.elementTypeType).isRequired,
  areaId: _propTypes2.default.number.isRequired
};

exports.Component = AddNewButton;
exports.default = (0, _Injector.inject)(['AddElementPopover'], function (AddElementPopoverComponent) {
  return {
    AddElementPopoverComponent: AddElementPopoverComponent
  };
}, function () {
  return 'ElementEditor.ElementList.AddNewButton';
})(AddNewButton);

/***/ }),

/***/ "./client/src/components/ElementEditor/Content.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Injector = __webpack_require__(3);

var _redux = __webpack_require__(4);

var _reactRedux = __webpack_require__(8);

var _loadElementFormStateName = __webpack_require__("./client/src/state/editor/loadElementFormStateName.js");

var _reduxForm = __webpack_require__(11);

var _getFormState = __webpack_require__(16);

var _getFormState2 = _interopRequireDefault(_getFormState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Content = function (_PureComponent) {
  _inherits(Content, _PureComponent);

  function Content() {
    _classCallCheck(this, Content);

    return _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).apply(this, arguments));
  }

  _createClass(Content, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          id = _props.id,
          fileUrl = _props.fileUrl,
          fileTitle = _props.fileTitle,
          content = _props.content,
          previewExpanded = _props.previewExpanded,
          InlineEditFormComponent = _props.InlineEditFormComponent,
          SummaryComponent = _props.SummaryComponent,
          activeTab = _props.activeTab,
          onFormInit = _props.onFormInit,
          handleLoadingError = _props.handleLoadingError,
          formDirty = _props.formDirty,
          broken = _props.broken;


      return _react2.default.createElement(
        'div',
        { className: 'element-editor-content' },
        !previewExpanded && _react2.default.createElement(SummaryComponent, {
          content: content,
          fileUrl: fileUrl,
          fileTitle: fileTitle,
          broken: broken
        }),
        previewExpanded && _react2.default.createElement(InlineEditFormComponent, {
          extraClass: { 'element-editor-editform--collapsed': !previewExpanded },
          onClick: function onClick(event) {
            return event.stopPropagation();
          },
          elementId: id,
          activeTab: activeTab,
          onFormInit: onFormInit,
          handleLoadingError: handleLoadingError
        }),
        formDirty && _react2.default.createElement('input', {
          type: 'hidden',
          name: 'change-tracker',
          className: 'element-form-dirty-state',
          value: '1'
        })
      );
    }
  }]);

  return Content;
}(_react.PureComponent);

Content.propTypes = {
  id: _propTypes2.default.string,
  content: _propTypes2.default.string,
  fileUrl: _propTypes2.default.string,
  fileTitle: _propTypes2.default.string,
  previewExpanded: _propTypes2.default.bool,
  SummaryComponent: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),
  InlineEditFormComponent: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),
  handleLoadingError: _propTypes2.default.func,
  broken: _propTypes2.default.bool
};

Content.defaultProps = {};

function mapStateToProps(state, ownProps) {
  var formName = (0, _loadElementFormStateName.loadElementFormStateName)(ownProps.id);

  return {
    formDirty: (0, _reduxForm.isDirty)('element.' + formName, _getFormState2.default)(state)
  };
}

exports.Component = Content;
exports.default = (0, _redux.compose)((0, _Injector.inject)(['ElementSummary', 'ElementInlineEditForm'], function (SummaryComponent, InlineEditFormComponent) {
  return {
    SummaryComponent: SummaryComponent, InlineEditFormComponent: InlineEditFormComponent
  };
}, function () {
  return 'ElementEditor.ElementList.Element';
}), (0, _reactRedux.connect)(mapStateToProps))(Content);

/***/ }),

/***/ "./client/src/components/ElementEditor/DragPositionIndicator.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DragPositionIndicator = function (_PureComponent) {
  _inherits(DragPositionIndicator, _PureComponent);

  function DragPositionIndicator() {
    _classCallCheck(this, DragPositionIndicator);

    return _possibleConstructorReturn(this, (DragPositionIndicator.__proto__ || Object.getPrototypeOf(DragPositionIndicator)).apply(this, arguments));
  }

  _createClass(DragPositionIndicator, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "elemental-editor-drag-indicator" },
        _react2.default.createElement("div", { className: "elemental-editor-drag-indicator__ball" })
      );
    }
  }]);

  return DragPositionIndicator;
}(_react.PureComponent);

exports.default = DragPositionIndicator;

/***/ }),

/***/ "./client/src/components/ElementEditor/Element.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _elementType = __webpack_require__("./client/src/types/elementType.js");

var _elementTypeType = __webpack_require__("./client/src/types/elementTypeType.js");

var _redux = __webpack_require__(4);

var _Injector = __webpack_require__(3);

var _i18n = __webpack_require__(2);

var _i18n2 = _interopRequireDefault(_i18n);

var _classnames = __webpack_require__(7);

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRedux = __webpack_require__(8);

var _loadElementFormStateName = __webpack_require__("./client/src/state/editor/loadElementFormStateName.js");

var _loadElementSchemaValue = __webpack_require__("./client/src/state/editor/loadElementSchemaValue.js");

var _TabsActions = __webpack_require__(19);

var TabsActions = _interopRequireWildcard(_TabsActions);

var _reactDnd = __webpack_require__(9);

var _reactDndHtml5Backend = __webpack_require__(14);

var _dragHelpers = __webpack_require__("./client/src/lib/dragHelpers.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = function (_Component) {
  _inherits(Element, _Component);

  _createClass(Element, null, [{
    key: 'getDerivedStateFromError',
    value: function getDerivedStateFromError() {
      return { childRenderingError: true };
    }
  }]);

  function Element(props) {
    _classCallCheck(this, Element);

    var _this = _possibleConstructorReturn(this, (Element.__proto__ || Object.getPrototypeOf(Element)).call(this, props));

    _this.handleKeyUp = _this.handleKeyUp.bind(_this);
    _this.handleExpand = _this.handleExpand.bind(_this);
    _this.handleLoadingError = _this.handleLoadingError.bind(_this);
    _this.handleTabClick = _this.handleTabClick.bind(_this);
    _this.updateFormTab = _this.updateFormTab.bind(_this);

    _this.state = {
      previewExpanded: false,
      initialTab: '',
      loadingError: false,
      childRenderingError: false
    };
    return _this;
  }

  _createClass(Element, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var connectDragPreview = this.props.connectDragPreview;

      if (connectDragPreview) {
        connectDragPreview((0, _reactDndHtml5Backend.getEmptyImage)(), {
          captureDraggingState: true
        });
      }
    }
  }, {
    key: 'getVersionedStateClassName',
    value: function getVersionedStateClassName() {
      var element = this.props.element;


      var baseClassName = 'element-editor__element';

      if (!element.isPublished) {
        return baseClassName + '--draft';
      }

      if (element.isPublished && !element.isLiveVersion) {
        return baseClassName + '--modified';
      }

      return baseClassName + '--published';
    }
  }, {
    key: 'getLinkTitle',
    value: function getLinkTitle(type) {
      if (type.broken) {
        return _i18n2.default._t('ElementalElement.ARCHIVE_BROKEN', 'Archive this block');
      }
      return _i18n2.default.inject(_i18n2.default._t('ElementalElement.TITLE', 'Edit this {type} block'), { type: type.title });
    }
  }, {
    key: 'getSummary',
    value: function getSummary(element, type) {
      if (type.broken) {
        return element.title ? _i18n2.default.inject(_i18n2.default._t('ElementalElement.BROKEN_DESCRIPTION_TITLE', 'This block had the title "{title}". It is broken and will not display on the front-end. You can archive it to remove it from this elemental area.'), { title: element.title }) : _i18n2.default._t('ElementalElement.BROKEN_DESCRIPTION', 'This block is broken and will not display on the front-end. You can archive it to remove it from this elemental area.');
      }

      return element.blockSchema.content;
    }
  }, {
    key: 'handleLoadingError',
    value: function handleLoadingError() {
      this.setState({
        loadingError: true
      });
    }
  }, {
    key: 'updateFormTab',
    value: function updateFormTab(activeTab) {
      var _props = this.props,
          tabSetName = _props.tabSetName,
          onActivateTab = _props.onActivateTab;
      var initialTab = this.state.initialTab;


      if (!initialTab) {
        this.setState({
          initialTab: activeTab
        });
      }

      if (activeTab || initialTab) {
        onActivateTab(tabSetName, activeTab || initialTab);
      } else {
        var defaultFirstTab = 'Main';
        onActivateTab(tabSetName, defaultFirstTab);
      }
    }
  }, {
    key: 'handleTabClick',
    value: function handleTabClick(toBeActiveTab) {
      var activeTab = this.props.activeTab;
      var loadingError = this.state.loadingError;


      if (toBeActiveTab !== activeTab && !loadingError) {
        this.setState({
          previewExpanded: true
        });

        this.updateFormTab(toBeActiveTab);
      }
    }
  }, {
    key: 'handleExpand',
    value: function handleExpand(event) {
      var _props2 = this.props,
          type = _props2.type,
          link = _props2.link;
      var loadingError = this.state.loadingError;


      if (type.broken) {
        return;
      }

      if (event.target.type === 'button') {
        event.stopPropagation();
        return;
      }

      if (type.inlineEditable && !loadingError) {
        this.setState({
          previewExpanded: !this.state.previewExpanded
        });
        return;
      }

      window.location = link;
    }
  }, {
    key: 'handleKeyUp',
    value: function handleKeyUp(event) {
      var nodeName = event.target.nodeName;


      if ((event.key === ' ' || event.key === 'Enter') && !['input', 'textarea'].includes(nodeName.toLowerCase())) {
        this.handleExpand(event);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props,
          element = _props3.element,
          type = _props3.type,
          areaId = _props3.areaId,
          HeaderComponent = _props3.HeaderComponent,
          ContentComponent = _props3.ContentComponent,
          link = _props3.link,
          activeTab = _props3.activeTab,
          connectDragSource = _props3.connectDragSource,
          connectDropTarget = _props3.connectDropTarget,
          isDragging = _props3.isDragging,
          isOver = _props3.isOver,
          onDragEnd = _props3.onDragEnd;
      var _state = this.state,
          childRenderingError = _state.childRenderingError,
          previewExpanded = _state.previewExpanded;


      if (!element.id) {
        return null;
      }

      var elementClassNames = (0, _classnames2.default)('element-editor__element', {
        'element-editor__element--broken': type.broken,
        'element-editor__element--expandable': type.inlineEditable && !type.broken,
        'element-editor__element--dragging': isDragging,
        'element-editor__element--dragged-over': isOver
      }, this.getVersionedStateClassName());

      var content = connectDropTarget(_react2.default.createElement(
        'div',
        {
          className: elementClassNames,
          onClick: this.handleExpand,
          onKeyUp: this.handleKeyUp,
          role: 'button',
          tabIndex: 0,
          title: this.getLinkTitle(type),
          key: element.id
        },
        _react2.default.createElement(HeaderComponent, {
          element: element,
          type: type,
          areaId: areaId,
          expandable: type.inlineEditable,
          link: link,
          previewExpanded: previewExpanded && !childRenderingError,
          handleEditTabsClick: this.handleTabClick,
          activeTab: activeTab,
          disableTooltip: isDragging,
          onDragEnd: onDragEnd
        }),
        !childRenderingError && _react2.default.createElement(ContentComponent, {
          id: element.id,
          fileUrl: element.blockSchema.fileURL,
          fileTitle: element.blockSchema.fileTitle,
          content: this.getSummary(element, type),
          previewExpanded: previewExpanded && !isDragging,
          activeTab: activeTab,
          onFormInit: function onFormInit() {
            return _this2.updateFormTab(activeTab);
          },
          handleLoadingError: this.handleLoadingError,
          broken: type.broken
        }),
        childRenderingError && _react2.default.createElement(
          'div',
          { className: 'alert alert-danger mt-2' },
          _i18n2.default._t('ElementalElement.CHILD_RENDERING_ERROR', 'Something went wrong with this block. Please try saving and refreshing the CMS.')
        )
      ));

      if (!previewExpanded) {
        return connectDragSource(content);
      }

      return content;
    }
  }]);

  return Element;
}(_react.Component);

function mapStateToProps(state, ownProps) {
  var elementId = ownProps.element.id;
  var elementName = (0, _loadElementFormStateName.loadElementFormStateName)(elementId);
  var elementFormSchema = (0, _loadElementSchemaValue.loadElementSchemaValue)('schemaUrl', elementId);

  var filterFieldsForTabs = function filterFieldsForTabs(field) {
    return field.component === 'Tabs';
  };

  var tabSet = state.form && state.form.formSchemas[elementFormSchema] && state.form.formSchemas[elementFormSchema].schema && state.form.formSchemas[elementFormSchema].schema.fields.find(filterFieldsForTabs);

  var tabSetName = tabSet && tabSet.id;
  var uniqueFieldId = 'element.' + elementName + '__' + tabSetName;

  var activeTab = state.tabs && state.tabs.fields && state.tabs.fields[uniqueFieldId] && state.tabs.fields[uniqueFieldId].activeTab;

  return {
    tabSetName: tabSetName,
    activeTab: activeTab
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  var elementName = (0, _loadElementFormStateName.loadElementFormStateName)(ownProps.element.id);

  return {
    onActivateTab: function onActivateTab(tabSetName, activeTabName) {
      dispatch(TabsActions.activateTab('element.' + elementName + '__' + tabSetName, activeTabName));
    }
  };
}

Element.propTypes = {
  element: _elementType.elementType,
  type: _elementTypeType.elementTypeType.isRequired,
  areaId: _propTypes2.default.number.isRequired,
  link: _propTypes2.default.string.isRequired,

  activeTab: _propTypes2.default.string,
  tabSetName: _propTypes2.default.string,
  onActivateTab: _propTypes2.default.func,
  connectDragSource: _propTypes2.default.func.isRequired,
  connectDragPreview: _propTypes2.default.func.isRequired,
  connectDropTarget: _propTypes2.default.func.isRequired,
  isDragging: _propTypes2.default.bool.isRequired,
  isOver: _propTypes2.default.bool.isRequired,
  onDragOver: _propTypes2.default.func,
  onDragEnd: _propTypes2.default.func,
  onDragStart: _propTypes2.default.func };

Element.defaultProps = {
  element: null
};

exports.Component = Element;


var elementTarget = {
  drop: function drop(props, monitor, component) {
    var element = props.element;


    return {
      target: element.id,
      dropSpot: (0, _dragHelpers.isOverTop)(monitor, component) ? 'top' : 'bottom'
    };
  },
  hover: function hover(props, monitor, component) {
    var element = props.element,
        onDragOver = props.onDragOver;


    if (onDragOver) {
      onDragOver(element, (0, _dragHelpers.isOverTop)(monitor, component));
    }
  }
};

exports.default = (0, _redux.compose)((0, _reactDnd.DropTarget)('element', elementTarget, function (connector, monitor) {
  return {
    connectDropTarget: connector.dropTarget(),
    isOver: monitor.isOver()
  };
}), (0, _reactDnd.DragSource)('element', _dragHelpers.elementDragSource, function (connector, monitor) {
  return {
    connectDragSource: connector.dragSource(),
    connectDragPreview: connector.dragPreview(),
    isDragging: monitor.isDragging()
  };
}), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _Injector.inject)(['ElementHeader', 'ElementContent'], function (HeaderComponent, ContentComponent) {
  return {
    HeaderComponent: HeaderComponent, ContentComponent: ContentComponent
  };
}, function () {
  return 'ElementEditor.ElementList.Element';
}))(Element);

/***/ }),

/***/ "./client/src/components/ElementEditor/ElementActions.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _redux = __webpack_require__(4);

var _reactstrap = __webpack_require__(10);

var _Injector = __webpack_require__(3);

var _elementType = __webpack_require__("./client/src/types/elementType.js");

var _elementTypeType = __webpack_require__("./client/src/types/elementTypeType.js");

var _AbstractAction = __webpack_require__("./client/src/components/ElementActions/AbstractAction.js");

var _AbstractAction2 = _interopRequireDefault(_AbstractAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ElementActions = function (_Component) {
  _inherits(ElementActions, _Component);

  function ElementActions(props) {
    _classCallCheck(this, ElementActions);

    var _this = _possibleConstructorReturn(this, (ElementActions.__proto__ || Object.getPrototypeOf(ElementActions)).call(this, props));

    _this.handleEditTabsClick = _this.handleEditTabsClick.bind(_this);
    return _this;
  }

  _createClass(ElementActions, [{
    key: 'handleEditTabsClick',
    value: function handleEditTabsClick(event) {
      var handleEditTabsClick = this.props.handleEditTabsClick;

      handleEditTabsClick(event.target.name);
    }
  }, {
    key: 'renderEditTabs',
    value: function renderEditTabs() {
      var _this2 = this;

      var _props = this.props,
          editTabs = _props.editTabs,
          activeTab = _props.activeTab,
          type = _props.type,
          expandable = _props.expandable;

      if (type.broken || !expandable || !editTabs || !editTabs.length) {
        return null;
      }

      return editTabs.map(function (_ref) {
        var name = _ref.name,
            title = _ref.title;
        return _react2.default.createElement(_AbstractAction2.default, {
          key: name,
          name: name,
          title: title,
          type: type,
          onClick: _this2.handleEditTabsClick,
          active: name === activeTab
        });
      });
    }
  }, {
    key: 'renderDivider',
    value: function renderDivider() {
      var _props2 = this.props,
          children = _props2.children,
          editTabs = _props2.editTabs,
          expandable = _props2.expandable;

      if (!expandable || !editTabs || !editTabs.length || _react2.default.Children.count(children) === 0) {
        return null;
      }

      return _react2.default.createElement(_reactstrap.DropdownItem, { divider: true, role: 'separator' });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          children = _props3.children,
          id = _props3.id,
          ActionMenuComponent = _props3.ActionMenuComponent;


      var dropdownToggleClassNames = ['element-editor-header__actions-toggle', 'btn', 'btn-sm', 'btn--no-text', 'font-icon-dot-3'];

      return _react2.default.createElement(
        ActionMenuComponent,
        {
          id: 'element-editor-actions-' + id,
          className: 'element-editor-header__actions-dropdown',
          dropdownMenuProps: { right: true },
          dropdownToggleClassNames: dropdownToggleClassNames
        },
        this.renderEditTabs(),
        this.renderDivider(),
        children
      );
    }
  }]);

  return ElementActions;
}(_react.Component);

ElementActions.propTypes = {
  element: _elementType.elementType,
  type: _elementTypeType.elementTypeType.isRequired,

  areaId: _propTypes2.default.number.isRequired,
  activeTab: _propTypes2.default.string,
  editTabs: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    title: _propTypes2.default.string,
    name: _propTypes2.default.string
  })),
  handleEditTabsClick: _propTypes2.default.func.isRequired,
  expandable: _propTypes2.default.bool
};

ElementActions.defaultProps = {
  editTabs: [],
  expandable: true
};

exports.Component = ElementActions;
exports.default = (0, _redux.compose)((0, _Injector.inject)(['ActionMenu'], function (ActionMenuComponent) {
  return {
    ActionMenuComponent: ActionMenuComponent
  };
}, function () {
  return 'ElementEditor.ElementList.Element';
}))(ElementActions);

/***/ }),

/***/ "./client/src/components/ElementEditor/ElementDragPreview.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Header = __webpack_require__("./client/src/components/ElementEditor/Header.js");

var _Header2 = _interopRequireDefault(_Header);

var _reactDnd = __webpack_require__(9);

var _elementType = __webpack_require__("./client/src/types/elementType.js");

var _elementTypeType = __webpack_require__("./client/src/types/elementTypeType.js");

var _elementConfig = __webpack_require__("./client/src/state/editor/elementConfig.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ElementDragPreview = function (_Component) {
  _inherits(ElementDragPreview, _Component);

  function ElementDragPreview() {
    _classCallCheck(this, ElementDragPreview);

    return _possibleConstructorReturn(this, (ElementDragPreview.__proto__ || Object.getPrototypeOf(ElementDragPreview)).apply(this, arguments));
  }

  _createClass(ElementDragPreview, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          isDragging = _props.isDragging,
          element = _props.element,
          elementTypes = _props.elementTypes,
          currentOffset = _props.currentOffset;


      if (!isDragging || !currentOffset) {
        return null;
      }

      var x = currentOffset.x,
          y = currentOffset.y;

      var transform = 'translate(' + x + 'px, ' + y + 'px)';
      var style = {
        transform: transform,
        WebkitTransform: transform
      };
      var type = (0, _elementConfig.getElementTypeConfig)(element, elementTypes);

      return _react2.default.createElement(
        'div',
        { className: 'element-editor-drag-preview', style: style },
        _react2.default.createElement(_Header2.default, {
          element: element,
          type: type,
          simple: true
        })
      );
    }
  }]);

  return ElementDragPreview;
}(_react.Component);

ElementDragPreview.propTypes = {
  element: _elementType.elementType,
  elementTypes: _propTypes2.default.arrayOf(_elementTypeType.elementTypeType),
  isDragging: _propTypes2.default.bool,
  currentOffset: _propTypes2.default.shape({
    x: _propTypes2.default.number.isRequired,
    y: _propTypes2.default.number.isRequired
  })
};

exports.default = (0, _reactDnd.DragLayer)(function (monitor) {
  return {
    element: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  };
})(ElementDragPreview);

/***/ }),

/***/ "./client/src/components/ElementEditor/ElementEditor.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = exports.ElementEditorContext = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Injector = __webpack_require__(3);

var _redux = __webpack_require__(4);

var _elementTypeType = __webpack_require__("./client/src/types/elementTypeType.js");

var _reactRedux = __webpack_require__(8);

var _loadElementFormStateName = __webpack_require__("./client/src/state/editor/loadElementFormStateName.js");

var _reactDnd = __webpack_require__(9);

var _sortBlockMutation = __webpack_require__("./client/src/state/editor/sortBlockMutation.js");

var _sortBlockMutation2 = _interopRequireDefault(_sortBlockMutation);

var _ElementDragPreview = __webpack_require__("./client/src/components/ElementEditor/ElementDragPreview.js");

var _ElementDragPreview2 = _interopRequireDefault(_ElementDragPreview);

var _withDragDropContext = __webpack_require__(21);

var _withDragDropContext2 = _interopRequireDefault(_withDragDropContext);

var _Backend = __webpack_require__(12);

var _Backend2 = _interopRequireDefault(_Backend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ElementEditorContext = exports.ElementEditorContext = (0, _react.createContext)(null);

var ElementEditor = function (_PureComponent) {
  _inherits(ElementEditor, _PureComponent);

  function ElementEditor(props) {
    _classCallCheck(this, ElementEditor);

    var _this = _possibleConstructorReturn(this, (ElementEditor.__proto__ || Object.getPrototypeOf(ElementEditor)).call(this, props));

    _this.state = {
      dragTargetElementId: null,
      dragSpot: null,
      contentBlocks: null,
      isLoading: true
    };

    _this.handleDragOver = _this.handleDragOver.bind(_this);
    _this.handleDragEnd = _this.handleDragEnd.bind(_this);
    _this.fetchBlocks = _this.fetchBlocks.bind(_this);
    return _this;
  }

  _createClass(ElementEditor, [{
    key: 'handleDragOver',
    value: function handleDragOver() {
      var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var isOverTop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var id = element ? element.id : false;

      this.setState({
        dragTargetElementId: id,
        dragSpot: isOverTop === false ? 'bottom' : 'top'
      });
    }
  }, {
    key: 'handleDragEnd',
    value: function handleDragEnd(sourceId, afterId) {
      var globalUseGraphQL = false;
      if (globalUseGraphQL) {
        var _props = this.props,
            handleSortBlock = _props.actions.handleSortBlock,
            areaId = _props.areaId;

        handleSortBlock(sourceId, afterId, areaId).then(function () {
          var preview = window.jQuery('.cms-preview');
          preview.entwine('ss.preview')._loadUrl(preview.find('iframe').attr('src'));
        });
      } else {
        _Backend2.default.post('/admin/elemental-area/sort', {
          ID: sourceId,
          afterBlockID: afterId
        }).then(function (response) {
          return response.json();
        }).then(function (responseJson) {
          console.log(responseJson);
        });
      }

      this.setState({
        dragTargetElementId: null,
        dragSpot: null
      });
    }
  }, {
    key: 'fetchBlocks',
    value: function fetchBlocks() {
      var _this2 = this;

      var doSetLoadingState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (doSetLoadingState) {
        this.setState(_extends({}, this.state, {
          isLoading: true
        }));
      }
      _Backend2.default.get('/admin/elemental-area/readBlocks/' + this.props.areaId).then(function (response) {
        return response.json();
      }).then(function (responseJson) {
        _this2.setState(_extends({}, _this2.state, {
          contentBlocks: responseJson,
          isLoading: false
        }));
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          fieldName = _props2.fieldName,
          formState = _props2.formState,
          ToolbarComponent = _props2.ToolbarComponent,
          ListComponent = _props2.ListComponent,
          areaId = _props2.areaId,
          elementTypes = _props2.elementTypes,
          isDraggingOver = _props2.isDraggingOver,
          connectDropTarget = _props2.connectDropTarget,
          allowedElements = _props2.allowedElements,
          isLoading = _props2.isLoading;
      var _state = this.state,
          dragTargetElementId = _state.dragTargetElementId,
          dragSpot = _state.dragSpot,
          contentBlocks = _state.contentBlocks;


      var globalUseGraphqQL = false;
      if (!globalUseGraphqQL && contentBlocks === null) {
        this.fetchBlocks(false);
      }

      var allowedElementTypes = allowedElements.map(function (className) {
        return elementTypes.find(function (type) {
          return type.class === className;
        });
      });

      return connectDropTarget(_react2.default.createElement(
        'div',
        { className: 'element-editor' },
        _react2.default.createElement(
          ElementEditorContext.Provider,
          { value: { fetchBlocks: this.fetchBlocks } },
          _react2.default.createElement(ToolbarComponent, {
            elementTypes: allowedElementTypes,
            areaId: areaId,
            onDragOver: this.handleDragOver
          }),
          _react2.default.createElement(ListComponent, {
            allowedElementTypes: allowedElementTypes,
            elementTypes: elementTypes,
            areaId: areaId,
            onDragOver: this.handleDragOver,
            onDragStart: this.handleDragStart,
            onDragEnd: this.handleDragEnd,
            dragSpot: dragSpot,
            isDraggingOver: isDraggingOver,
            dragTargetElementId: dragTargetElementId,
            contentBlocks: contentBlocks,
            isLoading: isLoading
          }),
          _react2.default.createElement(_ElementDragPreview2.default, { elementTypes: elementTypes }),
          _react2.default.createElement('input', {
            name: fieldName,
            type: 'hidden',
            value: JSON.stringify(formState) || '',
            className: 'no-change-track'
          })
        )
      ));
    }
  }]);

  return ElementEditor;
}(_react.PureComponent);

ElementEditor.propTypes = {
  fieldName: _propTypes2.default.string,
  elementTypes: _propTypes2.default.arrayOf(_elementTypeType.elementTypeType).isRequired,
  allowedElements: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
  areaId: _propTypes2.default.number.isRequired,
  actions: _propTypes2.default.shape({
    handleSortBlock: _propTypes2.default.func
  })
};

function mapStateToProps(state) {
  var formNamePattern = (0, _loadElementFormStateName.loadElementFormStateName)('[0-9]+');
  var elementFormState = state.form.formState.element;

  if (!elementFormState) {
    return {};
  }

  var formState = Object.keys(elementFormState).filter(function (key) {
    return key.match(formNamePattern);
  }).reduce(function (accumulator, key) {
    return _extends({}, accumulator, _defineProperty({}, key, elementFormState[key].values));
  }, {});

  return { formState: formState };
}

exports.Component = ElementEditor;


var params = [_withDragDropContext2.default, (0, _reactDnd.DropTarget)('element', {}, function (connector, monitor) {
  return {
    connectDropTarget: connector.dropTarget(),
    isDraggingOver: monitor.isOver() };
}), (0, _reactRedux.connect)(mapStateToProps), (0, _Injector.inject)(['ElementToolbar', 'ElementList'], function (ToolbarComponent, ListComponent) {
  return {
    ToolbarComponent: ToolbarComponent,
    ListComponent: ListComponent
  };
}, function () {
  return 'ElementEditor';
})];
var globalUseGraphQL = false;
if (globalUseGraphQL) {
  params.push(_sortBlockMutation2.default);
}

exports.default = _redux.compose.apply(undefined, params)(ElementEditor);

/***/ }),

/***/ "./client/src/components/ElementEditor/ElementList.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _elementType = __webpack_require__("./client/src/types/elementType.js");

var _elementTypeType = __webpack_require__("./client/src/types/elementTypeType.js");

var _redux = __webpack_require__(4);

var _Injector = __webpack_require__(3);

var _classnames = __webpack_require__(7);

var _classnames2 = _interopRequireDefault(_classnames);

var _i18n = __webpack_require__(2);

var _i18n2 = _interopRequireDefault(_i18n);

var _reactDnd = __webpack_require__(9);

var _dragHelpers = __webpack_require__("./client/src/lib/dragHelpers.js");

var _elementConfig = __webpack_require__("./client/src/state/editor/elementConfig.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ElementList = function (_Component) {
  _inherits(ElementList, _Component);

  function ElementList(props) {
    _classCallCheck(this, ElementList);

    return _possibleConstructorReturn(this, (ElementList.__proto__ || Object.getPrototypeOf(ElementList)).call(this, props));
  }

  _createClass(ElementList, [{
    key: 'getDragIndicatorIndex',
    value: function getDragIndicatorIndex() {
      var _props = this.props,
          dragTargetElementId = _props.dragTargetElementId,
          draggedItem = _props.draggedItem,
          blocks = _props.blocks,
          contentBlocks = _props.contentBlocks,
          dragSpot = _props.dragSpot;

      var globalUseGraphQL = false;
      var elements = globalUseGraphQL ? blocks : contentBlocks;
      return (0, _dragHelpers.getDragIndicatorIndex)(elements.map(function (element) {
        return element.id;
      }), dragTargetElementId, draggedItem && draggedItem.id, dragSpot);
    }
  }, {
    key: 'renderBlocks',
    value: function renderBlocks() {
      var _props2 = this.props,
          ElementComponent = _props2.ElementComponent,
          HoverBarComponent = _props2.HoverBarComponent,
          DragIndicatorComponent = _props2.DragIndicatorComponent,
          blocks = _props2.blocks,
          contentBlocks = _props2.contentBlocks,
          allowedElementTypes = _props2.allowedElementTypes,
          elementTypes = _props2.elementTypes,
          areaId = _props2.areaId,
          onDragEnd = _props2.onDragEnd,
          onDragOver = _props2.onDragOver,
          onDragStart = _props2.onDragStart,
          isDraggingOver = _props2.isDraggingOver;


      var globalUseGraphQL = false;
      var elements = globalUseGraphQL ? blocks : contentBlocks;

      if (!elements) {
        return null;
      }

      if (elements && !elements.length) {
        return _react2.default.createElement(
          'div',
          null,
          _i18n2.default._t('ElementList.ADD_BLOCKS', 'Add blocks to place your content')
        );
      }

      var output = elements.map(function (element) {
        return _react2.default.createElement(
          'div',
          { key: element.id },
          _react2.default.createElement(ElementComponent, {
            element: element,
            areaId: areaId,
            type: (0, _elementConfig.getElementTypeConfig)(element, elementTypes),
            link: element.blockSchema.actions.edit,
            onDragOver: onDragOver,
            onDragEnd: onDragEnd,
            onDragStart: onDragStart
          }),
          isDraggingOver || _react2.default.createElement(HoverBarComponent, {
            key: 'create-after-' + element.id,
            areaId: areaId,
            elementId: element.id,
            elementTypes: allowedElementTypes
          })
        );
      });

      if (!isDraggingOver) {
        output = [_react2.default.createElement(HoverBarComponent, {
          key: 0,
          areaId: areaId,
          elementId: 0,
          elementTypes: allowedElementTypes
        })].concat(output);
      }

      var dragIndicatorIndex = this.getDragIndicatorIndex();
      if (isDraggingOver && dragIndicatorIndex !== null) {
        output.splice(dragIndicatorIndex, 0, _react2.default.createElement(DragIndicatorComponent, { key: 'DropIndicator' }));
      }

      return output;
    }
  }, {
    key: 'renderLoading',
    value: function renderLoading() {
      var _props3 = this.props,
          loading = _props3.loading,
          isLoading = _props3.isLoading,
          LoadingComponent = _props3.LoadingComponent;

      var globalUseGraphQL = false;
      var loadingValue = globalUseGraphQL ? loading : isLoading;

      if (loadingValue) {
        return _react2.default.createElement(LoadingComponent, null);
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          blocks = _props4.blocks,
          contentBlocks = _props4.contentBlocks;

      var globalUseGraphQL = false;
      var elements = globalUseGraphQL ? blocks : contentBlocks;

      var listClassNames = (0, _classnames2.default)('elemental-editor-list', { 'elemental-editor-list--empty': !elements || !elements.length });

      return this.props.connectDropTarget(_react2.default.createElement(
        'div',
        { className: listClassNames },
        this.renderLoading(),
        this.renderBlocks()
      ));
    }
  }]);

  return ElementList;
}(_react.Component);

ElementList.propTypes = {
  blocks: _propTypes2.default.arrayOf(_elementType.elementType),
  loading: _propTypes2.default.bool,

  contentBlocks: _propTypes2.default.arrayOf(_elementType.elementType),

  elementTypes: _propTypes2.default.arrayOf(_elementTypeType.elementTypeType).isRequired,
  allowedElementTypes: _propTypes2.default.arrayOf(_elementTypeType.elementTypeType).isRequired,
  areaId: _propTypes2.default.number.isRequired,
  dragTargetElementId: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]),
  onDragOver: _propTypes2.default.func,
  onDragStart: _propTypes2.default.func,
  onDragEnd: _propTypes2.default.func
};

ElementList.defaultProps = {
  blocks: [],
  loading: false
};

exports.Component = ElementList;


var elementListTarget = {
  drop: function drop(props, monitor) {
    var blocks = props.blocks,
        contentBlocks = props.contentBlocks;

    var globalUseGraphQL = false;
    var elements = globalUseGraphQL ? blocks : contentBlocks;

    var elementTargetDropResult = monitor.getDropResult();

    if (!elementTargetDropResult) {
      return {};
    }

    var dropIndex = (0, _dragHelpers.getDragIndicatorIndex)(elements.map(function (element) {
      return element.id;
    }), elementTargetDropResult.target, monitor.getItem(), elementTargetDropResult.dropSpot);
    var dropAfterID = elements[dropIndex - 1] ? elements[dropIndex - 1].id : '0';

    return _extends({}, elementTargetDropResult, {
      dropAfterID: dropAfterID
    });
  }
};

exports.default = (0, _redux.compose)((0, _reactDnd.DropTarget)('element', elementListTarget, function (connector, monitor) {
  return {
    connectDropTarget: connector.dropTarget(),
    draggedItem: monitor.getItem()
  };
}), (0, _Injector.inject)(['Element', 'Loading', 'HoverBar', 'DragPositionIndicator'], function (ElementComponent, LoadingComponent, HoverBarComponent, DragIndicatorComponent) {
  return {
    ElementComponent: ElementComponent,
    LoadingComponent: LoadingComponent,
    HoverBarComponent: HoverBarComponent,
    DragIndicatorComponent: DragIndicatorComponent
  };
}, function () {
  return 'ElementEditor.ElementList';
}))(ElementList);

/***/ }),

/***/ "./client/src/components/ElementEditor/Header.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactstrap = __webpack_require__(10);

var _elementType = __webpack_require__("./client/src/types/elementType.js");

var _elementTypeType = __webpack_require__("./client/src/types/elementTypeType.js");

var _redux = __webpack_require__(4);

var _reactRedux = __webpack_require__(8);

var _Injector = __webpack_require__(3);

var _i18n = __webpack_require__(2);

var _i18n2 = _interopRequireDefault(_i18n);

var _classnames = __webpack_require__(7);

var _classnames2 = _interopRequireDefault(_classnames);

var _loadElementFormStateName = __webpack_require__("./client/src/state/editor/loadElementFormStateName.js");

var _reduxForm = __webpack_require__(11);

var _reactDnd = __webpack_require__(9);

var _getFormState = __webpack_require__(16);

var _getFormState2 = _interopRequireDefault(_getFormState);

var _dragHelpers = __webpack_require__("./client/src/lib/dragHelpers.js");

var _reactDndHtml5Backend = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_Component) {
  _inherits(Header, _Component);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

    _this.toggle = _this.toggle.bind(_this);

    _this.state = {
      tooltipOpen: false
    };
    return _this;
  }

  _createClass(Header, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var connectDragPreview = this.props.connectDragPreview;

      if (connectDragPreview) {
        connectDragPreview((0, _reactDndHtml5Backend.getEmptyImage)(), {
          captureDraggingState: true
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var tooltipOpen = this.state.tooltipOpen;
      var disableTooltip = this.props.disableTooltip;


      if (tooltipOpen && disableTooltip) {
        this.setState({
          tooltipOpen: false
        });
      }
    }
  }, {
    key: 'getBlockTitle',
    value: function getBlockTitle(element, type) {
      if (type.broken) {
        return _i18n2.default.inject(_i18n2.default._t('ElementHeader.BROKEN', 'This element is of obsolete type {type}.'), { type: type.obsoleteClassName });
      }
      if (element.title) {
        return element.title;
      }
      return _i18n2.default.inject(_i18n2.default._t('ElementHeader.NOTITLE', 'Untitled {type} block'), { type: type.title });
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.setState({
        tooltipOpen: !this.state.tooltipOpen
      });
    }
  }, {
    key: 'renderVersionedStateMessage',
    value: function renderVersionedStateMessage() {
      var _props = this.props,
          _props$element = _props.element,
          isLiveVersion = _props$element.isLiveVersion,
          isPublished = _props$element.isPublished,
          formDirty = _props.formDirty;

      if (!formDirty && isPublished && isLiveVersion) {
        return null;
      }

      var versionStateButtonTitle = '';
      var stateClassNames = ['element-editor-header__version-state'];

      if (formDirty) {
        versionStateButtonTitle = _i18n2.default._t('ElementHeader.STATE_UNSAVED', 'Item has unsaved changes');
        stateClassNames.push('element-editor-header__version-state--unsaved');
      } else if (!isPublished) {
        versionStateButtonTitle = _i18n2.default._t('ElementHeader.STATE_DRAFT', 'Item has not been published yet');
        stateClassNames.push('element-editor-header__version-state--draft');
      } else if (!isLiveVersion) {
        versionStateButtonTitle = _i18n2.default._t('ElementHeader.STATE_MODIFIED', 'Item has unpublished changes');
        stateClassNames.push('element-editor-header__version-state--modified');
      }

      return _react2.default.createElement('span', {
        className: (0, _classnames2.default)(stateClassNames),
        title: versionStateButtonTitle
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          connectDragSource = _props2.connectDragSource,
          element = _props2.element,
          type = _props2.type,
          areaId = _props2.areaId,
          previewExpanded = _props2.previewExpanded,
          simple = _props2.simple,
          disableTooltip = _props2.disableTooltip,
          activeTab = _props2.activeTab,
          expandable = _props2.expandable,
          ElementActionsComponent = _props2.ElementActionsComponent,
          handleEditTabsClick = _props2.handleEditTabsClick;


      var title = this.getBlockTitle(element, type);
      var titleClasses = (0, _classnames2.default)({
        'element-editor-header__title': true,
        'element-editor-header__title--none': !element.title
      });
      var expandTitle = _i18n2.default._t('ElementHeader.EXPAND', 'Show editable fields');
      var containerClasses = (0, _classnames2.default)('element-editor-header', {
        'element-editor-header--simple': simple
      });
      var iconContainerClasses = (0, _classnames2.default)('element-editor-header__icon-container', {
        'element-editor-header__icon-container--broken': type.broken
      });
      var expandCaretClasses = (0, _classnames2.default)('element-editor-header__expand', {
        'font-icon-right-open-big': !expandable,
        'font-icon-up-open-big': expandable && previewExpanded,
        'font-icon-down-open-big': expandable && !previewExpanded
      });
      var blockIconId = 'element-icon-' + element.id;

      var content = _react2.default.createElement(
        'div',
        { className: containerClasses },
        _react2.default.createElement(
          'div',
          { className: 'element-editor-header__drag-handle' },
          _react2.default.createElement('i', { className: 'font-icon-drag-handle' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'element-editor-header__info' },
          _react2.default.createElement(
            'div',
            { className: iconContainerClasses },
            _react2.default.createElement('i', { className: type.icon, id: blockIconId }),
            this.renderVersionedStateMessage(),
            !type.broken && !simple && _react2.default.createElement(
              _reactstrap.Tooltip,
              {
                placement: 'top',
                isOpen: this.state.tooltipOpen && !disableTooltip,
                target: blockIconId,
                toggle: this.toggle
              },
              type.title
            )
          ),
          _react2.default.createElement(
            'h3',
            { className: titleClasses },
            title
          )
        ),
        !simple && _react2.default.createElement(
          'div',
          { className: 'element-editor-header__actions' },
          _react2.default.createElement(
            'div',
            { role: 'none', onClick: function onClick(event) {
                return event.stopPropagation();
              } },
            _react2.default.createElement(ElementActionsComponent, {
              element: element,
              type: type,
              areaId: areaId,
              activeTab: activeTab,
              editTabs: type.editTabs,
              handleEditTabsClick: handleEditTabsClick,
              expandable: expandable
            })
          ),
          !type.broken && _react2.default.createElement('i', { className: expandCaretClasses, title: expandTitle })
        )
      );

      if (previewExpanded) {
        return connectDragSource(content);
      }

      return content;
    }
  }]);

  return Header;
}(_react.Component);

Header.propTypes = {
  element: _elementType.elementType.isRequired,
  type: _elementTypeType.elementTypeType.isRequired,
  areaId: _propTypes2.default.number,
  activeTab: _propTypes2.default.string,
  simple: _propTypes2.default.bool,
  ElementActionsComponent: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),
  previewExpanded: _propTypes2.default.bool,
  disableTooltip: _propTypes2.default.bool,
  formDirty: _propTypes2.default.bool,
  connectDragSource: _propTypes2.default.func.isRequired,
  connectDragPreview: _propTypes2.default.func.isRequired,
  onDragEnd: _propTypes2.default.func };

Header.defaultProps = {
  expandable: true
};

function mapStateToProps(state, ownProps) {
  var formName = (0, _loadElementFormStateName.loadElementFormStateName)(ownProps.element.id);

  return {
    formDirty: (0, _reduxForm.isDirty)('element.' + formName, _getFormState2.default)(state)
  };
}

exports.Component = Header;
exports.default = (0, _redux.compose)((0, _reactDnd.DragSource)('element', _dragHelpers.elementDragSource, function (connector) {
  return {
    connectDragSource: connector.dragSource(),
    connectDragPreview: connector.dragPreview()
  };
}), (0, _reactRedux.connect)(mapStateToProps), (0, _Injector.inject)(['ElementActions'], function (ElementActionsComponent) {
  return {
    ElementActionsComponent: ElementActionsComponent
  };
}, function () {
  return 'ElementEditor.ElementList.Element';
}))(Header);

/***/ }),

/***/ "./client/src/components/ElementEditor/HoverBar.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _prefixClassNames = __webpack_require__("./client/src/lib/prefixClassNames.js");

var _prefixClassNames2 = _interopRequireDefault(_prefixClassNames);

var _Injector = __webpack_require__(3);

var _elementTypeType = __webpack_require__("./client/src/types/elementTypeType.js");

var _i18n = __webpack_require__(2);

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var classNames = (0, _prefixClassNames2.default)('element-editor__hover-bar');

function StatelessHoverBar(_ref) {
  var AddElementPopoverComponent = _ref.AddElementPopoverComponent,
      elementTypes = _ref.elementTypes,
      elementId = _ref.elementId,
      areaId = _ref.areaId,
      popoverOpen = _ref.popoverOpen,
      onToggle = _ref.onToggle;

  var lineClasses = classNames('-line') + ' font-icon-plus-circled';
  var label = _i18n2.default._t('ElementAddNewButton.ADD_BLOCK', 'Add block');
  var btnProps = {
    className: classNames('-area', { '-area--focus': popoverOpen }),
    onClick: onToggle,
    'aria-label': label,
    title: label,
    id: 'AddBlockHoverBarArea_' + areaId + '_' + elementId
  };

  return _react2.default.createElement(
    'div',
    { className: classNames(''), id: 'AddBlockHoverBar_' + areaId + '_' + elementId },
    _react2.default.createElement(
      'button',
      btnProps,
      _react2.default.createElement(
        'span',
        { className: classNames('-area-inner') },
        _react2.default.createElement('span', { className: lineClasses })
      )
    ),
    _react2.default.createElement(AddElementPopoverComponent, {
      placement: 'bottom',
      target: 'AddBlockHoverBarArea_' + areaId + '_' + elementId,
      isOpen: popoverOpen,
      elementTypes: elementTypes,
      toggle: onToggle,
      container: '#AddBlockHoverBar_' + areaId + '_' + elementId,
      areaId: areaId,
      insertAfterElement: elementId
    })
  );
}

var HoverBar = function (_Component) {
  _inherits(HoverBar, _Component);

  function HoverBar(props) {
    _classCallCheck(this, HoverBar);

    var _this = _possibleConstructorReturn(this, (HoverBar.__proto__ || Object.getPrototypeOf(HoverBar)).call(this, props));

    _this.toggle = _this.toggle.bind(_this);
    _this.state = {
      popoverOpen: false
    };
    return _this;
  }

  _createClass(HoverBar, [{
    key: 'toggle',
    value: function toggle() {
      this.setState({
        popoverOpen: !this.state.popoverOpen
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var props = _extends({}, this.state, this.props, {
        onToggle: this.toggle
      });
      return _react2.default.createElement(StatelessHoverBar, props);
    }
  }]);

  return HoverBar;
}(_react.Component);

HoverBar.propTypes = {
  elementTypes: _propTypes2.default.arrayOf(_elementTypeType.elementTypeType).isRequired,
  elementId: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired,
  areaId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired
};
exports.Component = HoverBar;
exports.default = (0, _Injector.inject)(['AddElementPopover'], function (AddElementPopoverComponent) {
  return {
    AddElementPopoverComponent: AddElementPopoverComponent
  };
}, function () {
  return 'ElementEditor.ElementList.HoverBar';
})(HoverBar);

/***/ }),

/***/ "./client/src/components/ElementEditor/InlineEditForm.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(7);

var _classnames2 = _interopRequireDefault(_classnames);

var _FormBuilderLoader = __webpack_require__(18);

var _FormBuilderLoader2 = _interopRequireDefault(_FormBuilderLoader);

var _loadElementSchemaValue = __webpack_require__("./client/src/state/editor/loadElementSchemaValue.js");

var _i18n = __webpack_require__(2);

var _i18n2 = _interopRequireDefault(_i18n);

var _loadElementFormStateName = __webpack_require__("./client/src/state/editor/loadElementFormStateName.js");

var _reactRedux = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InlineEditForm = function (_PureComponent) {
  _inherits(InlineEditForm, _PureComponent);

  function InlineEditForm(props) {
    _classCallCheck(this, InlineEditForm);

    var _this = _possibleConstructorReturn(this, (InlineEditForm.__proto__ || Object.getPrototypeOf(InlineEditForm)).call(this, props));

    _this.handleLoadingError = _this.handleLoadingError.bind(_this);

    _this.state = {
      loadingError: null
    };
    return _this;
  }

  _createClass(InlineEditForm, [{
    key: 'handleLoadingError',
    value: function handleLoadingError() {
      var _window = window,
          $ = _window.jQuery;
      var handleLoadingError = this.props.handleLoadingError;


      this.setState({
        loadingError: true
      });

      $.noticeAdd({
        text: _i18n2.default.inject(_i18n2.default._t('ElementEditForm.ERROR_NOTIFICATION', 'Error displaying the edit form for this block')),
        stay: true,
        type: 'notice'
      });

      handleLoadingError();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          elementId = _props.elementId,
          extraClass = _props.extraClass,
          onClick = _props.onClick,
          onFormInit = _props.onFormInit,
          formHasState = _props.formHasState;
      var loadingError = this.state.loadingError;


      var classNames = (0, _classnames2.default)('element-editor-editform', extraClass);
      var schemaUrl = (0, _loadElementSchemaValue.loadElementSchemaValue)('schemaUrl', elementId);

      var formProps = {
        formTag: 'div',
        schemaUrl: schemaUrl,
        identifier: 'element',
        refetchSchemaOnMount: !formHasState,
        onLoadingError: this.handleLoadingError
      };

      if (loadingError) {
        formProps.loading = false;
      }

      if (typeof onFormInit === 'function') {
        formProps.onReduxFormInit = onFormInit;
      }

      return _react2.default.createElement(
        'div',
        { className: classNames, onClick: onClick, role: 'presentation' },
        _react2.default.createElement(_FormBuilderLoader2.default, formProps)
      );
    }
  }]);

  return InlineEditForm;
}(_react.PureComponent);

InlineEditForm.propTypes = {
  extraClass: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  onClick: _propTypes2.default.func,
  elementId: _propTypes2.default.string,
  handleLoadingError: _propTypes2.default.func
};

function mapStateToProps(state, ownProps) {
  var formName = (0, _loadElementFormStateName.loadElementFormStateName)(ownProps.elementId);

  return {
    formHasState: state.form.formState && state.form.formState.element && !!state.form.formState.element[formName]
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(InlineEditForm);

/***/ }),

/***/ "./client/src/components/ElementEditor/Summary.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(7);

var _classnames2 = _interopRequireDefault(_classnames);

var _i18n = __webpack_require__(2);

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Summary = function (_PureComponent) {
  _inherits(Summary, _PureComponent);

  function Summary() {
    _classCallCheck(this, Summary);

    return _possibleConstructorReturn(this, (Summary.__proto__ || Object.getPrototypeOf(Summary)).apply(this, arguments));
  }

  _createClass(Summary, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          fileUrl = _props.fileUrl,
          fileTitle = _props.fileTitle,
          content = _props.content,
          broken = _props.broken;

      var noContent = _i18n2.default._t('ElementSummary.NO_PREVIEW', 'No preview available');

      var summaryClassNames = (0, _classnames2.default)('element-editor-summary__content', {
        'element-editor-summary__content--broken': broken
      });

      return _react2.default.createElement(
        'div',
        { className: 'element-editor-summary' },
        fileUrl && _react2.default.createElement('img', {
          className: 'element-editor-summary__thumbnail-image',
          src: fileUrl,
          alt: fileTitle
        }),
        (content || !fileUrl) && _react2.default.createElement(
          'p',
          { className: summaryClassNames },
          content || noContent
        )
      );
    }
  }]);

  return Summary;
}(_react.PureComponent);

Summary.defaultProps = {};

Summary.propTypes = {
  content: _propTypes2.default.string,
  fileUrl: _propTypes2.default.string,
  fileTitle: _propTypes2.default.string,
  broken: _propTypes2.default.bool
};

exports.default = Summary;

/***/ }),

/***/ "./client/src/components/ElementEditor/Toolbar.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Injector = __webpack_require__(3);

var _elementTypeType = __webpack_require__("./client/src/types/elementTypeType.js");

var _reactDnd = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toolbar = function (_PureComponent) {
  _inherits(Toolbar, _PureComponent);

  function Toolbar() {
    _classCallCheck(this, Toolbar);

    return _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).apply(this, arguments));
  }

  _createClass(Toolbar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          AddNewButtonComponent = _props.AddNewButtonComponent,
          elementTypes = _props.elementTypes,
          areaId = _props.areaId,
          connectDropTarget = _props.connectDropTarget;

      return connectDropTarget(_react2.default.createElement(
        'div',
        { className: 'element-editor__toolbar' },
        _react2.default.createElement(AddNewButtonComponent, {
          elementTypes: elementTypes,
          areaId: areaId
        })
      ));
    }
  }]);

  return Toolbar;
}(_react.PureComponent);

Toolbar.defaultProps = {};
Toolbar.propTypes = {
  elementTypes: _propTypes2.default.arrayOf(_elementTypeType.elementTypeType).isRequired,
  areaId: _propTypes2.default.number.isRequired,
  AddNewButtonComponent: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]).isRequired,
  connectDropTarget: _propTypes2.default.func.isRequired,
  onDragOver: _propTypes2.default.func,
  onDragDrop: _propTypes2.default.func };

var toolbarTarget = {
  hover: function hover(props) {
    var onDragOver = props.onDragOver;

    if (onDragOver) {
      onDragOver();
    }
  }
};

exports.default = (0, _reactDnd.DropTarget)('element', toolbarTarget, function (connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
})((0, _Injector.inject)(['ElementAddNewButton'], function (AddNewButtonComponent) {
  return {
    AddNewButtonComponent: AddNewButtonComponent
  };
}, function () {
  return 'ElementEditor.ElementToolbar';
})(Toolbar));

/***/ }),

/***/ "./client/src/components/HistoricElementView/HistoricElementView.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _i18n = __webpack_require__(2);

var _i18n2 = _interopRequireDefault(_i18n);

var _classnames = __webpack_require__(7);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ElementalAreaHistoryFactory = function ElementalAreaHistoryFactory(FieldGroup) {
  return function (_FieldGroup) {
    _inherits(HistoricElementView, _FieldGroup);

    function HistoricElementView() {
      _classCallCheck(this, HistoricElementView);

      return _possibleConstructorReturn(this, (HistoricElementView.__proto__ || Object.getPrototypeOf(HistoricElementView)).apply(this, arguments));
    }

    _createClass(HistoricElementView, [{
      key: 'getClassName',
      value: function getClassName() {
        var classlist = [_get(HistoricElementView.prototype.__proto__ || Object.getPrototypeOf(HistoricElementView.prototype), 'getClassName', this).call(this)];
        if (this.props.data.ElementID) {
          classlist.unshift('elemental-area__element--historic-inner');
        }
        return (0, _classnames2.default)(classlist);
      }
    }, {
      key: 'render',
      value: function render() {
        var legend = this.getLegend();
        var Tag = this.props.data.tag || 'div';
        var classNames = this.getClassName();
        var data = this.props.data;


        if (!data.ElementID) {
          return _get(HistoricElementView.prototype.__proto__ || Object.getPrototypeOf(HistoricElementView.prototype), 'render', this).call(this);
        }

        return _react2.default.createElement(
          Tag,
          { className: classNames },
          legend,
          _react2.default.createElement(
            'div',
            { className: 'elemental-preview elemental-preview--historic' },
            data.ElementEditLink && _react2.default.createElement(
              'a',
              { className: 'elemental-preview__link', href: data.ElementEditLink },
              _react2.default.createElement(
                'span',
                { className: 'elemental-preview__link-text' },
                _i18n2.default._t('HistoricElementView.VIEW_BLOCK_HISTORY', 'Block history')
              ),
              _react2.default.createElement('i', { className: 'font-icon-angle-right btn--icon-lg elemental-preview__link-caret' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'elemental-preview__icon' },
              _react2.default.createElement('i', { className: data.ElementIcon })
            ),
            _react2.default.createElement(
              'div',
              { className: 'elemental-preview__detail' },
              _react2.default.createElement(
                'h3',
                null,
                data.ElementTitle,
                ' ',
                _react2.default.createElement(
                  'small',
                  null,
                  data.ElementType
                )
              )
            )
          ),
          this.props.children
        );
      }
    }]);

    return HistoricElementView;
  }(FieldGroup);
};

exports.default = ElementalAreaHistoryFactory;

/***/ }),

/***/ "./client/src/components/TextCheckboxGroupField/TextCheckboxGroupField.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactstrap = __webpack_require__(10);

var _FieldHolder = __webpack_require__(17);

var _FieldHolder2 = _interopRequireDefault(_FieldHolder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextCheckboxGroupField = function TextCheckboxGroupField(props) {
  var children = props.children;

  var childrenWithProps = _react2.default.Children.toArray(_react2.default.Children.map(children, function (child, index) {
    var additionalProps = { noHolder: true };

    if (index === 0) {
      additionalProps.id = props.id;
    }

    return _react2.default.cloneElement(child, additionalProps);
  }));

  if (props.readOnly) {
    return _react2.default.createElement(
      'div',
      { className: 'text-checkbox-group-field--read-only' },
      childrenWithProps
    );
  }

  if (childrenWithProps.length === 1) {
    return childrenWithProps[0];
  }

  return _react2.default.createElement(
    _reactstrap.InputGroup,
    { className: 'text-checkbox-group-field' },
    childrenWithProps[0],
    _react2.default.createElement(
      _reactstrap.InputGroupAddon,
      { addonType: 'append' },
      _react2.default.createElement(
        _reactstrap.InputGroupText,
        null,
        childrenWithProps[1]
      )
    )
  );
};

exports.default = (0, _FieldHolder2.default)(TextCheckboxGroupField);

/***/ }),

/***/ "./client/src/legacy/ElementEditor/entwine.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(20);

var _jquery2 = _interopRequireDefault(_jquery);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(15);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Injector = __webpack_require__(3);

var _elementConfig = __webpack_require__("./client/src/state/editor/elementConfig.js");

var _reduxForm = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var resetStores = function resetStores() {
  window.ss.apolloClient.resetStore();

  setTimeout(function () {
    var store = window.ss.store;


    if (!store) {
      return;
    }

    store.dispatch(_reduxForm.destroy.apply(undefined, _toConsumableArray(Object.keys(store.getState().form.formState.element || {}).map(function (name) {
      return 'element.' + name;
    }))));
  }, 0);
};

_jquery2.default.entwine('ss', function ($) {
  $('.js-injector-boot .element-editor__container').entwine({
    onmatch: function onmatch() {
      var context = {};
      var ElementEditorComponent = (0, _Injector.loadComponent)('ElementEditor', context);
      var schemaData = this.data('schema');
      var elementTypes = (0, _elementConfig.getConfig)().elementTypes;

      var props = {
        fieldName: this.attr('name'),
        areaId: schemaData['elemental-area-id'],
        allowedElements: schemaData['allowed-elements'],
        elementTypes: elementTypes
      };

      _reactDom2.default.render(_react2.default.createElement(ElementEditorComponent, props), this[0]);
    },
    onunmatch: function onunmatch() {
      if (!$('.cms-edit-form').data('hasValidationErrors')) {
        resetStores();
      }
      _reactDom2.default.unmountComponentAtNode(this[0]);
    },


    'from .cms-edit-form': {
      onaftersubmitform: function onaftersubmitform(event, data) {
        var validationResultPjax = JSON.parse(data.xhr.responseText).ValidationResult;
        var validationResult = JSON.parse(validationResultPjax.replace(/<\/?script[^>]*?>/g, ''));

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
    onmatch: function onmatch() {
      $('.cms-edit-form').trigger('change');
    },
    onunmatch: function onunmatch() {
      $('.cms-edit-form').trigger('change');
    }
  });

  $('.cms-edit-form').entwine({
    getChangeTrackerOptions: function getChangeTrackerOptions() {
      var isDefault = this.entwineData('ChangeTrackerOptions') === undefined;

      var opts = this._super();

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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elementDragSource = exports.getDragIndicatorIndex = exports.isOverTop = undefined;

var _reactDom = __webpack_require__(15);

var isOverTop = exports.isOverTop = function isOverTop(monitor, component) {
  var clientOffset = monitor.getClientOffset();
  var componentRect = (0, _reactDom.findDOMNode)(component).getBoundingClientRect();

  return clientOffset.y < componentRect.y + componentRect.height / 2;
};

var getDragIndicatorIndex = exports.getDragIndicatorIndex = function getDragIndicatorIndex(items, dragTarget, draggedItem, dragSpot) {
  if (dragTarget === null || !draggedItem) {
    return null;
  }

  var targetIndex = dragTarget ? items.findIndex(function (element) {
    return element === dragTarget;
  }) : 0;
  var sourceIndex = items.findIndex(function (item) {
    return item === draggedItem;
  });

  if (dragSpot === 'bottom') {
    targetIndex += 1;
  }

  if (sourceIndex === targetIndex || sourceIndex + 1 === targetIndex) {
    return null;
  }

  return targetIndex;
};

var elementDragSource = exports.elementDragSource = {
  beginDrag: function beginDrag(props) {
    return props.element;
  },
  endDrag: function endDrag(props, monitor) {
    var onDragEnd = props.onDragEnd;

    var dropResult = monitor.getDropResult();

    if (!onDragEnd || !dropResult || !dropResult.dropAfterID) {
      return;
    }

    var itemID = monitor.getItem().id;
    var dropAfterID = dropResult.dropAfterID;

    if (itemID !== dropAfterID) {
      onDragEnd(itemID, dropAfterID);
    }
  }
};

/***/ }),

/***/ "./client/src/lib/prefixClassNames.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _classnames = __webpack_require__(7);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefixClassNames = function prefixClassNames(cssPrefix) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var prefix = function prefix(str) {
      return '' + cssPrefix + str;
    };

    var prefixArgs = args.map(function (arg) {
      if (!arg && arg !== '') {
        return false;
      }

      if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object') {
        return Array.isArray(arg) ? arg.map(prefix) : Object.entries(arg).reduce(function (accumulator, _ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];

          return Object.assign({}, accumulator, _defineProperty({}, prefix(key), value));
        }, {});
      }

      return prefix(arg);
    });

    return _classnames2.default.apply(undefined, _toConsumableArray(prefixArgs));
  };
};

exports.default = prefixClassNames;

/***/ }),

/***/ "./client/src/state/editor/addElementMutation.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = exports.mutation = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(['\nmutation AddElementToArea($className: String!, $elementalAreaID: ID!, $afterElementID: ID) {\n  addElementToArea(\n    className: $className,\n    elementalAreaID: $elementalAreaID,\n    afterElementID: $afterElementID\n  ) {\n    id\n  }\n}\n'], ['\nmutation AddElementToArea($className: String!, $elementalAreaID: ID!, $afterElementID: ID) {\n  addElementToArea(\n    className: $className,\n    elementalAreaID: $elementalAreaID,\n    afterElementID: $afterElementID\n  ) {\n    id\n  }\n}\n']);

var _reactApollo = __webpack_require__(6);

var _graphqlTag = __webpack_require__(5);

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _readBlocksForAreaQuery = __webpack_require__("./client/src/state/editor/readBlocksForAreaQuery.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var mutation = (0, _graphqlTag2.default)(_templateObject);

var config = {
  props: function props(_ref) {
    var mutate = _ref.mutate,
        _ref$ownProps = _ref.ownProps,
        actions = _ref$ownProps.actions,
        areaId = _ref$ownProps.areaId;

    var handleAddElementToArea = function handleAddElementToArea(className, afterElementID) {
      return mutate({
        variables: { className: className, elementalAreaID: areaId, afterElementID: afterElementID }
      });
    };

    return {
      actions: _extends({}, actions, {
        handleAddElementToArea: handleAddElementToArea
      })
    };
  },
  options: function options(_ref2) {
    var areaId = _ref2.areaId;
    return {
      refetchQueries: [{
        query: _readBlocksForAreaQuery.query,
        variables: _readBlocksForAreaQuery.config.options({ areaId: areaId }).variables
      }]
    };
  }
};

exports.mutation = mutation;
exports.config = config;
exports.default = (0, _reactApollo.graphql)(mutation, config);

/***/ }),

/***/ "./client/src/state/editor/archiveBlockMutation.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = exports.mutation = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(['\nmutation ArchiveBlock($blockId: ID!) {\n  deleteBlocks(ids: [$blockId])\n}\n'], ['\nmutation ArchiveBlock($blockId: ID!) {\n  deleteBlocks(ids: [$blockId])\n}\n']);

var _reactApollo = __webpack_require__(6);

var _graphqlTag = __webpack_require__(5);

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _readBlocksForAreaQuery = __webpack_require__("./client/src/state/editor/readBlocksForAreaQuery.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var mutation = (0, _graphqlTag2.default)(_templateObject);

var config = {
  props: function props(_ref) {
    var mutate = _ref.mutate,
        actions = _ref.ownProps.actions;

    var handleArchiveBlock = function handleArchiveBlock(blockId) {
      return mutate({
        variables: { blockId: blockId }
      });
    };

    return {
      actions: _extends({}, actions, {
        handleArchiveBlock: handleArchiveBlock
      })
    };
  },
  options: function options(_ref2) {
    var areaId = _ref2.areaId;
    return {
      refetchQueries: [{
        query: _readBlocksForAreaQuery.query,
        variables: _readBlocksForAreaQuery.config.options({ areaId: areaId }).variables
      }]
    };
  }
};

exports.mutation = mutation;
exports.config = config;
exports.default = (0, _reactApollo.graphql)(mutation, config);

/***/ }),

/***/ "./client/src/state/editor/duplicateBlockMutation.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = exports.mutation = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(['\nmutation DuplicateBlock($blockId: ID!) {\n  duplicateBlock(id: $blockId) {\n    id\n  }\n}\n'], ['\nmutation DuplicateBlock($blockId: ID!) {\n  duplicateBlock(id: $blockId) {\n    id\n  }\n}\n']);

var _reactApollo = __webpack_require__(6);

var _graphqlTag = __webpack_require__(5);

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _readBlocksForAreaQuery = __webpack_require__("./client/src/state/editor/readBlocksForAreaQuery.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var mutation = (0, _graphqlTag2.default)(_templateObject);

var config = {
  props: function props(_ref) {
    var mutate = _ref.mutate,
        actions = _ref.ownProps.actions;

    var handleDuplicateBlock = function handleDuplicateBlock(blockId) {
      return mutate({
        variables: { blockId: blockId }
      });
    };

    return {
      actions: _extends({}, actions, {
        handleDuplicateBlock: handleDuplicateBlock
      })
    };
  },
  options: function options(_ref2) {
    var areaId = _ref2.areaId;
    return {
      refetchQueries: [{
        query: _readBlocksForAreaQuery.query,
        variables: _readBlocksForAreaQuery.config.options({ areaId: areaId }).variables
      }]
    };
  }
};

exports.mutation = mutation;
exports.config = config;
exports.default = (0, _reactApollo.graphql)(mutation, config);

/***/ }),

/***/ "./client/src/state/editor/elementConfig.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getElementTypeConfig = exports.getConfig = undefined;

var _Config = __webpack_require__(13);

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getConfig = exports.getConfig = function getConfig() {
  return _Config2.default.getSection('DNADesign\\Elemental\\Controllers\\ElementalAreaController');
};

var getElementTypeConfig = exports.getElementTypeConfig = function getElementTypeConfig(element) {
  var typeConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var elementType = element.blockSchema.typeName;
  var types = Array.isArray(typeConfig) ? typeConfig : getConfig().elementTypes;

  var type = types.find(function (value) {
    return value.class === elementType || value.name === elementType;
  });
  if (element.obsoleteClassName) {
    type = Object.assign({ obsoleteClassName: element.obsoleteClassName }, type);
    Object.preventExtensions(type);
  }
  return type;
};

/***/ }),

/***/ "./client/src/state/editor/loadElementFormStateName.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadElementFormStateName = undefined;

var _Config = __webpack_require__(13);

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadElementFormStateName = exports.loadElementFormStateName = function loadElementFormStateName() {
  var elementId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  var sectionKey = 'DNADesign\\Elemental\\Controllers\\ElementalAreaController';
  var section = _Config2.default.getSection(sectionKey);
  var formNameTemplate = section.form.elementForm.formNameTemplate;

  if (elementId) {
    return formNameTemplate.replace('{id}', elementId);
  }
  return formNameTemplate;
};

/***/ }),

/***/ "./client/src/state/editor/loadElementSchemaValue.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadElementSchemaValue = undefined;

var _Config = __webpack_require__(13);

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadElementSchemaValue = exports.loadElementSchemaValue = function loadElementSchemaValue(key) {
  var elementId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var sectionKey = 'DNADesign\\Elemental\\Controllers\\ElementalAreaController';
  var section = _Config2.default.getSection(sectionKey);
  var schemaValue = section.form.elementForm[key] || '';

  if (elementId) {
    return schemaValue + '/' + elementId;
  }
  return schemaValue;
};

/***/ }),

/***/ "./client/src/state/editor/publishBlockMutation.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = exports.mutation = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(['\nmutation PublishBlock($blockId:ID!) {\n  publishBlock(id: $blockId) {\n    id\n  }\n}\n'], ['\nmutation PublishBlock($blockId:ID!) {\n  publishBlock(id: $blockId) {\n    id\n  }\n}\n']);

var _reactApollo = __webpack_require__(6);

var _graphqlTag = __webpack_require__(5);

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _readBlocksForAreaQuery = __webpack_require__("./client/src/state/editor/readBlocksForAreaQuery.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var mutation = (0, _graphqlTag2.default)(_templateObject);

var config = {
  props: function props(_ref) {
    var mutate = _ref.mutate,
        actions = _ref.ownProps.actions;

    var handlePublishBlock = function handlePublishBlock(blockId) {
      return mutate({
        variables: {
          blockId: blockId
        }
      });
    };

    return {
      actions: _extends({}, actions, {
        handlePublishBlock: handlePublishBlock
      })
    };
  },
  options: function options(_ref2) {
    var areaId = _ref2.areaId;
    return {
      refetchQueries: [{
        query: _readBlocksForAreaQuery.query,
        variables: _readBlocksForAreaQuery.config.options({ areaId: areaId }).variables
      }]
    };
  }
};

exports.mutation = mutation;
exports.config = config;
exports.default = (0, _reactApollo.graphql)(mutation, config);

/***/ }),

/***/ "./client/src/state/editor/readBlocksForAreaQuery.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = exports.query = undefined;

var _templateObject = _taggedTemplateLiteral(['\nquery ReadBlocksForArea($id:ID!) {\n  readOneElementalArea(filter: { id: { eq: $id } }, versioning: {\n    mode: DRAFT\n  }){\n    elements {\n      id\n      title\n      blockSchema\n      obsoleteClassName\n      isLiveVersion\n      isPublished\n      version\n      canCreate\n      canPublish\n      canUnpublish\n      canDelete\n    }\n  }\n}\n'], ['\nquery ReadBlocksForArea($id:ID!) {\n  readOneElementalArea(filter: { id: { eq: $id } }, versioning: {\n    mode: DRAFT\n  }){\n    elements {\n      id\n      title\n      blockSchema\n      obsoleteClassName\n      isLiveVersion\n      isPublished\n      version\n      canCreate\n      canPublish\n      canUnpublish\n      canDelete\n    }\n  }\n}\n']);

var _reactApollo = __webpack_require__(6);

var _graphqlTag = __webpack_require__(5);

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var query = (0, _graphqlTag2.default)(_templateObject);

var config = {
  options: function options(_ref) {
    var areaId = _ref.areaId;

    return {
      variables: {
        id: areaId
      }
    };
  },
  props: function props(_ref2) {
    var _ref2$data = _ref2.data,
        error = _ref2$data.error,
        readOneElementalArea = _ref2$data.readOneElementalArea,
        networkLoading = _ref2$data.loading;

    var blocks = null;
    if (readOneElementalArea) {
      blocks = readOneElementalArea.elements;
    }

    var errors = error && error.graphQLErrors && error.graphQLErrors.map(function (graphQLError) {
      return graphQLError.message;
    });

    return {
      loading: networkLoading || !blocks,
      blocks: blocks,
      graphQLErrors: errors
    };
  }
};

exports.query = query;
exports.config = config;
exports.default = (0, _reactApollo.graphql)(query, config);

/***/ }),

/***/ "./client/src/state/editor/sortBlockMutation.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = exports.mutation = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _templateObject = _taggedTemplateLiteral(['\nmutation SortBlockMutation($blockId:ID!, $afterBlockId:ID!) {\n  sortBlock(\n    id: $blockId\n    afterBlockID: $afterBlockId\n  ) {\n    id\n    isLiveVersion\n    isPublished\n  }\n}\n'], ['\nmutation SortBlockMutation($blockId:ID!, $afterBlockId:ID!) {\n  sortBlock(\n    id: $blockId\n    afterBlockID: $afterBlockId\n  ) {\n    id\n    isLiveVersion\n    isPublished\n  }\n}\n']);

var _reactApollo = __webpack_require__(6);

var _graphqlTag = __webpack_require__(5);

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _readBlocksForAreaQuery = __webpack_require__("./client/src/state/editor/readBlocksForAreaQuery.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var mutation = (0, _graphqlTag2.default)(_templateObject);

var config = {
  props: function props(_ref) {
    var mutate = _ref.mutate,
        actions = _ref.ownProps.actions;

    var handleSortBlock = function handleSortBlock(blockId, afterBlockId, areaId) {
      return mutate({
        variables: {
          blockId: blockId,
          afterBlockId: afterBlockId
        },
        optimisticResponse: {
          sortBlock: {
            id: blockId,
            liveVersion: false,
            __typename: 'Block'
          }
        },
        update: function update(store, _ref2) {
          var updatedElementData = _ref2.data.sortBlock;

          var variables = _readBlocksForAreaQuery.config.options({ areaId: areaId }).variables;
          var cachedData = store.readQuery({ query: _readBlocksForAreaQuery.query, variables: variables });

          var newData = JSON.parse(JSON.stringify(cachedData));
          var blocks = newData.readOneElementalArea.elements;

          var movedBlockIndex = blocks.findIndex(function (block) {
            return block.id === blockId;
          });

          var movedBlock = blocks[movedBlockIndex];

          Object.entries(updatedElementData).forEach(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                key = _ref4[0],
                value = _ref4[1];

            if (key === '__typename') {
              return;
            }

            movedBlock[key] = value;
          });

          blocks.splice(movedBlockIndex, 1);

          if (afterBlockId === '0') {
            blocks.unshift(movedBlock);
          } else {
            var targetBlockIndex = blocks.findIndex(function (block) {
              return block.id === afterBlockId;
            });

            if (targetBlockIndex === -1) {
              targetBlockIndex = movedBlockIndex - 1;
            }

            var end = blocks.slice(targetBlockIndex + 1);
            blocks = blocks.slice(0, targetBlockIndex + 1);
            blocks.push(movedBlock);
            blocks = blocks.concat(end);
          }

          newData.readOneElementalArea.elements = blocks;
          store.writeQuery({ query: _readBlocksForAreaQuery.query, data: newData, variables: variables });
        }
      });
    };
    return {
      actions: _extends({}, actions, {
        handleSortBlock: handleSortBlock
      })
    };
  }
};

exports.mutation = mutation;
exports.config = config;
exports.default = (0, _reactApollo.graphql)(mutation, config);

/***/ }),

/***/ "./client/src/state/editor/unpublishBlockMutation.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = exports.mutation = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(['\nmutation UnpublishBlock($blockId:ID!) {\n  unpublishBlock(\n    id: $blockId\n      ) {\n    id\n  }\n}\n'], ['\nmutation UnpublishBlock($blockId:ID!) {\n  unpublishBlock(\n    id: $blockId\n      ) {\n    id\n  }\n}\n']);

var _reactApollo = __webpack_require__(6);

var _graphqlTag = __webpack_require__(5);

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _readBlocksForAreaQuery = __webpack_require__("./client/src/state/editor/readBlocksForAreaQuery.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var mutation = (0, _graphqlTag2.default)(_templateObject);

var config = {
  props: function props(_ref) {
    var mutate = _ref.mutate,
        actions = _ref.ownProps.actions;

    var handleUnpublishBlock = function handleUnpublishBlock(blockId, fromStage, toStage, fromVersion) {
      return mutate({
        variables: {
          blockId: blockId,
          fromStage: fromStage,
          toStage: toStage,
          fromVersion: fromVersion
        }
      });
    };

    return {
      actions: _extends({}, actions, {
        handleUnpublishBlock: handleUnpublishBlock
      })
    };
  },
  options: function options(_ref2) {
    var areaId = _ref2.areaId;
    return {
      refetchQueries: [{
        query: _readBlocksForAreaQuery.query,
        variables: _readBlocksForAreaQuery.config.options({ areaId: areaId }).variables
      }]
    };
  }
};

exports.mutation = mutation;
exports.config = config;
exports.default = (0, _reactApollo.graphql)(mutation, config);

/***/ }),

/***/ "./client/src/state/history/readOneBlockQuery.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = exports.query = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(['\nquery ReadHistoryViewerBlock ($block_id: ID!, $limit: Int!, $offset: Int!) {\n  readOneBlock(\n    versioning: {\n      mode: LATEST\n    },\n    filter: { id: { eq: $block_id } }\n  ) {\n    id\n    versions (limit: $limit, offset: $offset, sort: { version: DESC }) {\n      pageInfo {\n        totalCount\n      }\n      nodes {\n        version\n        absoluteLink\n        author {\n          firstName\n          surname\n        }\n        publisher {\n          firstName\n          surname\n        }\n        published\n        liveVersion\n        latestDraftVersion\n        lastEdited\n      }\n    }\n  }\n}\n'], ['\nquery ReadHistoryViewerBlock ($block_id: ID!, $limit: Int!, $offset: Int!) {\n  readOneBlock(\n    versioning: {\n      mode: LATEST\n    },\n    filter: { id: { eq: $block_id } }\n  ) {\n    id\n    versions (limit: $limit, offset: $offset, sort: { version: DESC }) {\n      pageInfo {\n        totalCount\n      }\n      nodes {\n        version\n        absoluteLink\n        author {\n          firstName\n          surname\n        }\n        publisher {\n          firstName\n          surname\n        }\n        published\n        liveVersion\n        latestDraftVersion\n        lastEdited\n      }\n    }\n  }\n}\n']);

var _reactApollo = __webpack_require__(6);

var _graphqlTag = __webpack_require__(5);

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var query = (0, _graphqlTag2.default)(_templateObject);

var config = {
  options: function options(_ref) {
    var recordId = _ref.recordId,
        limit = _ref.limit,
        page = _ref.page;

    return {
      variables: {
        limit: limit,
        offset: ((page || 1) - 1) * limit,
        block_id: recordId
      }
    };
  },
  props: function props(_ref2) {
    var _ref2$data = _ref2.data,
        error = _ref2$data.error,
        refetch = _ref2$data.refetch,
        readOneBlock = _ref2$data.readOneBlock,
        networkLoading = _ref2$data.loading,
        _ref2$ownProps = _ref2.ownProps,
        _ref2$ownProps$action = _ref2$ownProps.actions,
        actions = _ref2$ownProps$action === undefined ? {
      versions: {}
    } : _ref2$ownProps$action,
        limit = _ref2$ownProps.limit,
        recordId = _ref2$ownProps.recordId;

    var versions = readOneBlock || null;

    var errors = error && error.graphQLErrors && error.graphQLErrors.map(function (graphQLError) {
      return graphQLError.message;
    });

    return {
      loading: networkLoading || !versions,
      versions: versions,
      graphQLErrors: errors,
      actions: _extends({}, actions, {
        versions: _extends({}, versions, {
          goToPage: function goToPage(page) {
            refetch({
              offset: ((page || 1) - 1) * limit,
              limit: limit,
              block_id: recordId
            });
          }
        })
      })
    };
  }
};

exports.query = query;
exports.config = config;
exports.default = (0, _reactApollo.graphql)(query, config);

/***/ }),

/***/ "./client/src/state/history/revertToBlockVersionMutation.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = exports.mutation = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(['\nmutation revertBlockToVersion($id:ID!, $fromStage:VersionedStage!, $toStage:VersionedStage!, $fromVersion:Int!) {\n  copyBlockToStage(input: {\n    id: $id\n    fromVersion: $fromVersion\n    fromStage: $fromStage\n    toStage: $toStage\n  }) {\n    id\n  }\n}\n'], ['\nmutation revertBlockToVersion($id:ID!, $fromStage:VersionedStage!, $toStage:VersionedStage!, $fromVersion:Int!) {\n  copyBlockToStage(input: {\n    id: $id\n    fromVersion: $fromVersion\n    fromStage: $fromStage\n    toStage: $toStage\n  }) {\n    id\n  }\n}\n']);

var _reactApollo = __webpack_require__(6);

var _graphqlTag = __webpack_require__(5);

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var mutation = (0, _graphqlTag2.default)(_templateObject);

var config = {
  props: function props(_ref) {
    var mutate = _ref.mutate,
        actions = _ref.ownProps.actions;

    var revertToVersion = function revertToVersion(id, fromVersion, fromStage, toStage) {
      return mutate({
        variables: {
          id: id,
          fromVersion: fromVersion,
          fromStage: fromStage,
          toStage: toStage
        }
      });
    };

    return {
      actions: _extends({}, actions, {
        revertToVersion: revertToVersion
      })
    };
  },
  options: {
    refetchQueries: ['ReadHistoryViewerBlock']
  }
};

exports.mutation = mutation;
exports.config = config;
exports.default = (0, _reactApollo.graphql)(mutation, config);

/***/ }),

/***/ "./client/src/types/elementType.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elementType = undefined;

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var elementType = _propTypes2.default.shape({
  id: _propTypes2.default.string.isRequired,
  title: _propTypes2.default.string,
  blockSchema: _propTypes2.default.object,
  inlineEditable: _propTypes2.default.bool,
  published: _propTypes2.default.bool,
  liveVersion: _propTypes2.default.bool,
  version: _propTypes2.default.number
});

exports.elementType = elementType;

/***/ }),

/***/ "./client/src/types/elementTypeType.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elementTypeType = undefined;

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var elementTypeType = _propTypes2.default.shape({
  name: _propTypes2.default.string,

  title: _propTypes2.default.string,

  icon: _propTypes2.default.string,

  inlineEditable: _propTypes2.default.boolean,

  editTabs: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    title: _propTypes2.default.string,
    name: _propTypes2.default.string
  })),

  config: _propTypes2.default.object
});

exports.elementTypeType = elementTypeType;

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = PropTypes;

/***/ }),

/***/ 10:
/***/ (function(module, exports) {

module.exports = Reactstrap;

/***/ }),

/***/ 11:
/***/ (function(module, exports) {

module.exports = ReduxForm;

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

module.exports = Backend;

/***/ }),

/***/ 13:
/***/ (function(module, exports) {

module.exports = Config;

/***/ }),

/***/ 14:
/***/ (function(module, exports) {

module.exports = ReactDNDHtml5Backend;

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

module.exports = ReactDom;

/***/ }),

/***/ 16:
/***/ (function(module, exports) {

module.exports = getFormState;

/***/ }),

/***/ 17:
/***/ (function(module, exports) {

module.exports = FieldHolder;

/***/ }),

/***/ 18:
/***/ (function(module, exports) {

module.exports = FormBuilderLoader;

/***/ }),

/***/ 19:
/***/ (function(module, exports) {

module.exports = TabsActions;

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = i18n;

/***/ }),

/***/ 20:
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),

/***/ 21:
/***/ (function(module, exports) {

module.exports = withDragDropContext;

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = Injector;

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = Redux;

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = GraphQLTag;

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = ReactApollo;

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = classnames;

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = ReactRedux;

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = ReactDND;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map