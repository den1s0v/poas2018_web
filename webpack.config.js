const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

function getStyleLoaders(cssOptions = {}, preProcessor) {
  const loaders = [
    'style-loader',
    {
      loader: 'css-loader',
      options: cssOptions
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
        ]
      }
    }
  ]
  if (preProcessor) loaders.push(preProcessor);
  return loaders;
}

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  entry: [
    'webpack-hot-middleware/client',
    './client/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
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
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'client/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}