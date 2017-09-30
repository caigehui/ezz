'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const gm = require('gm');

module.exports = {
    /**
     * 获取文件的Hash
     * @param {object} filepath 文件路径
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
        return new Promise((resolve) => {
            let ws = fs.createWriteStream(filepath);
            rs.on('data', (chunk) => {
                if (!ws.write(chunk)) {//判断写缓冲区是否写满(node的官方文档有对write方法返回值的说明)
                    rs.pause();//如果写缓冲区不可用，暂停读取数据
                }
            });
            rs.on('end', () => {
                ws.end('完成', () => {
                    resolve();
                })
            });
            ws.on("drain", () => {//写缓冲区可用，会触发"drain"事件
                rs.resume();//重新启动读取数据
            });
        })
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
                    resolve({ size })
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