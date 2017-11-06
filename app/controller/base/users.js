'use strict';
module.exports = app => class UsersController extends app.Controller {
    * index() {
        const ctx = this.ctx;
        // 查询当前公司和没有注销的账号
        const { list, count } = yield ctx.service.base.query.find({ model: 'User', conditions: {
            'currentCompany.id': { $eq: this.ctx.session.user.currentCompany.id },
            'status': { $ne: '已注销' },
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
            status: '使用中',
            companies: [this.ctx.session.user.currentCompany],
            currentCompany: this.ctx.session.user.currentCompany
        })
        this.ctx.body = { msg: '新增成功' };
        this.ctx.status = 201;
    }

    // * verify() {
    //     const ctx = this.ctx;
    //     ctx.validate({
    //         field: 'string',
    //         value: 'string'
    //     });
    //     const { model, field, value } = ctx.request.body;
    //     const result = yield ctx.model.User.find({ [field]: value })
    //     ctx.body = { exist: result.length > 0  }
    // }
};