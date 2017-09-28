'use strict';
const ms = require('ms');
const sjcl = require('sjcl');

module.exports = app => class LoginController extends app.Controller {

    constructor(ctx) {
        super(ctx);
        const rule = {
            username: 'string',
            password: 'string',
            remember: 'boolean',
        };
        ctx.validate(rule);
    }

    * index() {
        const { username, password, remember } = this.ctx.request.body;
        const decryptPwd = sjcl.decrypt(this.config.encryptKey, password);
        const user = yield this.ctx.model.User.findOne({ username, password: decryptPwd });
        if (!user) this.ctx.throw(403, '用户名或者密码错误');
        // 设置session
        this.ctx.session = { user };
        if (remember) this.ctx.session.maxAge = ms('14d');
        // 调用 rotateCsrfSecret 刷新用户的 CSRF token
        this.ctx.rotateCsrfSecret();
        this.ctx.body = { user, body: this.ctx.request.body };
    }
};