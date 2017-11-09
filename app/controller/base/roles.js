'use strict';

module.exports = app => class RolesController extends app.Controller {

    constructor(ctx) {
        super(ctx);
        this.crud = ctx.service.base.crud;
        this.ctx.helper.checkAuth('/system/user/role');
    }

    * index() {
        yield this.crud.query({ model: 'Role' })
    }

    * create() {
        yield this.crud.create({
            model: 'Role',
            data: {
                name: 'string',
                description: { type: 'string', allowEmpty: true },
                privileges: 'array'
            }
        })
    }
    * update() {
        const modifiedData = yield this.crud.update({
            model: 'Role',
            data: {
                name: { type: 'string', required: false },
                description: { type: 'string', allowEmpty: true, required: false },
                privileges: { type: 'array', required: false },
            }
        })
        // if(modifiedData.name) {
        //     yield this.crud.update({
        //         model: 'User',
        //         conditions: {
        //             'info.name': modifiedData.name
        //         },
        //         values: {

        //         }
        //     })
        // }
    }
    * delete() {
        
    }
};