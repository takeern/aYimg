const isImageData = (s) => {
  if(!Object.prototype.toString(s) === '[obejct ImageData]') {
    throw new Error (`get imageData Error form ${s}`)
  }
}


export {
  isImageData,
}