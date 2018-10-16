const path = require('path') 
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const SsrClientList = require('../plugins/ssrClient.js')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  stats: 'normal',
  target: 'web',
  output: {
    filename: '[name].js',
    publicPath: '/dist',
    // chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.(c|le)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ], 
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin('../dist/'),
    new UglifyJSPlugin({
      // parallel: true,
      sourceMap: true,
    }),
    new MiniCssExtractPlugin(
      {
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
        hot: false, // optional as the plugin cannot automatically detect if you are using HOT, not for production use
        orderWarning: true, // Disable to remove warnings about conflicting order between imports
      }
    ),
    new OptimizeCSSAssetsPlugin({}),
    new SsrClientList (),
  ],
  optimization: {
    minimize: false, 
    splitChunks: { 
      chunks: 'all', 
    },
  },  
})