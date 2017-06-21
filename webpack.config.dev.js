const path = require('path');
const webpack = require('webpack');
const nodeDir = `${__dirname}/node_modules`;

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist'),
};

module.exports = {
  // or devtool: 'eval' to debug issues with compiled output:
  // devtool: 'cheap-module-eval-source-map',
  devtool: 'inline-source-map',
  // devtool: 'eval',
  entry: [
    // necessary for hot reloading with IE:
    'eventsource-polyfill',
    // listen to code updates emitted by hot middleware:
    'webpack-hot-middleware/client',
    // your code:
    './src/index',
  ],
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    noParse: [
      /node_modules\/sinon\//,
    ],
    loaders: [{
      test: /\.js$|\.jsx?$/,
      loaders: ['babel'],
      exclude: path.resolve(__dirname, 'node_modules'),
      include: path.join(__dirname, 'src'),
    }, {
      test: /\.js$|\.jsx?$/,
      loaders: ['babel'],
      exclude: path.resolve(__dirname, 'node_modules'),
      include: path.join(__dirname, 'test'),
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[name].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
      ],
    },
      { test: /\.json$/, loaders: ['json-loader'] }],
  },
  resolve: {
    alias: {
      sinon: 'sinon/pkg/sinon',
      jquery: path.resolve(nodeDir, 'jquery/src/jquery'),
      sfacebook: path.join(__dirname, 'src/components/FB'),
    },
    modulesDirectories: ['src', 'node_modules'],
    extensions: ['', '.js', '.jsx'],
  },
  externals: {
    jsdom: 'window',
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/addons': true,
    'react/lib/ReactContext': true,
  },
};

