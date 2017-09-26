'use strict';
const path = require('path');
module.exports = (appInfo = { name: '', baseDir: '' }) => {
    const config = {};

    config.keys = appInfo.name + '_SWozwDMxSRLQCZ0';
    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
          '.tpl': 'nunjucks',
        }
    }
    config.static = {
        prefix: "/public/",
        dir: path.join(appInfo.baseDir, 'app/public'),
        dynamic: true,
        preload: false,
        buffer: true,
        maxFiles: 1000,
        maxAge: 31536000,
    };

    config.security = {
        csrf: {
            enable: false
        }
    }

    config.encryptKey = 'Dn2OjAzKUdejXnq'

    return config;
};

