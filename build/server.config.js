const internalIp = require('internal-ip');

const PORT = process.env.PORT || 8081;

module.exports = {
  contentBase: false,
  host: internalIp.v4.sync(),
  port: PORT,
  publicPath: '/',
  stats: {
    assets: false,
    maxModules: 0,
    children: false,
    builtAt: true,
    timings: true
  },
  hot: true,
  compress: true,
  disableHostCheck: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
  },
  proxy: [
    {
      context: [
        '/**',
      ],
      target: 'http://192.168.144.129:3001',
      changeOrigin: true
    }
  ]
};
