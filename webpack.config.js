const path = require('path');

// собрать js-модули вместе
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
	filename: 'bundle.js'
  }
}

