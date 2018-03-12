process.env.NODE_ENV = 'development';
const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: {
    main: './client/src/main.js',
    recipe: './client/src/recipe.js'
  },
  output: {
    path: path.resolve(__dirname, 'client/src/assets'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js|es6)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.es6']
  }
};
