/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
const debug = require('debug')('aYimg:index')// eslint-disable-line
import init from './lib/init'

//proccing
import grayScaleFn from './lib/grayScale/index'
import binary from './lib/binary/binary'
// import { toDobuleArray, dataFromCopy } from './lib/ulit'
// import { erosive, dilate } from './lib/binary/erosion'
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



// //test src majiang //i0.hdslb.com/bfs/activity-plat/static/20180820/4d1b86def27c4b3794e253d0bd1116f0/59ljrrn1nn.png
// //test src person //i0.hdslb.com/bfs/activity-plat/static/20180820/4d1b86def27c4b3794e253d0bd1116f0/q05jnn1oz6.jpeg	
const pro = init('http://localhost:8000/src/assets/timg.jpeg')
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
  clothes(sharpen, 'wallis')
})
.then(() => {
  const { imageData, ctx } = aYimg
  // dataFromCopy(imageData, data)
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

//test
// const arr = [ 3, 3, 3, 3, 3, 3, 8, 7, 6, 3, 3, 6, 0, 5, 3, 3, 7, 8, 4, 3, 3, 8, 3, 3, 3 ]
// const op = []
// for (let i = 0; i < arr.length; i++) {
//   const a = new Array(4).fill(arr[i])
//   op.push(...a)
// }
// debug(op)
// op.width = 5
// const tsData = {
//   width: 5,
//   data: op,
// }
// debug(sharpen(tsData, 'sobel'))
//