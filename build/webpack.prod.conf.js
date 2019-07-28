const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CompressionPlugin = require('compression-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: '#source-map',
  output: {
    publicPath: '/',
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js'
  },
  performance: {
    assetFilter(assetFilename) {
      return !/\.(map|LICENSE|js)$/.test(assetFilename);
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        ui: {
          test: /[\\/]node_modules[\\/](element-ui).*\.js/,
          name: 'vendors-ui',
          chunks: 'initial',
          priority: -1
        },
        vendors: {
          test: /[\\/]node_modules[\\/].*\.js$/,
          name: 'vendors',
          chunks: 'initial',
          priority: -10
        },
        async: {
          test: /[\\/]node_modules[\\/].*\.js$/,
          name: 'vendors-async',
          chunks: 'async',
          priority: -2
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: [
      new ParallelUglifyPlugin({
        sourceMap: true,
        cacheDir: path.resolve(process.cwd(), '.uglify_cache'),
        include: [/src/],
        uglifyES: {
          output: {
            beautify: false,
            comments: false
          },
          compress: {
            warnings: false,
            drop_console: true
          }
        }
      })
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({ public_path: '/' }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css'
    }),
    new CompressionPlugin({
      test: /\.(js|css)$/i,
      filename: '[path].gz[query]',
      cache: true,
      algorithm: 'gzip',
      threshold: 1024,
      minRatio: 0.8
    })
  ]
});

if (process.env.PROFILE) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  const StatsPlugin = require('stats-webpack-plugin');
  module.exports.profile = true;
  module.exports.plugins.push(
    new StatsPlugin('dist/profile/stats.json', {
      chunkModules: true,
      exclude: [/node_modules/]
    })
  );
  module.exports.plugins.push(new BundleAnalyzerPlugin());
}
