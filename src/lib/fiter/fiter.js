import { byAsc, absByAsc, arrSum } from '../math'

export default (copyData, imageData, code) => {
  const { data, width } = imageData
  const { length } = data
  const start = (width + 1) * 4
  switch (code) {
  case 'avg' : {
    for (let i = start; i < length; i += 4) {
      const x = i % (width * 4)
      if(x !== 0 && x !== (width - 1) * 4) {
        const sum = copyData[i - (width + 1) * 4] + copyData[i - 4 * width] + copyData[i - 4 * (width - 1)] + copyData[i - 4] + copyData[i] + copyData[i + 4] + copyData[i + 4 * (width - 1)] + copyData[i + 4 * width] + copyData[i + 4 * (width + 1)]
        const operator = sum / 9
        data [i] = operator
        data [i + 1] = operator
        data [i + 2] = operator
      }
    }
    break
  }
  case 'median' : {
    for (let i = start; i < length; i += 4) {
      const x = i % (width * 4)
      if(x !== 0 && x !== (width - 1) * 4) {
        const arr = [ copyData[i - (width + 1) * 4], copyData[i - 4 * width], copyData[i - 4 * (width - 1)], copyData[i - 4], copyData[i], copyData[i + 4], copyData[i + 4 * (width - 1)], copyData[i + 4 * width], copyData[i + 4 * (width + 1)] ]
        arr.sort(byAsc)
        const operator = arr[4]
        data [i] = operator
        data [i + 1] = operator
        data [i + 2] = operator
      }
    }
    break
  }
  case 'knn' : {
    for (let i = start; i < length; i += 4) {
      const x = i % (width * 4)
      if(x !== 0 && x !== (width - 1) * 4) {
        const arr = [ copyData[i - (width + 1) * 4] - copyData[i], copyData[i - 4 * width] - copyData[i], copyData[i - 4 * (width - 1)] - copyData[i], copyData[i - 4] - copyData[i], copyData[i + 4] - copyData[i], copyData[i + 4 * (width - 1)] - copyData[i], copyData[i + 4 * width] - copyData[i], copyData[i + 4 * (width + 1)] - copyData[i] ]
        arr.sort(absByAsc)
        const operator = (arr[0] + arr[1] + arr[2] + arr[3] + arr[4]) / 5 + copyData[i]
        data [i] = operator
        data [i + 1] = operator
        data [i + 2] = operator
      }
    }
    break
  }
  case 'snn' : {
    const start = (2 * width + 1) * 4 
    const checkCode = []
    for (let x = -2; x < 3; x ++) {
      for(let y = 0; y < 3; y++) {
        if(y === 0 && x <= 0) continue
        checkCode.push({
          x,
          y,
        })
      }
    }
    for (let i = start; i < length; i += 4) {
      const x = i % (width * 4)
      if(x !== 0 && x !== (width - 1) * 4 && x !== 1 && x !== (width - 2)) {
        const arr = []
        for (let code of checkCode) {
          const first = copyData[i - 4 * (width * code.y + code.x)] - copyData[i]
          const ser = copyData[i + 4 * (width * code.y + code.x)] - copyData[i]
          if (Math.abs(first) > Math.abs(ser)) arr.push(ser)
          else arr.push(first)
        }
        const operator = copyData[i] + arrSum(arr) / 12 //eslint-disable-line
        data [i] = operator
        data [i + 1] = operator
        data [i + 2] = operator
      }
    }
    break
  }
  default: throw new Error ('get code error from fiter')  
  }
  return data
}