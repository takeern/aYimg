import IAyimg, {
  IMemory,
} from './interface/interface-ayimg';

import initImg from './lib/init';
import { fnMemory, fnCheck } from './lib/memory';
import { copyImage } from './lib/ulit'
//image prosscing
import grayScale from './lib/grayScale/index';
import binary from './lib/binary/index'
import { erosive, dilate } from './lib/fiter/erosive'
import sharpen from './lib/sharpen/index'
import reflect from './lib/reflect/index'
import fiter from './lib/fiter/index'

class Ayimg implements IAyimg {
  public imgComplete: boolean = false;
  public ctx: CanvasRenderingContext2D;
  public imageData: ImageData;
  public canvas: HTMLCanvasElement;
  public memory: IMemory = [];
  public path: string = '';
  public initData: ImageData;

  /**
   * 初始化应用返回promise
   * @param imgObj 需要解析的imgstring 或 imgelement
   * @param container 容器
   */
  async init(imgObj: string|HTMLImageElement, container: HTMLElement){
    await initImg.bind(this)(imgObj, container);
    return this;
  }

  /**
   * 函数执行前遍历历史查询是否执行过
   * @param fnName 执行的函数的名字
   * @param code 执行函数可能需要的参数code
   */
  fnCheck (fnName: string, code?: string|null): boolean {
    return fnCheck.bind(this)(fnName, code);
  }
  
  /**
   * 执行后图像处理算法的imagedata，存储到memory
   */
  fnMemory () {
    return fnMemory.bind(this)();
  }

  /**
   * 
   * @param callback 需要执行的函数
   * @param fnName 需要执行函数的名字
   * @param code 执行函数需要的参数
   */
  wraperFn (callback:Function, fnName: string, code?: string|null) {
    if(this.fnCheck(fnName, code)) return this;
    callback()
    this.fnMemory()
  }

   /**
   * 处理后的imagedata put到canvas
   */
  show(): Ayimg{
    
    const { ctx, imageData } = this;
    ctx.putImageData(imageData, 0, 0)
    console.log('show')
    return this
  }

  /**
   * 重置imagedata到未处理状态
   */
  reload(): Ayimg{
    this.imageData = copyImage(this.initData)
    this.path = ''
    return this
  }

  /**
   * 图像灰化
   * @param code 图像灰化算法对应code
   */
  grayScale(code: string = 'weight'):Ayimg {
    this.wraperFn(() => grayScale(this.imageData, code), 'grayScale', code)
    return this
  }

  /**
   * 图像二值化
   * @param code 选择图像二值化算法
   */
  binary(code: string = 'otsu', ptile?: number): Ayimg {
    this.wraperFn(() => binary(this.imageData, code, ptile), 'binary', code)
    return this
  }
  
  /**
   * 对图像进行多次腐蚀处理
   * @param times 腐蚀次数
   * @param template 对应的模板
   */
  erosive(times: number = 1, template: number|number[][] = 1): Ayimg {
    for(let i = 0; i < times; i++) {
      if(this.fnCheck('erosive', template.toString())) continue
      erosive(this.imageData, template = 1)
      this.fnMemory()
    }
    return this
  }

   /**
   * 对图像进行多次膨胀处理
   * @param times 膨胀次数
   * @param template 对应的模板
   */
  dilate (times: number = 1, template: number|number[][] = 1): Ayimg {
    for(let i = 0; i < times; i++) {
      if(this.fnCheck('dilate', template.toString())) continue
      dilate(this.imageData, template)
      this.fnMemory()
    }
    return this
  }

   /**
   * 对图像进行多次开运算处理
   * @param times 开运算次数
   * @param template 对应的模板
   */
  opening (times: number = 1, template: number|number[][] = 1): Ayimg {
    for(let i = 0; i < times; i++) {
      if(this.fnCheck('opening', template.toString())) return this
      dilate(erosive(this.imageData, template), template)
      this.fnMemory()
    }
    return this
  } 

   /**
   * 对图像进行多次闭运算处理
   * @param times 闭运算次数
   * @param template 对应的模板
   */
  closing (times: number = 1, template: number|number[][] = 1): Ayimg {
    for(let i = 0; i < times; i++) {
      if(this.fnCheck('closing', template.toString())) return this
      erosive(dilate(this.imageData, template), template)
      this.fnMemory()
    }
    return this
  }
  /**
   * 图像锐化
   * @param code 锐化对应的算子
   */
  sharpen (code:string = 'sobel'): Ayimg{
    this.wraperFn(() => sharpen(this.imageData, code), 'sharpe', code)
    return this
  }

  /**
   * 获取图像边界
   */
  reflect () {
    this.wraperFn(() => {
      const { ctx } = this
      const [ relectData, xBorder, yBorder ] = reflect(this.imageData) //eslint-disable-line
      console.log(xBorder, yBorder)
      for (let i = 0; i < yBorder.length; i++) {
        ctx.strokeStyle = 'green';
        xBorder[i] && yBorder[i] &&
        ctx.strokeRect(parseInt((xBorder[i].start / 2).toString()), parseInt((yBorder[i].start / 2).toString()), parseInt((xBorder[i].width / 2).toString()), parseInt((yBorder[i].width / 2).toString()))
      }
    }, 'reflect')
    return this
  } 
  fiter (code: string = 'knnM') {
    this.wraperFn(() => fiter(this.imageData, code), 'fiter', code)
    return this
  }
}

const ayimg = new Ayimg()
ayimg.init('./src/asstes/fiter.jpeg', document.querySelector('#showChart')).then((rs) => {
  rs.grayScale('weight').binary('avg').fiter().show()
  console.log(ayimg, 'after')
})
console.log(ayimg)
