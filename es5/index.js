"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _init2 = require("./lib/init");

var _index = _interopRequireDefault(require("./lib/grayScale/index"));

var _binary2 = _interopRequireDefault(require("./lib/binary/binary"));

var _index2 = _interopRequireDefault(require("./lib/fiter/index"));

var _erosive2 = require("./lib/binary/erosive");

var _index3 = _interopRequireDefault(require("./lib/reflect/index"));

var _sharpening = _interopRequireDefault(require("./lib/sharpening"));

/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
var debug = require('debug')('aYimg:index'); // eslint-disable-line


var Ayimg =
/*#__PURE__*/
function () {
  function Ayimg() {
    (0, _classCallCheck2.default)(this, Ayimg);
    this.imgComplete = false;
    this.ctx = null;
    this.imageData = null;
    this.canvas = null;
  }

  (0, _createClass2.default)(Ayimg, [{
    key: "init",
    value: function () {
      var _init = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(imgObj, width, height) {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _init2.initImg.bind(this)(imgObj, width, height);

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function init(_x, _x2, _x3) {
        return _init.apply(this, arguments);
      };
    }()
  }, {
    key: "grayScale",
    value: function grayScale() {
      var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'weight';
      (0, _index.default)(this.imageData, code);
      return this;
    }
  }, {
    key: "binary",
    value: function binary() {
      var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'otsu';
      (0, _binary2.default)(this.imageData, code);
      return this;
    }
  }, {
    key: "erosive",
    value: function erosive() {
      var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var template = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      for (var i = 0; i < times; i++) {
        (0, _erosive2.erosive)(this.imageData, template);
      }

      return this;
    }
  }, {
    key: "dilate",
    value: function dilate() {
      var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var template = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      for (var i = 0; i < times; i++) {
        (0, _erosive2.dilate)(this.imageData, template);
      }

      return this;
    }
  }, {
    key: "opening",
    value: function opening() {
      var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var template = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      for (var i = 0; i < times; i++) {
        (0, _erosive2.dilate)((0, _erosive2.erosive)(this.imageData, template), template);
      }

      return this;
    }
  }, {
    key: "closing",
    value: function closing(times) {
      var template = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      for (var i = 0; i < times; i++) {
        (0, _erosive2.erosive)((0, _erosive2.dilate)(this.imageData, template), template);
      }

      return this;
    }
  }, {
    key: "sharpen",
    value: function sharpen() {
      var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'sobel';
      (0, _sharpening.default)(this.imageData, code);
      return this;
    }
  }, {
    key: "reflect",
    value: function reflect() {
      var ctx = this.ctx;

      var _reflect2 = (0, _index3.default)(this.imageData, 'y'),
          _reflect3 = (0, _slicedToArray2.default)(_reflect2, 3),
          relectData = _reflect3[0],
          xBorder = _reflect3[1],
          yBorder = _reflect3[2]; //eslint-disable-line


      for (var i = 0; i < yBorder.length; i++) {
        ctx.strokeStyle = 'green';
        ctx.strokeRect(parseInt(xBorder[i].start / 2), parseInt(yBorder[i].start / 2), parseInt(xBorder[i].width / 2), parseInt(yBorder[i].width / 2));
      }

      return this;
    }
  }, {
    key: "fiter",
    value: function fiter() {
      var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'knn';
      (0, _index2.default)(this.imageData, code);
      return this;
    }
  }, {
    key: "show",
    value: function show() {
      var ctx = this.ctx,
          imageData = this.imageData;
      ctx.putImageData(imageData, 0, 0);
      return this;
    }
  }]);
  return Ayimg;
}();

var _default = Ayimg;
exports.default = _default;
module.exports = exports.default;