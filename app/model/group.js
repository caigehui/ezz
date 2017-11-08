'use strict';

module.exports = ({ mongoose }) => {
    const GroupSchema = new mongoose.Schema({
        // 公司名
        companyName: { type: String, required: true },
        // 工作组
        groups: [{
            // 组名
            name: String,
            // 组描述
            description: String,
            // 组成员
            members: [{
                id: mongoose.Schema.Types.ObjectId,
                name: String
            }],
            // 组权限
            privileges: [String]
        }]
    },{ collection: 'group'});
    return mongoose.model('Group', GroupSchema);
};