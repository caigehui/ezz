'use strict';
const sendToWormhole = require('stream-wormhole');

module.exports = app => class FilesController extends app.Controller {
	* index() {
		this.ctx.body = yield this.ctx.model.File.find({});
	}
	* create() {
		const ctx = this.ctx;
		const parts = ctx.multipart();
		let rs;
		while ((rs = yield parts)) {
			if (rs.length) {
				// 其他表单field
			} else {
				if (!rs.filename) ctx.throw(400, '上传的文件为空');
				const filename = rs.filename;
				const filesize = rs.filesize;
				const filepath = this.config.getUploadPath(filename);
				// 写入临时文件
				yield ctx.helper.writeFile(rs, filepath);
				// 创建文件的数据库记录，如果是尺寸大的图片则裁剪
				yield ctx.service.base.file.createFile({ filepath, filesize, filename });
				yield sendToWormhole(rs);
			}
		}
		ctx.status = 200;
	}
};