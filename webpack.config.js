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
