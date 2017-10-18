import React from 'react';
import { routerRedux, Switch, Route } from 'dva/router';
import dynamic from 'dva/dynamic';
import dva from 'dva';
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
	authenticationMiddleware
} from './middlewares';
import 'utils/array';

const { ConnectedRouter } = routerRedux;

function NoMatch() {
	return <h1>404 NOT FOUND</h1>;
}

export default class App {

	constructor({
		routes,
		extraModels = [],
		otherMiddlewares = [],
		noMatchComponent = NoMatch,
	}) {
		this.app = dva({
			onAction: [
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
		invariant(isReactComponent(noMatchComponent), 'noMatchComponent must be a react component！');
		this.routes = routes;
		this.noMatchComponent = noMatchComponent;
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
					<Route component={this.noMatchComponent} />
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