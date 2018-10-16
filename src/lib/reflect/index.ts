import { isImageData } from '../ulit'
import { relectY, getYborder, relectX, fiterBorder } from './reflect'

export default (imageData) => {
  if(!isImageData(imageData)) throw new Error ('get imageData error from reflect')
  const relectYData = relectY(imageData) // 垂直方向投影直方图
  const xBorder = getYborder(relectYData, 0, imageData.height/20) // 垂直方向投影直方图获取x轴方向边界
  
  const yArrs = relectX(imageData, xBorder) // 通过x边界 对该范围内进行水平方向投影
  const yBorder = [] //y方向边界
  for (let i = 0; i < yArrs.length; i++) {
    const xData = getYborder(yArrs[i])
    yBorder.push(...fiterBorder(xData))//对y方向border检测 仅仅选择起点和终点 
  }
  // console.log(relectYData, xBorder, yArrs)
  return [ relectYData, xBorder, yBorder ]
}

