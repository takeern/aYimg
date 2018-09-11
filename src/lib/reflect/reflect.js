//垂直方向 直方图
export const relectY = (imageData) => {
  const { width, height, data } = imageData
  const Yarr = new Array(width).fill(0)
  for (let y = 0; y < height; y++) {
    const py = width * y
    for(let x = 0; x < width; x++) {
      if(data[(py + x) * 4] !== 255) {
        Yarr[x] += 1
      }
    }
  }
  return Yarr
}
//直方图获取边界谷底
export const getYborder = (arr, fiterPix = 0, fiterMax = 10) => {
  let command = true //false meaning start pix will add
  const key = []
  let start, end, max = 0
  const len = arr.length -1
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
        if (max > fiterMax) {
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
//水平方向投影直方图 多组数据
export const relectX = (imageData, option) => {
  const { width, height, data } = imageData
  const Xarrs = []
  for (let i = 0; i < option.length; i++) {
    const { start, end } = option[i]
    const Xarr = new Array(height).fill(0)
    for (let y = 0; y < height; y++) {
      const py = width * y
      let sum = 0
      for (let x = start; x <= end; x++) {
        if (data[(py + x) * 4] !== 255) {
          sum += 1
        }
      }
      Xarr[y] = sum
    }
    Xarrs.push(Xarr)
  }
  return Xarrs
}
//筛选x方向
export const fiterBorder = (option, fiterHeight = 10) => {
  if (option.length === 1) return option
  const newBorder = [ option[0] ]
  for (let i = 1, len = option.length; i < len; i++) {
    if (option[i].start - newBorder[newBorder.length].end < fiterHeight) {
      newBorder[newBorder.length].end = option[i].end
      newBorder[newBorder.length].width += option[i].width
    } else {
      newBorder.push(option)
    }
  }
  if (newBorder.length === 1) return newBorder
  let index = 0, max = newBorder[0].width
  for (let i = 0, len = newBorder.length; i < len; i++) {
    if (newBorder[i].width > max) {
      index = i
    }
  }
  return newBorder[index]
}