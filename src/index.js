/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
const debug = require('debug')('aYimg:index')// eslint-disable-line

import { copyImage } from './lib/ulit'
import { initImg } from './lib/init'
import { fnMemory, fnInit } from './lib/memory'
//proccing
import grayScale from './lib/grayScale/index'
import binary from './lib/binary/binary'
import fiter from './lib/fiter/index'
import { erosive, dilate } from './lib/binary/erosive'
import reflect from './lib/reflect/index' 
import sharpen from './lib/sharpening'

const Ayimg = class {
  constructor () {
    this.imgComplete = false
    this.ctx = null
    this.imageData = null
    this.canvas = null
    this.memory = []
    this.path = ''
    // this
  }
  async init (imgObj, el) {
    await initImg.bind(this)(imgObj, el)
    return this
  }
  grayScale (code = 'weight') {
    if(this.fnInit('grayScale', code)) return this
    grayScale(this.imageData, code)
    this.fnMemory()
    return this
  }
  binary (code = 'otsu') {
    if(this.fnInit('binary', code)) return this
    binary(this.imageData, code)
    this.fnMemory()
    return this
  }
  erosive (times = 1, template = 1) {
    for(let i = 0; i < times; i++) {
      if(this.fnInit('erosive', template)) continue
      erosive(this.imageData, template)
      this.fnMemory()
    }
    return this
  }
  dilate (times = 1, template = 1) {
    for(let i = 0; i < times; i++) {
      if(this.fnInit('dilate', template)) continue
      dilate(this.imageData, template)
      this.fnMemory()
    }
    return this
  }
  opening (times = 1, template = 1) {
    for(let i = 0; i < times; i++) {
      if(this.fnInit('opening', template)) return this
      dilate(erosive(this.imageData, template), template)
      this.fnMemory()
    }
    return this
  } 
  closing (times, template = 1) {
    for(let i = 0; i < times; i++) {
      if(this.fnInit('closing', template)) return this
      erosive(dilate(this.imageData, template), template)
      this.fnMemory()
    }
    return this
  }
  sharpen (code = 'sobel') {
    if(this.fnInit('closing', code)) return this
    sharpen(this.imageData, code)
    this.fnMemory()
    return this
  }
  reflect () {
    const { ctx } = this
    const [ relectData, xBorder, yBorder ] = reflect(this.imageData, 'y') //eslint-disable-line
    for (let i = 0; i < yBorder.length; i++) {
      ctx.strokeStyle = 'green'
      //todo add new canvas to show it
      ctx.strokeRect(parseInt(xBorder[i].start / 2), parseInt(yBorder[i].start / 2), parseInt(xBorder[i].width / 2), parseInt(yBorder[i].width / 2))
    }
    return this
  } 
  fiter (code = 'knn') {
    if(this.fnInit('fiter', code)) return this
    fiter(this.imageData, code)
    this.fnMemory()
    return this
  }
  show () {
    const { ctx, imageData } = this
    ctx.putImageData(imageData, 0, 0)
    return this
  }
  reload () {
    this.imageData = copyImage(this.initData)
    this.path = ''
    return this
  }
  fnInit (fnName, code) {
    return fnInit.bind(this)(fnName, code)
  }
  fnMemory () {
    return fnMemory.bind(this)()
  }
}

// export default Ayimg

const ayimg = new Ayimg()

ayimg.init('./src/assets/patch.jpeg', document.querySelector('#showChart')).then((m) => {
  m.grayScale('avg').binary().erosive(4)
  m.reload().grayScale('avg').binary().erosive(2).show()
  debug(m)
})
// debug(obj.imageData)
