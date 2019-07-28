const webpack = require('webpack');
const utils = require('./utils');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const dayjs = require('dayjs');
const cssLoader = utils.cssLoaders({
  sourceMap: utils.isProd(),
  extract: utils.isProd(),
  usePostCSS: true
});

let configEntry = {};

configEntry = utils.resolve('src/main.js');

module.exports = {
  entry: configEntry,
  resolve: {
    alias: {
      '@': utils.resolve('src')
    },
    extensions: ['.vue', '.js', '.json'],
    modules: [utils.resolve('node_modules')]
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          preset: 'default',
          safe: true,
          discardComments: { removeAll: true },
          calc: false,
          convertValues: false,
          autoprefixer: {
            remove: false
          }
        }
      })
    ]
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          transformAssetUrls: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.scss$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: cssLoader.sass({ cssModule: true })
          },
          {
            include: utils.resolve('src'),
            use: cssLoader.sass()
          },
          {
            use: cssLoader.sass({ usePostCSS: false })
          }
        ]
      },
      {
        test: /\.css$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: cssLoader.css({ cssModule: true })
          },
          {
            include: utils.resolve('src'),
            use: cssLoader.css()
          },
          {
            use: cssLoader.css({ usePostCSS: false })
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: `fonts/[name].[hash:7].[ext]`
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: `media/[name].[hash:7].[ext]`
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: `img/[name].[hash:7].[ext]`
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.EnvironmentPlugin({
      npm_package_name: process.env.npm_package_name,
      npm_package_version: process.env.npm_package_version,
      UPDATE_DATE: dayjs().format('YYYY-MM-DD HH:mm:ss')
    }),
    new webpack.DefinePlugin({
      global: 'window'
    }),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
    
  ]
};
