'use strict';


module.exports = app => class UsersController extends app.Controller {
    * index() {
        this.ctx.body = yield this.ctx.model.User.find({}, { username: 0, password: 0 });
        this.ctx.status = 200;
    }
};