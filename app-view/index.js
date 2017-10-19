import './index.less';
import { App } from 'app';

const routes = [
    {
        path: '/login',
        component: require('./routes/Login')
    },
    {
        path: '/', 
        exact: true,
        component: require('./routes/Home'),
        models: [require('./routes/Home/model')]
    }
];

const extraModels = [
    require('./models/app')
]

const app = new App({ routes, extraModels });

app.start();