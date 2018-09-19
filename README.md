# aYimg

### usage

#### Install dependencies:

```bash
npm i ayimg --save-dev
```
#### run
```javascript
import Ayimg from 'ayimg'
const ayimg = new Ayimg()
ayimg.init(node, imgObj or imgurl).then(() => {
  ayimg.grayScale().show()
})
```

###如何运行？
   如果是在客户点使用它，将传入的img输出到canvas中，通过对修改imagedata，实现图像处理相关的算法，挂载到对应的节点上，你可以通过控制节点的渲染来改变canvas大小，如果是在node端使用它，你需要配置好[node canvas](https://github.com/Automattic/node-canvas)

### 支持那些方法？
- 灰化
- 二值化
- 边缘提取
- 滤波
- 开闭运算
- 降噪
- 垂直水平方向投影
- ...

详细 [api](https://github.com/takeern/aYimg/tree/master/docs)

### 更多例子？
...