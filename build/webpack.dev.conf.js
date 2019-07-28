const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const utils = require('./utils');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: require('./server.config'),
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [utils.resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: false
        }
      }
    ]
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
  ]
});
