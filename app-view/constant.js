
module.exports = {
    IS_DEV: process.env.NODE_ENV !== 'production',
    ERROR_MSG_DURATION: 3,
    ENCRYPT_KEY: require('../config/config.default.js')().encryptKey
};