var conn = new Mongo();
var db = conn.getDB("test");

// 数据库升级语句
function updateData() {

}

// 数据库初始化语句
if (!db.menu.findOne()) {

    // 插入菜单
    db.menu.insert({
        key: '/system',
        name: '系统管理',
        children: [
            {
                key: '/system/user',
                name: '用户与角色',
                enableDefaultFunctions: true,
                extraFunctions: [
                    {
                        key: '/system/user/role',
                        name: '角色管理'
                    }
                ]
            },
            {
                key: '/system/company',
                name: '单位管理',
                enableDefaultFunctions: true
            },
            {
                key: '/system/department',
                name: '部门管理',
                enableDefaultFunctions: true
            },
            {
                key: '/system/group',
                name: '工作组管理',
                enableDefaultFunctions: true
            },
        ]
    })

    // 插入示例公司
    var companyId = ObjectId();
    db.company.insert({
        _id: companyId,
        name: 'Ezz企业应用平台',
        shortname: 'Ezz'
    })

    // 插入角色
    db.role.insertMany([
        {
            name: '系统管理员',
            description: '始终拥有全部菜单权限',
            privileges: [1]
        },
        {
            name: '普通用户',
            privileges: []
        },
        {
            name: '游客',
            privileges: []
        }
    ]);

    // 插入管理员
    var userId = ObjectId();
    db.user.insert({
        _id: userId,
        username: 'admin',
        password: 'admin',
        role: {
            name: '系统管理员',
            rolePrivileges: [1]
        },  
        info: {
            name: 'admin',
            mobile: '13987654321',
        },
        companies: [
            {
                id: companyId,
                name: 'Ezz企业应用平台',
                isMain: true,
                privileges: []
            }
        ]
    });
} else {
    // 执行数据库升级语句
    updateData();
}
