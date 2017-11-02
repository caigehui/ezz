import React from 'react';
import { routerRedux, Switch, Route, Link, Redirect } from 'dva/router';
import dva from 'dva';
import dynamic from 'dva/dynamic';
import bind from './bind';
import { message } from 'antd';
import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import { persistStore, autoRehydrate } from 'redux-persist';
import createActionBuffer from 'redux-action-buffer'
import { asyncSessionStorage } from 'redux-persist/storages';
import { REHYDRATE } from 'redux-persist/constants';
import { isReactComponent } from 'utils/isReact';
import invariant from 'invariant';
import { ERROR_MSG_DURATION } from 'constant';
import {
	rehydrateMiddleware,
	authenticationMiddleware,
	loadingMiddleware,
	routingMiddleware
} from './middlewares';
import 'utils/array';
import './themes/index.less';

const { ConnectedRouter } = routerRedux;

export default class App {

	constructor({
		routes,
		extraModels = [],
		otherMiddlewares = []
	}) {
		this.app = dva({
			onAction: [
				// 使用ActionBuffer让App在路由启动前恢复
				createActionBuffer(REHYDRATE),
				authenticationMiddleware,
				loadingMiddleware,
				rehydrateMiddleware,
				routingMiddleware,
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
		// 使用dva-loading插件
		this.app.use(createLoading({ effects: true }));
		this.addModel(extraModels);
		this.app.router(this.routerConfig);
	}

	// 附加model，例如app
	addModel(extraModels) {
		for (let route of this.routes) {
			if (!route.models) continue;
			invariant(Array.isArray(route.models), 'models must be an instance of Array!');
			for (let model of route.models) {
				this.app.model(model);
				// 给model的state加上路径名，这样才能对应到init方法
				model.state._pathname = route.path;
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

	// 数据持久化
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