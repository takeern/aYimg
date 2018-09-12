"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closing = exports.opening = void 0;

var _erosion = require("./erosion");

var opening = function opening(data, template) {
  return (0, _erosion.dilate)((0, _erosion.erosive)(data, template), template);
};

exports.opening = opening;

var closing = function closing(data, template) {
  return (0, _erosion.erosive)((0, _erosion.dilate)(data, template), template);
};

exports.closing = closing;