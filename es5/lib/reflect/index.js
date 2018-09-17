"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _ulit = require("../ulit");

var _reflect = require("./reflect");

var _default = function _default(imageData) {
  if (!(0, _ulit.isImageData)(imageData)) throw new Error('get imageData error from reflect');
  var relectYData = (0, _reflect.relectY)(imageData); // 垂直方向投影直方图

  var xBorder = (0, _reflect.getYborder)(relectYData, 0, imageData.height / 20); // 垂直方向投影直方图获取x轴方向边界

  var yArrs = (0, _reflect.relectX)(imageData, xBorder); // 通过x边界 对该范围内进行水平方向投影

  var yBorder = []; //y方向边界

  for (var i = 0; i < yArrs.length; i++) {
    var xData = (0, _reflect.getYborder)(yArrs[i]);
    yBorder.push.apply(yBorder, (0, _toConsumableArray2.default)((0, _reflect.fiterBorder)(xData))); //对y方向border检测 仅仅选择起点和终点 
  }

  return [relectYData, xBorder, yBorder];
};

exports.default = _default;
module.exports = exports.default;