const path = require('path');

// ������� js-������ ������
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
	filename: 'bundle.js'
  }
}

