'use strict';

module.exports = app => class FilesController extends app.Controller {
    * index() {
        this.ctx.body = yield this.ctx.model.File.find({});
        this.ctx.status = 200;
    }
    * create() {
        
    }
};