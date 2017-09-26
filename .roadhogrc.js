export default {
  entry: 'app/index.js',
  publicPath: '/public/',
  outputPath: './app/public',
  env: {
    'development': {
      'extraBabelPlugins': [
        'dva-hmr',
        'transform-runtime',
        ["import", { "libraryName": "antd", "style": "css" }]
      ],
      proxy: {
        '/api': {
          'target': 'http://localhost:7001/api',
          'changeOrigin': true,
          'pathRewrite': { '^/api': '' }
        }
      }
    },
    'production': {
      'extraBabelPlugins': [
        'transform-runtime',
        ["import", { "libraryName": "antd", "style": "css" }]
      ]
    }
  },
}
