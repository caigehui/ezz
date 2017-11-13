export default [
    {
        path: '/', 
        exact: true,
        component: require('./Dashboard'),
        models: [require('./Dashboard/model')]
    },
    {
        path: '/person/:id',
        exact: true,
        component: require('./Person'),
        models: [require('./Person/model')]
    }
];