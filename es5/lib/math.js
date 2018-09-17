"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrSum = exports.absByAsc = exports.byAsc = exports.log10 = exports.PI = void 0;
var PI = Math.PI;
exports.PI = PI;

var log10 = function log10(int) {
  return Math.log(int) / Math.log(10);
};

exports.log10 = log10;

var byAsc = function byAsc(a, b) {
  return a - b;
};

exports.byAsc = byAsc;

var absByAsc = function absByAsc(a, b) {
  return Math.abs(a) - Math.abs(b);
};

exports.absByAsc = absByAsc;

var arrSum = function arrSum(array) {
  return array.reduce(function (pv, cv) {
    return pv + cv;
  }, 0);
};

exports.arrSum = arrSum;