import React from 'react';
import { Router, Switch, Route } from 'dva/router';
import dynamic from 'dva/dynamic';
import dva from 'dva';
import { message } from 'antd';
import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
const ERROR_MSG_DURATION = 3;

const NoMatch = () => <h1>NoMatch</h1>;

export default class App {

	constructor({ routes }) {
		this.app = dva({
			history: createHistory(),
			onError(e) {
				message.error(e.message, ERROR_MSG_DURATION);
			}
		});
		this.routes = routes;
		this.app.use(createLoading({ effects: true }));
		this.app.router(this.routerConfig);
	}

	routerConfig = ({ app, history }) => {
		console.log(app._store.getState());
		return (
			<Router history={history}>
				<Switch>
					{
						this.routes.map((route, index) => (
							<Route key={index} path={route.path} exact={route.exact} component={dynamic({
								app,
								models: () => route.models || [],
								component: () => route.component,
							})} />
						))
					}
					<Route component={NoMatch} />
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
			for (let i of model) {
				if (i.disablePersist) {
					blacklist.push(i.namespace);
				}
			}
        }
        persistStore(this.app._store, {
            whitelist
        });
    }

	start() {
		this.app.start('#root');
	}
}

export const rehydrateMiddleware = store => next => action => {
	if (action.type === REHYDRATE) {
		// 恢复数据
		for (let i in action.payload) {
			if (i === REHYDRATE) continue;
			store.dispatch({ type: `${i}/save`, payload: action.payload[i] });
		}
	}
	next(action);
};

export const routingMiddleware = store => next => action => {
	const state = store.getState();
	if (action.type !== '@@router/LOCATION_CHANGE') return next(action);
	next(action);

	for (let model in state) {
		if (model === 'routing' || model === '@@dva') continue;
		if (!state.routing.locationBeforeTransitions) {
			state[model]._pathname === action.payload.pathname && store.dispatch({
				type: `${model}/onPushToRoute`,
				payload: {
					current: action.payload,
					before: null
				}
			});
			continue;
		}
		if (state[model]._pathname === state.routing.locationBeforeTransitions.pathname) {
			if (action.payload.action === 'POP') {
				store.dispatch({
					type: `${model}/routeDidPop`,
					payload: {
						current: state.routing.locationBeforeTransitions,
						next: action.payload
					}
				});
			} else if (action.payload.action === 'PUSH') {
				store.dispatch({
					type: `${model}/routeDidPush`,
					payload: {
						current: state.routing.locationBeforeTransitions,
						next: action.payload
					}
				});
			} else if (action.payload.action === 'REPLACE') {
				store.dispatch({
					type: `${model}/routeDidReplace`,
					payload: {
						current: state.routing.locationBeforeTransitions,
						next: action.payload
					}
				});
			}
		}
		if (state[model]._pathname === action.payload.pathname) {
			if (action.payload.action === 'POP') {
				store.dispatch({
					type: `${model}/onPopToRoute`,
					payload: {
						current: action.payload,
						before: state.routing.locationBeforeTransitions
					}
				});
			} else if (action.payload.action === 'REPLACE') {
				store.dispatch({
					type: `${model}/onReplaceToRoute`,
					payload: {
						current: action.payload,
						before: state.routing.locationBeforeTransitions
					}
				});
			} else {
				store.dispatch({
					type: `${model}/onPushToRoute`,
					payload: {
						current: action.payload,
						before: state.routing.locationBeforeTransitions
					}
				});
			}
		}
	}
};