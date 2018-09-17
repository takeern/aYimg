"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dilate = exports.erosive = void 0;

var _ulit = require("../ulit");

var getTemplate = function getTemplate(code) {
  var template;

  switch (code) {
    case 1:
      {
        template = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
        break;
      }

    case 2:
      {
        template = [[0, 1, 0], [1, 1, 1], [0, 1, 0]];
        break;
      }

    case 3:
      {
        template = [[0, 1, 0], [1, 1, 0], [0, 0, 0]];
        break;
      }

    case 4:
      {
        template = [[0, 1, 0], [0, 1, 1], [0, 0, 0]];
        break;
      }

    case 5:
      {
        template = [[0, 0, 0], [0, 1, 1], [0, 1, 0]];
        break;
      }

    case 6:
      {
        template = [[0, 0, 0], [1, 1, 0], [0, 1, 0]];
        break;
      }

    default:
      throw new Error('get template code error');
  }

  return template;
};

var remberCode = function remberCode(template) {
  var height = template.length;
  var width = template[0].length;
  var checkCode = [];

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      if (template[y][x] === 1) {
        checkCode.push({
          x: x - parseInt(width / 2),
          y: y - parseInt(height / 2)
        });
      }
    }
  }

  return checkCode;
};

var checkEr = function checkEr(data, i, checkCode, width) {
  var length = checkCode.length;

  for (var x = 0; x < length; x++) {
    if (data[i + (width * checkCode[x].y + checkCode[x].x) * 4] !== 0) {
      return 255;
    }
  }

  return 0;
};

var checkDi = function checkDi(data, i, checkCode, width) {
  var length = checkCode.length;

  for (var x = 0; x < length; x++) {
    if (data[i + (width * checkCode[x].y + checkCode[x].x) * 4] === 0) {
      return 0;
    }
  }

  return 255;
};

var fn = function fn(imageData) {
  var template = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var code = arguments.length > 2 ? arguments[2] : undefined;
  var tWidth, tHeight;

  if ((0, _ulit.isArray)(template)) {
    tHeight = template.length;
    if (tHeight !== 0) tWidth = template[0].length;else throw new Error('template is error');
  } else if (!isNaN(template)) {
    template = getTemplate(template);
    tWidth = 3;
    tHeight = 3;
  } else {
    throw new Error('get template error');
  }

  var data = imageData.data,
      width = imageData.width;
  var copyData = (0, _ulit.copyImageData)(data);
  var checkCode = remberCode(template);
  var len = data.length - width * 4 * (tHeight - 1) / 2;
  var start = 4 * width * (tWidth - 1) / 2;

  if (code === 'erosive') {
    for (var i = start; i < len; i += 4) {
      var x = i % (width * 4);

      if (x !== 0 && data[i] === 0) {
        var operator = checkEr(copyData, i, checkCode, width);
        data[i] = operator;
        data[i + 1] = operator;
        data[i + 2] = operator;
      }
    }
  } else if (code === 'dilate') {
    for (var _i = start; _i < len; _i += 4) {
      var _x = _i % (width * 4);

      if (_x !== 0 && data[_i] !== 0) {
        var _operator = checkDi(copyData, _i, checkCode, width);

        data[_i] = _operator;
        data[_i + 1] = _operator;
        data[_i + 2] = _operator;
      }
    }
  }

  return imageData;
};

var erosive = function erosive(imageData, template) {
  if (!(0, _ulit.isImageData)(imageData)) throw new Error('get imageData error from erosive');
  return fn(imageData, template, 'erosive');
};

exports.erosive = erosive;

var dilate = function dilate(imageData, template) {
  if (!(0, _ulit.isImageData)(imageData)) throw new Error('get imageData error from dilate');
  return fn(imageData, template, 'dilate');
};

exports.dilate = dilate;