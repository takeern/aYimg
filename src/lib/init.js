const debug = require('debug')('aYimg:init')
import { copyImage } from './ulit'
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
export const initCanvas = function (img, el) {
  if(img.nodeType !== 1) {
    throw new Error ('canvas初始化失败传入不为img')
  }
  const width = (el && el.style.width)|| img.width + 'px'
  const height = (el &&el.style.height) || img.height + 'px'
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
  this.initData = copyImage(this.imageData)
  this.imageName = this.imageName ? this.imageName++ : 1
  const item = {
    src: this.imgSrc,
    items: [],
  }
  this.memory.push(item)
  el && el.appendChild(canvas)
  debug('canvas init success')
}

//judgment img parma

export const initImg = function (imgObj, el) {
  return new Promise((resolve) => {
    const img = new Image()
    img.setAttribute('crossOrigin', 'Anonymous')
    if(isString(imgObj)) {
      img.src = imgObj
      this.imgSrc = imgObj
    }else if(imgObj && imgObj.nodeType === 1) {
      img.src = imgObj.src
      initCanvas.bind(this)(imgObj, el)
      resolve()
    }else {
      throw new Error('解析img失败') 
    }
    img.onload =() => {
      initCanvas.bind(this)(img, el)
      resolve()
    }
  })
}

