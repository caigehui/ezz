'use strict';

module.exports = ({ mongoose }) => {
    const RoleSchema = new mongoose.Schema({
        name: { type: String, required: true }, // 角色名
        description: String, //角色描述
        privileges: { type: [String], default: [] },// 角色权限
    }, { collection: 'role' });

    return mongoose.model('Role', UserSchema);
};
