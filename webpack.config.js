const path = require('path');
const  webpack = require('webpack');

// собрать js-модули вместе
module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }, {
      test: /\.css$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          modules: true
        }
      }]
    }]
  }
}