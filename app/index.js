import './index.less';
import App from './App.js';

const routes = [
    {
        path: '/login',
        component: require('./route/Login'),
        models: [require('./route/Login/model')]
    },
    {
        path: '/', 
        exact: true,
        component: require('./route/Home'),
        models: [require('./route/Home/model')]
    }
];

const app = new App({ routes });

app.start();