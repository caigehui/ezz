export default {
  entry: 'app-view/index.js',
  publicPath: '/public/',
  outputPath: './app/public',
  hash: true,
  env: {
    'development': {
      'extraBabelPlugins': [
        'dva-hmr',
        'transform-runtime',
        'transform-decorators-legacy',
        ['import', { 'libraryName': 'antd', 'style': 'css' }],
        ['module-resolver', {
          'root': ['./app-view'],
          'alias': {
            'components': './components',
            'assets': './assets',
            'utils': './utils',
            'constants': './constants',
            'app': './app'
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
          'root': ['./app-view'],
          'alias': {
            'components': './components',
            'assets': './assets',
            'utils': './utils',
            'constants': './constants',
            'app': './app'
          }
        }]
      ]
    }
  },
}
