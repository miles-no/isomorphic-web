var webpack = require('webpack');
var path = require('path');
var merge = require('merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var autoPrefixerBrowsers = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 31',
    'safari >= 6.1',
    'opera >= 23',
    'ios >= 6.1',
    'android >= 2.3',
    'bb >= 10'
    ],
    browsers = JSON.stringify({ browsers: autoPrefixerBrowsers });

var webpackConfig = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
      // you can now require('file') instead of require('file.jsx')
      extensions: [
        '', '.js', '.jsx', '.json'
      ]
    },
  sassLoader: {
    precision: 8
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};

if (process.env.NODE_ENV === 'production') {
  webpackConfig = merge(webpackConfig, {
    entry: [
      './client/client.jsx'
    ],
    module: {
      loaders: [
        { 
          test: /\.(js|jsx)$/, 
          loader: 'babel', 
          exclude: /node_modules/, 
          query: { 
            presets: ['react', 'es2015'] 
          },
          include: __dirname
        },
        { 
          test: /\.scss$/, 
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'autoprefixer-loader?' + browsers, 'sass')
        },
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new ExtractTextPlugin('app.css'),
      new webpack.optimize.UglifyJsPlugin({ minimize: true })
    ]
  });
} else {
  webpackConfig = merge(webpackConfig, {
    devtool: 'inline-source-map',
    module: {
      preLoaders: [
        { test: /\.(js|jsx)$/, loaders: ['eslint'] }
      ],
      loaders: [
        { 
          test: /\.(js|jsx)$/, 
          loader: 'babel', 
          exclude: /node_modules/, 
          query: { 
            presets: ['react', 'es2015'] 
          } 
        },
        { 
          test: /\.scss$/, 
          loaders: ['style','css?sourceMap', 'autoprefixer-loader?' + browsers, 'sass'] 
        },
      ]
    },
    entry: [
      'webpack-hot-middleware/client',
      './client/client.jsx'
    ],
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    sassLoader: {
      sourceMap: true
    }
  });
}

module.exports = webpackConfig;
/*
module.exports = {
    devtool: 'inline-source-map',
    entry: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080',
      path.resolve(__dirname, 'app/client.jsx')
      ],
    output: {
        path: path.resolve(__dirname, '__build__'),
        filename: 'bundle.js',
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // display only errors to reduce the amount of output
      stats: 'errors-only',

      // parse host and port from env so this is easy
      // to customize
      host: process.env.HOST,
      port: process.env.PORT
    },
    module: {
      preLoaders: [
        { test: /\.(js|jsx)$/, loaders: ['eslint'] }
      ],
      loaders: [
        { 
          test: /\.(js|jsx)$/, 
          loader: 'babel', 
          exclude: /node_modules/, 
          query: { 
            presets: ['react', 'es2015'] 
          } 
        },
        { 
          test: /\.scss$/, 
          loaders: ['style','css?sourceMap', 'autoprefixer-loader?' + browsers, 'sass'] 
        },
      ]
    },
    resolve: {
      // you can now require('file') instead of require('file.jsx')
      extensions: [
        '', '.js', '.jsx', '.json'
      ]
    },
    sassLoader: {
      precision: 8,
      sourceMap: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ]
};
*/
/*

module.exports = {

  devtool: 'source-map',

  entry: path.resolve(__dirname, 'app/client.jsx'),
  
  output: {
    path: '__build__',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '__build__'
  },

  resolve: {
    extensions: [ '', '.js', '.css', '.jsx' ]
  },

  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel?stage=0&loose=all' },
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel?stage=0&loose=all' },
      { test: /\.woff(2)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf$/, loader: "file" },
      { test: /\.eot$/, loader: "file" },
      { test: /\.svg$/, loader: "file" }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js')
  ]
}
*/