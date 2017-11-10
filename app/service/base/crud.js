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
        values,
        then,
        within,
        without
    }) {
        const ctx = this.ctx;
        const uConditions = conditions || { _id: mongoose.Types.ObjectId(ctx.params.id) };
        const uData = values || _.omitBy(_.mapValues(data, (value, key) => ctx.request.body[key]), _.isUndefined);
        const old = yield ctx.model[model].findOneAndUpdate(
            uConditions,
            { $set: uData },
            { new: false }
        );
        if(then) {
            for(let i = 0; i < then.models.length; i++) {
                let thenModel = then.models[i],
                    thenWhere = then.wheres[i],
                    thenValues = then.values[i];
                yield ctx.model[thenModel].update(
                    _.mapValues(thenWhere, value => old[value]),
                    _.mapValues(thenValues, value => uData[value] || old[value])
                )
            }
        }
        this.ctx.body = { msg: '更新成功' };
        this.ctx.status = 200;
        return old;
    }

    * destroy({
        model,
        conditions
    }) {
        yield this.ctx.model[model].remove(conditions || { _id: mongoose.Types.ObjectId(this.ctx.params.id) })
        this.ctx.body = { msg: '删除成功' };
        this.ctx.status = 200;
    }
};