import { isImageData, copyImageData } from '../ulit'
import fiter from './fiter'

/**
 * 图像滤波算法
 * @param imageData 需要处理的imagedata
 * @param code 选取对应的fiter算法
 */
export default function(imageData:ImageData, code: string = 'knn'): ImageData {
  if(!isImageData(imageData)) throw new Error('get imageData error from fiter')
  const { data } = imageData
  const copyData = copyImageData(data)
  const logData = fiter(<Uint8ClampedArray>copyData, imageData, code)
  return logData
}