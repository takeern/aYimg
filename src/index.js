/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
const debug = require('debug')('aYimg:index')// eslint-disable-line
import init from './lib/init'

//proccing
import grayScaleFn from './lib/grayScale/index'
import binary from './lib/binary/binary'
import { erosive, dilate } from './lib/binary/erosive'
import sharpen from './lib/sharpening'

const clothes = function (fn) {
  return fn(aYimg.imageData, ...[ ...arguments ].slice(1, arguments.length))
}

//todo use Proxy to do things like midellware 
const aYimg = { 
  canvas: '',
  ctx:'',
  init: false,
  queue: [],
  imageData:'',
  copyData: [],
}

const pro = init('http://localhost:8000/src/assets/patch.jpeg')
  .then((ca) => {
    aYimg.init = true
    aYimg.canvas = ca 
    return ca
  })
  .then((ca) => {
    document.getElementsByTagName('body')[0].appendChild(ca)
    const ctx = ca.getContext('2d')
    ctx.imageSmoothingEnabled = true
    aYimg.ctx = ctx
    aYimg.imageData = ctx.getImageData(0, 0, ca.width, ca.height)

    //test
    const div = document.createElement('div')
    aYimg.canvas.addEventListener('mousemove', () => {
      document.querySelector('body').appendChild(div)
      pick(div)
    })
  })
  // .catch(e => console.warn(e, 'init'))

pro.then(() => {
  clothes(grayScaleFn, 'avg')
})
.then(() => {
  clothes(binary)
})
.then(() => {
  clothes(erosive, 1)
})
.then(() => {
  clothes(erosive, 1)
})
.then(() => {
  clothes(erosive, 1)
})
.then(() => {
  clothes(dilate, 1)
})
.then(() => {
  clothes(sharpen, 'sobel')
})
.then(() => {
  const { imageData, ctx } = aYimg
  debug(imageData)
  debug('put image data')
  ctx.putImageData(imageData, 0, 0)
})
// .catch(e => console.warn(e.message, 'from proccing eeror'))

const pick = function (showPiex) {
  const { layerX : x, layerY : y } = event
  const piex = aYimg.ctx.getImageData(x, y, 1, 1)
  const { data } = piex
  const rgba = `rgba(${data[0]},${data[1]},${data[2]},${data[3]/255})`
  showPiex.style.backgroundColor = rgba
  showPiex.textContent = `${rgba} ${x} ${y}`
}

//todo 
// 1 middleware like proxy should done
// 2 change data handle  delete handledata

// test
// const arr = [ 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0 ]
// const op = []
// for (let i = 0; i < arr.length; i++) {
//   const a = new Array(4).fill(arr[i])
//   op.push(...a)
// }
// debug('123', op)
// op.width = 6
// const tsData = {
//   width: 6,
//   data: op,
// }
// const data1 = erosive(tsData, 4)
// const copyData = []
// for (let i = 0; i < data1.length; i+=4) {
//   copyData.push(data1[i]) 
// }
// debug('copydata', copyData)
