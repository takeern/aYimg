"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fiterBorder = exports.relectX = exports.getYborder = exports.relectY = void 0;

//垂直方向 直方图
var relectY = function relectY(imageData) {
  var width = imageData.width,
      height = imageData.height,
      data = imageData.data;
  var Yarr = new Array(width).fill(0);

  for (var y = 0; y < height; y++) {
    var py = width * y;

    for (var x = 0; x < width; x++) {
      if (data[(py + x) * 4] !== 255) {
        Yarr[x] += 1;
      }
    }
  }

  return Yarr;
}; //直方图获取边界谷底


exports.relectY = relectY;

var getYborder = function getYborder(arr) {
  var fiterPix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var fiterMax = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var command = true; //false meaning start pix will add

  var key = [];
  var start,
      end,
      max = 0;
  var len = arr.length - 1;

  for (var i = 1; i < len; i++) {
    if (arr[i] - arr[i - 1] > 0 && arr[i] - arr[i + 1] > 0 && arr[i] > max) {
      max = arr[i];
    }

    if (arr[i] === fiterPix) {
      if (command && arr[i + 1] - arr[i] > 0) {
        start = i;
        command = false;
      } else if (!command && arr[i] - arr[i - 1] < 0) {
        end = i;
        command = true;

        if (max > fiterMax) {
          key.push({
            start: start,
            end: end,
            width: end - start,
            max: max
          });
        }

        max = 0;
      }
    }
  }

  return key;
}; //水平方向投影直方图 多组数据


exports.getYborder = getYborder;

var relectX = function relectX(imageData, option) {
  var width = imageData.width,
      height = imageData.height,
      data = imageData.data;
  var Xarrs = [];

  for (var i = 0; i < option.length; i++) {
    var _option$i = option[i],
        start = _option$i.start,
        end = _option$i.end;
    var Xarr = new Array(height).fill(0);

    for (var y = 0; y < height; y++) {
      var py = width * y;
      var sum = 0;

      for (var x = start; x <= end; x++) {
        if (data[(py + x) * 4] !== 255) {
          sum += 1;
        }
      }

      Xarr[y] = sum;
    }

    Xarrs.push(Xarr);
  }

  return Xarrs;
}; //筛选x方向


exports.relectX = relectX;

var fiterBorder = function fiterBorder(option) {
  var fiterHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  if (option.length === 1) return option;
  var newBorder = [option[0]];

  for (var i = 1, len = option.length; i < len; i++) {
    if (option[i].start - newBorder[newBorder.length].end < fiterHeight) {
      newBorder[newBorder.length].end = option[i].end;
      newBorder[newBorder.length].width += option[i].width;
    } else {
      newBorder.push(option);
    }
  }

  if (newBorder.length === 1) return newBorder;
  var index = 0,
      max = newBorder[0].width;

  for (var _i = 0, _len = newBorder.length; _i < _len; _i++) {
    if (newBorder[_i].width > max) {
      index = _i;
    }
  }

  return newBorder[index];
};

exports.fiterBorder = fiterBorder;