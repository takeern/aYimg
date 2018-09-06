export const PI = Math.PI
export const log10 = (int) => {
  return Math.log(int) / Math.log(10)
}

const byAsc = (a, b) => a - b

const absByAsc = (a, b) => Math.abs(a) - Math.abs(b)

const arrSum = (array) => array.reduce((pv, cv) => pv+cv, 0)

export {
  byAsc,
  absByAsc,
  arrSum,
}