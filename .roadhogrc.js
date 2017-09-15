import config from 'config';

export default {
  entry: "src/index.js",
  env: {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime"
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime"
      ]
    }
  },
  proxy: config.get('proxy')
}
