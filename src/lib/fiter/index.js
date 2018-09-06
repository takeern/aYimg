import { isImageData, copyImageData } from '../ulit'
import fiter from './fiter'
// const debug = require('debug')('aYimg:fiter')

export default (imageData, code) => {
  if(!isImageData(imageData)) throw new Error('get imageData error from fiter')
  const { data } = imageData
  const copyData = copyImageData(data)
  const logData = fiter(copyData, imageData, code)
  return logData
}