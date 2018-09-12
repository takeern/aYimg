"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ulit = require("../ulit");

var _math = require("../math");

// const debug = require('debug')('aYimg:sharpening')
var _default = function _default(imageData) {
  var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'sobel';
  if (!(0, _ulit.isImageData)(imageData)) throw new Error('get imageData error from sharpening');
  var data = imageData.data,
      width = imageData.width;
  var len = data.length - width * 4;
  var copyData = (0, _ulit.copyImageData)(data);

  switch (code) {
    case 'priwitt':
      {
        for (var i = width * 4; i < len; i += 4) {
          var x = i / 4 % width;

          if (x !== 0 && x !== width - 1) {
            var Gx = copyData[i + 4 * (width - 1)] + copyData[i + 4 * width] + copyData[i + 4 * (width + 1)] - copyData[i - 4 * (width + 1)] - copyData[i - 4 * width] - copyData[i - 4 * (width - 1)];
            var Gy = copyData[i - 4 * (width - 1)] + copyData[i + 4] + copyData[i + 4 * (width + 1)] - copyData[i - 4 * (width + 1)] - copyData[i - 4] - copyData[i + 4 * (width - 1)];
            var operator = Math.round(Math.sqrt(Math.pow(Gx, 2) + Math.pow(Gy, 2)));
            data[i] = operator;
            data[i + 1] = operator;
            data[i + 2] = operator;
          }
        }

        break;
      }

    case 'sobel':
      {
        for (var _i = width * 4; _i < len; _i += 4) {
          var _x = _i / 4 % width;

          if (_x !== 0 && _x !== width - 1) {
            var _Gx = copyData[_i + 4 * (width - 1)] + 2 * copyData[_i + 4 * width] + copyData[_i + 4 * (width + 1)] - copyData[_i - 4 * (width + 1)] - 2 * copyData[_i - width * 4] - copyData[_i - 4 * (width - 1)];

            var _Gy = copyData[_i + 4 * (1 - width)] + 2 * copyData[_i + 4] + copyData[_i + 4 * (width + 1)] - copyData[_i - 4 * (width + 1)] - 2 * copyData[_i - 4] - copyData[_i + 4 * (width - 1)];

            var _operator = Math.round(Math.sqrt(Math.pow(_Gx, 2) + Math.pow(_Gy, 2)));

            data[_i] = _operator;
            data[_i + 1] = _operator;
            data[_i + 2] = _operator;
          }
        }

        break;
      }

    case 'roberts':
      {
        for (var _i2 = width * 4; _i2 < len; _i2 += 4) {
          var _x2 = _i2 / 4 % width;

          if (_x2 !== 0 && _x2 !== width - 1) {
            var _operator2 = Math.abs(copyData[_i2] - copyData[_i2 + 4 * (width + 1)]) + Math.abs(copyData[_i2 + 4] - copyData[_i2 + 4 * width]);

            data[_i2] = _operator2;
            data[_i2 + 1] = _operator2;
            data[_i2 + 2] = _operator2;
          }
        }

        break;
      }

    case 'wallis':
      {
        for (var _i3 = width * 4; _i3 < len; _i3 += 4) {
          var _x3 = _i3 / 4 % width;

          if (_x3 !== 0 && _x3 !== width - 1) {
            var _operator3 = 46 * (4 * (0, _math.log10)(copyData[_i3] + 1) - [(0, _math.log10)(copyData[_i3 - 4] + 1) + (0, _math.log10)(copyData[_i3 + 4] + 1) + (0, _math.log10)(copyData[_i3 - 4 * width] + 1) + (0, _math.log10)(copyData[_i3 + 4 * width] + 1)]); // eslint-disable-line


            data[_i3] = _operator3;
            data[_i3 + 1] = _operator3;
            data[_i3 + 2] = _operator3;
          }
        }

        break;
      }

    default:
      throw new Error("code = ".concat(code, " is undefined form sharpening"));
  }

  return imageData;
};

exports.default = _default;
module.exports = exports.default;