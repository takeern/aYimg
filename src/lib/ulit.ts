interface ArrayConstructor {
  from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): Array<U>;
  from<T>(arrayLike: ArrayLike<T>): Array<T>;
}
/**
 * 判断是不是imagedata 类型
 * @param s 判断出入对象类型
 */
function isImageData (s: any): boolean {
  return Object.prototype.toString.call(s) === '[object ImageData]'
}
/**
 * 判断是不是array 类型
 * @param s 判断出入对象类型
 */
function isArray (s: any): boolean {
  return Object.prototype.toString.call(s) === '[object Array]'
}
/**
 * 判断是不是string 类型
 * @param s 判断出入对象类型
 */
function isString(s: any): boolean {
  return Object.prototype.toString.call(s) === '[object String]'
}
/**
 * 深复制数组
 * @param obj 传入数组
 */
function deepcopy(obj: [any]): any[] {
  let out = [], i = 0, len = obj.length
  for (; i < len; i++) {
    if (obj[i] instanceof Array) {
      out[i] = deepcopy(obj[i])
    }
    else out[i] = obj[i]
  }
  return out
}
/**
 * 深复制数组和图像Uint8ClampedArray
 * @param data 传入的数组或者imagedata.data
 */
function copyImageData (data: Uint8ClampedArray | any[]): Uint8ClampedArray | Array<any>{
  return isArray(data) ? Array.from(data) :new Uint8ClampedArray(data) 
}
/**
 * 深复制iamgedata类型
 * @param imageData ImageData
 */
function copyImage (imageData: ImageData): ImageData{
  if(!isImageData(imageData)) throw new Error ('get imageData error from copyImage')
  return new ImageData(
    new Uint8ClampedArray(imageData.data),
    imageData.width,
    imageData.height
  )
}
/**
 * 获取当前设备dpr
 */
function DPR(): number{
  const scale = 2
  if (window.devicePixelRatio && window.devicePixelRatio > 1) {
    return window.devicePixelRatio
  }
  return scale
}

export {
  DPR,
  copyImage,
  copyImageData,
  deepcopy,
  isString,
  isArray,
  isImageData,
}