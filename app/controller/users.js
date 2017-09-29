'use strict';



module.exports = app => class UsersController extends app.Controller {
    * index() {
        this.ctx.body = yield this.ctx.model.User.find({});
        this.ctx.status = 200;
    }
};