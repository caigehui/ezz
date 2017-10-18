'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const gm = require('gm');

module.exports = {
    /**
     * 根据文件Document的Id获取Url
     * @param {string} fileId 
     * @param {string} size 'origin' | 'medium' | 'small' 
     */
    getFileUrl(fileId, size) {
        if(!size) return `/api/files/${fileId}`;
        return `/api/files/${fileId}-${size}`;
    },
    /**
     * 判断文件是否存在
     * @param {string} filepath 文件路径
     */
    isFileExists(filepath) {
        return new Promise((resolve) => {
            fs.exists(filepath, exists => {
                resolve(exists);
            })
        })
    },
    /**
     * 获取文件的Hash
     * @param {string} filepath 文件路径
     */
    getFileHash(filepath) {
        return new Promise((resolve) => {
            let hash = crypto.createHash('md5');
            let rs = fs.createReadStream(filepath);
            rs.on('data', hash.update.bind(hash));
            rs.on('end', () => {
                resolve({ hash: hash.digest('hex') });
            });
        });
    },
    /**
     * 获取文件的大小
     * @param {string} filepath 文件路径
     */
    getFilesize(filepath) {
        return new Promise((resolve) => {
            fs.stat(filepath, (err, stats) => {
                if(err) resolve(0);
                resolve({ filesize: stats.size });
            })
        })
    },
    /**
     * 判断文件是否为图片
     * @param {string} filename 文件名
     */
    isImage(filename = '') {
        return (/^.*\.(jpg|jpeg|png|gif)$/.test(filename.toLowerCase()));
    },
    /**
     * 写文件到指定路径
     * @param {object} rs 文件读取流
     * @param {string} filename 文件路径
     */
    writeFile(rs, filepath) {
        let ws = fs.createWriteStream(filepath);
        rs.pipe(ws);
    },
    /**
     * 重命名文件
     * @param {string} originPath 
     * @param {string} targetPath 
     */
    renameFile(originPath, targetPath) {
        return new Promise((resolve, reject) => {
            fs.rename(originPath, targetPath, (err) => {
                if(err) return reject({err});
                resolve();
            })
        });
    },
    /**
     * 获取图片的尺寸
     * @param {object} rs 
     */
    getImageSize(filepath) {
        return new Promise((resolve, reject) => {
            let rs = fs.createReadStream(filepath);
            gm(rs)
                .size((err, size) => {
                    if (err) throw err;
                    resolve(size)
                })
        })
    },
    /**
     * 
     * @param {object} rs 文件读取流
     * @param {object} options 
     */
    createResizedImage(filepath, options) {
        return new Promise((resolve) => {
            let rs = fs.createReadStream(filepath);
            gm(rs)
                .resize(options.width, options.height, '!')
                .write(options.imagePath, (err) => {
                    if (err) throw err;
                    resolve();
                })
        })
    }
};