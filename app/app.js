import React from 'react';
import { Router, Switch, Route, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import dva from 'dva';
import { message } from 'antd';
import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
const ERROR_MSG_DURATION = 3;

const NoMatch = () => <h1>NoMatch</h1>

class App {

	constructor() {
		this.app = dva({
			history: createHistory(),
			onError(e) {
				message.error(e.message, ERROR_MSG_DURATION);
			}
		})
		this.app.use(createLoading({ effects: true }));
		this.app.router(this.routerConfig);
	}

	routerConfig = ({ app, history }) => {

		const Home = dynamic({
			app,
			component: () => import('./routes/Home'),
		});

		return (
			<Router history={history}>
				<Switch>
					<Route path="/:bookId" component={Home} />
					<Route component={NoMatch} />
				</Switch>
			</Router>
		);
	}

	start() {
		this.app.start('#root');
	}
}

const app = new App();

app.start();