### 当前支持方法

- init() 初始化

参数          | 类型           | 默认        | 说明           | 必填 |
:----------- | :-----------: |:-----------:|:-------------: |:------------- |
image     | image/string     | 无          | 传入需要处理的image，可以是image，<img> 或者image url  |   Y |
domElement  |domElement  | 无  | 将处理后的图像在dom中展示，通过控制domstyle 控制canvas展示  | N |

- garyScaleFn() 灰化

参数          | 类型           | 默认        | 说明           | 必填 |
:----------- | :-----------: |:-----------:|:-------------: |:------------- |
imagedata     | imagedata     | 无          | imagedata类型  |   Y |
code  |string  | weight  | 判断使用那种方法灰化 ‘average’=》平均灰度 ‘max’=》最大法灰度 ‘weight’ =》加权灰度  | N |

- binary() 二值化

参数          | 类型           | 默认        | 说明           | 必填 |
:----------- | :-----------: |:-----------:|:-------------: |:------------- |
imagedata     | imagedata     | 无          | imagedata类型  |   Y |
code     | string     | 'otsu'          | 使用那种方法二值化 ‘otsu’=>大津法 ‘average’=灰度平均值法 ‘pitle’=》均值双谷峰法 |  Y |
ptile  |  int | 无 | 使用ptile方法二值化需要评估背景占整个图中的百分比 传入大小为0～1之间 |  N |

- sharpen() 锐化/边缘检测

参数          | 类型           | 默认        | 说明           | 必填 |
:----------- | :-----------: |:-----------:|:-------------: |:------------- |
imagedata     | imagedata     | 无          | imagedata类型  |   Y |
code  | string  | 'sobel'  | 判断使用那种算子锐化 可选值 'sobel', 'roberts', 'priwitt', 'wallis' | Y |

- fiter() 腐蚀

参数          | 类型           | 默认        | 说明           | 必填 |
:----------- | :-----------: |:-----------:|:-------------: |:------------- |
imagedata     | imagedata     | 无          | imagedata类型  |   Y |
code  | string  | knnA  | avg=>均值滤波 median=>中值滤波 knnA=>k近邻平滑均值滤波 knnM=>k近邻平滑中值滤波 snn=>对称近邻均值滤波 | Y |

- erosive() 腐蚀

参数          | 类型           | 默认        | 说明           | 必填 |
:----------- | :-----------: |:-----------:|:-------------: |:------------- |
imagedata     | imagedata     | 无          | imagedata类型  |   Y |
template  | int / arr[][]  | 无  | 可以指定或者用内至模编号为（1-6）(底部查看模版) | Y |

- dilate() 膨胀

参数          | 类型           | 默认        | 说明           | 必填 |
:----------- | :-----------: |:-----------:|:-------------: |:------------- |
imagedata     | imagedata     | 无          | imagedata类型  |   Y |
template  | int / arr[][]  | 无  | 可以指定或者用内至模版编号为（1-6）底部查看模版) | Y |

- 腐蚀和膨胀是互为对偶运算 但是执行顺序会导致不同的效果 于是又开元算和闭运算
- opening() 开运算 先腐蚀后膨胀 处理较小的干扰点
- closing() 闭运算 反之  

```javascript
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
```