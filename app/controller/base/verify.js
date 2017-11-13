'use strict';
module.exports = app => class VerifyController extends app.Controller {
    * index() {
        const ctx = this.ctx;
        ctx.validate({
            model: 'string',
            field: 'string',
            value: { allowEmpty: true, type: 'string' }
        });
        const { model, field, value } = ctx.request.body;
        const result = yield ctx.model[model].find({ [field]: value });
        ctx.body = { exist: result.length > 0 };
    }
};