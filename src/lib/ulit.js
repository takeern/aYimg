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
  const { length } = data
  const { width } = canvas
  for(let i = 0; i < length; i += 4) {
    pix.push(data[i])
    if((i / 4 + 1) % width === 0) {
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


// const wrapper = (fn, data, template) => {
//   const dataType = isImageData(data) ? 'imageData' : 'copyData'
//   const copyData = dataType === 'imageData' ? toDobuleArray(data) : data
//   const handleData = fn(copyData, template)
//   return dataType === 'imageData' ? dataFromCopy(data, handleData) : handleData
// }



export {
  isImageData,
  toDobuleArray,
  isArray,
  dataFromCopy,
  isString,
  deepcopy,
}