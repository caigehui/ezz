export default {
  entry: 'app/index.js',
  publicPath: '/public/',
  outputPath: './app/public',
  env: {
    'development': {
      'extraBabelPlugins': [
        'dva-hmr',
        'transform-runtime',
        'transform-decorators-legacy',
        ['import', { 'libraryName': 'antd', 'style': 'css' }],
        ['module-resolver', {
          'root': ['./app'],
          'alias': {
            'component': './component',
            'asset': './asset',
            'util': './util',
            'constant': './constant'
          }
        }]
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
        'transform-decorators-legacy',
        ['import', { 'libraryName': 'antd', 'style': 'css' }],
        ['module-resolver', {
          'root': ['./app'],
          'alias': {
            'component': './component',
            'asset': './asset',
            'util': './util',
            'constant': './constant'
          }
        }]
      ]
    }
  },
}
