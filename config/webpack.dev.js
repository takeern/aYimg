const merge = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.common.js')
const path = require('path') 


module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(c|le)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ], 
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, '../'),
    disableHostCheck:true,
    host:'127.0.0.1',
    port:'8888',
    hot: true,
    inline: true,
    // color: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
})