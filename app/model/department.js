'use strict';

module.exports = ({ mongoose }) => {
    const DepartmentSchema = new mongoose.Schema({
        // 部门名称
        name: { type: String, required: true },
        // 岗位
        jobs: {
            type: [{
                // 岗位名称
                name: String,
                // 岗位描述
                description: String,
                // 岗位拥有的权限
                privileges: { type: [String], default: [] },
                // 岗位人员
                users: [{
                    id: mongoose.Schema.Types.ObjectId,
                    name: String,
                    roleName: String
                }],
                // 下级岗位
                children: Array
            }],
            // 默认添加无岗位
            default: [{
                name: '无岗位',
                description: '该人员暂无岗位',
                users: []
            }]
        },

        children: [{
            name: String,
            children: Array
        }]
    }, { collection: 'department' });
    return mongoose.model('Department', DepartmentSchema);
};