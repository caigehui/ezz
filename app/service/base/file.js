'use strict';

module.exports = app => class File extends app.Service {
    * createFile({ filepath, filesize, filename }) {
        // 获取文件的hash值
        const { hash } = yield this.ctx.helper.getFileHash(filepath);
        // 按hash值查找文件并插入文件名
        // const file = yield this.ctx.model.File.findOneAndUpdate({ hash },
        //     { 
        //         $set: { filenames:  }
        //         $push: { filenames: filename } 
        //     },
        //     { upsert: true });


        //yield this.ctx.helper.renameFile(filepath, this.config.getUploadPath('rename.jpg'));

        // const imagePath = this.config.getUploadPath('resize.jpg');
        // const { size } = yield this.ctx.helper.getImageSize(filepath);
        // yield this.ctx.helper.createResizedImage(filepath, { width: 240, height: 240, imagePath });

    }
};