import { byAsc, absByAsc, arrSum } from '../math'

/**
 * 图像滤波算法
 * @param copyData 复制的imagedata 副本
 * @param imageData 需要处理的iamgedata
 * @param code 选择对应的fiter算法
 */
export default function (copyData: Uint8ClampedArray, imageData: ImageData, code: string = 'knnA'): ImageData {
  const { data, width } = imageData
  const { length } = data
  const start: number = (width + 1) * 4
  const checkCode: any[] = []
  for (let x = -2; x < 3; x ++) {
    for(let y = 0; y < 3; y++) {
      if(y === 0 && x <= 0) continue
      checkCode.push({
        x,
        y,
      })
    }
  }
  switch (code) {
    case 'avg' : {
      for (let i = start; i < length; i += 4) {
        const x: number = (i / 4) % width
        if(x !== 0 && x !== (width - 1)) {
          const sum: number = copyData[i - (width + 1) * 4] + copyData[i - 4 * width] + copyData[i - 4 * (width - 1)] + copyData[i - 4] + copyData[i] + copyData[i + 4] + copyData[i + 4 * (width - 1)] + copyData[i + 4 * width] + copyData[i + 4 * (width + 1)]
          const operator: number = sum / 9
          data [i] = operator
          data [i + 1] = operator
          data [i + 2] = operator
        }
      }
      break
    }
    case 'median' : {
      for (let i = start; i < length; i += 4) {
        const x = (i / 4) % width
        if(x !== 0 && x !== (width - 1)) {
          const arr: number[] = [ copyData[i - (width + 1) * 4], copyData[i - 4 * width], copyData[i - 4 * (width - 1)], copyData[i - 4], copyData[i], copyData[i + 4], copyData[i + 4 * (width - 1)], copyData[i + 4 * width], copyData[i + 4 * (width + 1)] ]
          arr.sort(byAsc)
          const operator = arr[4]
          data [i] = operator
          data [i + 1] = operator
          data [i + 2] = operator
        }
      }
      break
    }
    case 'knnA' : {
      const start: number = (2 * width + 1) * 4 
      const end: number = length - width * 4 * 2
      for (let i = start; i < end; i += 4) {
        const x: number = (i / 4) % width
        if(x !== 0 && x !== (width - 1) && x !== 1 && x !== (width - 2)) {
          const arr: number[] = []
          for (let code of checkCode) {
            const first: number = copyData[i - 4 * (width * code.y + code.x)] - copyData[i]
            const ser: number = copyData[i + 4 * (width * code.y + code.x)] - copyData[i]
            arr.push(first)
            arr.push(ser)
          }
          arr.sort(absByAsc)
          const operator: number = arrSum(arr.slice(0, 8)) / 9 + copyData[i]
          data [i] = operator
          data [i + 1] = operator
          data [i + 2] = operator
        }
      }
      break
    }
    case 'knnM' : {
      const start: number = (2 * width + 1) * 4 
      const end: number = length - width * 4 * 2
      for (let i = start; i < end; i += 4) {
        const x: number = (i / 4) % width
        if(x !== 0 && x !== (width - 1) && x !== 1 && x !== (width - 2)) {
          const arr = []
          for (let code of checkCode) {
            const first: number = copyData[i - 4 * (width * code.y + code.x)] - copyData[i]
            const ser: number = copyData[i + 4 * (width * code.y + code.x)] - copyData[i]
            if (Math.abs(first) > Math.abs(ser)) arr.push(ser)
            else arr.push(first)
          }
          arr.sort(absByAsc)
          const slice: number[] = arr.slice(0, 8)
          const operator: number = slice[4] + copyData[i]
          data [i] = operator
          data [i + 1] = operator
          data [i + 2] = operator
        }
      }
      break
    }
    case 'snn' : {
      const start: number = (2 * width + 1) * 4 
      const end: number = length - width * 4 * 2
      for (let i = start; i < end; i += 4) {
        const x: number = (i / 4) % width
        if(x !== 0 && x !== (width - 1) && x !== 1 && x !== (width - 2)) {
          const arr: number[] = []
          for (let code of checkCode) {
            const first: number = copyData[i - 4 * (width * code.y + code.x)] - copyData[i]
            const ser: number = copyData[i + 4 * (width * code.y + code.x)] - copyData[i]
            if (Math.abs(first) > Math.abs(ser)) arr.push(ser)
            else arr.push(first)
          }
          const operator: number = copyData[i] + arrSum(arr) / 12 //eslint-disable-line
          data [i] = operator
          data [i + 1] = operator
          data [i + 2] = operator
        }
      }
      break
    }
    default: throw new Error ('get code error from fiter')  
  }
  return imageData
}