'use strict';
const ms = require('ms');
const sjcl = require('sjcl');
const mongoose = require('mongoose');
const _ = require('lodash');

module.exports = app => class LoginController extends app.Controller {

    // 登录
    * index() {
        this.ctx.validate({
            username: 'string',
            password: 'string',
            remember: 'boolean'
        });
        const { username, password, remember } = this.ctx.request.body;
        const decryptPwd = sjcl.decrypt(this.config.encryptKey, password);
        let user = yield this.ctx.model.User.findOne({ $or: [{ username }, { 'info.mobile': username }], password: decryptPwd }, { username: 0, password: 0 });
        if (!user) this.ctx.throw(403, '用户名或者密码错误');
        // 设置session
        this.ctx.session = { user };
        if (remember) this.ctx.session.maxAge = ms('14d');
        // 调用 rotateCsrfSecret 刷新用户的 CSRF token
        this.ctx.rotateCsrfSecret();
        this.ctx.body = { msg: '成功登录' };
    }

    // 签到，每次初始化登入系统时调用，用于获取菜单和用户信息
    * signin() {
        const user = yield this.ctx.model.User.findOne({_id: mongoose.Types.ObjectId(this.ctx.session.user._id) } , { username: 0, password: 0 });
        if(!user) this.ctx.throw(401, '用户验证失败');
        const { menu } = yield this.ctx.model.Menu.findOne({ companyId: user.currentCompany.id }, { menu: 1 });
        this.ctx.session = {
            user,
            privileges: _.uniq([
                ...user.role.rolePrivileges,
                ...user.currentCompany.jobPrivileges,
                ...user.currentCompany.userPrivileges]
            ),
        }
        yield this.ctx.model.User.update({ _id: mongoose.Types.ObjectId(this.ctx.session.user._id) }, { '$set': { lastLoginTime: Date() } });
        this.ctx.body = { user, menu };
    }

    // 退出登录
    logout() {
        this.ctx.session = null;
        this.ctx.body = { msg: '退出登录' };
    }
};