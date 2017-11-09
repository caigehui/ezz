'use strict';
module.exports = app => class UsersController extends app.Controller {

    constructor(ctx) {
        super(ctx);
        this.crud = ctx.service.base.crud;
    }

    * index() {
        this.ctx.helper.checkAuth('/system/user');
        // 查询当前公司和没有注销的账号
        yield this.crud.query({
            model: 'User',
            conditions: {
                'currentCompany.id': { $eq: this.ctx.session.user.currentCompany.id },
                'status': { $ne: '已注销' },
            },
            filter: { username: 0, password: 0, companies: 0 },
        });
    }
    * create() {
        this.ctx.helper.checkAuth('/system/user/create');
        yield this.crud.create({
            model: 'User',
            data: {
                username: 'string',
                password: 'string',
                info: 'object',
                role: 'object'
            },
            extra: {
                status: '使用中',
                companies: [this.ctx.session.user.currentCompany],
                currentCompany: this.ctx.session.user.currentCompany
            }
        })
    }
};