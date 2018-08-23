import { isArray, deepcopy } from '../ulit'


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

const checkEr = (data, x, y, checkCode) => {
  for(let i of checkCode) {
    if(data[y + i.y][x + i.x] !== 0) {
      return 255
    }
  }
  return 0
}

const checkDi = (data, x, y, checkCode) => {
  for(let i of checkCode) {
    if(data[y + i.y][x + i.x] === 0) {
      return 0
    }
  }
  return 255
}

const fn = (data, template = 2, command) => {
  let width, height 
  const copyData = deepcopy(data)
  if(isArray(template)) {
    height = template.length
    if(height !== 0) width = template[0].length  
    else throw new Error ('template is error')
  }else if(!isNaN(template)) {
    template = getTemplate(template)
    width = 3
    height = 3
  }else{
    throw new Error('get template error')
  }
  const lenH = data.length - parseInt(height / 2)
  const len = data[0].length - parseInt(width / 2)
  const checkCode = remberCode(template)
  if(command === 'erosive') {
    for(let y = parseInt(height / 2); y < lenH; y ++) {
      for(let x = parseInt(width / 2); x < len; x ++) {
        if(data[y][x] === 0) {
          copyData[y][x] = checkEr(data, x, y, checkCode)
        }
      }
    }
  }else if(command === 'dilate') {
    for(let y = parseInt(height / 2); y < lenH; y ++) {
      for(let x = parseInt(width / 2); x < len; x ++) {
        if(data[y][x] !== 0) {
          copyData[y][x] = checkDi(data, x, y, checkCode)
        }
      }
    }
  }
  return copyData
}

const erosive = (data, template) => {
  return fn(data, template, 'erosive')
}

const dilate = (data, template) => {
  return fn(data, template, 'dilate')
}

export {
  erosive,
  dilate,
}