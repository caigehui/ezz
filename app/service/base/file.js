'use strict';

module.exports = app => class File extends app.Service {
    * createFile({ filepath, filesize, filename }) {
        const { hash } = yield this.ctx.helper.getFileHash(filepath);

        const file = yield this.ctx.model.File.findOne({ hash })



        if(file) {
            // 文件存在，如果filename没重复，则新增一个filename
            file.filenames.find(() => {

            })
        } 

        //yield this.ctx.helper.renameFile(filepath, this.config.getUploadPath('rename.jpg'));

		// const imagePath = this.config.getUploadPath('resize.jpg');
		// const { size } = yield this.ctx.helper.getImageSize(filepath);
		// yield this.ctx.helper.createResizedImage(filepath, { width: 240, height: 240, imagePath });
		
    }
};