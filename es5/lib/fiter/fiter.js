"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _math = require("../math");

var _default = function _default(copyData, imageData) {
  var code = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'knnA';
  var data = imageData.data,
      width = imageData.width;
  var length = data.length;
  var start = (width + 1) * 4;
  var checkCode = [];

  for (var x = -2; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      if (y === 0 && x <= 0) continue;
      checkCode.push({
        x: x,
        y: y
      });
    }
  }

  switch (code) {
    case 'avg':
      {
        for (var i = start; i < length; i += 4) {
          var _x = i / 4 % width;

          if (_x !== 0 && _x !== width - 1) {
            var sum = copyData[i - (width + 1) * 4] + copyData[i - 4 * width] + copyData[i - 4 * (width - 1)] + copyData[i - 4] + copyData[i] + copyData[i + 4] + copyData[i + 4 * (width - 1)] + copyData[i + 4 * width] + copyData[i + 4 * (width + 1)];
            var operator = sum / 9;
            data[i] = operator;
            data[i + 1] = operator;
            data[i + 2] = operator;
          }
        }

        break;
      }

    case 'median':
      {
        for (var _i = start; _i < length; _i += 4) {
          var _x2 = _i / 4 % width;

          if (_x2 !== 0 && _x2 !== width - 1) {
            var arr = [copyData[_i - (width + 1) * 4], copyData[_i - 4 * width], copyData[_i - 4 * (width - 1)], copyData[_i - 4], copyData[_i], copyData[_i + 4], copyData[_i + 4 * (width - 1)], copyData[_i + 4 * width], copyData[_i + 4 * (width + 1)]];
            arr.sort(_math.byAsc);
            var _operator = arr[4];
            data[_i] = _operator;
            data[_i + 1] = _operator;
            data[_i + 2] = _operator;
          }
        }

        break;
      }

    case 'knnA':
      {
        var _start = (2 * width + 1) * 4;

        var end = length - width * 4 * 2;

        for (var _i2 = _start; _i2 < end; _i2 += 4) {
          var _x3 = _i2 / 4 % width;

          if (_x3 !== 0 && _x3 !== width - 1 && _x3 !== 1 && _x3 !== width - 2) {
            var _arr = [];

            for (var _i3 = 0; _i3 < checkCode.length; _i3++) {
              var _code = checkCode[_i3];
              var first = copyData[_i2 - 4 * (width * _code.y + _code.x)] - copyData[_i2];
              var ser = copyData[_i2 + 4 * (width * _code.y + _code.x)] - copyData[_i2]; // if (Math.abs(first) > Math.abs(ser)) arr.push(ser)
              // else arr.push(first)

              _arr.push(first);

              _arr.push(ser);
            }

            _arr.sort(_math.absByAsc);

            var _operator2 = (0, _math.arrSum)(_arr.slice(0, 8)) / 9 + copyData[_i2];

            data[_i2] = _operator2;
            data[_i2 + 1] = _operator2;
            data[_i2 + 2] = _operator2;
          }
        }

        break;
      }

    case 'knnM':
      {
        var _start2 = (2 * width + 1) * 4;

        var _end = length - width * 4 * 2;

        for (var _i4 = _start2; _i4 < _end; _i4 += 4) {
          var _x4 = _i4 / 4 % width;

          if (_x4 !== 0 && _x4 !== width - 1 && _x4 !== 1 && _x4 !== width - 2) {
            var _arr2 = [];

            for (var _i5 = 0; _i5 < checkCode.length; _i5++) {
              var _code2 = checkCode[_i5];

              var _first = copyData[_i4 - 4 * (width * _code2.y + _code2.x)] - copyData[_i4];

              var _ser = copyData[_i4 + 4 * (width * _code2.y + _code2.x)] - copyData[_i4];

              if (Math.abs(_first) > Math.abs(_ser)) _arr2.push(_ser);else _arr2.push(_first);
            }

            _arr2.sort(_math.absByAsc);

            var slice = _arr2.slice(0, 8);

            var _operator3 = slice[4] + copyData[_i4];

            data[_i4] = _operator3;
            data[_i4 + 1] = _operator3;
            data[_i4 + 2] = _operator3;
          }
        }

        break;
      }

    case 'snn':
      {
        var _start3 = (2 * width + 1) * 4;

        var _end2 = length - width * 4 * 2;

        for (var _i6 = _start3; _i6 < _end2; _i6 += 4) {
          var _x5 = _i6 / 4 % width;

          if (_x5 !== 0 && _x5 !== width - 1 && _x5 !== 1 && _x5 !== width - 2) {
            var _arr3 = [];

            for (var _i7 = 0; _i7 < checkCode.length; _i7++) {
              var _code3 = checkCode[_i7];

              var _first2 = copyData[_i6 - 4 * (width * _code3.y + _code3.x)] - copyData[_i6];

              var _ser2 = copyData[_i6 + 4 * (width * _code3.y + _code3.x)] - copyData[_i6];

              if (Math.abs(_first2) > Math.abs(_ser2)) _arr3.push(_ser2);else _arr3.push(_first2);
            }

            var _operator4 = copyData[_i6] + (0, _math.arrSum)(_arr3) / 12; //eslint-disable-line


            data[_i6] = _operator4;
            data[_i6 + 1] = _operator4;
            data[_i6 + 2] = _operator4;
          }
        }

        break;
      }

    default:
      throw new Error('get code error from fiter');
  }

  return imageData;
};

exports.default = _default;
module.exports = exports.default;