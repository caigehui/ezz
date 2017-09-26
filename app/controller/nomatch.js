
'use strict';

module.exports = app => {
    class NomatchController extends app.Controller {
        * index() {
            this.ctx.body = { msg: `can not 'GET' API: ${this.ctx.request.url}` }
        }
        * new() {
            this.ctx.body = { msg: `can not 'GET' API: ${this.ctx.request.url}` }
        }
        * show() {
            this.ctx.body = { msg: `can not 'GET' API: ${this.ctx.request.url}` }
        }
        * edit() {
            this.ctx.body = { msg: `can not 'GET' API: ${this.ctx.request.url}` }
        }
        * create() {
            this.ctx.body = { msg: `can not 'POST' API: ${this.ctx.request.url}` }
        }
        * update() {
            this.ctx.body = { msg: `can not 'PUT' API: ${this.ctx.request.url}` }
        }
        * destroy() {
            this.ctx.body = { msg: `can not 'delete' API: ${this.ctx.request.url}` }
        }
    }
    return NomatchController;
};