import { isImageData, isArray, copyImageData } from '../ulit'

const getTemplate = (code) => {
  let template
  switch(code) {
  case(1): {
    template = [
        [ 1, 1, 1 ],
        [ 1, 1, 1 ],
        [ 1, 1, 1 ],
    ]
    break
  }
  case(2): {
    template = [
        [ 0, 1, 0 ],
        [ 1, 1, 1 ],
        [ 0, 1, 0 ],
    ]
    break
  }
  case(3): {
    template = [
        [ 0, 1, 0 ],
        [ 1, 1, 0 ],
        [ 0, 0, 0 ],
    ]
    break
  }
  case(4): {
    template = [
        [ 0, 1, 0 ],
        [ 0, 1, 1 ],
        [ 0, 0, 0 ],
    ]
    break
  }
  case(5): {
    template = [
        [ 0, 0, 0 ],
        [ 0, 1, 1 ],
        [ 0, 1, 0 ],
    ]
    break
  }
  case(6): {
    template = [
        [ 0, 0, 0 ],
        [ 1, 1, 0 ],
        [ 0, 1, 0 ],
    ]
    break
  }
  default:throw new Error('get template code error')
  }
  return template
}

const remberCode = (template) => {
  const height = template.length
  const width = template[0].length
  const checkCode = []
  for(let y = 0; y < height; y++) {
    for(let x = 0; x < width; x++) {
      if(template[y][x] === 1) {
        checkCode.push({
          x: x - parseInt(width / 2),
          y: y - parseInt(height / 2),
        })
      }
    }
  }
  return checkCode
}

const checkEr = (data, i, checkCode, width) => {
  const { length } = checkCode
  for(let x = 0; x < length; x++) {
    if(data[i + (width * checkCode[x].y + checkCode[x].x) * 4] !== 0) {
      return 255
    }
  }
  return 0
}

const checkDi = (data, i, checkCode, width) => {
  const { length } = checkCode
  for(let x = 0; x < length; x++) {
    if(data[i + (width * checkCode[x].y + checkCode[x].x) * 4] === 0) {
      return 0
    }
  }
  return 255
}

const fn = (imageData, template = 2, code) => {
  let tWidth, tHeight
  if(isArray(template)) {
    tHeight = template.length
    if(tHeight !== 0) tWidth = template[0].length  
    else throw new Error ('template is error')
  }else if(!isNaN(template)) {
    template = getTemplate(template)
    tWidth = 3
    tHeight = 3
  }else{
    throw new Error('get template error')
  }
  const { data, width } = imageData
  const copyData = copyImageData(data)
  const checkCode = remberCode(template)
  const len = data.length - width * 4 * (tHeight - 1) / 2
  const start = 4 * width * (tWidth - 1) / 2
  if (code === 'erosive') {
    for (let i = start; i < len; i += 4) {
      const x = i % (width * 4)
      if (x !== 0 && data[i] === 0) {
        const operator = checkEr (copyData, i, checkCode, width)
        data [i] = operator 
        data [i + 1] = operator 
        data [i + 2] = operator  
      }
    }
  } else if (code === 'dilate') {
    for (let i = start; i < len; i += 4) {
      const x = i % (width * 4)
      if (x !== 0 && data[i] !== 0) {
        const operator = checkDi (copyData, i, checkCode, width)
        data [i] = operator 
        data [i + 1] = operator 
        data [i + 2] = operator  
      }
    }
  }
  return data
}

const erosive = (imageData, template) => {
  if (!isImageData(imageData)) throw new Error('get imageData error from erosive')
  return fn(imageData, template, 'erosive')
}

const dilate = (imageData, template) => {
  if (!isImageData(imageData)) throw new Error('get imageData error from dilate')
  return fn(imageData, template, 'dilate')
}


export {
  erosive,
  dilate,
}