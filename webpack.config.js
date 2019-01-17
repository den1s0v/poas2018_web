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
  // devtool: 'inline-source-map',
  // devtool: 'cheap-module-eval-source-map',
  watch: true,
  entry: [
// 'babel-polyfill',
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
      oneOf: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        // loader: "babel-loader"
        loaders: [
          // 'react-hot-loader',
          "babel-loader"
        ]
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        use: getStyleLoaders()
      }, {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: getStyleLoaders({}, 'sass-loader')
      }, {
        exclude: [/\.(js|jsx|css|scss)$/, /\.html$/, /\.json$/],
        loader: 'file-loader',
        options: {
          name: 'public/media/[name].[hash:8].[ext]',
        }
      }]
    }]
  },
  plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new HtmlWebpackPlugin({
      inject: true,
      template: 'client/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}