"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ulit = require("../ulit");

var _fiter = _interopRequireDefault(require("./fiter"));

// const debug = require('debug')('aYimg:fiter')
var _default = function _default(imageData, code) {
  if (!(0, _ulit.isImageData)(imageData)) throw new Error('get imageData error from fiter');
  var data = imageData.data;
  var copyData = (0, _ulit.copyImageData)(data);
  var logData = (0, _fiter.default)(copyData, imageData, code);
  return logData;
};

exports.default = _default;
module.exports = exports.default;