// webpack.config.js
const webpack = require('webpack')
const path = require('path')

module.exports = function wp(webpackConfig, env) {
  webpackConfig.resolve.extensions.push('.less')
  webpackConfig.resolve.alias = {
    themes: path.join(__dirname, 'app-view/themes'),
  }

  return webpackConfig
}