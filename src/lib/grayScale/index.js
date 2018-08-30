const debug = require('debug')('aYimg:grayscale')
import { isImageData } from '../ulit'


export default (imageData, code) => {
  if(!isImageData(imageData)) throw new Error('get imageData error from grayScale')
  const { data } = imageData
  for(let i = 0; i < data.length; i += 4) {
    let grad
    switch(code) {
      //平均值灰度
    case 'average': {
      grad = (data[i] + data[i + 1] + data[i + 2] + data[i + 3]) / 3
      break
    }
      //最大值灰度
    case 'max': {
      grad = Math.max(data[i], data[i+1], data[i+2])
      break
    }
      //加权灰度
    case 'weight': {
      grad = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2]//eslint-disable-line
      break
    }
    //默认采用加权灰度
    default: {
      grad = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2]//eslint-disable-line
      break
    }
    }
    data[i] = grad
    data[i + 1] = grad
    data[i + 2] = grad
  }
  debug('grayScale success')
  return imageData
}