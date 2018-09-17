"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dilate = exports.erosive = void 0;

var _ulit = require("../ulit");

// todoChange for ++ => --
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

var checkEr = function checkEr(data, x, y, checkCode) {
  var length = checkCode.length;

  for (var i = 0; i < length; i++) {
    if (data[y + checkCode[i].y][x + checkCode[i].x] !== 0) {
      return 255;
    }
  }

  return 0;
};

var checkDi = function checkDi(data, x, y, checkCode) {
  var length = checkCode.length;

  for (var i = 0; i < length; i++) {
    if (data[y + checkCode[i].y][x + checkCode[i].x] === 0) {
      return 0;
    }
  }

  return 255;
};

var fn = function fn(data) {
  var template = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var command = arguments.length > 2 ? arguments[2] : undefined;
  var width, height;
  var copyData = (0, _ulit.deepcopy)(data);

  if ((0, _ulit.isArray)(template)) {
    height = template.length;
    if (height !== 0) width = template[0].length;else throw new Error('template is error');
  } else if (!isNaN(template)) {
    template = getTemplate(template);
    width = 3;
    height = 3;
  } else {
    throw new Error('get template error');
  }

  var lenH = data.length - parseInt(height / 2);
  var len = data[0].length - parseInt(width / 2);
  var checkCode = remberCode(template);

  if (command === 'erosive') {
    for (var y = parseInt(height / 2); y < lenH; y++) {
      for (var x = parseInt(width / 2); x < len; x++) {
        if (data[y][x] === 0) {
          copyData[y][x] = checkEr(data, x, y, checkCode);
        }
      }
    }
  } else if (command === 'dilate') {
    for (var _y = parseInt(height / 2); _y < lenH; _y++) {
      for (var _x = parseInt(width / 2); _x < len; _x++) {
        if (data[_y][_x] !== 0) {
          copyData[_y][_x] = checkDi(data, _x, _y, checkCode);
        }
      }
    }
  }

  return copyData;
};

var erosive = function erosive(data, template) {
  return fn(data, template, 'erosive');
};

exports.erosive = erosive;

var dilate = function dilate(data, template) {
  return fn(data, template, 'dilate');
}; // const erosived = wrapper(erosive, data, template) 


exports.dilate = dilate;