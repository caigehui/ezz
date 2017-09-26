
'use strict';

const sjcl = require('sjcl');

module.exports = app => {
    class ApiTestController extends app.Controller {
        * index() {
            const data = sjcl.encrypt(app.config.encryptKey, this.ctx.params.id);
            this.ctx.body = {
                encryt: data,
                decrypt: sjcl.decrypt(app.config.encryptKey, data)
            };
            this.ctx.status = 200;
        }
    }
    return ApiTestController;
};