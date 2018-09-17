"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initImg = exports.initCanvas = void 0;

var debug = require('debug')('aYimg:init'); //获取图片分辨率


var DPR = function DPR() {
  var scale = 2;

  if (window.devicePixelRatio && window.devicePixelRatio > 1) {
    return window.devicePixelRatio;
  }

  return scale;
};

var isString = function isString(s) {
  return Object.prototype.toString.call(s) === '[object String]';
}; //new canvas then push


var initCanvas = function initCanvas(img, width, height) {
  if (img.nodeType !== 1) {
    throw new Error('canvas初始化失败传入不为img');
  }

  width = width || img.width;
  height = height || img.height;
  var canvas = document.createElement('canvas');
  var imgWidth = img.width;
  var imgHeight = img.height;
  var scale = DPR();
  canvas.width = imgWidth * scale;
  canvas.height = imgHeight * scale;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  var ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.scale(scale, scale);
  ctx.drawImage(img, 0, 0);
  this.canvas = canvas;
  this.ctx = ctx;
  this.imgComplete = true;
  this.imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  document.getElementsByTagName('body')[0].appendChild(canvas);
  debug('canvas init success');
}; //judgment img parma


exports.initCanvas = initCanvas;

var initImg = function initImg(imgObj, width, height) {
  var _this = this;

  return new Promise(function (resolve) {
    var img = new Image();
    img.setAttribute('crossOrigin', 'Anonymous');

    if (isString(imgObj)) {
      img.src = imgObj;
    } else if (imgObj && imgObj.nodeType === 1) {
      initCanvas.bind(_this)(imgObj, width, height);
      resolve();
    } else {
      throw new Error('解析img失败');
    }

    img.onload = function () {
      initCanvas.bind(_this)(img, width, height);
      resolve();
    };
  });
};

exports.initImg = initImg;