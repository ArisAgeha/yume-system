const webpack = require('webpack');
const path = require('path');
const packageJSON = require('../package.json');
const excludePackage = ['vue-cropperjs'];
const dependencies = Object.keys(packageJSON.dependencies).filter(item => !excludePackage.includes(item));

module.exports = {
  mode: 'production',
  devtool: '#source-map',
  entry: {
    vendor: dependencies
  },
  output: {
    path: path.join(__dirname, 'dll'),
    filename: '[name].dll.js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      path: path.join(__dirname, 'dll', '[name]-manifest.json'),
      name: '[name]'
    })
  ]
};
