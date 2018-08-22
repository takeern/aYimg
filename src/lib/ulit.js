const isImageData = (s) => {
  if(!Object.prototype.toString(s) === '[obejct ImageData]') {
    throw new Error (`get imageData Error form ${s}`)
  }
}

const toDobuleArray = (imageData, canvas) => {
  const { data } = imageData
  let pix = []
  const copyData = []
  for(let i = 0; i < data.length; i += 4) {
    pix.push(data[i])
    if((i / 4 + 1) % canvas.width === 0) {
      copyData.push(pix)
      pix = []
    }
  }
  return copyData
}


export {
  isImageData,
  toDobuleArray,
}