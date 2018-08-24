import { erosive, dilate } from './erosion'

const opening = (data, template) => {
  dilate(erosive(data, template), template)
}

const closing = (data, template) => {
  erosive(dilate(data, template), template)
}

export {
  opening,
  closing,
}