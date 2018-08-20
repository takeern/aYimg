const debug = require('debug')('aYimg:init')

//获取图片分辨率
const DPR = () => {
  const scale = 2
  if (window.devicePixelRatio && window.devicePixelRatio > 1) {
    return window.devicePixelRatio
  }
  return scale
}

const isString = (s) => {
  return Object.prototype.toString.call(s) === '[object String]'
}

//new canvas then push
const initCanvas = (img, width, height) => {
  if(img.nodeType !== 1) {
    throw new Error ('canvas初始化失败传入不为img')
  }
  const canvas = document.createElement('canvas')
  const imgWidth = img.width
  const imgHeight = img.height
  const scale = DPR()
  canvas.width = imgWidth * scale
  canvas.height = imgHeight * scale
  canvas.style.width = width + 'px'
  canvas.style.height = height + 'px'
  const ctx = canvas.getContext('2d')
  ctx.scale(scale, scale)
  ctx.drawImage(img, 0, 0)
  return canvas
}

//judgment img parma
export default (imgObj, width, height) => {
  return new Promise ((resolve) => {
    const img = new Image()
    img.setAttribute('crossOrigin', 'Anonymous')
    if(isString(imgObj)) {
      img.src = imgObj
    }else if(imgObj && imgObj.nodeType === 1) {
      img.src = imgObj.src
    }else {
      throw new Error('解析img失败') 
    }
    img.onload = () => {
      width = width || img.width
      height = height || img.height
      const canvas = initCanvas(img, width, height)
      debug('canvas init success')
      resolve(canvas)
    }
  })
}