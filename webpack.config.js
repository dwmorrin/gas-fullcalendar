const path = require('path');

module.exports = {
  entry: './js/main.js',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    filename: 'bundle.html',
    path: path.resolve(__dirname, 'dist/js'),
  },
};
