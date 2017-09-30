
'use strict';

module.exports = app => class NomatchController extends app.Controller {
    constructor(ctx) {
        super(ctx);
        ctx.status = 404;
        ctx.body = { error: `API NOT FOUND: ${this.ctx.request.url}` };
    }
    * index() {
        // empty
    }
    * new() {
        // empty
    }
    * show() {
        // empty
    }
    * edit() {
        // empty
    }
    * create() {
        // empty
    }
    * update() {
        // empty
    }
    * destroy() {
        // empty
    }
};