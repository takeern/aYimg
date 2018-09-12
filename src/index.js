/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
const debug = require('debug')('aYimg:index')// eslint-disable-line
import { initImg } from './lib/init'
//proccing
import grayScale from './lib/grayScale/index'
import binary from './lib/binary/binary'
import fiter from './lib/fiter/index'
import { erosive, dilate } from './lib/binary/erosive'
import reflect from './lib/reflect/index' 
import sharpen from './lib/sharpening'

const opening = (imageData, times = 1, template = 1) => {
  let data
  for(let i = 0; i < times; i++) {
    data = dilate(erosive(imageData, template), template)
  }
  return data
}

const closing = (imageData, times = 1, template = 1) => {
  let data
  for(let i = 0; i < times; i++) {
    data = erosive(dilate(imageData, template), template)
  }
  return data
}

const Ayimg = class {
  constructor () {
    this.imgComplete = false
    this.ctx = null
    this.imageData = null
    this.canvas = null
  }
  async init (imgObj, width, height) {
    await initImg.bind(this)(imgObj, width, height)
    // return this
  }
  grayScale (code = 'weight') {
    grayScale(this.imageData, code)
    return this
  }
  binary (code = 'otsu') {
    binary(this.imageData, code)
    return this
  }
  erosive (times = 1, template = 1) {
    for(let i = 0; i < times; i++) {
      erosive(this.imageData, template)
    }
    return this
  }
  dilate (times = 1, template = 1) {
    for(let i = 0; i < times; i++) {
      dilate(this.imageData, template)
    }
    return this
  }
  opening (times = 1, template = 1) {
    for(let i = 0; i < times; i++) {
      dilate(erosive(this.imageData, template), template)
    }
    return this
  } 
  closing (times, template = 1) {
    for(let i = 0; i < times; i++) {
      erosive(dilate(this.imageData, template), template)
    }
    return this
  }
  sharpen (code = 'sobel') {
    sharpen(this.imageData, code)
    return this
  }
  reflect () {
    const { ctx } = this
    const [ relectData, xBorder, yBorder ] = reflect(this.imageData, 'y') //eslint-disable-line
    for (let i = 0; i < yBorder.length; i++) {
      ctx.strokeStyle = 'green'
      ctx.strokeRect(parseInt(xBorder[i].start / 2), parseInt(yBorder[i].start / 2), parseInt(xBorder[i].width / 2), parseInt(yBorder[i].width / 2))
    }
    return this
  } 
  fiter (code = 'knn') {
    fiter(this.imageData, code)
    return this
  }
  show () {
    const { ctx, imageData } = this
    ctx.putImageData(imageData, 0, 0)
    return this
  }
}

const ayimg1 = new Ayimg ()

ayimg1.init('http://localhost:8000/src/assets/patchEasy.jpeg').then(() => {
  ayimg1.grayScale().binary('avg').opening().erosive(3).show().reflect()
})

export default Ayimg

export {
  grayScale,
  binary,
  fiter,
  reflect,
  sharpen,
  erosive,
  dilate,
  opening,
  closing,
}






