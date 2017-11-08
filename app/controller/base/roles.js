'use strict';
const mongoose = require('mongoose');

module.exports = app => class RolesController extends app.Controller {
    * index() {
        const ctx = this.ctx;
        const { list, count } = yield ctx.service.base.crud.query({ model: 'Role' });
        ctx.body = { count, roles: list };
        ctx.status = 200;
    }
    * create() {
        this.ctx.validate({
            name: 'string',
            description: { type: 'string', allowEmpty: true },
            privileges: 'array'
        });
        const { name, description, privileges } = this.ctx.request.body;
        yield this.ctx.model.Role.create({
            name,
            description,
            privileges
        })
        this.ctx.body = { msg: '新增成功' };
        this.ctx.status = 201;
    }
    * update() {
        this.ctx.validate({
            name: 'string',
            description: { type: 'string', allowEmpty: true },
            privileges: 'array'
        });
        const { name, description, privileges } = this.ctx.request.body;
        yield this.ctx.model.Role.update({ _id: mongoose.Types.ObjectId(this.ctx.params.id) }, {
            $set: { name, description, privileges }
        })
    }
};