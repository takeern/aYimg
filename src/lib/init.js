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
export const initCanvas = function (el, img) {
  if(img.nodeType !== 1) {
    throw new Error ('canvas初始化失败传入不为img')
  }
  const width = el.style.width || img.width + 'px'
  const height = el.style.height || img.height + 'px'
  const canvas = document.createElement('canvas')
  const imgWidth = img.width
  const imgHeight = img.height
  const scale = DPR()
  canvas.width = imgWidth * scale
  canvas.height = imgHeight * scale
  canvas.style.width = width
  canvas.style.height = height
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = true
  ctx.scale(scale, scale)
  ctx.drawImage(img, 0, 0)
  this.canvas = canvas
  this.ctx = ctx
  this.imgComplete = true
  this.imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  el.appendChild(canvas)
  debug('canvas init success')
}

//judgment img parma

export const initImg = function (el, imgObj) {
  return new Promise((resolve) => {
    const img = new Image()
    img.setAttribute('crossOrigin', 'Anonymous')
    if(isString(imgObj)) {
      img.src = imgObj
    }else if(imgObj && imgObj.nodeType === 1) {
      initCanvas.bind(this)(el, imgObj)
      resolve()
    }else {
      throw new Error('解析img失败') 
    }
    img.onload =() => {
      debug('jere')
      initCanvas.bind(this)(el, img)
      resolve()
    }
  })
}

