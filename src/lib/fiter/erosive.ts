import { isImageData, isArray, copyImageData } from '../ulit'

/**
 * 选择fiter模版
 * @param code code对应到模版
 */
function getTemplate (code:number): number[][] {
  let template: number[][]
  switch(code) {
    case(1): {
      template = [
          [ 1, 1, 1 ],
          [ 1, 1, 1 ],
          [ 1, 1, 1 ],
      ]
      break
    }
    case(2): {
      template = [
          [ 0, 1, 0 ],
          [ 1, 1, 1 ],
          [ 0, 1, 0 ],
      ]
      break
    }
    case(3): {
      template = [
          [ 0, 1, 0 ],
          [ 1, 1, 0 ],
          [ 0, 0, 0 ],
      ]
      break
    }
    case(4): {
      template = [
          [ 0, 1, 0 ],
          [ 0, 1, 1 ],
          [ 0, 0, 0 ],
      ]
      break
    }
    case(5): {
      template = [
          [ 0, 0, 0 ],
          [ 0, 1, 1 ],
          [ 0, 1, 0 ],
      ]
      break
    }
    case(6): {
      template = [
          [ 0, 0, 0 ],
          [ 1, 1, 0 ],
          [ 0, 1, 0 ],
      ]
      break
    }
    default:throw new Error('get template code error')
  }
  return template
}

/**
 * 将模版转化为一维，方便处理
 * @param template 需要处理的二维数组模版
 */
const remberCode = (template: number[][]): any[]=> {
  const height: number = template.length
  const width: number = template[0].length
  const checkCode: any[] = []
  for(let y = 0; y < height; y++) {
    for(let x = 0; x < width; x++) {
      if(template[y][x] === 1) {
        const px: number = x - parseInt((width / 2).toString());
        const py: number = y - parseInt((height / 2).toString());
        checkCode.push({
          x: px,
          y: py,
        })
      }
    }
  }
  return checkCode
}

/**
 * 对对应i出的像素，用腐蚀算法处理
 * @param data imagedata.data
 * @param i 遍历data索引
 * @param checkCode 对应的fiter模版
 * @param width imagedata的width
 */
function checkEr (data: Uint8ClampedArray, i: number, checkCode: any[], width: number): number {
  const { length } = checkCode
  for(let x = 0; x < length; x++) {
    if(data[i + (width * checkCode[x].y + checkCode[x].x) * 4] !== 0) {
      return 255
    }
  }
  return 0
}

/**
 * 对对应i出的像素，用膨胀算法处理
 * @param data imagedata.data
 * @param i 遍历data索引
 * @param checkCode 对应的fiter模版
 * @param width imagedata的width
 */
function checkDi (data: Uint8ClampedArray, i: number, checkCode: any[], width: number): number {
  const { length } = checkCode
  for(let x = 0; x < length; x++) {
    if(data[i + (width * checkCode[x].y + checkCode[x].x) * 4] === 0) {
      return 0
    }
  }
  return 255
}

/**
 * 对图像进行腐蚀或膨胀处理
 * @param imageData 需要处理图像的imagedata
 * @param template 算法处理对应的模版
 * @param code 选择腐蚀算法或膨胀算法
 */
function fn (imageData: ImageData, template: number | number[][] , code:string):ImageData {
  let tWidth, tHeight
  if(isArray(template)) {
    template = template as number[][]
    tHeight = template.length
    if(tHeight !== 0) tWidth = template[0].length  
    else throw new Error ('template is error')
  }else if(!isNaN(<number>template)) {
    template = template as number
    template = getTemplate(template)
    tWidth = 3
    tHeight = 3
  }else{
    throw new Error('get template error')
  }
  template = template as number[][] 
  const { data, width } = imageData
  const copyData = copyImageData(data)
  const checkCode: any[] = remberCode(template)
  const len: number = data.length - width * 4 * (tHeight - 1) / 2
  const start: number = 4 * width * (tWidth - 1) / 2
  if (code === 'erosive') {
    for (let i = start; i < len; i += 4) {
      const x:number = i % (width * 4)
      if (x !== 0 && data[i] === 0) {
        const operator = checkEr (<Uint8ClampedArray>copyData, i, checkCode, width)
        data [i] = operator 
        data [i + 1] = operator 
        data [i + 2] = operator  
      }
    }
  } else if (code === 'dilate') {
    for (let i = start; i < len; i += 4) {
      const x:number = i % (width * 4)
      if (x !== 0 && data[i] !== 0) {
        const operator = checkDi (<Uint8ClampedArray>copyData, i, checkCode, width)
        data [i] = operator 
        data [i + 1] = operator 
        data [i + 2] = operator  
      }
    }
  }
  return imageData
}

/**
 * 对图像进行腐蚀
 * @param imageData 需要处理的imagedata
 * @param template 选择腐蚀需要的模版
 */
function erosive (imageData: ImageData, template: number | number[][]) :ImageData{
  if (!isImageData(imageData)) throw new Error('get imageData error from erosive')
  return fn(imageData, template, 'erosive')
}

/**
 * 对图像进行膨胀
 * @param imageData 需要处理的imagedata
 * @param template 选择膨胀需要的模版
 */
function dilate (imageData: ImageData, template: number | number[][]) :ImageData{ 
  if (!isImageData(imageData)) throw new Error('get imageData error from dilate')
  return fn(imageData, template, 'dilate')
}

export {
  erosive,
  dilate,
}