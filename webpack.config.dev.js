var path = require('path');
var webpack = require('webpack');

module.exports = {
  // or devtool: 'eval' to debug issues with compiled output:
  //devtool: 'cheap-module-eval-source-map',
  devtool: 'inline-source-map',
  //devtool: 'eval',
  entry: [
    // necessary for hot reloading with IE:
    'eventsource-polyfill',
    // listen to code updates emitted by hot middleware:
    'webpack-hot-middleware/client',
    // your code:
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    noParse: [
      /node_modules\/sinon\//,
    ],
    loaders: [{
      test: /\.js$|\.jsx?$/,
      loaders: ['babel'],
      exclude: path.resolve(__dirname, 'node_modules'),
      include: path.join(__dirname, 'src')
    },{
      test: /\.js$|\.jsx?$/,
      loaders: ['babel'],
      exclude: path.resolve(__dirname, 'node_modules'),
      include: path.join(__dirname, 'test')
    },

      {
      test: /\.css$/,
      loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'     
    }, {test: /\.json$/, loaders: ['json-loader']},  { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },]
  },
  resolve: {
    alias: {
      'sinon': 'sinon/pkg/sinon'
    }
  },
  externals: {
    'jsdom': 'window',
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/addons': true,
    'react/lib/ReactContext': true
  }
};


