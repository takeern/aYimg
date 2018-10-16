


/**
 * 获取image垂直方向像素累计投影
 * @param imageData 需要处理的imagedata
 */
function relectY (imageData: ImageData): number[]{
  const { width, height, data } = imageData
  const Yarr: number[] = new Array(width).fill(0)
  for (let y = 0; y < height; y++) {
    const py: number = width * y
    for(let x = 0; x < width; x++) {
      if(data[(py + x) * 4] !== 255) {
        Yarr[x] += 1
      }
    }
  }
  return Yarr
}

/**
 * 获取该投影图中峰的高度，起点，终点，宽度
 * @param arr 水平或垂直方向投影图
 * @param fiterPix 设定峰起点pix投影积累
 * @param fiterMax 筛选噪音投影积累低于该值会忽视次峰
 * @param fiterWidth 峰宽度低于该值会忽略
 */
function getYborder(arr:number[], fiterPix:number = 0, fiterMax: number = 10, fiterWidth: number = 10): any[] {
  let command: boolean = true //false meaning start pix will add
  const key: any[] = []
  let start: number, end: number, max: number = 0
  const len: number = arr.length -1
  for (let i = 1; i < len; i++) {
    if(arr[i] - arr[i - 1] > 0 && arr[i] - arr[i + 1] > 0 && arr[i] > max) {
      max = arr[i]
    }
    if(arr[i] === fiterPix) {
      if (command && arr[i + 1] - arr[i] > 0) {
        start = i
        command = false
      } else if (!command && arr[i] - arr[i - 1] < 0) {
        end = i 
        command = true
        if (max > fiterMax && (end - start) > fiterWidth) {
          key.push({
            start,
            end,
            width : end - start,
            max,
          })
        }
        max = 0
      }
    }
  }
  return key 
}

/**
 * 获取水平投影
 * @param imageData 需要处理的imagedata
 * @param xBorder 指定需要水平投影的起点终点
 */
function relectX (imageData: ImageData, xBorder: any[]): number[][] {
  const { width, height, data } = imageData
  const Yarrs: number[][] = []
  for (let i = 0; i < xBorder.length; i++) {
    const { start, end } = xBorder[i]
    const Yarr = new Array(height).fill(0)
    for (let y = 0; y < height; y++) {
      const py = width * y
      let sum = 0
      for (let x = start; x <= end; x++) {
        if (data[(py + x) * 4] !== 255) {
          sum += 1
        }
      }
      Yarr[y] = sum
    }
    Yarrs.push(Yarr)
  }
  return Yarrs
}

/**
 * 对x方向进行筛选
 * @param item 需要处理峰数据 
 * @param fiterHeight 筛选峰高度
 */
function fiterBorder (item, fiterHeight = 10): any[]{
  if (item.length === 1) return item
  const newBorder: any[] = [ item[0] ]
  for (let i = 1, len = item.length; i < len; i++) {
    if (item[i].start - newBorder[newBorder.length].end < fiterHeight) {
      newBorder[newBorder.length].end = item[i].end
      newBorder[newBorder.length].width += item[i].width
    } else {
      newBorder.push(item)
    }
  }
  if (newBorder.length === 1) return newBorder
  let index: number = 0, max: number = newBorder[0].width
  for (let i = 0, len = newBorder.length; i < len; i++) {
    if (newBorder[i].width > max) {
      index = i
    }
  }
  return newBorder[index]
}

export {
  relectY,
  fiterBorder,
  relectX,
  getYborder
}