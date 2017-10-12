import { REHYDRATE } from 'redux-persist/constants';

const rehydrateMiddleware = store => next => action => {
	if (action.type === REHYDRATE) {
		// 拦截
		for (let i in action.payload) {
			if (i === REHYDRATE) continue;
			store.dispatch({ type: `${i}/save`, payload: action.payload[i] });
		}
		return;
	}
	next(action);
};

export default rehydrateMiddleware;