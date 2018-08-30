# aYimg

### run

```javascript
npm run start //localhost:3003
node staticServe.js //canvas中图片跨域问题
```

### 使用
index.js中含有所有图片处理逻辑 也有example，31行改变图片引用 ，正在添加更多处理方法，有需求可以提，优先添加

### 当前支持方法

详细 [api](https://github.com/takeern/aYimg/docs)

### 应用场景

1. 每个图像处理方法传入imagedata，返回处理后的imagedata（已支持）
2. new ayimg对象后调用各种方法（未支持）