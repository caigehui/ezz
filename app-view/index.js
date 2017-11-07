import App from 'app';
import homeRoutes from './routes/Home';
import systemRoutes from './routes/System';
const routes = [
    {
        path: '/login',
        component: require('./routes/Login')
    },
    ...homeRoutes,
    ...systemRoutes
];

const extraModels = [
    require('./models/app'),
    require('./models/modal')
];

const app = new App({ routes, extraModels });

app.start();