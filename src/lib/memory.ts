import { copyImage } from './ulit'

/**
 * 函数执行前遍历历史查询是否执行过
 * @param fnName 执行的函数的名字
 * @param code 执行函数可能需要的参数code
 */
function fnCheck (fnName:string, code: string|null) {
  this.path += `-${fnName}(${code})`
  let command: boolean = false
  this.memory.find((item) => {
    if(item.src === this.imgSrc) {
      item.items.find((p) => {
        if(p.path === this.path) {
          this.imageData = p.imageData
          command = true
          // debug('读取缓存')
          return true
        }
        return false
      })
    }
    return false
  })
  return command
}
/**
 * 执行后图像处理算法的imagedata，存储到memory
 */
function fnMemory ():void {
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
  fnCheck,
  fnMemory
}