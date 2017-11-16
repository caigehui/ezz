'use strict';
/* es5 file */
var path = require('path');
var appName = require('../package.json').name;

module.exports = function (appInfo) {
    var config = {};

    config.keys = appName + '_SWozwDMxSRLQCZ0';

    // 配置对 /proxy 路径请求不解析 body
    config.bodyParser = {
        ignore: '/proxy'
    }

    // 前端渲染
    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.tpl': 'nunjucks',
        }
    };

    // 调试环境关闭csrf防御
    config.security = {
        csrf: {
            enable: false,
            headerName: 'x-csrf-token'
        }
    };

    // 让前端能够获取加密后的EGG_SESSION
    config.session = {
        httpOnly: false
    }

    // 加入自定义中间件
    config.middleware = ['errorHandler', 'saveSession'];

    config.errorHandler = {
        match: '/api'
    };

    config.saveSession = {
        match: /^\/api(?!\/login).*$/ig
    };
    
    config.encryptKey = appName + '_Dn2OjAzKUdejXnq';

    config.mongoose = {
        url: 'mongodb://localhost:27017/ezz',
        options: {}
    };

    config.multipart = {
        fileSize: '20mb',
        fileExtensions: [
            '.doc',
            '.docx',
            '.pdf'
        ]
    };

    config.getUploadPath = function (filename) {
        return path.join(__dirname, '..', '..', 'upload', filename)
    }

    return config;
};

