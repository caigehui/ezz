'use strict';

module.exports = app => class Query extends app.Service {
    * find({ model, conditions = {}, filter = {}, sort = { _id: -1 } }) {
        const ctx = this.ctx;
        const page = ctx.query.page ? parseInt(ctx.query.page) - 1 : 0;
        const pageSize = ctx.query.pagesize ? parseInt(ctx.query.pagesize) : 0;
        const list = yield ctx.model[model].find(conditions, filter).skip(page * pageSize).limit(pageSize).sort(sort);
        const count = yield ctx.model[model].find(conditions, filter).count();
        return { count, list };
    }
};