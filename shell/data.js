var conn = new Mongo();
var db = conn.getDB("ezz");

// 数据库升级语句
function updateData() {

}

// 数据库初始化语句
if (!db.menu.findOne()) {
    // 插入示例公司
    var companyId = ObjectId();
    db.company.insert({
        _id: companyId,
        name: 'Ezz Example',
        shortname: 'Ezz Example' 
    })

    // 插入菜单
    db.menu.insert({
        companyId: companyId,
        menu: [
            {
                key: '/',
                name: '总览',
                iconType: 'home'
            },
            {   
                key: '/system',
                name: '系统管理 ',
                iconType: 'setting',
                children: [
                    {
                        key: '/system/user',
                        name: '用户管理',
                        actions: [
                            {
                                key: '/system/user/create',
                                name: '新增用户'
                            },
                            {
                                key: '/system/user/cancel',
                                name: '注销用户'
                            },
                            {
                                key: '/system/user/ban',
                                name: '禁用用户'
                            }
                        ],
                        extraFunctions: [
                            {
                                key: '/system/user/role',
                                name: '角色管理'
                            }
                        ]
                    },
                    {
                        key: '/system/department',
                        name: '部门与岗位',
                        enableDefaultFunctions: true
                    },
                    {
                        key: '/system/company',
                        name: '单位管理',
                        enableDefaultFunctions: true
                    },
                    {
                        key: '/system/group',
                        name: '工作组管理',
                        enableDefaultFunctions: true
                    },
                ]
            },
            {
                key: '/person/:id',
                name: '个人主页',
                iconType: 'user',
                hidden: true,
                extraFunctions: [
                    {
                        key: '/person/edit',
                        name: '编辑资料'
                    }
                ]
            }
        ]
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

    // 插入系统管理员
    var userId = ObjectId();
    db.user.insert({
        _id: userId,
        username: 'admin',
        password: 'admin',
        status: '使用中',
        createTime: new Date(),
        role: {
            name: '超级管理员', // 不显示超级管理员
            rolePrivileges: [1]
        },
        info: {
            name: 'admin',
            mobile: '13987654321',
        },
        companies: [
            {
                id: companyId,
                name: 'Ezz Example',
                shortname: 'Ezz Example',
                isMain: true,
                jobPrivileges: [],
                userPrivileges: []
            }
        ],
        currentCompany: {
            id: companyId,
            name: 'Ezz Example',
            shortname: 'Ezz Example',
            isMain: true,
            jobPrivileges: [],
            userPrivileges: []
        },
    });
} else {
    // 执行数据库升级语句
    updateData();
}
