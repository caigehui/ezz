'use strict';

module.exports = () => {
    let config = {}
    config.security = {
        csrf: {
            enable: true
        }
    }
    config.encryptKey = '1'
    return config;
}

