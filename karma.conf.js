// module.exports = function(config) {
//   config.set({

//     basePath: '',

//     frameworks: ['mocha'],

//     files: [
//       'specs/main.js'
//     ],

//     exclude: [],

//     preprocessors: {
//       'specs/main.js': ['webpack']
//     },

//     webpack: {
//       module: {
//         loaders: [
//           { test: /\.js$/, loader: 'jsx-loader?harmony' }
//         ]
//       }
//     },

//     plugins: [
//       require('karma-webpack'),
//       require('karma-mocha')
//     ],

//     reporters: ['progress'],

//     port: 9876,

//     colors: true,

//     logLevel: config.LOG_INFO,

//     autoWatch: true,

//     browsers: ['Chrome'],

//     captureTimeout: 60000,

//     singleRun: false,

//     webpackServer: {
//       noInfo: true
//     }

//   });
// };


var webpack = require('webpack');

module.exports = function (config) {
  config.set({

    browsers: [ process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome' ],

    singleRun: process.env.CONTINUOUS_INTEGRATION === 'true',

    frameworks: [ 'mocha' ],

    files: [
      'specs/main.js'
    ],

    preprocessors: {
      'specs/main.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'progress' ],

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.js$/, loader: 'jsx-loader?harmony' }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('test')
        })
      ]
    },

    webpackServer: {
      noInfo: true
    }

  });
};