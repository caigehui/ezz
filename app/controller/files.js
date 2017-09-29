'use strict';
const sendToWormhole = require('stream-wormhole');
const fs = require('fs');
const path = require('path');

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
				if (!part.filename) ctx.throw(400, '上传的文件为空')
				// otherwise, it's a stream
				let stream = fs.createWriteStream(ctx.helper.getUploadPath(part.filename));
				part.pipe(stream);
				yield sendToWormhole(part);
			}
		}
		this.ctx.status = 200;
	}
};