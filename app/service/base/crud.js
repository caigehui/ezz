'use strict';
const _ = require('lodash');
const mongoose = require('mongoose');

module.exports = app => class Crud extends app.Service {
    * query({
        model,
        conditions = {},
        filter = {},
        sort = { _id: -1 },
        listName = 'list'
    }) {
        const ctx = this.ctx;
        const page = ctx.query.page ? parseInt(ctx.query.page) - 1 : 0;
        const pageSize = ctx.query.pagesize ? parseInt(ctx.query.pagesize) : 0;
        const list = yield ctx.model[model].find(conditions, filter).skip(page * pageSize).limit(pageSize).sort(sort);
        const count = yield ctx.model[model].find(conditions, filter).count();
        ctx.body = { count, [listName]: list };
        ctx.status = 200;
        return { count, [listName]: list };
    }

    * create({
        model,
        data,
        extra
    }) {
        const ctx = this.ctx;
        ctx.validate(data);
        const bodyData = _.mapValues(data, (value, key) => ctx.request.body[key])
        const result = yield this.ctx.model[model].create({
            ...bodyData,
            ...extra
        });
        this.ctx.body = { msg: '新增成功' };
        this.ctx.status = 201;
        return result;
    }

    * update({
        model,
        conditions,
        data,
        values
    }) {
        const ctx = this.ctx;
        const bodyData = values || _.omitBy(_.mapValues(data, (value, key) => ctx.request.body[key]), _.isUndefined)
        const result = yield this.ctx.model[model].findOneAndUpdate(conditions || { _id: mongoose.Types.ObjectId(ctx.params.id) }, {
            $set: bodyData
        });
        this.ctx.body = { msg: '更新成功', result };
        this.ctx.status = 200;
        return bodyData;
    }

    * remove({
        model,
        conditions
    }) {
        yield this.ctx.model[model].remove(conditions || { _id: mongoose.Types.ObjectId(ctx.params.id) })
        this.ctx.body = { msg: '删除成功' };
        this.ctx.status = 200;
    }
};