/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
const debug = require('debug')('aYimg:index')// eslint-disable-line
import init from './lib/init'

//proccing
import grayScaleFn from './lib/grayScale/index'
import binary from './lib/binary/index'


const clothes = function (fn) {
  return fn(aYimg.imageData, ...[ ...arguments ].slice(1, arguments.length))
}


const aYimg = { 
  canvas: '',
  ctx:'',
  init: false,
  queue: [],
  imageData:'',
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
    aYimg.ctx = ctx
    aYimg.imageData = ctx.getImageData(0, 0, ca.width, ca.height)
  })
  .catch(e => console.warn(e, 'init'))


pro.then(() => {
  clothes(grayScaleFn, 'avg')
})
.then(() => {
  clothes(binary, 'ptile')
})
.then(() => {
  const { imageData, ctx } = aYimg
  debug('put image data')
  ctx.putImageData(imageData, 0, 0)
})
.catch(e => console.warn(e.message, 'from proccing eeror'))

