import {copyImage, isString, DPR} from './ulit'

/**
 * 解析传入img 
 * @param imgObj 需要处理的img
 * @param el 容器dom
 */
function initImg (imgObj: string|HTMLImageElement, el: HTMLElement) {
  return new Promise((resolve: any) => {
    const img: HTMLImageElement = new Image()
    img.setAttribute('crossOrigin', 'Anonymous')
    if(isString(imgObj)) {
      imgObj = imgObj as string
      img.src = imgObj
      this.imgSrc = imgObj
    }else if(imgObj && (<HTMLImageElement>imgObj).nodeType === 1) {
      imgObj = imgObj as HTMLImageElement
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


/**
 * 初始化配置，canvas
 * @param img 需要处理的img
 * @param el 容器dom
 */
function initCanvas (img: HTMLImageElement, el: HTMLElement) {
  if(img.nodeType !== 1) {
    throw new Error ('canvas初始化失败传入不为img')
  }
  const width: string = (el && el.style.width)|| img.width + 'px'
  const height: string = (el &&el.style.height) || img.height + 'px'
  const canvas: HTMLCanvasElement = document.createElement('canvas')
  const imgWidth: number = img.width
  const imgHeight: number = img.height
  const scale: number = DPR()
  canvas.width = imgWidth * scale
  canvas.height = imgHeight * scale
  canvas.style.width = width
  canvas.style.height = height
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d')
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
}

export default initImg