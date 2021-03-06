import { isImageData, copyImageData } from '../ulit'
import { log10 } from '../math'
// const debug = require('debug')('aYimg:sharpening')

export default function (imageData: ImageData, code: string = 'sobel'): ImageData {
  if (!isImageData(imageData)) throw new Error('get imageData error from sharpening')
  const { data, width } = imageData
  const len: number = data.length - width * 4
  const copyData = copyImageData(data)
  switch (code) {
    case 'priwitt' : {
      for(let i = width * 4; i < len; i += 4) {
        const x = (i / 4) % width
        if(x !== 0 && x !== (width - 1)) {
          const Gx: number = copyData[i + 4 * (width - 1)] + copyData[i + 4 * width] + copyData[i + 4 * (width + 1)] - copyData[i - 4 * (width + 1)] - copyData[i - 4 * width] - copyData[i - 4 * (width - 1)]
          const Gy: number = copyData[i - 4 * (width - 1)] + copyData[i + 4] + copyData[i + 4 * (width + 1)] - copyData[i - 4 * (width + 1)] - copyData[i - 4] - copyData[i + 4 * (width - 1)]
          const operator: number = Math.round(Math.sqrt(Math.pow(Gx, 2)+ Math.pow(Gy, 2)))
          data [i] = operator
          data [i + 1] = operator
          data [i + 2] = operator
        }
      }
      break
    }
    case 'sobel' : {
      for(let i = width * 4; i < len; i += 4) {
        const x = (i / 4) % width
        if(x !== 0 && x !== (width - 1)) {
          const Gx: number = copyData[i + 4 * (width - 1)] + 2 * copyData[i + 4 * width] + copyData[i + 4 * (width + 1)] - copyData[i - 4 * (width + 1)] - 2 * copyData[i - width * 4] - copyData[i - 4 * (width - 1)]
          const Gy: number = copyData[i + 4 * (1 - width)] + 2 * copyData[i + 4] + copyData[i + 4 * (width + 1)] - copyData[i - 4 * (width + 1)] - 2 * copyData[i - 4] - copyData[i + 4 * (width - 1)]
          const operator: number = Math.round(Math.sqrt(Math.pow(Gx, 2)+ Math.pow(Gy, 2)))
          data [i] = operator
          data [i + 1] = operator
          data [i + 2] = operator
        }
      }
      break
    }
    case 'roberts' : {
      for(let i = width * 4; i < len; i += 4) {
        const x = (i / 4) % width
        if(x !== 0 && x !== (width - 1)) {
          const operator: number = Math.abs(copyData[i] - copyData[i + 4 * (width + 1)]) + Math.abs(copyData[i + 4] - copyData[i + 4 * width])
          data [i] = operator
          data [i + 1] = operator
          data [i + 2] = operator
        }
      }
      break
    }
    case 'wallis' : {
      for(let i = width * 4; i < len; i += 4) {
        const x = (i / 4) % width
        if(x !== 0 && x !== (width - 1)) {
          const operator: number = 46 * (4 * log10(copyData[i] + 1) - ( log10(copyData[i - 4] + 1) + log10(copyData[i + 4] + 1) + log10(copyData[i - 4 * width]+ 1) + log10(copyData[i + 4 * width] + 1) )) // eslint-disable-line
          data [i] = operator 
          data [i + 1] = operator 
          data [i + 2] = operator  
        }
      }
      break
    }
    default : throw new Error (`code = ${code} is undefined form sharpening`)
  } 
  return imageData
}