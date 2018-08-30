/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
const debug = require('debug')('aYimg:index')// eslint-disable-line
import init from './lib/init'

//proccing
import grayScaleFn from './lib/grayScale/index'
import binary from './lib/binary/binary'
import { toDobuleArray, dataFromCopy } from './lib/ulit'


//test

import { erosive, dilate } from './lib/binary/erosion'
// import { opening } from './lib/binary/index'
// const copyData = [
//   [ 0, 1, 0, 1, 0, 0 ],
//   [ 0, 1, 1, 0, 1, 0 ],
//   [ 0, 0, 1, 0, 0, 0 ],
//   [ 0, 0, 1, 1, 0, 0 ],
//   [ 0, 0, 0, 0, 0, 0 ],
// ]

// const template = [
//   [ 1, 1, 1, 1, 1 ],
//   [ 1, 1, 1, 1, 1 ],
//   [ 1, 1, 1, 1, 1 ],
//   [ 1, 1, 1, 1, 1 ],
//   [ 1, 1, 1, 1, 1 ],
// ]

// debug(dilate(copyData, template), 'erosion')

//test


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
  const { canvas, imageData } = aYimg
  const copyData = toDobuleArray(imageData, canvas)
  debug(copyData)
  return copyData
})



// .then((copyData) => {
//   const data = opening(copyData, 1)
//   return data
// })


.then((copyData) => {
  const data = erosive(copyData, 1)
  return data
})
.then((copyData) => {
  const data = erosive(copyData, 1)
  return data
})
.then((copyData) => {
  const data = erosive(copyData, 1)
  return data
})
.then((copyData) => {
  const data = dilate(copyData, 3)
  return data
})
// .then((copyData) => {
//   const data = erosive(copyData, 4)
//   return data
// })
// .then((data) => {
//   const { canvas, imageData } = aYimg
//   // debug(data)
//   dataFromCopy(imageData, data)
//   // debug(imageData)
// })
.then((data) => {
  const { imageData, ctx } = aYimg
  dataFromCopy(imageData, data)
  debug('put image data')
  ctx.putImageData(imageData, 0, 0)
})
// .catch(e => console.warn(e.message, 'from proccing eeror'))


const pick = function (showPiex) {
  const { layerX : x, layerY : y } = event
  const piex = aYimg.ctx.getImageData(x, y, 1, 1)
  const { data } = piex
  const rgba = `rgba(${data[0]},${data[1]},${data[2]},${data[3]/255})`
  showPiex.style.backgroundColor = rgba;
  showPiex.textContent = `${rgba} ${x} ${y}`
}



//todo 
// 1 middleware like proxy should done
// 2 change data handle  delete handledata