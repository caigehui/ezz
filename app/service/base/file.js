'use strict';

const MEDIUM_MAX_WIDTH = 720;

const SMALL_MAX_WIDTH = 120;

module.exports = app => class File extends app.Service {
    // 创建文件
    *createFile({ filepath, filename }) {
        const ctx = this.ctx;
        const helper = ctx.helper;
        // 获取文件的hash
        const { hash } = yield helper.getFileHash(filepath);
        // 获取文件的filesize
        const { filesize } = yield helper.getFilesize(filepath);
        // 创建文件的Document
        const file = yield ctx.model.File.create({
            filename,
            filesize,
            hash,
            temp: true
        });
        // 判断是否为图片, 如果不是直接返回文件地址
        if (helper.isImage(filename)) {
            // 判断图片的尺寸
            const { width, height } = yield helper.getImageSize(filepath);
            if (width > SMALL_MAX_WIDTH) {
                // 创建小尺寸的图片
                yield helper.createResizedImage(filepath, { width: SMALL_MAX_WIDTH, height: SMALL_MAX_WIDTH * (height * 1.00 / width), imagePath: this.config.getUploadPath(`${hash}-small`) });
            }
            if (width > MEDIUM_MAX_WIDTH) {
                // 创建中等尺寸的图片
                yield helper.createResizedImage(filepath, { width: MEDIUM_MAX_WIDTH, height: MEDIUM_MAX_WIDTH * (height * 1.00 / width), imagePath: this.config.getUploadPath(`${hash}-medium`) });
            }
        }
        // 重命名临时文件
        yield helper.renameFile(filepath, this.config.getUploadPath(hash));
        return {
            url: helper.getFileUrl(file._id),
            fileId: file._id
        };
    }
    /**
     * 验证文件是否存在
     */
    *verifyFile({ hash, filename }) {
        const files = yield this.ctx.model.File.find({ hash });
        let existFile = null,
            isDocExists = false;

        for (let file of files) {
            existFile = file;
            if (file.filename === filename) {
                isDocExists = true;
                break;
            }
        }
        let file = existFile;
        if (!isDocExists && file) {
            file = yield this.ctx.model.File.create({
                filename,
                filesize: existFile.filesize,
                hash,
                temp: true
            });
        }
        return {
            url: file ? this.ctx.helper.getFileUrl(file._id) : null,
            fileId: file ? file._id : null
        };
    }
};