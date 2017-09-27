import './index.less';
import App from './App.js';

const routes = [
    {
        path: '/login',
        component: require('./route/Login'),
        models: [require('./route/Login/model')]
    },
    {
        path: '/:bookId', 
        component: require('./route/Home')
    }
]

const app = new App({ routes });

app.start();