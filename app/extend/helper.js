'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    getUploadPath(filename) {
        return path.join(__dirname, '..' , '..', 'upload', filename);
    },
    getFileHash(rs) {
        return new Promise((resolve) => {
            let hash = crypto.createHash('md5');
            rs.on('data', hash.update.bind(hash));
            rs.on('end', () => {
                resolve(hash.digest('hex'));
            });
        });
    }
};