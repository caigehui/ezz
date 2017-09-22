'use strict';
const path = require('path');
module.exports = appInfo => {
    const config = {};

    // should change to your own
    config.keys = appInfo.name + '_1505719900804_5987';
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
    // add your config here

    return config;
};

