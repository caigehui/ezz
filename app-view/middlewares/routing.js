const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'

const routingMiddleware = store => next => action => {
	const state = store.getState();
	if (action.type !== LOCATION_CHANGE) return next(action);
	next(action);

	for (let model in state) {
		if (!state[model]._pathname) continue;
		// prevent double trigger
		if(!state.routing.location) continue;

		/**
		 * note: 处理带params的route
		 */ 
		let paramsRouting = false;
		if(state[model]._pathname.indexOf(':') > -1) {
			paramsRouting = action.payload.pathname.indexOf(state[model]._pathname.slice(0, state[model]._pathname.indexOf(':'))) > -1
		}
		if (state[model]._pathname === action.payload.pathname || paramsRouting) {
			store.dispatch({
				type: `${model}/init`,
				payload: {
					current: action.payload,
					before: state.routing.location
				}
			});
		}
	}
};

export default routingMiddleware;