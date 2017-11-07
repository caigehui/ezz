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
    }
];
