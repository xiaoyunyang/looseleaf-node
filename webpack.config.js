process.env.NODE_ENV = 'development';

module.exports = {
  devtool: 'source-map',
  entry: [
    // 'babel-polyfill',
    './client/src/main.jsx',
  ],
  output: {
    path: __dirname + '/client/build',
    filename: 'browser.js',
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js|es6)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.es6'],
  },
};
