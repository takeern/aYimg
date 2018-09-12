"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepcopy = deepcopy;
exports.testPix = exports.copyImageData = exports.isString = exports.dataFromCopy = exports.isArray = exports.toDobuleArray = exports.isImageData = void 0;

var isImageData = function isImageData(s) {
  return Object.prototype.toString.call(s) === '[object ImageData]';
};

exports.isImageData = isImageData;

var isArray = function isArray(s) {
  return Object.prototype.toString.call(s) === '[object Array]';
};

exports.isArray = isArray;

var isString = function isString(s) {
  return Object.prototype.toString.call(s) === '[object String]';
};

exports.isString = isString;

var toDobuleArray = function toDobuleArray(imageData, canvas) {
  var data = imageData.data;
  var pix = [];
  var copyData = [];
  var length = data.length;
  var width = canvas.width;

  for (var i = 0; i < length; i += 4) {
    pix.push(data[i]);

    if ((i / 4 + 1) % width === 0) {
      copyData.push(pix);
      pix = [];
    }
  }

  return copyData;
};

exports.toDobuleArray = toDobuleArray;

function deepcopy(obj) {
  var out = [],
      i = 0,
      len = obj.length;

  for (; i < len; i++) {
    if (obj[i] instanceof Array) {
      out[i] = deepcopy(obj[i]);
    } else out[i] = obj[i];
  }

  return out;
}

var dataFromCopy = function dataFromCopy(imageData, copyData) {
  if (!isImageData(imageData)) throw new Error('get imageData error from dataFromCopy');
  var data = imageData.data;
  var length = copyData.length;
  var len = copyData[1].length;

  for (var y = 0; y < length; y++) {
    for (var x = 0; x < len; x++) {
      var index = y * len + x;
      data[index * 4] = copyData[y][x];
      data[index * 4 + 1] = copyData[y][x];
      data[index * 4 + 2] = copyData[y][x];
    }
  }
};

exports.dataFromCopy = dataFromCopy;

var testPix = function testPix(canvas, ctx) {
  var div = document.createElement('div');
  canvas.addEventListener('mousemove', function () {
    document.querySelector('body').appendChild(div);
    pick(div);
  });

  var pick = function pick(showPiex) {
    var _event = event,
        x = _event.layerX,
        y = _event.layerY;
    var piex = ctx.getImageData(x, y, 1, 1);
    var data = piex.data;
    var rgba = "rgba(".concat(data[0], ",").concat(data[1], ",").concat(data[2], ",").concat(data[3] / 255, ")");
    showPiex.style.backgroundColor = rgba;
    showPiex.textContent = "".concat(rgba, " ").concat(x, " ").concat(y);
  };
};

exports.testPix = testPix;

var copyImageData = function copyImageData(data) {
  return isArray(data) ? Array.from(data) : new Uint8ClampedArray(data);
};

exports.copyImageData = copyImageData;