'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
    getUploadPath(filename) {
        return path.join(__dirname, '..' , '..', 'upload', filename);
    }
}