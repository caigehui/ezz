'use strict';
module.exports = app => class UsersController extends app.Controller {
    * index() {
        const ctx = this.ctx;
        const { list, count } = yield ctx.service.base.query.find({ model: 'User', conditions: {
            'currentCompany.id': { $eq: this.ctx.session.user.currentCompany.id }
        }, filter: { username: 0, password: 0, companies: 0 } });
        ctx.body = { count, users: list };
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
            companies: [this.ctx.session.user.currentCompany],
            currentCompany: this.ctx.session.user.currentCompany
        })
        this.ctx.body = { result };
        this.ctx.status = 201;
    }
};