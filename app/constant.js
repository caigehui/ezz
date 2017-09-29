
const fakeAppInfo = {
    name: '',
    baseDir: ''
}

module.exports = {
    ERROR_MSG_DURATION: 3,
    ENCRYPT_KEY: require('../config/config.default.js')(fakeAppInfo).encryptKey
}