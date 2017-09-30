'use strict';
const sendToWormhole = require('stream-wormhole');
const fs = require('fs');

module.exports = app => class FilesController extends app.Controller {
	* index() {
		this.ctx.body = yield this.ctx.model.File.find({});
		this.ctx.status = 200;
	}
	* create() {
		const ctx = this.ctx;
		const parts = ctx.multipart();
		let part;
		while ((part = yield parts)) {
			if (part.length) {
				// arrays are busboy fields, don't need to handle
			} else {
				if (!part.filename) ctx.throw(400, '上传的文件为空');
				const ret = yield ctx.helper.getFileHash(part);
				ctx.body = { ret };
				let stream = fs.createWriteStream(ctx.helper.getUploadPath(part.filename));
				part.pipe(stream);
				// end stream
				yield sendToWormhole(part);
			}
		}
		ctx.status = 200;
	}
};