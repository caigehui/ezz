'use strict';
const ms = require('ms');

module.exports = app => class LoginController extends app.Controller {
    * index() {
        const { username, password } = this.ctx.request.body;
        const user = yield this.ctx.model.User.findOne({ username, password });
        if (!user) this.ctx.throw(403, '用户名或者密码错误');
        // 设置session
        this.ctx.session = { user };
        this.ctx.session.maxAge = ms('15d');
        // 调用 rotateCsrfSecret 刷新用户的 CSRF token
        this.ctx.rotateCsrfSecret();
        this.ctx.body = { user };
    }
};