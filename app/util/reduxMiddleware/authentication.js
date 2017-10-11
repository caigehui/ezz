import { routerRedux } from 'dva/router';
const { LOCATION_CHANGE } = routerRedux;
import Cookies from 'js-cookie';

const authenticationMiddleware = store => next => action => {
	if (action.type === LOCATION_CHANGE && action.payload.pathname !== '/login') {
        // 校验身份
        const { app } = store.getState(); 
        if(!(Cookies.get('EGG_SESS') || app.user)) {
            return store.dispatch(routerRedux.replace({
                pathname: 'login'
            }))
        } 
	}
	next(action);
};

export default authenticationMiddleware;