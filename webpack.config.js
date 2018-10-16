process.env.NODE_ENV = 'production';
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  // devtool: 'inline-source-map',
  devtool: false,
  entry: {
    landing: path.resolve(__dirname, 'client/src/clientApps/landing.js'),
    communityguest: path.resolve(__dirname, 'client/src/clientApps/communityguest.js'),
    communityuser: path.resolve(__dirname, 'client/src/clientApps/communityuser.js'),
    user: path.resolve(__dirname, 'client/src/clientApps/user.js'),
    userpage: path.resolve(__dirname, 'client/src/clientApps/userpage.js'),
    projectpage: path.resolve(__dirname, 'client/src/clientApps/projectpage.js'),
    explore: path.resolve(__dirname, 'client/src/clientApps/explore.js'),
    post: path.resolve(__dirname, 'client/src/clientApps/post.js')
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
        loaders: ['style-loader',
          { loader: 'css-loader', options: { minimize: true } }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        // This will apply the loader before the other ones
        enforce: 'pre'
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'url-loader',
        options: {
          // Inline files smaller than 10 kB (10240 bytes)
          limit: 10 * 1024
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.es6']
  },
  optimization: {
    nodeEnv: 'production',
    minimize: true,
    minimizer: [new UglifyJsPlugin()],
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: { // vendor chunk
          name: 'vendor',
          chunks: 'all', // async + async chunks
          test: /node_modules/ // import file path containing node_modules
        }
      }
    }
  }
};
