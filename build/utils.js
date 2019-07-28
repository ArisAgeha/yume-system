const path = require('path');
const _ = require('lodash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.isProd = () => process.env.NODE_ENV !== 'development';
  
exports.resolve = (...paths) => path.resolve(__dirname, '..', ...paths);

exports.cssLoaders = options => {
  options = options || {};
  return {
    css: (customOptions = {}) => {
      return generateLoaders({ ...options, ...customOptions });
    },
    less: (customOptions = {}) => {
      return generateLoaders({ ...options, ...customOptions, loader: 'less' });
    },
    sass: (customOptions = {}) => {
      return generateLoaders({ ...options, ...customOptions, loader: 'sass' });
    }
  };
};

function generateLoaders(options = {}) {
  options = _.defaults(options || {}, { usePostCSS: true, postcss: {} });
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  };
  if (options.cssModule) {
    cssLoader.options = {
      ...cssLoader.options,
      modules: true,
      localIdentName: '[local]--[hash:base64:8]',
      camelCase: true
    };
  }
  var postcssLoader = {
    loader: 'postcss-loader',
    options: {
      ...options.postcss,
      sourceMap: options.sourceMap
    }
  };
  const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];
  if (options.loader) {
    loaders.push({
      loader: options.loader + '-loader',
      options: {
        sourceMap: options.sourceMap
      }
    });
  }
  if (options.loader === 'sass' || options.loader === 'scss') {
    loaders.push({
      loader: 'sass-resources-loader',
      options: {
        resources: [
          exports.resolve('src/assets/styles/_vars.scss'),
          exports.resolve('src/assets/styles/_mixins.scss')
        ]
      }
    });
  }
  loaders.unshift(options.extract ? MiniCssExtractPlugin.loader : 'vue-style-loader');
  return loaders;
}
