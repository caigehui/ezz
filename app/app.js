import React from 'react';
import { Router, Switch, Route } from 'dva/router';
import dynamic from 'dva/dynamic';
import dva from 'dva';
import { message } from 'antd';
import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import { persistStore, autoRehydrate } from 'redux-persist';
import { asyncSessionStorage } from 'redux-persist/storages';
import { REHYDRATE } from 'redux-persist/constants';
import { isReactComponent } from 'util/isReact';
import invariant from 'invariant';
import { ERROR_MSG_DURATION } from 'constant';
import 'util/array';

function NoMatch() {
	return	<h1>404 NOT FOUND</h1>;
}

export default class App {

	constructor({
		routes,
		extraModels = [],
		otherMiddlewares = [],
		noMatchComponent = NoMatch,
	}) {
		this.app = dva({
			onAction: [rehydrateMiddleware, ...otherMiddlewares],
			history: createHistory(),
			extraEnhancers: [autoRehydrate()],
			onError(e) {
				message.error(e.message, ERROR_MSG_DURATION);
			}
		});
		invariant(Array.isArray(routes), 'routes must be an instance of Array!');
		invariant(isReactComponent(noMatchComponent), 'noMatchComponent must be a react component！');
		this.routes = routes;
		this.noMatchComponent = noMatchComponent;
		this.app.use(createLoading({ effects: true }));
		this.addModel(extraModels);
		this.app.router(this.routerConfig);
	}

	addModel(extraModels) {
		for(let route of this.routes) {
			if(!route.models) continue;
			invariant(Array.isArray(route.models), 'models must be an instance of Array!');
			for(let model of route.models) {
				this.app.model(model);
			}
		}
		for(let model of extraModels) {
			this.app.model(model);
		}
	}

	routerConfig = ({ app, history }) => {
		return (
			<Router history={history}>
				<Switch>
					{
						this.routes.map((route, index) => (
							<Route key={index} path={route.path} exact={route.exact} component={dynamic({
								app,
								component: () => route.component,
							})} />
						))
					}
					<Route path="/error" component={this.noMatchComponent} />
				</Switch>
			</Router>
		);
	}

	persist() {
		// 获取白名单
		let whitelist = [];
		for (let route of this.routes) {
			const { models } = route;
			if (!models) continue;
			for (let i of models) {
				if (!i.disablePersist) {
					whitelist.push(i.namespace);
				}
			}
		}
		persistStore(this.app._store, {
			whitelist,
			storage: asyncSessionStorage
		});
	}

	start() {
		this.app.start('#root');
		this.persist();
	}
}

const rehydrateMiddleware = store => next => action => {
	if (action.type === REHYDRATE) {
		// 恢复数据
		for (let i in action.payload) {
			if (i === REHYDRATE) continue;
			store.dispatch({ type: `${i}/save`, payload: action.payload[i] });
		}
	}
	next(action);
};

// const errorHandlerMiddleware = store => next => action => {
// 	try {
// 		next(action);
// 	} catch(err) {
// 		console.error(err);
// 	}
// };