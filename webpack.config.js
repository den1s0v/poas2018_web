const path = require('path');

// собрать js-модули вместе
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
	filename: 'bundle.js'
  },
  module: {
     rules: [{
	test: /\.jsx?$/,
	exclude: /node_modules/,
	loader: 'babel-loader'
     },
     {
			test: /\.css$/,
			use: ['style-loader', {  // chain of loaders right to left
				 loader: 'css-loader', 
				options: { modules: true }
			}
			]
     }
     ]
  }
}

