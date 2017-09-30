'use strict';
var path = require('path');
var appName = require('../package.json').name;

module.exports = function (appInfo) {
    const config = {};
    
    config.keys = appName + '_SWozwDMxSRLQCZ0';

    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.tpl': 'nunjucks',
        }
    };

    config.security = {
        csrf: {
            headerName: 'x-csrf-token'
        }
    };

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
        ]
    };
        
    return config;
};

