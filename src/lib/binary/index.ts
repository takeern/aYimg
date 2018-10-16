import { isImageData } from '../ulit'

/**
 * 图像二值化
 * @param imageData 需要处理的imagedata
 * @param code 对应算法的code
 * @param ptile 双谷峰算法对应的值，目标在整张图中所占比例
 */
export default function (imageData: ImageData, code: string = 'otsu', ptile: number|string = 0.5):ImageData {
  if(!isImageData(imageData)) throw new Error('get imageData error from binary');
  const { data } = imageData;
  let threshold: number;
  switch(code) {
    //大津法 二值化
    case 'otsu': {
      //平均像素值
      let piexAvg:number = 0  
      let Max:number = 0, i:number;
      for(i = 0; i < data.length; i += 4) {
        piexAvg += data[i]
      }
      piexAvg = piexAvg / i * 4
      for(let j = 0; j < 256 ; j++) { //eslint-disable-line
        let w0: number = 0
        let w1: number = 0
        let u0: number = 0
        let u1: number = 1
        for(let i: number = 0; i < data.length; i += 4) {
          if(data[i] > j) {
            w0 += 1
            u0 += data[i]
          }else {
            w1 += 1
            u1 += data[i]
          }
        }
        u0 = u0 / w0
        u1 = u1 / w1
        w0 = w0 / data.length * 4
        w1 = w1 / data.length * 4
        let g: number = w0 * w1 *(u0 - u1)*(u0 - u1)
        if(g > Max) {
          Max = g
          threshold = j 
        }
      }
      break
    }
    //灰度平均值法 二值话
    case 'avg': {
      let sum = 0
      for(let i = 0; i < data.length; i += 4) {
        sum += data[i]
      }
      threshold = sum * 4 / data.length 
      break
    }
    //均值双谷峰法 二值化
    case 'ptile': {
      ptile = parseFloat((<string>ptile))//eslint-disable-line
      if(isNaN(ptile)) console.warn('ptlie error ')//eslint-disable-line
      let max: number[] = new Array(255).fill(0)
      for (let i: number = 0; i < data.length; i += 4) {
        if (max[data[i]]) {
          max[data[i]] += 1
        } else {
          max[data[i]] = 1
        }
      }
      let k: number = ptile * data.length / 4
      let sum: number = 0
      for(let i = 0; i < max.length; i++) {
        if(sum > k) {
          threshold = i
          break
        }else {
          sum += max[i]
        }
      }
      break
    }
    default: {
      throw new Error ('binary can not handle code')
    }
  }
  for (let i = 0; i < data.length; i += 4) {
    if(data[i] < threshold) {
      data[i] = 0
      data[i + 1] = 0
      data[i + 2] = 0
    }else{
      data[i] = 255
      data[i + 1] = 255
      data[i + 2] = 255
    }
  }
  return imageData
}