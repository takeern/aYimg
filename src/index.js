const debug = require('debug')('aYimg:index')// eslint-disable-line
import init from './lib/init'



// //test src majiang //i0.hdslb.com/bfs/activity-plat/static/20180820/4d1b86def27c4b3794e253d0bd1116f0/59ljrrn1nn.png
// //test src person //i0.hdslb.com/bfs/activity-plat/static/20180820/4d1b86def27c4b3794e253d0bd1116f0/q05jnn1oz6.jpeg	




const aYimg = { 
  canvas: '',
  init: false,
}



// //test src majiang //i0.hdslb.com/bfs/activity-plat/static/20180820/4d1b86def27c4b3794e253d0bd1116f0/59ljrrn1nn.png
// //test src person //i0.hdslb.com/bfs/activity-plat/static/20180820/4d1b86def27c4b3794e253d0bd1116f0/q05jnn1oz6.jpeg	
init('http://localhost:8000/src/assets/timg.jpeg')
  .then((ca) => {
    aYimg.init = true
    aYimg.canvas = ca 
    return ca
  })
  .then((ca) => {
    document.getElementsByTagName('body')[0].appendChild(ca)
    const ctx = ca.getContext('2d')
    debug(ca.width)
    debug(ctx.getImageData(0, 0, ca.width, ca.height))
    // debug(ctx.getImageData(0, 0, 10, 10))
  })
  .catch(e => console.warn(e, 'init'))// eslint-disable-line