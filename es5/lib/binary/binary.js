"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ulit = require("../ulit");

var debug = require('debug')('aYimg:grayscale');

var _default = function _default(imageData) {
  var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'otsu';
  var ptile = arguments.length > 2 ? arguments[2] : undefined;
  if (!(0, _ulit.isImageData)(imageData)) throw new Error('get imageData error from binary');
  var data = imageData.data;
  var threshold;

  switch (code) {
    //大津法 二值化
    case 'otsu':
      {
        //平均像素值
        var piexAvg = 0; //eslint-disable-line

        var Max = 0,
            i;

        for (i = 0; i < data.length; i += 4) {
          piexAvg += data[i];
        }

        piexAvg = piexAvg / i * 4;

        for (var j = 0; j < 256; j++) {
          //eslint-disable-line
          var w0 = 0;
          var w1 = 0;
          var u0 = 0;
          var u1 = 1;

          for (var _i = 0; _i < data.length; _i += 4) {
            if (data[_i] > j) {
              w0 += 1;
              u0 += data[_i];
            } else {
              w1 += 1;
              u1 += data[_i];
            }
          }

          u0 = u0 / w0;
          u1 = u1 / w1;
          w0 = w0 / data.length * 4;
          w1 = w1 / data.length * 4;
          var g = w0 * w1 * (u0 - u1) * (u0 - u1);

          if (g > Max) {
            Max = g;
            threshold = j;
          }
        }

        break;
      }
    //灰度平均值法 二值话

    case 'avg':
      {
        var sum = 0;

        for (var _i2 = 0; _i2 < data.length; _i2 += 4) {
          sum += data[_i2];
        }

        threshold = sum * 4 / data.length;
        break;
      }
    //均值双谷峰法 二值化

    case 'ptile':
      {
        ptile = parseFloat(ptile, 10); //eslint-disable-line

        if (isNaN(ptile)) console.warn('ptlie error '); //eslint-disable-line

        var max = new Array(255).fill(0);

        for (var _i3 = 0; _i3 < data.length; _i3 += 4) {
          if (max[data[_i3]]) {
            max[data[_i3]] += 1;
          } else {
            max[data[_i3]] = 1;
          }
        }

        var k = ptile * data.length / 4;
        var _sum = 0;

        for (var _i4 = 0; _i4 < max.length; _i4++) {
          if (_sum > k) {
            threshold = _i4;
            break;
          } else {
            _sum += max[_i4];
          }
        }

        break;
      }

    default:
      {
        throw new Error('binary can not handle code');
      }
  }

  for (var _i5 = 0; _i5 < data.length; _i5 += 4) {
    if (data[_i5] < threshold) {
      data[_i5] = 0;
      data[_i5 + 1] = 0;
      data[_i5 + 2] = 0;
    } else {
      data[_i5] = 255;
      data[_i5 + 1] = 255;
      data[_i5 + 2] = 255;
    }
  }

  debug('binary success');
  return imageData;
};

exports.default = _default;
module.exports = exports.default;