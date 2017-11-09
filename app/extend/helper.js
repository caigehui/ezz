'use strict';
const fileHelper = require('./fileHelper');

module.exports = {
    ...fileHelper,
    checkAuth(path, message = '对不起，您无权限进行该操作') {
        if(!this.ctx.session.privileges.find(i => i === path)) this.ctx.throw(403, message);
    }
};