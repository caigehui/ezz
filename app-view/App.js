import React from 'react';
import { routerRedux, Switch, Route, Link, Redirect } from 'dva/router';
import dva from 'dva';
import dynamic from 'dva/dynamic';
import bind from 'utils/bind';
import { message } from 'antd';
import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import { persistStore, autoRehydrate } from 'redux-persist';
import { asyncSessionStorage } from 'redux-persist/storages';
import { REHYDRATE } from 'redux-persist/constants';
import { isReactComponent } from 'utils/isReact';
import invariant from 'invariant';
import { ERROR_MSG_DURATION } from 'constant';
import {
	rehydrateMiddleware,
	authenticationMiddleware,
	loadingMiddleware
} from './middlewares';
import 'utils/array';
import './themes/index.less';
export {
	routerRedux,
	Route,
	Link,
	bind
}

const { ConnectedRouter } = routerRedux;

export class App {

	constructor({
		routes,
		extraModels = [],
		otherMiddlewares = []
	}) {
		this.app = dva({
			onAction: [
				loadingMiddleware,
				rehydrateMiddleware,
				authenticationMiddleware,
				...otherMiddlewares
			],
			history: createHistory(),
			extraEnhancers: [autoRehydrate()],
			onError(e) {
				message.error(e.message, ERROR_MSG_DURATION);
			}
		});
		invariant(Array.isArray(routes), 'routes must be an instance of Array!');
		this.routes = routes;
		this.extraModels = extraModels;
		this.app.use(createLoading({ effects: true }));
		this.addModel(extraModels);
		this.app.router(this.routerConfig);
	}

	addModel(extraModels) {
		for (let route of this.routes) {
			if (!route.models) continue;
			invariant(Array.isArray(route.models), 'models must be an instance of Array!');
			for (let model of route.models) {
				this.app.model(model);
			}
		}
		for (let model of extraModels) {
			this.app.model(model);
		}
	}

	routerConfig = ({ app, history }) => {
		return (
			<ConnectedRouter history={history}>
				<Switch>
					{
						this.routes.map((route, index) => (
							<Route key={index} path={route.path} exact={route.exact} component={dynamic({
								app,
								component: () => route.component,
							})} />
						))
					}
					<Route path="/notallow" component={dynamic({
						app,
						component: () => require('./routes/ErrorPages/NotAllow')
					})} />
					<Route component={dynamic({
						app,
						component: () => require('./routes/ErrorPages/NotMatch')
					})} />
				</Switch>
			</ConnectedRouter>
		);
	}

	persist() {
		// 获取白名单
		let whitelist = [];
		for (let route of this.routes) {
			const { models } = route;
			if (!models) continue;
			for (let i of models) {
				if (i.persist) {
					whitelist.push(i.namespace);
				}
			}
		}
		for(let model of this.extraModels) {
			if(model.persist) {
				whitelist.push(model.namespace);
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