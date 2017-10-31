'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const MenuSchema = new mongoose.Schema({
        // 所属公司id
        companyId: mongoose.Schema.Types.ObjectId,
        // 菜单
        menu: [{
            // 节点的key值，与route path对应，唯一
            key: { type: String, required: true, lowercase: true, trim: true, unique: true },
            // 节点名称
            name: { type: String, required: true },
            // 图标类型
            iconType: String,
            // 节点描述
            description: String,
            // 是否禁用该节点
            disable: Boolean,
            // 是否隐藏该节点，被隐藏的节点不会出现在菜单中同时不受权限的控制
            hidden: Boolean,
            // 操作
            actions: {
                type: [{
                    key: { type: String, required: true, lowercase: true, trim: true, unique: true },
                    name: { type: String, required: true }
                }],
                default: []
            },
            // 节点的额外自定义功能 
            extraFunctions: {
                type: [{
                    // 功能的key值，可能有相应的route path
                    key: { type: String, required: true, lowercase: true, trim: true, unique: true },
                    // 功能名称
                    name: { type: String, required: true },
                    // 功能描述
                    description: String,
                    // 操作
                    actions: [{
                        key: { type: String, required: true, lowercase: true, trim: true, unique: true },
                        name: { type: String, required: true }
                    }]
                }],
                default: []
            },
            // 子节点
            children: { type: Array, default: [] }
        }]
    }, { collection: 'menu' });
    return mongoose.model('Menu', MenuSchema);
};