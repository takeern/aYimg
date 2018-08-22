const isImageData = (s) => {
  return Object.prototype.toString.call(s) === '[object ImageData]'
}

const isArray = (s) => {
  return Object.prototype.toString.call(s) === '[object Array]'
}

const isString = (s) => {
  return Object.prototype.toString.call(s) === '[object String]'
}

const toDobuleArray = (imageData, canvas) => {
  const { data } = imageData
  let pix = []
  const copyData = []
  for(let i = 0; i < data.length; i += 4) {
    pix.push(data[i])
    if((i / 4 + 1) % canvas.width === 0) {
      copyData.push(pix)
      pix = []
    }
  }
  return copyData
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
  copyData = copyData.reduce(
    (acc, cur) => acc.concat(cur)
  )
  copyData.map((item, index) => { //eslint-disable-line
    data[ index * 4 ] = item
    data[ index * 4 + 1 ] = item
    data[ index * 4 + 2 ] = item
  })
}



export {
  isImageData,
  toDobuleArray,
  isArray,
  dataFromCopy,
  isString,
  deepcopy,
}