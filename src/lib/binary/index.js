import { erosive, dilate } from './erosion'

const opening = (data, template) => {
  return dilate(erosive(data, template), template)
}

const closing = (data, template) => {
  return erosive(dilate(data, template), template)
}

export {
  opening,
  closing,
}