'use strict';
module.exports = app => class RolesController extends app.Controller {
    * index() {
        const ctx = this.ctx;
        const { list, count } = yield ctx.service.base.query.find({ model: 'Role' });
        ctx.body = { count, roles: list };
        ctx.status = 200;
    }
    * create() {
        this.ctx.validate({
            name: 'string',
            username: 'string',
            password: 'string',
            mobile: 'string',
            role: 'object'
        });
        const { name, username, password, mobile, role } = this.ctx.request.body;
        const result = yield this.ctx.model.User.create({
            username,
            password,
            role,
            info: {
                name,
                mobile
            },
            status: '使用中',
            companies: [this.ctx.session.user.currentCompany],
            currentCompany: this.ctx.session.user.currentCompany
        })
        this.ctx.body = { msg: '新增成功' };
        this.ctx.status = 201;
    }
};