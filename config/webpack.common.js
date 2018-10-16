const path = require('path') 
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: path.resolve(__dirname, '../src', 'index.ts'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'development',
      inject: 'body',
      compile: true,
      favicon: false,
      minify:{ 
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyJS: true, 
      },
      cache: true,
      showErrors: true,
      chunks: 'all',
      excludeChunks: [],
      chunksSortMode: 'auto',
      template: path.resolve(__dirname, '../src', 'index.html'),
    }),
  ],
  resolve: {
    extensions: [ '.webpack.js', '.ts', '.tsx', '.js' ],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(jpeg|png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.(ts)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
}
