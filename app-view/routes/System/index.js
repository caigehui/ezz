export default [
    {
        path: '/system/user',
        exact: true,
        component: require('./User'),
        models: [require('./User/model')]
    },
    {
        path: '/system/user/role',
        exact: true,
        component: require('./User/Role'),
        models: [require('./User/Role/model')]
    },
    {
        path: '/system/company',
        exact: true,
        component: require('./Company'),
        models: [require('./Company/model')]
    },
    {
        path: '/system/department',
        exact: true,
        component: require('./Department'),
        models: [require('./Department/model')]
    },
    {
        path: '/system/group',
        exact: true,
        component: require('./Group'),
        models: [require('./Group/model')]
    }
];
