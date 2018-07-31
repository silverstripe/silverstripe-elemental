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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = Injector;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = GraphQLTag;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = ReactApollo;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elementType = undefined;

var _react = __webpack_require__(0);

var elementType = {
  ID: _react.PropTypes.number.isRequired,
  Title: _react.PropTypes.string,
  Summary: _react.PropTypes.string,
  Type: _react.PropTypes.string,
  Icon: _react.PropTypes.string,
  Modified: _react.PropTypes.bool,
  Draft: _react.PropTypes.bool
};

exports.elementType = elementType;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = classnames;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = i18n;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _registerComponents = __webpack_require__(9);

var _registerComponents2 = _interopRequireDefault(_registerComponents);

var _registerTransforms = __webpack_require__(10);

var _registerTransforms2 = _interopRequireDefault(_registerTransforms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.document.addEventListener('DOMContentLoaded', function () {
  (0, _registerComponents2.default)();
  (0, _registerTransforms2.default)();
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(22);

var _jquery2 = _interopRequireDefault(_jquery);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(21);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Injector = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jquery2.default.entwine('ss', function ($) {
  $('.js-injector-boot .element-editor__container').entwine({
    onmatch: function onmatch() {
      var context = {};
      var ElementEditorComponent = (0, _Injector.loadComponent)('ElementEditor', context);
      var schemaData = this.data('schema');

      var props = {
        pageId: schemaData['page-id']
      };

      _reactDom2.default.render(_react2.default.createElement(ElementEditorComponent, props), this[0]);
    },
    onunmatch: function onunmatch() {
      _reactDom2.default.unmountComponentAtNode(this[0]);
    }
  });
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Injector = __webpack_require__(1);

var _Injector2 = _interopRequireDefault(_Injector);

var _Element = __webpack_require__(12);

var _Element2 = _interopRequireDefault(_Element);

var _ElementEditor = __webpack_require__(13);

var _ElementEditor2 = _interopRequireDefault(_ElementEditor);

var _ElementList = __webpack_require__(14);

var _ElementList2 = _interopRequireDefault(_ElementList);

var _Toolbar = __webpack_require__(16);

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Header = __webpack_require__(15);

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  _Injector2.default.component.registerMany({
    ElementEditor: _ElementEditor2.default,
    ElementToolbar: _Toolbar2.default,
    ElementList: _ElementList2.default,
    Element: _Element2.default,
    ElementHeader: _Header2.default
  });
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Injector = __webpack_require__(1);

var _Injector2 = _interopRequireDefault(_Injector);

var _readOneBlockQuery = __webpack_require__(19);

var _readOneBlockQuery2 = _interopRequireDefault(_readOneBlockQuery);

var _HistoricElementView = __webpack_require__(17);

var _HistoricElementView2 = _interopRequireDefault(_HistoricElementView);

var _revertToBlockVersionMutation = __webpack_require__(20);

var _revertToBlockVersionMutation2 = _interopRequireDefault(_revertToBlockVersionMutation);

var _readBlocksForPageQuery = __webpack_require__(18);

var _readBlocksForPageQuery2 = _interopRequireDefault(_readBlocksForPageQuery);

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

  _Injector2.default.transform('cms-element-editor', function (updater) {
    updater.component('ElementList', _readBlocksForPageQuery2.default, 'PageElements');
  });
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(8);
__webpack_require__(7);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _elementType = __webpack_require__(4);

var _Injector = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = function (_PureComponent) {
  _inherits(Element, _PureComponent);

  function Element() {
    _classCallCheck(this, Element);

    return _possibleConstructorReturn(this, (Element.__proto__ || Object.getPrototypeOf(Element)).apply(this, arguments));
  }

  _createClass(Element, [{
    key: 'render',
    value: function render() {
      var _props$element = this.props.element,
          ID = _props$element.ID,
          Title = _props$element.Title,
          Summary = _props$element.Summary,
          Type = _props$element.Type,
          Icon = _props$element.Icon,
          Modified = _props$element.Modified,
          Draft = _props$element.Draft;


      if (!ID) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        { className: 'element-editor__element' },
        _react2.default.createElement(HeaderComponent, {
          elementId: ID,
          title: Title,
          elementType: Type,
          fontIcon: Icon,
          modified: Modified,
          draft: Draft
        }),
        _react2.default.createElement(
          'p',
          null,
          Summary
        )
      );
    }
  }]);

  return Element;
}(_react.PureComponent);

Element.propTypes = {
  element: _elementType.elementType

};

Element.defaultProps = {
  element: null
};

exports.Component = Element;
exports.default = (0, _Injector.inject)(['ElementHeader'], function (HeaderComponent) {
  return {
    HeaderComponent: HeaderComponent
  };
}, function () {
  return 'Element';
})(Element);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Injector = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ElementEditor = function (_PureComponent) {
  _inherits(ElementEditor, _PureComponent);

  function ElementEditor() {
    _classCallCheck(this, ElementEditor);

    return _possibleConstructorReturn(this, (ElementEditor.__proto__ || Object.getPrototypeOf(ElementEditor)).apply(this, arguments));
  }

  _createClass(ElementEditor, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          ToolbarComponent = _props.ToolbarComponent,
          ListComponent = _props.ListComponent,
          pageId = _props.pageId;


      return _react2.default.createElement(
        'div',
        { className: 'element-editor' },
        _react2.default.createElement(ToolbarComponent, null),
        _react2.default.createElement(ListComponent, { pageId: pageId })
      );
    }
  }]);

  return ElementEditor;
}(_react.PureComponent);

ElementEditor.propTypes = {
  pageId: _react.PropTypes.number.isRequired
};

ElementEditor.defaultProps = {};

exports.default = (0, _Injector.inject)(['ElementToolbar', 'ElementList'], function (ToolbarComponent, ListComponent) {
  return {
    ToolbarComponent: ToolbarComponent,
    ListComponent: ListComponent
  };
}, function () {
  return 'ElementEditor';
})(ElementEditor);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _elementType = __webpack_require__(4);

var _Injector = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ElementList = function (_Component) {
  _inherits(ElementList, _Component);

  function ElementList() {
    _classCallCheck(this, ElementList);

    return _possibleConstructorReturn(this, (ElementList.__proto__ || Object.getPrototypeOf(ElementList)).apply(this, arguments));
  }

  _createClass(ElementList, [{
    key: 'renderBlocks',
    value: function renderBlocks() {
      var _props = this.props,
          ElementComponent = _props.ElementComponent,
          blocks = _props.blocks;


      if (!blocks) {
        return null;
      }

      return blocks.map(function (element) {
        return _react2.default.createElement(ElementComponent, {
          key: element.ID,
          element: element
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'elemental-editor__list' },
        this.renderBlocks()
      );
    }
  }]);

  return ElementList;
}(_react.Component);

ElementList.propTypes = {
  blocks: _react.PropTypes.arrayOf(_elementType.elementType)
};

ElementList.defaultProps = {
  blocks: []
};

exports.default = (0, _Injector.inject)(['Element'], function (ElementComponent) {
  return {
    ElementComponent: ElementComponent
  };
}, function () {
  return 'ElementEditor.ElementList';
})(ElementList);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(5);

var _classnames2 = _interopRequireDefault(_classnames);

var _i18n = __webpack_require__(6);

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_Component) {
  _inherits(Header, _Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          elementType = _props.elementType,
          fontIcon = _props.fontIcon,
          moreActions = _props.moreActions,
          modified = _props.modified,
          draft = _props.draft;


      var spanClassNames = (0, _classnames2.default)({
        'element-item--modified': modified,
        'element-item--draft': draft
      });

      var editClassNames = (0, _classnames2.default)('element-editor__icon-action', 'element-editor__icon-action--hidden-on-hover', 'font-icon-edit btn--icon-large action-menu--handled', 'action action-detail', 'edit-link');

      var deleteClassNames = (0, _classnames2.default)('action', 'gridfield-button-delete', 'btn--icon-md', 'font-icon-trash-bin', 'btn--no-text', 'element-editor__icon-action', 'action-menu--handled', 'form-group--no-label', 'gridfield-button-delete font-icon-trash');

      return _react2.default.createElement(
        'div',
        { className: 'element__heading' },
        _react2.default.createElement(
          'div',
          { className: 'element-header__info' },
          _react2.default.createElement(
            'div',
            { className: 'element-preview__icon' },
            _react2.default.createElement('i', { className: fontIcon }),
            modified && _react2.default.createElement('span', { className: spanClassNames, title: _i18n2.default._t('Heading.UNPUBLISHED_CHANGES', 'Item has unpublished changes') })
          ),
          _react2.default.createElement(
            'h3',
            { className: 'element-heading__title' },
            title,
            _react2.default.createElement(
              'small',
              { className: 'element-heading__element-type' },
              elementType
            )
          )
        )
      );
    }
  }]);

  return Header;
}(_react.Component);

Header.defaultProps = {};

Header.propTypes = {
  title: _react.PropTypes.string,
  elementType: _react.PropTypes.string,
  fontIcon: _react.PropTypes.string,
  modified: _react.PropTypes.bool,
  draft: _react.PropTypes.bool
};

exports.Component = Header;
exports.default = Header;

/***/ }),
/* 16 */
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

var Toolbar = function (_PureComponent) {
  _inherits(Toolbar, _PureComponent);

  function Toolbar() {
    _classCallCheck(this, Toolbar);

    return _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).apply(this, arguments));
  }

  _createClass(Toolbar, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', null);
    }
  }]);

  return Toolbar;
}(_react.PureComponent);

Toolbar.defaultProps = {};
Toolbar.propTypes = {};

exports.default = Toolbar;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _i18n = __webpack_require__(6);

var _i18n2 = _interopRequireDefault(_i18n);

var _classnames = __webpack_require__(5);

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
              _i18n2.default._t('HistoricElementView.BLOCK_HISTORY', 'View block'),
              _react2.default.createElement('i', { className: 'font-icon-angle-right' })
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = exports.query = undefined;

var _templateObject = _taggedTemplateLiteral(['\nquery ReadBlocksForPage($id:ID!) {\n  readOnePage(ID: $id, Versioning: {\n    Mode: LATEST\n  }){\n    ID\n    ElementalAreaIfExists {\n      Elements {\n        pageInfo {\n          totalCount\n        }\n        edges {\n          node {\n            ID\n            Title\n            Summary\n            Type\n            Icon\n          }\n        }\n      }\n    }\n  }\n}\n'], ['\nquery ReadBlocksForPage($id:ID!) {\n  readOnePage(ID: $id, Versioning: {\n    Mode: LATEST\n  }){\n    ID\n    ElementalAreaIfExists {\n      Elements {\n        pageInfo {\n          totalCount\n        }\n        edges {\n          node {\n            ID\n            Title\n            Summary\n            Type\n            Icon\n          }\n        }\n      }\n    }\n  }\n}\n']);

var _reactApollo = __webpack_require__(3);

var _graphqlTag = __webpack_require__(2);

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var query = (0, _graphqlTag2.default)(_templateObject);

var config = {
  options: function options(_ref) {
    var pageId = _ref.pageId;

    return {
      variables: {
        id: pageId
      }
    };
  },
  props: function props(_ref2) {
    var _ref2$data = _ref2.data,
        error = _ref2$data.error,
        readOnePage = _ref2$data.readOnePage,
        networkLoading = _ref2$data.loading;

    var blocks = null;
    if (readOnePage) {
      blocks = readOnePage.ElementalAreaIfExists.Elements.edges.map(function (element) {
        return element.node;
      });
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = exports.query = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(['\nquery ReadHistoryViewerBlock ($block_id: ID!, $limit: Int!, $offset: Int!) {\n  readOneBlock(\n    Versioning: {\n      Mode: LATEST\n    },\n    ID: $block_id\n  ) {\n    ID\n    Versions (limit: $limit, offset: $offset) {\n      pageInfo {\n        totalCount\n      }\n      edges {\n        node {\n          Version\n          AbsoluteLink\n          Author {\n            FirstName\n            Surname\n          }\n          Publisher {\n            FirstName\n            Surname\n          }\n          Published\n          LiveVersion\n          LastEdited\n        }\n      }\n    }\n  }\n}\n'], ['\nquery ReadHistoryViewerBlock ($block_id: ID!, $limit: Int!, $offset: Int!) {\n  readOneBlock(\n    Versioning: {\n      Mode: LATEST\n    },\n    ID: $block_id\n  ) {\n    ID\n    Versions (limit: $limit, offset: $offset) {\n      pageInfo {\n        totalCount\n      }\n      edges {\n        node {\n          Version\n          AbsoluteLink\n          Author {\n            FirstName\n            Surname\n          }\n          Publisher {\n            FirstName\n            Surname\n          }\n          Published\n          LiveVersion\n          LastEdited\n        }\n      }\n    }\n  }\n}\n']);

var _reactApollo = __webpack_require__(3);

var _graphqlTag = __webpack_require__(2);

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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = exports.mutation = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(['\nmutation revertBlockToVersion($id:ID!, $fromStage:VersionedStage!, $toStage:VersionedStage!, $fromVersion:Int!) {\n  copyBlockToStage(Input: {\n    ID: $id\n    FromVersion: $fromVersion\n    FromStage: $fromStage\n    ToStage: $toStage\n  }) {\n    ID\n  }\n}\n'], ['\nmutation revertBlockToVersion($id:ID!, $fromStage:VersionedStage!, $toStage:VersionedStage!, $fromVersion:Int!) {\n  copyBlockToStage(Input: {\n    ID: $id\n    FromVersion: $fromVersion\n    FromStage: $fromStage\n    ToStage: $toStage\n  }) {\n    ID\n  }\n}\n']);

var _reactApollo = __webpack_require__(3);

var _graphqlTag = __webpack_require__(2);

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
/* 21 */
/***/ (function(module, exports) {

module.exports = ReactDom;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map