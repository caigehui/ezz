'use strict';
const sendToWormhole = require('stream-wormhole');
const fs = require('fs');

module.exports = app => class FilesController extends app.Controller {
	/**
	 * 获取文件
	 */
	*show() {
		const ctx = this.ctx;
        // 分割'-'符合以获取附加参数
        const params = ctx.params.id.split('-');
        // 判断ObjectId是否合法
        if (!params[0].match(/^[0-9a-fA-F]{24}$/)) return ctx.throw(404, '找不到该文件');
        // 查找文件
		const file = yield ctx.model.File.findById(params[0]);
		if(!file) ctx.throw(404, '找不到该文件');
        // 获取额外的尺寸参数
        let size = '';
        if (params[1] && params[1] === 'medium') {
            size = '-medium';
        } else if (params[1] && params[1] === 'small') {
            size = '-small';
        }
        // 获取文件的filePath
        let filepath = this.config.getUploadPath(file.hash);
        // 判断文件是否存在
        const exists = yield ctx.helper.isFileExists(filepath);
        if (!exists) return ctx.throw(404, '找不到该文件');
        // 判断裁剪文件是否存在
        if (size) {
            const sizeExists = yield ctx.helper.isFileExists(filepath + size);
            if (sizeExists) filepath += size;
            // 尺寸不存在
            else size = '';
        }
        // 设置下载的文件名
        ctx.attachment(`${file.filename.slice(0, file.filename.lastIndexOf('.'))}${size}${file.filename.slice(file.filename.lastIndexOf('.'))}`);
        ctx.set('Content-Type', 'octet-stream');
        // 创建文件流
        this.ctx.body = fs.createReadStream(filepath);
	}
	/**
	 * 上传文件
	 */
	*create() {
		const ctx = this.ctx;
		const parts = ctx.multipart();
		let rs;
		while ((rs = yield parts)) {
			if (rs.length) {
				// 其他表单field
			} else {
				if (!rs.filename) ctx.throw(400, '上传的文件为空');
				const filename = rs.filename;
				const filepath = this.config.getUploadPath(filename);
				// 写入临时文件
				ctx.helper.writeFile(rs, filepath);
				// 创建文件的数据库记录，如果是尺寸大的图片则裁剪
				const { url, fileId } = yield ctx.service.base.file.createFile({ filepath, filename });
				this.ctx.body = { url, fileId };
				yield sendToWormhole(rs);
			}
		}
		ctx.status = 200;
	}
	/**
	 * 验证文件是否已上传
	 */
	*verify() {
		const { hash, filename } = this.ctx.request.body;
		const { url, fileId } = yield this.ctx.service.base.file.verifyFile({ hash, filename });
		this.ctx.body = { url, fileId };
	}
};