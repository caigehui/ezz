'use strict';

module.exports = ({ mongoose }) => {
    const UserSchema = new mongoose.Schema({
        username: { type: String, required: true, unique: true },// 用户名
        password: { type: String, required: true },// 密码
        // 个人信息
        info: {
            name: { type: String, required: true },// 用户名称
            mobile: { type: String, required: true },// 手机号码
            email: String,// 电子邮箱
            avatar: String,// 头像地址
        },
        // 角色
        role: {
            name: String,// 角色名
            rolePrivileges: { type: [String], default: [] },// 角色权限
        },
        // 所属公司
        companies: [{
            id: mongoose.Schema.Types.ObjectId,// 公司的_Id
            name: String,// 公司名称
            isMain: Boolean,// 是否为主公司
            jobPrivileges: { type: [String], default: [] },// 岗位层级拥有的权限
            userPrivileges: { type: [String], default: [] }// 用户层级拥有的权限
        }],
        createTime: { type: Date, default: Date.now },// 创建时间
        lastLoginTime: Date// 上次登录时间
    }, { collection: 'user' });

    return mongoose.model('User', UserSchema);
};
