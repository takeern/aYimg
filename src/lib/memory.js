import { copyImage } from './ulit'
const debug = require('debug')('aYimg:memory')// eslint-disable-line

const fnInit = function (fnName, code) {
  this.path += `-${fnName}(${code})`
  let command = false
  this.memory.find((item) => {
    if(item.src === this.imgSrc) {
      item.items.find((p) => {
        if(p.path === this.path) {
          this.imageData = copyImage(p.imageData)
          command = true
          debug('读取缓存')
          return true
        }
        return false
      })
    }
    return false
  })
  return command
}

const fnMemory = function () {
  this.memory.find((item) => {
    if(item.src === this.imgSrc) {
      item.items.push({
        path: this.path,
        imageData: copyImage(this.imageData),
      })
      return true
    }
    return false
  })
}

export {
  fnMemory,
  fnInit,
}