const isImageData = (s) => {
  return Object.prototype.toString.call(s) === '[object ImageData]'
}

const isArray = (s) => {
  return Object.prototype.toString.call(s) === '[object Array]'
}

const isString = (s) => {
  return Object.prototype.toString.call(s) === '[object String]'
}

function deepcopy(obj) {
  let out = [], i = 0, len = obj.length
  for (; i < len; i++) {
    if (obj[i] instanceof Array) {
      out[i] = deepcopy(obj[i])
    }
    else out[i] = obj[i]
  }
  return out
}

const dataFromCopy = (imageData, copyData) => {
  if(!isImageData(imageData)) throw new Error ('get imageData error from dataFromCopy')
  const { data } = imageData
  const { length } = copyData
  const len = copyData[1].length
  for(let y = 0; y < length; y++) { 
    for(let x = 0; x < len; x++) {
      const index = (y * len + x) 
      data[ index * 4 ] = copyData[y][x]
      data[ index * 4 + 1 ] = copyData[y][x]
      data[ index * 4 + 2 ] = copyData[y][x]
    }
  }
}

const testPix = (canvas, ctx) => {
  const div = document.createElement('div')
  canvas.addEventListener('mousemove', () => {
    document.querySelector('body').appendChild(div)
    pick(div)
  })
  const pick = function (showPiex) {
    const { layerX : x, layerY : y } = event
    const piex = ctx.getImageData(x, y, 1, 1)
    const { data } = piex
    const rgba = `rgba(${data[0]},${data[1]},${data[2]},${data[3]/255})`
    showPiex.style.backgroundColor = rgba
    showPiex.textContent = `${rgba} ${x} ${y}`
  }
}

const copyImageData = (data) => {
  return isArray(data) ? Array.from(data) :new Uint8ClampedArray(data) 
}

const copyImage = (imageData) => {
  return new ImageData(
    new Uint8ClampedArray(imageData.data),
    imageData.width,
    imageData.height
  )
}
export {
  isImageData,
  isArray,
  dataFromCopy,
  isString,
  deepcopy,
  copyImageData,
  testPix,
  copyImage,
}