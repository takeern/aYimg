
interface IAyimg{
  /**
   * img loading complete ?
   */
  imgComplete: boolean;
  /**
   * canvas context 2d
   */
  // ctx: CanvasRenderingContext2D;
  /**
   * canvas imagedata
   */
  imageData: ImageData;
  /**
   * cnavas element
   */
  canvas: HTMLCanvasElement;
  /**
   * remmber has calculate
   */
  memory: IMemory;
  /**
   * Current execution function like: function - function - function
   */
  path: string;
  /**
   * 存储图像未处理的imagedata
   */
  initData: ImageData;
}

interface IMemory {
  [index:number]: {
    src:string,
    items:string[]
  }
}



export default IAyimg;
export {
  IMemory,
}