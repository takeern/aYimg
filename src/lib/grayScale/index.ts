import { isImageData } from '../ulit'

export default function grayScale (imageData: ImageData, code:string):ImageData {
  if(!isImageData(imageData)) throw new Error('get imageData error from grayScale')
  const { data } = imageData
  const len :number = data.length
  for (let i = 0; i < len; i += 4 ) {
    let grad: number;
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
      default: {
        throw new Error(`can not reslove imageData code = ${code} error from grayScale`)
      }
    }
    data[i] = grad
    data[i + 1] = grad
    data[i + 2] = grad
  }
  return imageData
}