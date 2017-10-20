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
            /**
             * 是否启动默认功能
             * 每个节点默认有四个功能:
             * 1. 查看: 节点key
             * 2. 新增: ${节点key}/create
             * 3. 编辑: ${节点key}/edit
             * 4. 删除: ${节点key}/edit
             */
            enableDefaultFunctions: Boolean,
            // 节点的额外自定义功能 
            extraFunctions: [{
                // 功能的key值，可能有相应的route path
                key: { type: String, required: true, lowercase: true, trim: true, unique: true },
                // 功能名称
                name: { type: String, required: true },
                // 功能描述
                description: String
            }],
            // 子节点
            children: [{
                key: String,
                name: String,
                description: String,
                enableDefaultFunctions: Boolean,
                extraFunctions: Array,
                children: Array
            }]
        }]
    }, { collection: 'menu' });
    return mongoose.model('Menu', MenuSchema);
};