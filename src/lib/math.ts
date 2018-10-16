
export const PI: number = Math.PI

/**
 * 对数运算
 * @param int 对数运算指数
 */
export function log10 (int:number){
  return Math.log(int) / Math.log(10)
}

/**
 * 两数差运算
 */
function byAsc (a: number, b: number): number{
  return a - b
}

/**
 * 两数绝对值差运算
 */
function absByAsc (a: number, b: number): number{ 
  return  Math.abs(a) - Math.abs(b)
}

/**
 * 数组求和
 */
function arrSum (array: number[]): number{
  return  array.reduce((pv, cv) => pv+cv, 0)
}

export {
  byAsc,
  absByAsc,
  arrSum,
}